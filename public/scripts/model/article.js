'use strict';

var app = app || {};

(function (module) {
    function Article(sourceArticleData) {
        Object.keys(sourceArticleData).forEach(key => this[key] = sourceArticleData[key]);
    }

    Article.all = [];
    Article.filtered = [];
    Article.sourceData = [];
    Article.randomArticle = {};

    Article.sources = [`the-new-york-times`, `the-huffington-post`, `usa-today`, `daily-mail`, `the-wall-street-journal`];

    Article.addProps = data => {
        Article.sourceData = JSON.parse(data).articles;
        Article.sourceData.forEach(obj => obj.source = JSON.parse(data).source);
        Article.sourceData.forEach(obj => obj.shown = false);
        Article.sourceData.forEach(articleObj => Article.all.push(articleObj));
    };

    Article.requestArticles = () => {
        if (Article.filtered.length === 0) {
            let retrievedSources = 0;
            Article.sources.forEach((source) => {
                $.get(`/${source}`)
                    .then(function (data) { Article.addProps(data) }, err => console.error(err))
                    .then(() => {
                        retrievedSources++;
                        if (retrievedSources === 5) {
                            Article.loadArticles();
                            app.articleView.init();
                        }
                    })
            })
        }
    };

    Article.loadArticles = function () {
        if (Article.filtered.length < 1) {
            Article.filtered = Article.all.map(obj => new Article(obj));
        }
    };

    Article.selectRandomArticle = function () {
        let randomNum = Math.floor(Math.random() * (Article.filtered.length));
        Article.randomArticle = Article.filtered[randomNum];
    };

    Article.prototype.insertRecord = function (callback) {
        $.post('/articles', {
            title: this.title,
            description: this.description,
            url: this.url,
            sourceId: this.sourceId,
            author: this.author,
            urlToImage: this.urlToImage,
            publishedAt: this.publishedAt,
            voteLeft: this.voteLeft,
            voteCenterLeft: this.voteCenterLeft,
            voteCenter: this.voteCenter,
            voteCenterRight: this.voteCenterRight,
            voteRight: this.voteRight
        })
            .then(callback);
    };

    module.Article = Article;
}(app));