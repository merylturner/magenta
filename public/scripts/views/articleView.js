'use strict';

var app = app || {};

(function (module) {
    const articleView = {};
    let selectedObj = {};

    const render = function (title) {
        let template = Handlebars.compile($('#template').text()); // eslint-disable-line

        return template(title);
    };

    articleView.init = function () {
        if (app.Article.filtered.length === 0) {
            app.Article.all = [];
            app.Article.requestArticles();
        } else {
            app.Article.selectRandomArticle();
        }
        $('body').scrollTop(0);
        $('input[name=vote]').prop('checked',false);
        $('main > section').hide();
        $('footer').hide();
        $('#headline').empty().show();
        $('#headline').append(render(app.Article.randomArticle));
        $('#vote').show();
        $('#political-icons').show();
        $('#results-page').hide();
    };

    module.selectedObj = selectedObj;
    module.articleView = articleView;
}(app));
