'use strict';

var app = app || {};

(function(module){
    const resultsView = {};

    const render = function (obj) {
        let template = Handlebars.compile($('#results-template').text());  // eslint-disable-line

        return template(obj);
    };

    resultsView.init = function () {
        $('main > section').hide();
        $('#results').empty().show();
        $('#canvas').show();

        $('#results').append(render(app.selectedObj));
        $('#results-options').show();
        $('#divs').show();
        return app.selectedObj;
    };



    module.resultsView = resultsView;
}(app));