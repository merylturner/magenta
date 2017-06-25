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
    let retrievedSources = 0;

    Article.sources = [`the-new-york-times`, `the-huffington-post`, `usa-today`, `daily-mail`, `breitbart-news`];

    Article.addProps = data => {
        Article.sourceData = JSON.parse(data).articles;
        Article.sourceData.forEach(obj => obj.source = JSON.parse(data).source);
        Article.sourceData.forEach(obj => obj.shown = false);
        Article.sourceData.forEach(articleObj => Article.all.push(articleObj));
    };

    Article.requestArticles = () => {
        Article.sources.forEach((source) => {
            $.get(`/${source}`)
                .then(function(data) {Article.addProps(data)}, err => console.error(err))
                .then(() => {
                    retrievedSources++;
                    if (retrievedSources === 5) {
                        Article.loadArticles(Article.selectRandomArticle);
                    }
                })
                .then(app.articleView.init)
        })
    };

    Article.loadArticles = function (callback) {
        console.log('loadArticles is running');
        Article.filtered = Article.all.map(obj => new Article(obj))
            .reduce((titles, title) => {
                if (titles.indexOf(title) === -1) titles.push(title);
                return titles;
            }, [])
            .filter(t => t.shown === false);
        callback();
    };
    
    Article.selectRandomArticle = function () {
        let randomNum = Math.floor(Math.random() * (Article.filtered.length));
        Article.randomArticle = Article.filtered[randomNum];
        console.log('randomarticle is', Article.randomArticle);
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