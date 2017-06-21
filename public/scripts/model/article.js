'use strict';

var app = app || {};

(function (module) {

	let huffpoArticles = {};
	huffpoArticles.all = [];
	let nytArticles = {};
	nytArticles.all = [];


	huffpoArticles.requestArticles = function (callback) {
		$.get('/huffpo')
			.then(data => {
				huffpoArticles.all = (JSON.parse(data).articles);
				huffpoArticles.all.forEach(obj => obj.source = JSON.parse(data).source);
				huffpoArticles.all.forEach(obj => obj.shown = false);
			}, err => console.error(err))
			.then(Article.loadHuffpoArticles)
			.then(callback);
	};

	nytArticles.requestArticles = function (callback) {
		$.get('/nyt')
			.then(data => {
				nytArticles.all = (JSON.parse(data).articles);
				nytArticles.all.forEach(obj => obj.source = JSON.parse(data).source);
				nytArticles.all.forEach(obj => obj.shown = false);
			}, err => console.error(err))
			.then(Article.loadNytArticles)
			.then(callback);
	};

	function Article(sourceArticleData) {
		Object.keys(sourceArticleData).forEach(key => this[key] = sourceArticleData[key]);
	}

	Article.huffpo = [];
	Article.nyt = [];
	

	Article.loadHuffpoArticles = function() {
		Article.huffpo = huffpoArticles.all.map(obj => new Article(obj))
			.reduce((titles, title) => {
				if (titles.indexOf(title) === -1) titles.push(title);
				return titles;
			}, [])
			.filter(t => t.shown === false);
		return Article.huffpo;
	};

	Article.loadNytArticles = function() {
		Article.nyt = nytArticles.all.map(obj => new Article(obj))
			.reduce((titles, title) => {
				if (titles.indexOf(title) === -1) titles.push(title);
				return titles;
			}, [])
			.filter(t => t.shown === false);
		return Article.nyt;
	};

	Article.selectRandom = function (array) {
		let randomNum = Math.floor(Math.random() * (array.length));
		return array[randomNum];
	};

	module.nytArticles = nytArticles;
	module.huffpoArticles = huffpoArticles;
	module.Article = Article;
}(app));
