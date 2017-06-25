'use strict';

var app = app || {};

(function (module) {
    const articleController = {};

    let sourceToId = {
        'the-huffington-post': 1,
        'the-new-york-times': 2,
        'usa-today': 3,
        'daily-mail': 4,
        'breitbart-news': 5
    };

    $('#submit-button').on('click', function (event) {
        event.preventDefault();
        app.selectedObj = app.Article.randomArticle;
        app.selectedObj.shown = true;
        app.Article.filtered = app.Article.filtered.filter(t => t.shown === false);
        let selection = $('input[type="radio"]:checked').val();
        app.selectedObj.selection = selection;
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
        
    });




    module.articleController = articleController;
}(app));
