'use strict';

var app = app || {};

(function(module){
    const articleView = {};

    const render = function(title) {
        let template = Handlebars.compile($('#template').text()); // eslint-disable-line

        return template(title);
    };

    articleView.init = function() {
        let randArticleObj = app.articleController.randomArticle();
        // let headline = randArticleObj.title;
        // console.log(headline);

        $('main > section').hide();
        $('#headline').show();
        $('#headline').append(render(randArticleObj));
    };

    module.articleView = articleView;
}(app));