'use strict';

var app = app || {};

(function(module){
    function Article(sourceData) {
        Object.keys(sourceData).forEach( key => this[key] = sourceData[key] );
    }

    Article.all = [];

    Article.loadAll = rows => {
        rows.sort((a,b) => (new Date(b.publishedAt)) - (new Date(a.publishedAt)));
        Article.all = rows.map(obj => new Article(obj));
    };

    Article.fetchAll = callback => {
        $.get('/articles')
        .then(
            results => {
                Article.loadAll(results);
                callback();
            }
        );
    };

    // COMMENT: Do we want to use this?
    Article.truncateTable = callback => {
        $.ajax({
            url: '/articles',
            method: 'DELETE',
        })
            .then(console.log)
            .then(callback);
    };
    
    

    // COMMENT: Do we need a deleteRecord method?
    // Article.prototype.deleteRecord = function(callback) {
    //     $.ajax({
    //         url: ''
    //     })
    // }
    // COMMENT: Do we need an updateRecord method?
    // Article.prototype.updateRecord = function(callback) {}

    // module.Article = Article;
}(app));