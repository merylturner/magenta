'use strict';

var app = app || {};

(function(module){
    const homeView = {};

    homeView.init = function() {
        $('main > section').hide();
        $('#home').show();
        $('#results-page').hide();
    };

    // $('#play-button').on('click', function() {
    //     console.log('play button clicked');
    // // COMMENT: stretch goal: filtering by source or something else?
	// // sourceArticles.with = attr => sourceArticles.all.filter( sourceArticle => sourceArticle[attr]);
    // });

    module.homeView = homeView;
}(app));

// TODO: hide everything, show this, and event listener/handler for button