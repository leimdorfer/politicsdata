// For any third party dependencies, like jQuery, place them in the lib folder.

requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../js/lib',
        data: '../js/data'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.

require(['setup'], function (setup) {

  setup.init();

});
