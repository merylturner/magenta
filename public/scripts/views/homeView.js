'use strict';

var app = app || {};

(function (module) {
    const homeView = {};

    homeView.init = function () {
        $('body').scrollTop(0);
        $('main > section').hide();
        $('#home').show();
        $('#results-page').hide();

        homeView.showTeasers();
    };

    homeView.showTeasers = function () {
        $('.instructions').hide();

        $('.see-instructions').on('click', function () {
            event.preventDefault();
            $(this).toggleClass('hidden');
            $(this).parent().find($('.instructions')).show();
            $(this).hide();
        })
    }

    module.homeView = homeView;
}(app));