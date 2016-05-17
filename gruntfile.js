module.exports = function (grunt){
    var setting = {
        src : {
            js : 'browser/js/app.js',
            css : 'browser/css/**/*.css',
            lib : 'browser/lib/**/*.js'
        },
        dst : {
            js : 'pub/release/js/com.js',
            css : 'pub/release/css/com.css',
            lib : 'pub/release/js/lib.js'
        }
    }
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        browserify : {
            js : {
                src : [setting.src.js],
                dest : setting.dst.js,
                options : {
                    
                    transform: [
                        ["babelify",{presets : ['es2015']}]
                    ],
                    browserifyOptions : {
                        debug:true,
                        fullPaths : false
                    }
                }
            }
        },
        concat : {
            css : {
                src : [setting.src.css],
                dest : setting.dst.css
            },
            lib : {
                src : [setting.src.lib],
                dest : setting.dst.lib
            }
        },
        cssmin : {
            css : {
                files : {
                    '<%=setting.dst.css%>' : [setting.dst.css]   
                }
            }
        },
        uglify : {
            lib : {
                files : {
                    '<%=setting.dst.lib%>' : [setting.dst.lib]    
                }
            }
        },
        watch : {
            lib : {
                files : [setting.src.lib],
                tasks : ['concat:lib','uglify:lib']
            },
            js : {
                files : [setting.src.js],
                tasks : ['browserify:js']
            },
            css : {
                files : [setting.src.css],
                tasks : ['concat:css','cssmin:css']
            }
        }
    }
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig(config);
    grunt.config('setting', setting);

    grunt.registerTask('default',['browserify','concat','cssmin','uglify','watch'])
}