module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    connect:
      options:
        port: 8000
        livereload: true
        base: 'example'
      livereload:
        options:
          open: true
          middleware: (connect) ->
            [
              connect().use(
                '/bower_components'
                connect.static './bower_components' 
              )
              connect().use(
                '/dist'
                connect.static './dist' 
              )
              connect.static 'example'
            ]

    watch:
      options:
        livereload: true
      coffee:
        files: './lib/*.coffee'
        tasks: ['coffeelint', 'coffee']

    coffeelint:
      src: ['./lib/*.coffee']

    coffee:
      options:
        bare: true
      compile:
        files: [
          expand: true
          cwd: './lib'
          src: '*.coffee'
          dest: './dist'
          ext: '.js'
        ]

    clean: ['dist']

    uglify:
      dist:
        files:
          'dist/link-ping.min.js': 'dist/link-ping.js'

  grunt.registerTask 'default', ['coffeelint', 'coffee', 'connect', 'watch']
  grunt.registerTask 'publish', ['coffeelint', 'clean', 'coffee', 'uglify']