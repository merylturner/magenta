'use strict';
var app = app || {};

page('/', app.homeView.init);
page('/game', app.articleView.init);
page('/about', app.aboutView.init);
page('*', '/');

page();