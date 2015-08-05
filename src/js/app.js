// For any third party dependencies, like jQuery, place them in the lib folder.

requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../js/lib',
        data: '../js/data',
        jquery: '../js/lib/jquery-1.11.3',
        pubsub: '../js/lib/pubsub'

    }
});


require(['setup'], function (setup) {

  setup.init();

});
