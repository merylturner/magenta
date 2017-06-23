'use strict';

var app = app || {};

(function(module){
    const aboutView = {};

    aboutView.init = function () {
        $('main > section').hide();
        $('#about').fadeIn(750);
    };


    module.aboutView = aboutView;
}(app));