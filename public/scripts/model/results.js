'use strict';

var app = app || {};

(function(module){
    function Results(resultsData) {
        Object.keys(resultsData).forEach( key => this[key] = resultsData[key] );
    }

    Results.all = [];

    Results.loadAll = rows => {
        // rows.sort((a,b) => (new Date(b.publishedAt)) - (new Date(a.publishedAt)));
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

    // COMMENT: Do we want to use this?
    // Results.truncateTable = callback => {
    //     $.ajax({
    //         url: '/articles',
    //         method: 'DELETE',
    //     })
    //         .then(console.log)
    //         .then(callback);
    // };
    
    

    // COMMENT: Do we need a deleteRecord method?
    // Results.prototype.deleteRecord = function(callback) {
    //     $.ajax({
    //         url: ''
    //     })
    // }
    // COMMENT: Do we need an updateRecord method?
    // Results.prototype.updateRecord = function(callback) {}

    module.Results = Results;
}(app));