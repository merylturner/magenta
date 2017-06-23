'use strict';

var app = app || {};

(function(module){
    const resultsController = {};

    resultsController.addProperties = function(callback) {
        let resultsObj = app.Results.all.filter(obj => obj.id === app.selectedObj.sourceId)[0];

        app.selectedObj.voteLeft = resultsObj.count_left;
        app.selectedObj.voteCenterLeft = resultsObj.count_center_left;
        app.selectedObj.voteCenter = resultsObj.count_center;
        app.selectedObj.voteCenterRight = resultsObj.count_center_right;
        app.selectedObj.voteRight = resultsObj.count_right;
        console.log(app.selectedObj);
        app.resultsView.init();
        return resultsObj;

    };

    resultsController.showVoteColor = function () {
        console.log(app.selectedObj);
        if(app.selectedObj.voteLeft === 1) {
            $('.blue').toggleClass('hidden');
        }
        else{
            $('.red').toggleClass('hidden');
        }
    }


    module.resultsController = resultsController;
}(app));
