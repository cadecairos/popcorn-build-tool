var http = require( "http" ),
    express = require( 'express' ),
    compression = require( 'compression' ),
    morgan = require( 'morgan' ),
    habitat = require( 'habitat' ),
    nunjucks = require( 'nunjucks' ),
    path = require( 'path' ),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname + '/views' ) ), { autoescape: true } ),
    app = express(),
    builder,
    env;

habitat.load();
env = new habitat();
nunjucksEnv.express( app );

builder = require( './lib/builder' )( env );
redisMiddleware = require( './lib/redis' )( env );

app.use( compression() );
app.use( morgan( env.get( 'NODE_ENV' ) === 'production' ? 'combined' : 'dev' ) );
app.use( '/bower', express.static( path.join(__dirname, 'bower_components' ) ) );

app.use( express.static( __dirname + '/public' ) );

app.use(function( req, res, next ) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET'
  });
  next();
});

app.use(function errorMiddleware( err, req, res, next ) {
  var error = {
    message: JSON.stringify( err, null, 2 ),
    status: http.STATUS_CODES[err.status] ? err.status : 500
  };
  res.json( error.status, error );
});

app.get( '/', function( req, res ) {
  res.render( 'index.html', {
    files: builder.files,
    GA: env.get( "GA" )
  });
});

app.get( '/build', function( req, res, next ) {
  res.setHeader( 'Cache-Control', 'max-age=86400');
  next();
}, redisMiddleware, builder.build );

var port = env.get( 'PORT' ) || 5000;
app.listen( port, function() {
  console.log( 'HTTP server started on (probably http://localhost:' + port );
});
