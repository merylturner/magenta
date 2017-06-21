'use strict';

var app = app || {};

(function(module) {
	const articleController = {};

	articleController.randomArticle = function() {
		return app.Article.selectRandom(app.Article.loadArticles());
	};
	
	// COMMENT: stretch goal: filtering by source or something else?
	// sourceArticles.with = attr => sourceArticles.all.filter( sourceArticle => sourceArticle[attr]);
	app.sourceArticles.requestArticles(app.articleView.init);


	module.articleController = articleController;
}(app));