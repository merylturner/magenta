'use strict';

var app = app || {};

(function (module) {

	let sourceArticles = {};
	sourceArticles.all = [];

	sourceArticles.requestArticles = function (callback) {
        $.get('/news')
            .then(data => {
				sourceArticles.all = (JSON.parse(data).articles);
				sourceArticles.all.forEach(obj => obj.source = JSON.parse(data).source);
				sourceArticles.all.forEach(obj => obj.shown = false);
			}, err => console.error(err))
            .then(callback);
	};


    // COMMENT: stretch goal: filtering by source or something else?
    // sourceArticles.with = attr => sourceArticles.all.filter( sourceArticle => sourceArticle[attr]);
    sourceArticles.requestArticles(loadArticles);


	function Article(sourceArticleData) {
		Object.keys(sourceArticleData).forEach(key => this[key] = sourceArticleData[key]);
	}

	Article.all = [];

	function loadArticles() {
		Article.all = sourceArticles.all.map(obj => new Article(obj))
		.reduce((titles, title) => {
			if (titles.indexOf(title) === -1) titles.push(title);
			return titles;
		}, [])
		.filter(t => t.shown === false);

		console.log('Article.all is', Article.all);
	}


	module.sourceArticles = sourceArticles;

}(app));
