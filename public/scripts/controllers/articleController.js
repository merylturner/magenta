'use strict';

var app = app || {};

(function (module) {
    const articleController = {};

    $('#play-again-button').on('click', app.Article.selectRandomArticle);

    module.articleController = articleController;
}(app));
