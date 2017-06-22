'use strict';

var app = app || {};

(function(module) {
	const articleController = {};

	articleController.randomArticle = function() {
		let nytArticle = app.Article.selectRandom(app.Article.loadNytArticles());
		let huffpoArticle = app.Article.selectRandom(app.Article.loadHuffpoArticles());
		let consolidatedArray = [huffpoArticle, nytArticle];
		return app.Article.selectRandom(consolidatedArray);
	};

	articleController.init = function(ctx, next) {
		console.log('inside articleController.init');
		app.nytArticles.requestArticles(app.articleView.init);
		app.huffpoArticles.requestArticles(app.articleView.init);
		// next(ctx);
	};



	module.articleController = articleController;
}(app));