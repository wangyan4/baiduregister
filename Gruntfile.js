module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      src: "dist/"
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
        removeComments: true
      },
      files: {
        src: './dist/index.html',
        dest: 'dist/index.html'
      }
    },
    usemin: {
      html: ['./dist/index.html']
    },
    uglify: {
      'dist/index.min.js': ['index.js']
    },
    cssmin: {
      'dist/index.min.css': ['index.css']
    },
    copy: {
      html: {
        src: './index.html',
        dest: 'dist/index.html'
      }
    },
    imagemin: {
      dist: {
          options: {
              optimizationLevel: 1
          },
          files: [{
              expand: true,
              cwd: 'images/',
              src: ['**/*.{png,jpg,jpeg,gif}'],
              dest: 'dist/images/'
          }]
      }
  },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', ['clean', 'copy', 'uglify','usemin', 'cssmin', 'htmlmin']);
}