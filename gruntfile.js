/**
 * Created by Jamey McElveen on 9/4/16.
 */

const buble = require('rollup-plugin-buble');

module.exports = function(grunt) {

  ////////////////////////////////////////
  // region INIT CONFIG
  grunt.initConfig({

    ////////////////////////////////////////
    // region PUBLISH
    // Updates the version in package.json and the version tag
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false
      }
    },
    exec: {
      publish_npm: {
        command: 'npm publish',
        stdout: true
      }
    },
    // endregion PUBLISH
    ////////////////////////////////////////

    ////////////////////////////////////////
    // region BUILD
    // validate scripts
    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js'],
      options: {
        asi: true,
        esversion: 6,
        globals: {
          jQuery: true
        }
      }
    },
    // watch files for changes
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    // rollup options
    rollup: {
      options: {
        moduleName: 'JSBuild.Core',
        format: 'iife',
        plugins: [buble()]
      },
      files: {
        'dest': 'dist/jsbuild.core.js', 'src': 'lib/main.js', // Only one source file is permitted
      },
    },
    // endregion BUILD
    ////////////////////////////////////////
  });
  // endregion INIT CONFIG
  ////////////////////////////////////////

  ////////////////////////////////////////
  // region INSTALL TASK
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-exec');
  // endregion INSTALL TASK
  ////////////////////////////////////////

  ////////////////////////////////////////
  // region REGISTER TASK
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', [
    //'jshint',
    'rollup']);
  grunt.registerTask('publish_npm', ['exec:publish_npm']);
  grunt.registerTask('deploy', ['build', 'bump'], function() {
    console.log('deploy');
  });
  grunt.registerTask('publish', ['publish_npm'], function() {
    console.log('publish');
  });
  // endregion REGISTER TASK
  ////////////////////////////////////////

};


/*
 git config --global user.email "you@example.com"
 "2npm": "grunt publish",
 "2bower": "bower register vueb git://github.com/jameymcelveen/vueb.git",
 */
