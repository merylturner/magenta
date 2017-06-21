'use strict';

var app = app || {};

(function(module) {
	const articleController = {};

	articleController.randomArticle = function() {
		let nytArticle = app.Article.selectRandom(app.Article.loadNytArticles());
		let huffpoArticle = app.Article.selectRandom(app.Article.loadHuffpoArticles());
		let consolidatedArray = [huffpoArticle, nytArticle];
		console.log(consolidatedArray);
		return app.Article.selectRandom(consolidatedArray);
	};

	// COMMENT: stretch goal: filtering by source or something else?
	// sourceArticles.with = attr => sourceArticles.all.filter( sourceArticle => sourceArticle[attr]);
	app.nytArticles.requestArticles();
	app.huffpoArticles.requestArticles(app.articleView.init);


	module.articleController = articleController;
}(app));