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
			.then(Article.loadArticles)
			.then(callback);
	};

	function Article(sourceArticleData) {
		Object.keys(sourceArticleData).forEach(key => this[key] = sourceArticleData[key]);
	}

	Article.all = [];

	Article.loadArticles = function() {
		Article.all = sourceArticles.all.map(obj => new Article(obj))
			.reduce((titles, title) => {
				if (titles.indexOf(title) === -1) titles.push(title);
				return titles;
			}, [])
			.filter(t => t.shown === false);

		return Article.all;
	};

	Article.selectRandom = function (array) {
		let randomNum = Math.floor(Math.random() * (array.length));
		return array[randomNum];
	};

	module.sourceArticles = sourceArticles;
	module.Article = Article;
}(app));
