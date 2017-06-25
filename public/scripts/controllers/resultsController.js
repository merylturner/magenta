'use strict';

var app = app || {};

(function(module){
    const resultsController = {};
    let formatProps = {
        'voteLeft': 'Left',
        'voteCenterLeft': 'Center Left',
        'voteCenter': 'Center',
        'voteCenterRight': 'Center Right',
        'voteRight': 'Right',

        'the-new-york-times': 'The New York Times',
        'the-huffington-post': 'The Huffington Post',
        'daily-mail': 'Daily Mail',
        'usa-today': 'USA Today',
        'the-wall-street-journal': 'The Wall Street Journal'
    };

    resultsController.addProperties = function() {
        let resultsObj = app.Results.all.filter(obj => obj.id === app.selectedObj.sourceId)[0];

        app.selectedObj.voteLeft = resultsObj.count_left;
        app.selectedObj.voteCenterLeft = resultsObj.count_center_left;
        app.selectedObj.voteCenter = resultsObj.count_center;
        app.selectedObj.voteCenterRight = resultsObj.count_center_right;
        app.selectedObj.voteRight = resultsObj.count_right;

        app.selectedObj.selectionToDisplay = formatProps[app.selectedObj.selection];
        app.selectedObj.sourceToDisplay = formatProps[app.selectedObj.source];

        app.resultsView.init();
        return resultsObj;
    };

    module.resultsController = resultsController;
}(app));
