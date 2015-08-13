// Generated on 2015-08-11 using generator-angular 0.12.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/unit/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/unit/**/*.js'

module.exports = function (grunt) {
    var modRewrite = require('connect-modrewrite'),
        appConfig = {
            src: 'src',
            dist: 'dist'
        };

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn'
    });

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        waldenrainesdotcom: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= waldenrainesdotcom.src %>/app/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/unit/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: ['<%= waldenrainesdotcom.src %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer:server']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= waldenrainesdotcom.src %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= waldenrainesdotcom.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/src/styles',
                                connect.static('./src/styles')
                            ),
                            connect.static(appConfig.src)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.src)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= waldenrainesdotcom.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= waldenrainesdotcom.src %>/app/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/unit/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= waldenrainesdotcom.dist %>/{,*/}*',
                        '!<%= waldenrainesdotcom.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                options: {
                    map: true,
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            src: {
                src: ['<%= waldenrainesdotcom.src %>/index.html'],
                ignorePath:  /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath:  /\.\.\//,
                fileTypes:{
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            },
            sass: {
                src: ['<%= waldenrainesdotcom.src %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= waldenrainesdotcom.src %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= waldenrainesdotcom.src %>/images',
                javascriptsDir: '<%= waldenrainesdotcom.src %>/app',
                fontsDir: '<%= waldenrainesdotcom.src %>/styles/fonts',
                importPath: './bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    fontsPath: '<%= waldenrainesdotcom.dist %>/fonts',
                    generatedImagesDir: '<%= waldenrainesdotcom.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    fontsPath: 'bower_components/font-awesome/fonts/',
                    sourcemap: true
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= waldenrainesdotcom.dist %>/scripts/{,*/}*.js',
                    '<%= waldenrainesdotcom.dist %>/styles/{,*/}*.css',
                    '<%= waldenrainesdotcom.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= waldenrainesdotcom.dist %>/public/{,*/}*',
                    '<%= waldenrainesdotcom.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= waldenrainesdotcom.src %>/index.html',
            options: {
                dest: '<%= waldenrainesdotcom.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= waldenrainesdotcom.dist %>/{,*/}*.html'],
            css: ['<%= waldenrainesdotcom.dist %>/styles/{,*/}*.css'],
            js: ['<%= waldenrainesdotcom.dist %>/scripts/{,*/}*.js'],
            options: {
                assetsDirs: [
                    '<%= waldenrainesdotcom.dist %>',
                    '<%= waldenrainesdotcom.dist %>/images',
                    '<%= waldenrainesdotcom.dist %>/public',
                    '<%= waldenrainesdotcom.dist %>/styles'
                ],
                patterns: {
                    js: [
                        [/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images'],
                        [/(public\/[^''""]*\.*)/g, 'Replacing references to public files']
                    ]
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= waldenrainesdotcom.src %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= waldenrainesdotcom.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= waldenrainesdotcom.src %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= waldenrainesdotcom.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= waldenrainesdotcom.dist %>',
                    src: ['*.html'],
                    dest: '<%= waldenrainesdotcom.dist %>'
                }]
            }
        },

        ngtemplates: {
            dist: {
                options: {
                    module: 'waldenrainesdotcom',
                    htmlmin: '<%= htmlmin.dist.options %>',
                    usemin: 'scripts/scripts.js'
                },
                cwd: '<%= waldenrainesdotcom.src %>',
                src: 'app/views/{,*/}*.html',
                dest: '.tmp/templateCache.js'
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= waldenrainesdotcom.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= waldenrainesdotcom.src %>',
                    dest: '<%= waldenrainesdotcom.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'images/{,*/}*.{webp}',
                        'public/{,*/}*.*',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= waldenrainesdotcom.dist %>/images',
                    src: ['generated/*']
                }, {
                    cwd: '.',
                    expand: true,
                    flatten: true,
                    src: [
                        'bower_components/font-awesome/fonts/*.{eot,otf,svg,ttf,woff,woff2}',
                        'bower_components/bootstrap/fonts/*.{eot,otf,svg,ttf,woff,woff2}',
                        'bower_components/leaflet.locatecontrol/src/font/*.{eot,otf,svg,ttf,woff,woff2}'
                    ],
                    dest: '<%= waldenrainesdotcom.dist %>/fonts'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= waldenrainesdotcom.src %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'autoprefixer:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'wiredep',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
