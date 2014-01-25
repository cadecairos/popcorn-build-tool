if ( process.env.NEW_RELIC_ENABLED && process.env.NEW_RELIC_LICENSE_KEY ) {
  require( 'newrelic' );
}

var http = require( "http" ),
    express = require( 'express' ),
    habitat = require( 'habitat' ),
    nunjucks = require( 'nunjucks' ),
    path = require( 'path' ),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname + '/views' ) ), { autoescape: true } ),
    app = express(),
    env;

habitat.load();
env = new habitat();

var builder = require( './lib/builder' )( env );

nunjucksEnv.express( app );

app.use( express.compress() );
app.use( express.logger( env.get( 'NODE_ENV' ) === 'production' ? '' : 'dev' ) );
app.use( '/bower', express.static( path.join(__dirname, 'bower_components' ) ) );

app.use( express.static( __dirname + '/public' ) );

app.use( app.router );

app.use(function( req, res, next ) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET'
  });
  next();
});

app.use(function errorMiddleware( err, req, res, next ) {
  var error = {
    message: err.toString(),
    status: http.STATUS_CODES[err.status] ? err.status : 500
  };
  res.json( error.status, error );
});

app.get( '/', function( req, res ) {
  res.render( 'index.html', {
    files: builder.files
  });
});

app.get( '/build', builder.build );

app.listen( env.get( 'PORT' ) || 5000, function() {
  console.log( 'HTTP server started on (probably http://localhost:' + env.get( 'PORT' ) );
});
