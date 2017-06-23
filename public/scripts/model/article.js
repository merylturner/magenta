// 'use strict';
//
// var app = app || {};
//
// (function (module) {
//   console.log("in article IIFE", app);
//   function Article(sourceArticleData) {
//       Object.keys(sourceArticleData).forEach(key => this[key] = sourceArticleData[key]);
//   }
//
//   Article.all = [];
//   Article.filtered = [];
//
// 	 Article.sources = [`the-new-york-times`,`the-huffington-post`,`usa-today`,`daily-mail`,`breitbart-news`];
//
// 	Article.requestArticles = callback => {
//     console.log("in requestArticles", Article.requestArticles);
//     Article.sources.forEach((source, i) => {
//       $.get(`/${source}`)
// 			.then(data => {
//         console.log('called source');
// 				Article.all.push(JSON.parse(data).articles);
// 				Article.all.forEach(obj => obj.source = JSON.parse(data).source);
// 				Article.all.forEach(obj => obj.shown = false);
// 			}, err => console.error(err))
// 			.then( () => {
//         console.log(i);
//         if (i === Article.sources.length - 1) {
//             Article.loadArticles('REALLLLLLY???');
//         }
//       })
// 			.then(callback);
//     })
//   };
//
//     Article.loadArticles = function (text) {
//       console.log(text);
//         Article.filtered = Article.all.map(obj => new Article(obj))
//             .reduce((titles, title) => {
//                 if (titles.indexOf(title) === -1) titles.push(title);
//                 return titles;
//             }, [])
//   			   .filter(t => t.shown === false);
//           //  console.log("article .filtered is ", Article.filtered);
//         return Article.filtered;
//     };
//
//     Article.prototype.insertRecord = function (callback) {
//         $.post('/articles', {
//             title: this.title,
//             description: this.description,
//             url: this.url,
//             sourceId: this.sourceId,
//             author: this.author,
//             urlToImage: this.urlToImage,
//             publishedAt: this.publishedAt,
//             voteLeft: this.voteLeft,
//             voteCenterLeft: this.voteCenterLeft,
//             voteCenter: this.voteCenter,
//             voteCenterRight: this.voteCenterRight,
//             voteRight: this.voteRight
//         })
// 			.then(callback);
//     };
//
//     Article.selectRandom = function (array) {
//         let randomNum = Math.floor(Math.random() * (array.length));
//         return array[randomNum];
//     };
//     module.Article = Article;
// }(app));





'use strict';

var app = app || {};

