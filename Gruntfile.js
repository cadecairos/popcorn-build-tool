module.exports = function( grunt ) {
  grunt.initConfig({
    jshint: {
      options: {
        newcap: false
      },
      files: [
        "Gruntfile.js",
        "app.js",
        "lib/builder.js"
      ]
    }
  });

  grunt.loadNpmTasks( "grunt-contrib-jshint" );

  grunt.registerTask( "default", [ "jshint" ]);
};
