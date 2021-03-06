"use strict";

module.exports = function(grunt) {
    
    // Configuration
    grunt.initConfig({
        
        name: "seeq",
        mainFile: "seeq",
        
        srcDir: "src",
        srcFiles: "**/*.js",
        src: "<%= srcDir %>/<%= srcFiles %>",
        
        destDir: "dist",
        
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            gruntfile: {
                src: "Gruntfile.js"
            },
            src: {
                src: ["<%= src %>"]
            },
            test: {
                src: ["test/*.js"]
            }
        },
        
        
        jsdoc: {
            dist: {
                src: ["<%= src %>", "README.md"],
                options: {
                    destination: "doc",
                    template: "node_modules/ink-docstrap/template",
                    configure: "jsdoc-conf.json"
                }
            }
        },
        
        
        mochacli: {
            all: {
                options: {
                    filesRaw: ["test/*.js", "test/format/*.js", "test/resource/**/*.js"]
                }
            }
        },
        
        
        bump: {
            options: {
                commitMessage: "Release version %VERSION%",
                commitFiles: ["-a"],
                tagName: "%VERSION%",
                tagMessage: "Version %VERSION%",
                pushTo: "origin"
            }
        }
        
    });
    
    // Plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jsdoc");
    grunt.loadNpmTasks("grunt-mocha-cli");
    grunt.loadNpmTasks("grunt-bump");
    
    // Tasks
    
    grunt.registerTask("doc", ["jsdoc"]);
    grunt.registerTask("test", ["mochacli"]);
    grunt.registerTask("default", ["jshint", "mochacli"]);
    grunt.registerTask("all", ["default", "doc"]);
    
    grunt.registerTask("release", ["bump"]);
    grunt.registerTask("release-minor", ["bump:minor"]);
    grunt.registerTask("release-major", ["bump:major"]);
};
