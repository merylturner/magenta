'use strict';

var app = app || {};

(function(module){

    const sourceArticles = {};
    sourceArticles.all = [];

    sourceArticles.requestArticles = function(callback) {
        $.get('/')
        .then(data => sourceArticles.all = data, err => console.error(err))
        .then(callback);
    };

    // COMMENT: stretch goal: filtering by source or something else?
    // sourceArticles.with = attr => sourceArticles.all.filter( sourceArticle => sourceArticle[attr]);

    module.sourceArticles = sourceArticles;

}(app));