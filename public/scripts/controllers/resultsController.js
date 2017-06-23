'use strict';

var app = app || {};

(function(module){
    const resultsController = {};

    resultsController.addProperties = function() {
        let resultsObj = app.Results.all.filter(obj => obj.id === app.selectedObj.sourceId)[0];

        app.selectedObj.voteLeft = resultsObj.count_left;
        app.selectedObj.voteCenterLeft = resultsObj.count_center_left;
        app.selectedObj.voteCenter = resultsObj.count_center;
        app.selectedObj.voteCenterRight = resultsObj.count_center_right;
        app.selectedObj.voteRight = resultsObj.count_right;

        app.selectedObj.selectionToDisplay = app.selectedObj.selection;
        app.selectedObj.sourceToDisplay = app.selectedObj.source;

        if (app.selectedObj.selectionToDisplay === 'voteLeft') app.selectedObj.selectionToDisplay = 'Left'
        if (app.selectedObj.selectionToDisplay === 'voteCenterLeft') app.selectedObj.selectionToDisplay = 'Center Left'
        if (app.selectedObj.selectionToDisplay === 'voteCenter') app.selectedObj.selectionToDisplay = 'Center'
        if (app.selectedObj.selectionToDisplay === 'voteCenterRight') app.selectedObj.selectionToDisplay = 'Center Right'
        if (app.selectedObj.selectionToDisplay === 'voteRight') app.selectedObj.selectionToDisplay = 'Right'

        if (app.selectedObj.source === 'the-new-york-times') app.selectedObj.sourceToDisplay = 'The New York Times'
        if (app.selectedObj.source === 'the-huffington-post') app.selectedObj.sourceToDisplay = 'The Huffington Post'
        if (app.selectedObj.source === 'daily-mail') app.selectedObj.sourceToDisplay = 'Daily Mail'
        if (app.selectedObj.source === 'usa-today') app.selectedObj.sourceToDisplay = 'USA Today'
        if (app.selectedObj.source === 'breitbart-news') app.selectedObj.sourceToDisplay = 'Breitbart News'

        app.resultsView.init();
        return resultsObj;
    };


    module.resultsController = resultsController;
}(app));
