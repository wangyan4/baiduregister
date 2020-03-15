module.exports=function(grunt){
  grunt.initConfig({
    clean:{
      src:"dist/"
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
        preserveLineBreaks: false
      },
      files: {
        src: './index.html',
        dest: 'dist/index.html'
      }
    },
    cssmin: {
      "dist/index.css":"index.css"
    },
    uglify: {
      "dist/index.js":"index.js"
    },
    imagemin: {                               
      files: {
        expand: true,
        src: ['images/*.{png,jpg,gif}'],
        dest: 'dist/images'
      }
    },
    copy: {
      html: {
          src:'./index.html',
          dest:'./dist/index.html'
      }
    },
    useminPrepare: {
      html:'index.html',
      options:{
          dest:'dist'
      }
    },
    usemin: {
      html:['dist/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default',['clean','copy:html', 'useminPrepare', 'uglify', 'usemin', 'cssmin', 'htmlmin']);
}