'use strict';

var app = app || {};

(function (module) {
    function Results(resultsData) {
        Object.keys(resultsData).forEach(key => this[key] = resultsData[key]);
    }

    Results.all = [];

    Results.loadAll = rows => {
        Results.all = rows.map(obj => new Results(obj));
    };

    Results.fetchAll = callback => {
        $.get('/sources')
            .then(
            results => {
                Results.loadAll(results);
                callback();
            }
            );
    };

    module.Results = Results;
}(app));