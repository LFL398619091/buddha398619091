/*
 * grunt-buddha-jameslin
 * 
 *
 * Copyright (c) 2016 jameslin
 * Licensed under the MIT license.
 */

'use strict';

var path = require("path");

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddha_jameslin', 'jameslin\'s first grunt plugin', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      who: 'buddha',
      commentSymbol: '//'
    });

    var textExitRegexMap = {
      "buddha":/o8888888o/,
      "alpaca":/████━████ ┃/
    };

    var who = options.who,
        commentSymbol = options.commentSymbol,
        commentFilePathMap = {
            "buddha":"assets/buddha.txt",
            "alpaca":"assets/alpaca.txt"
        },    
        commentFiltPath = path.join(__dirname,commentFilePathMap[who]),
        commentContent = grunt.file.read(commentFiltPath),  
        lineCommentArray =  commentContent.split(grunt.util.normalizelf('\n'));

    lineCommentArray.forEach(function(line,index,arr){
        arr[index] = commentSymbol + line;
    });
    commentContent = lineCommentArray.join(grunt.util.normalizelf('\n'));
    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        var originalFileContent = grunt.file.read(filepath),
            newFileContent = commentContent + grunt.util.normalizelf("\n") +
                             originalFileContent;
        if (textExitRegexMap[who].test(originalFileContent)) {
           return;
        }
        grunt.file.write(filepath,newFileContent);                     
      });

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
