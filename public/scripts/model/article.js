'use strict';

var app = app || {};

(function (module) {

	const sourceArticles = {};
	// sourceArticles.all = [];

	sourceArticles.requestArticles = function (callback) {
		console.log('requestArticles is listening');
        $.get('/news')
            .then(data => console.log(JSON.parse(data).articles), err => console.error(err))
            // .then(data => console.log(data), err => console.error(err))
            .then(callback);
	};


    // COMMENT: stretch goal: filtering by source or something else?
    // sourceArticles.with = attr => sourceArticles.all.filter( sourceArticle => sourceArticle[attr]);
    sourceArticles.requestArticles();
		function Article (sourceArticleData) {
			Object.keys(sourceArticleData.articles).forEach(key => this[key] = sourceArticleData[key]);
			console.log(sourceArticleData.articles);
		}
		Article.all = [];
		// Article.all = sourceArticles.all.map(obj => new Article (obj));
		console.log(Article.all);


	module.sourceArticles = sourceArticles;

}(app));
