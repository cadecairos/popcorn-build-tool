var minify = require( 'uglify-js' ).minify,
    popcornTree = require('../tree'),
    fs = require( 'fs' ),
    exec = require( 'child_process' ).exec,
    path = require( 'path' ),
    rootJSPath = path.resolve( __dirname, '../popcorn-js/' ) + '/',
    coreJS = fs.readFileSync( rootJSPath + 'popcorn.js', 'utf8' ),
    repoLicense = fs.readFileSync( rootJSPath + 'LICENSE_HEADER', 'utf8' ),
    fileArray = [];

for ( var item in popcornTree ) {
  if ( item !== 'core' ) {
    fileArray.push( item );
  }
}

function loadModule( js, query, loadedDeps ) {
  var depends = js.depends;

  if ( depends && !query[ depends ] && !loadedDeps[ depends ] ) {
    loadedDeps[ depends ] = '';
    return loadModule( popcornTree[ depends ], query, loadedDeps ) + fs.readFileSync( rootJSPath + js.path, 'utf8' );
  }

  return fs.readFileSync( rootJSPath + js.path, 'utf8' );
}

function buildJavaScript( query ) {
  var module,
      js = coreJS,
      loadedDeps = {},
      minifyCode = false;

  try {

    for( var item in query ) {
      module = popcornTree[ item ];
      if ( module ) {
        if (  !loadedDeps[ item ] ) {
          if ( module.isShim ) {
            js = loadModule( module, query, loadedDeps ) + js;
          } else {
            js += loadModule( module, query, loadedDeps );
          }
        }
      } else if ( item === 'minify' ) {
        minifyCode = true;
      }
    }

    if ( minifyCode ) {
      return  repoLicense + minify( js, {
        fromString: true
      }).code;
    }

    return  repoLicense + js;
  } catch( e ) {
    console.log( JSON.stringify( e, null, 2 ) );
    return;
  }
}


module.exports = function( env ) {
  repoLicense = repoLicense.replace( '@VERSION', env.get( 'POPCORN_VERSION' ) );

  return {
    build: function( req, res, next ) {
      var responseJS = req.responseJS ? req.responseJS : buildJavaScript( req.query );
      if ( !responseJS ) {
        return next({
          code: 500,
          err: 'Error building JavaScript'
        });
      } else {
        if ( req.cacheRequest ) {
          req.cacheRequest( responseJS );
        }
        res.set({
          'Content-Type': 'text/javascript',
          'Content-Length': responseJS.length
        });
        res.send( 200, responseJS );
      }
    },
    files: fileArray
  };
};

