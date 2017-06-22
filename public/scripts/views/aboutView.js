'use strict';

var app = app || {};

(function(module){
    const aboutView = {};

    aboutView.init = function () {
        $('main > section').hide();
        $('#about').show();
    };


    module.aboutView = aboutView;
}(app));