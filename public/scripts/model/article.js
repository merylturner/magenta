'use strict';

var app = app || {};

(function (module) {

	let sourceArticles = {};
	sourceArticles.all = [];

	sourceArticles.requestArticles = function (callback) {
		console.log('requestArticles is listening');
        $.get('/news')
            .then(data => sourceArticles.all = (JSON.parse(data).articles), err => console.error(err))
            // .then(data => console.log(data), err => console.error(err))
            .then(callback);
	};


    // COMMENT: stretch goal: filtering by source or something else?
    // sourceArticles.with = attr => sourceArticles.all.filter( sourceArticle => sourceArticle[attr]);
    sourceArticles.requestArticles(loadArticles);
		

		function Article (sourceArticleData) {
			Object.keys(sourceArticleData).forEach(key => this[key] = sourceArticleData[key]);
		}

		function loadArticles() {
			Article.all = sourceArticles.all.map(obj => new Article(obj));
			console.log('sourceArticles.all is', sourceArticles.all, 'Article.all is', Article.all);
		}

	module.sourceArticles = sourceArticles;

}(app));
