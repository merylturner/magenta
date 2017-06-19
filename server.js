'use strict';

require('dotenv').config();
const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');

const PORT = process.env.PORT || 3000;
const app = express();

const conString = 'postgres://localhost:5432/magenta';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));

function proxyNewsAPI(request, response) {
    console.log('Routhing NewsAPI request for', request.params[0]);
	(requestProxy({
        url: `https://newsapi.org/v1/articles?source=${request.params[0]}&sortBy=top&apiKey=${API_KEY}`
	}))(request, response);
}





app.listen(PORT, function() {
    console.log('Your port is running on:', PORT);
});