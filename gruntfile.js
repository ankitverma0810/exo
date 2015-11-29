module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Copy web assets from bower_components to more convenient directories.
        copy: {
            main: {
                files: [
                    // Vendor scripts.
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'js/vendors/jquery/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/underscore/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'js/vendors/underscore/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/backbone/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'js/vendors/backbone/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
                        src: ['**/*.js'],
                        dest: 'js/vendors/bootstrap-sass/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/requirejs/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'js/vendors/requirejs/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/requirejs-text/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'js/vendors/requirejs-text/'
                    },

                    // Fonts.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['bootstrap-sass/assets/fonts/**'],
                        dest: 'fonts/bootstrap/'
                    },

                    // Stylesheets
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
                        src: ['**/*.scss'],
                        dest: 'scss/'
                    }
                ]
            },
        },

        requirejs: {
			compile: {
				options: {
					baseUrl: "js/dev",
					mainConfigFile: "js/dev/config.js",
					name: "main",
					out: "js/app.min.js",
					optimize: "none" //for production do uglify or remove this line
				}
			}
		},

		compass: {
			dev: {
				options: {
					config: 'config.rb'
				}
			}
		},

        jshint: {
            // define the files to lint
            files: ['js/dev/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

		watch: {
			options: { livereload: true },
			scripts: {
				files: ['js/dev/**'],
				tasks: ['requirejs']
			},
			sass: {
				files: ['scss/*.scss'],
				tasks: ['compass:dev']
			}
		}
	});
	grunt.registerTask('default', 'watch');
}