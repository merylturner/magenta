'use strict';

var app = app || {};

(function (module) {

	const sourceArticles = {};
	sourceArticles.all = [];
    console.log(sourceArticles.all);

	sourceArticles.requestArticles = function (callback) {
		console.log('requestArticles is listening');
        $.get('/news')
            // .then(data => sourceArticles.all = data, err => console.error(err))
            .then(data => console.log(data), err => console.error(err))
            .then(callback);
	};


    // COMMENT: stretch goal: filtering by source or something else?
    // sourceArticles.with = attr => sourceArticles.all.filter( sourceArticle => sourceArticle[attr]);
    sourceArticles.requestArticles();
	module.sourceArticles = sourceArticles;

}(app));