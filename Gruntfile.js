module.exports = function(grunt) {


      grunt.initConfig({

        jshint: {
            files: ['Gruntfile.js', './src/**/*.js', './spec/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        uglify: {
            // static_mappings: {
            // files: [
            // {src: 'src/js/app.js', dest: 'build/js/app.min.js'},
            // ],
            // },
            dynamic_mappings: {
                files: [
                    {
                    expand: true,     // Enable dynamic expansion.
                    cwd: './src/js/',      // Src matches are relative to this path.
                    src: ['**/*.js'], // Actual pattern(s) to match.
                    dest: 'build/js/',   // Destination path prefix.
                    ext: '.min.js',   // Dest filepaths will have this extension.
                    extDot: 'first'   // Extensions in filenames begin after the first dot
                    },
                ],
            },
        },

        jasmine : {                     /////////////// TO DO GET JASMIN WORKING
            src : './src/**/*.js',
            options : {
                specs : './spec/**/*.js'
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // A very basic default task for testing grunt
    grunt.registerTask('hello', 'Log some stuff.', function() {
        grunt.log.write('Hello to you too...').ok();
    });

    // Default task(s).
    grunt.registerTask('default', [
        'uglify',
        'jshint' //add jasmin
    ]);

};