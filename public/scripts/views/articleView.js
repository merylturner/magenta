'use strict';

var app = app || {};

(function (module) {
    const articleView = {};
    let selectedObj = {};
    let sourceToId = {
        'the-huffington-post': 1,
        'the-new-york-times': 2,
        'usa-today': 3,
        'daily-mail': 4,
        'breitbart-news': 5
    };

    const render = function (title) {
        let template = Handlebars.compile($('#template').text()); // eslint-disable-line

        return template(title);
    };

    articleView.init = function () {
        $('main > section').hide();
        $('footer').hide();
        $('#headline').empty().show();
        $('#headline').append(render(app.Article.randomArticle));
        $('#vote').show();
        $('#political-icons').show();
        $('#results-page').hide();

        selectedObj = app.Article.randomArticle;
    };

    $('#play-button').on('click', function() {
        console.log('loadArticles called by play button');
        app.Article.loadArticles(app.Article.selectRandomArticle);
    });

    $('#submit-button').on('click', function (event) {
        event.preventDefault();

        selectedObj.shown = true;
        app.Article.filtered = app.Article.filtered.filter(t => t.shown === false);
        
        let selection = $('input[type="radio"]:checked').val();
        selectedObj.selection = selection;
        selectedObj.voteLeft = 0;
        selectedObj.voteCenterLeft = 0;
        selectedObj.voteCenter = 0;
        selectedObj.voteCenterRight = 0;
        selectedObj.voteRight = 0;

        if (selectedObj.hasOwnProperty(selection)) {
            selectedObj[selection] += 1;
        }
        selectedObj.sourceId = sourceToId[selectedObj.source];
        selectedObj.insertRecord(() => app.Results.fetchAll(app.resultsController.addProperties));
        module.selectedObj = selectedObj;
    });

    module.articleView = articleView;
}(app));
