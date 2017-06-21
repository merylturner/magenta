'use strict';

var app = app || {};

(function (module) {
    const articleView = {};
    let selectedObj = {};

    const render = function (title) {
        let template = Handlebars.compile($('#template').text()); // eslint-disable-line

        return template(title);
    };

    // COMMENT: Maybe sometime cache this selected article object in local storage so we can use it on the game page whether refreshed or not?
    articleView.init = function () {
        let randArticleObj = app.articleController.randomArticle();
        // let headline = randArticleObj.title;
        // console.log(headline);
        // $('main > section').hide();
        // $('#headline').show();
        $('#headline').append(render(randArticleObj));
        selectedObj = randArticleObj;
        console.log('random article object inside articleView.init', selectedObj);
    };

    // TODO: listener for the click of the vote on the front
    $('#submit-button').on('click', function (event) {
        // take the randArticleObj and ...
        // change the property of shown to true
        // add properties of left, center-left, etc: 1 for the voted radio button and 0 for every other radio button
        // send the updated object to the database via the resultsController
        event.preventDefault();
        selectedObj.shown = true;
        let selection = $('input[type="radio"]:checked').val();
        selectedObj.voteLeft = 0;
        selectedObj.voteCenterLeft = 0;
        selectedObj.voteCenter = 0;
        selectedObj.voteCenterRight = 0;
        selectedObj.voteRight = 0;
        if (selectedObj.hasOwnProperty(selection)) {
            selectedObj[selection] += 1;
        }
        return selectedObj;


    });

    module.articleView = articleView;
}(app));