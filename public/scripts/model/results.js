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
            })
            .then(Results.createChart);
    };
    Results.pieChart = false;

    Results.createChart = function () {
        var canvas = $('#results-chart').get(0);

        if (Results.pieChart !== false) {
            Results.pieChart.destroy();
        }
        Results.pieChart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['Left', 'Center Left', 'Center', 'Center Right', 'Right'],
                datasets: [{
                    label: 'User Votes',
                    data: [app.selectedObj.voteLeft, app.selectedObj.voteCenterLeft, app.selectedObj.voteCenter, app.selectedObj.voteCenterRight, app.selectedObj.voteRight],
                    backgroundColor: ['#0e51a7', '#6997d3', '#ad66d5', '#ff7d73', '#ff1300']
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Results'
                },
                responsive: false,
                maintainAspectRatio: true,
            }

        });
    }

    module.Results = Results;
}(app));
