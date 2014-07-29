module.exports = function(grunt){
    grunt.initConfig({
        ssi: {
            default: {
                options: {
                    cacheDir: '',
                    baseDir: 'adminLab/modules/*/'      //include指令的相对目录
                },
                files: [
                    {
                        expand: true,
                        cwd: 'adminLab/modules/',
                        src: ['**/*.shtml'],
                        dest: 'adminLab/modules/',
                        ext:'.html'
                    },
                    {
                        expand: true,
                        cwd: 'service-manager/modules/',
                        src: ['**/*.shtml'],
                        dest: 'service-manager/modules/',
                        ext:'.html'
                    },
                    {
                        expand: true,
                        cwd: 'service-manager-for-kendo/modules/',
                        src: ['**/*.shtml'],
                        dest: 'service-manager-for-kendo/modules/',
                        ext:'.html'
                    }
                ]
            }
        }
        ,
        watch:{
            options: {
                spawn: false
            },
            shtml: {
                files: [ '**/*.shtml'],
                tasks: [ 'ssi']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-ssi');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',['ssi:default']);
};