(function (module) {

    let huffpoArticles = {};
    huffpoArticles.all = [];
    let nytArticles = {};
    nytArticles.all = [];
    let usaArticles = {};
    usaArticles.all = [];
    let dmArticles = {};
    dmArticles.all = [];
    let breitArticles = {};
    breitArticles.all = [];


    var sourcesArray = [`the-new-york-times`, `the-huffington-post`, `usa-today`, `daily-mail`, `breitbart-news`];

    Article.requestArticles = sourcesArray.forEach((source) => {
        (callback) => {
            $.get(`/${source}`)
				.then(data => {
    huffpoArticles.all = (JSON.parse(data).articles);
    huffpoArticles.all.forEach(obj => obj.source = JSON.parse(data).source);
    huffpoArticles.all.forEach(obj => obj.shown = false);
}, err => console.error(err))
				.then(Article.loadArticles)
				.then(callback);

        };

    });


    huffpoArticles.requestArticles = function (callback) {
        $.get(`/the-huffington-post`)
			.then(data => {
    huffpoArticles.all = (JSON.parse(data).articles);
    huffpoArticles.all.forEach(obj => obj.source = JSON.parse(data).source);
    huffpoArticles.all.forEach(obj => obj.shown = false);
}, err => console.error(err))
			.then(Article.loadHuffpoArticles)
			.then(callback);
    };

    nytArticles.requestArticles = function (callback) {
        if (nytArticles.all.length === 0) {
            $.get(`/the-new-york-times`)
				.then(data => {
    nytArticles.all = (JSON.parse(data).articles);
    nytArticles.all.forEach(obj => obj.source = JSON.parse(data).source);
    nytArticles.all.forEach(obj => obj.shown = false);
}, err => console.error(err))
				.then(Article.loadNytArticles)
				.then(callback);
        }

    };

    usaArticles.requestArticles = function (callback) {
        $.get(`/usa-today`)
			.then(data => {
    usaArticles.all = (JSON.parse(data).articles);
    usaArticles.all.forEach(obj => obj.source = JSON.parse(data).source);
    usaArticles.all.forEach(obj => obj.shown = false);
}, err => console.error(err))
			.then(Article.loadUsaArticles)
			.then(callback);
    };

    dmArticles.requestArticles = function (callback) {
        $.get(`/daily-mail`)
			.then(data => {
    dmArticles.all = (JSON.parse(data).articles);
    dmArticles.all.forEach(obj => obj.source = JSON.parse(data).source);
    dmArticles.all.forEach(obj => obj.shown = false);
}, err => console.error(err))
			.then(Article.loadDmArticles)
			.then(callback);
    };

    breitArticles.requestArticles = function (callback) {
        $.get(`/breitbart-news`)
			.then(data => {
    breitArticles.all = (JSON.parse(data).articles);
    breitArticles.all.forEach(obj => obj.source = JSON.parse(data).source);
    breitArticles.all.forEach(obj => obj.shown = false);
}, err => console.error(err))
			.then(Article.loadBreitArticles)
			.then(callback);
    };

    function Article(sourceArticleData) {
        Object.keys(sourceArticleData).forEach(key => this[key] = sourceArticleData[key]);
    }

    Article.huffpo = [];
    Article.nyt = [];
    Article.usa = [];
    Article.dm = [];
    Article.breit = [];


    Article.loadHuffpoArticles = function () {
        Article.huffpo = huffpoArticles.all.map(obj => new Article(obj))
			.reduce((titles, title) => {
    if (titles.indexOf(title) === -1) titles.push(title);
    return titles;
}, [])
			.filter(t => t.shown === false);
        return Article.huffpo;
    };
	// TODO: If this array is empty since all the articles have been shown, make the get request for this source again
    Article.loadNytArticles = function () {
        Article.nyt = nytArticles.all.map(obj => new Article(obj))
			.reduce((titles, title) => {
    if (titles.indexOf(title) === -1) titles.push(title);
    return titles;
}, [])
			.filter(t => t.shown === false);
        return Article.nyt;
    };

    Article.loadUsaArticles = function () {
        Article.usa = usaArticles.all.map(obj => new Article(obj))
			.reduce((titles, title) => {
    if (titles.indexOf(title) === -1) titles.push(title);
    return titles;
}, [])
			.filter(t => t.shown === false);
        return Article.usa;
    };

    Article.loadDmArticles = function () {
        Article.dm = dmArticles.all.map(obj => new Article(obj))
			.reduce((titles, title) => {
    if (titles.indexOf(title) === -1) titles.push(title);
    return titles;
}, [])
			.filter(t => t.shown === false);
        return Article.dm;
    };

    Article.loadBreitArticles = function () {
        Article.breit = breitArticles.all.map(obj => new Article(obj))
			.reduce((titles, title) => {
    if (titles.indexOf(title) === -1) titles.push(title);
    return titles;
}, [])
			.filter(t => t.shown === false);
        return Article.breit;
    };

    Article.prototype.insertRecord = function (callback) {
        $.post('/articles', {
            title: this.title,
            description: this.description,
            url: this.url,
            sourceId: this.sourceId,
            author: this.author,
            urlToImage: this.urlToImage,
            publishedAt: this.publishedAt,
            voteLeft: this.voteLeft,
            voteCenterLeft: this.voteCenterLeft,
            voteCenter: this.voteCenter,
            voteCenterRight: this.voteCenterRight,
            voteRight: this.voteRight

        })
			.then(callback);
    };

    Article.selectRandom = function (array) {
        let randomNum = Math.floor(Math.random() * (array.length));
        return array[randomNum];
    };

    module.nytArticles = nytArticles;
    module.huffpoArticles = huffpoArticles;
    module.usaArticles = usaArticles;
    module.dmArticles = dmArticles;
    module.breitArticles = breitArticles;
    module.Article = Article;
}(app));
