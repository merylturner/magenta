'use strict';

var app = app || {};

(function (module) {
    const articleController = {};

    let sourceToId = {
        'the-huffington-post': 1,
        'the-new-york-times': 2,
        'usa-today': 3,
        'daily-mail': 4,
        'the-wall-street-journal': 5
    };

    $('#submit-button').on('click', function (event) {
        event.preventDefault();
        let selection = $('input[type="radio"]:checked').val();
        if (selection) {
            app.selectedObj = app.Article.randomArticle;
            app.selectedObj.selection = selection;
            app.selectedObj.shown = true;
            app.Article.filtered = app.Article.filtered.filter(t => t.shown === false);

            app.selectedObj.voteLeft = 0;
            app.selectedObj.voteCenterLeft = 0;
            app.selectedObj.voteCenter = 0;
            app.selectedObj.voteCenterRight = 0;
            app.selectedObj.voteRight = 0;

            if (app.selectedObj.hasOwnProperty(selection)) {
                app.selectedObj[selection] += 1;
            }
            app.selectedObj.sourceId = sourceToId[app.selectedObj.source];
            app.selectedObj.insertRecord(() => app.Results.fetchAll(app.resultsController.addProperties));
        }
    });

    module.articleController = articleController;
}(app));
