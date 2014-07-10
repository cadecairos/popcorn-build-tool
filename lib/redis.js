var redis = require( 'redis' ),
    redisClient;

module.exports = function( env ) {

  function cacheRequest( key ) {
    return function( js ) {
      redisClient.multi()
        .set( key, js )
        .expire( key, env.get('REDIS_KEY_EXPIRE', 30) )
        .exec(function( err ) {
          if ( err ) {
            console.error( 'Error setting key in redis: ' + err.toString() );
          }
        });
    };
  }

  if ( !env.get( 'REDIS_ENABLED' ) ) {
    return function( req, res, next ) {
      next();
    };
  }

  var rtg = env.get( 'REDISTOGO_URL' );

  if ( rtg ) {
    rtg = require( 'url' ).parse( rtg );
    redisClient = redis.createClient( rtg.port, rtg.hostname, env.get( 'REDIS_OPTIONS' ) );
    redisClient.auth(rtg.auth.split(":")[1]);
  } else {
    redisClient = redis.createClient( env.get( 'REDIS_PORT' ), env.get( 'REDIS_HOST' ), env.get( 'REDISOPTIONS' ) );
  }

  return function( req, res, next ) {
    var queryKey = Object.keys( req.query ).sort().join( '-' );

    if ( !queryKey ) {
      // core is in memory, so no need to cache it in redis/read it from disk
      return next();
    }

    redisClient.get( queryKey, function( err, js ) {
      if ( err ) {
        return next({
          code: 500,
          err: err
        });
      }
      if ( js ) {
        req.responseJS = js;
      } else {
        req.cacheRequest = cacheRequest( queryKey );
      }
      next();
    });
  };
};
