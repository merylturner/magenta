'use strict';

var app = app || {};

(function(module){
    const aboutView = {};

    aboutView.init = function () {
        $('body').scrollTop(0);
        $('main > section').hide();
        $('#results-page').hide();
        $('#about').fadeIn(750);
    };

    module.aboutView = aboutView;
}(app));