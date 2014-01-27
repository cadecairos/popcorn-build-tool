var redis = require( 'redis' ),
    redisClient;

function cacheRequest( key ) {
  return function( js ) {
    redisClient.set( key, js, function( err ) {
      if ( err ) {
        console.error( JSON.stringify( err ) );
      }
    });
  };
}

module.exports = function( env ) {
  if ( !env.get( 'REDIS_ENABLED' ) ) {
    return function( req, res, next ) {
      next();
    };
  }

  var rtg = env.get( 'REDISTOGO_URL' );

  if ( rtg ) {
    rtg = require( 'url' ).parse( rtg );
    redisClient.createClient( rtg.port, rtg.hostname, env.get( 'REDIS_OPTIONS' ) );
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
