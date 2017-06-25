'use strict';
var app = app || {};

page('/', app.homeView.init);
page('/game', app.Article.requestArticles);
page('/about', app.aboutView.init);
page('*', '/');

page();