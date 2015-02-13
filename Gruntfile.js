module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      dist: ['frontend/dist']
    },

    copy: {
      dist: {
        files: [
          {expand: true, cwd:'frontend/components/fontawesome/', src: ['fonts/**/*'], dest: 'frontend/dist/'}
        ]
      }
    },

    sass: {
      dist: {
        files: {
          'frontend/dist/app.css': 'frontend/sass/app.scss'
        },
        options: {
          cacheLocation: 'frontend/sass/.sass-cache'
        }
      }
    },

    browserify: {
      dist: {
        files: {
          'frontend/dist/app.js': ['frontend/js/**/*.js']
        },
        options: {
          transform: []
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'frontend/dist/app.min.js': ['frontend/dist/app.js']
        }
      }
    },

    jshint: {
      src: {
        options: {
          '-W055': true,
        },
        files: {
          src: ['frontend/js/**/*.js']
        }
      }
    },

    simplemocha: {
      options: {
      },
      all: {
        src: ['tests/**/*.js']
      }
    },

    watch: {
      js: {
        files: ['frontend/js/**/*.js'],
        tasks: ['build:js'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      sass: {
        files: ['frontend/sass/**/*.scss'],
        tasks: ['build:sass'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['jshint:src', 'simplemocha']);

  grunt.registerTask('build:setup', ['clean:dist', 'copy']);
  grunt.registerTask('build:js', ['browserify', 'uglify:dist']);
  grunt.registerTask('build:sass', ['sass']);
  grunt.registerTask('build', [ 'build:setup', 'build:js', 'build:sass']);

};
