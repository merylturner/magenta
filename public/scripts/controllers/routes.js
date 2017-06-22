'use strict';
var app = app || {};

page('/', app.homeView.init);
page('/game', app.articleController.init);
page('/about', app.aboutView.init);
// redirect the page if they land anywhere else
page('*', '/');

page();