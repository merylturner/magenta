'use strict';

const superagent = require('superagent');
require('dotenv').config();
const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
// const requestProxy = require('express-request-proxy');

const PORT = process.env.PORT || 3000;
const app = express();

const conString = 'postgres://localhost:5432/magenta';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));

// function proxyNewsAPI(request, response) {
// 	console.log('Routing NewsAPI request is listening');
// // 	// console.log('Routing NewsAPI request for', request.params[0]);
// 	(requestProxy({
// 		url:'https://newsapi.org/v1/articles?source=the-huffington-post&sortBy=top&apiKey=8b0471f5a1944ee2af4d504c01289139',
// 		// query: {apiKey: process.env.API_KEY}
// 	}))(request, response);
// }

app.get('/news',(request,response) => {
	superagent
		.get('https://newsapi.org/v1/articles?source=the-huffington-post&sortBy=top&apiKey=8b0471f5a1944ee2af4d504c01289139')
		.end((err, superagentResponse) => response.send(superagentResponse.text));
} );




app.listen(PORT, function() {
	console.log('Your port is running on:', PORT);
});
