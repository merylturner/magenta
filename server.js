'use strict';

const superagent = require('superagent');
require('dotenv').config();
const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

const conString = 'postgres://localhost:5432/magenta';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));


loadDB();
// TODO: switch out apiKey for environmental variable
// TODO: switch out hardcoded sources for a variable so we can fill...
// TODO: Refactor these get requests with a forEach over an array of the sources
// TODO: Add in the three other source names
app.get('/huffpo', (request, response) => {
	console.log('gethuffpost');
	superagent
		.get('https://newsapi.org/v1/articles?source=the-huffington-post&sortBy=top&apiKey=8b0471f5a1944ee2af4d504c01289139')
		.end((err, superagentResponse) => response.send(superagentResponse.text));
});

app.get('/nyt', (request, response) => {
	console.log('getNYT');
	superagent
		.get('https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=8b0471f5a1944ee2af4d504c01289139')
		.end((err, superagentResponse) => response.send(superagentResponse.text));
});

//TODO: queries of headline data/votes to the database
app.post('/articles', (request, response) => {
	client.query(`
		INSERT INTO
		articles(title, description, url, source_id, author, url_to_image, published_at)
		VALUES($1, $2, $3, $4, $5, $6, $7)
		ON CONFLICT DO NOTHING`,

		[request.body.title, request.body.description, request.body.url, request.body.sourceId, request.body.author, request.body.urlToImage, request.body.publishedAt],

		function (err) {
			if (err) console.error(err);
			// response.send('insert complete');

		})

		.then(() => {

			client.query(`

			UPDATE sources SET
			count_left = count_left + $1,
			count_center_left =count_center_left + $2,
			count_center =count_center + $3,
			count_center_right =count_center_right + $4,
			count_right =count_right + $5
			WHERE id = $6`,
				[request.body.voteLeft, request.body.voteCenterLeft, request.body.voteCenter, request.body.voteCenterRight, request.body.voteRight, request.body.sourceId],

				function (err) {
					if (err) console.error(err);
					response.send('update complete');
				});
		});
});

function loadDB() {
	client.query(`
		CREATE TABLE IF NOT EXISTS
		sources (
			id int PRIMARY KEY NOT NULL,
			name varchar(50) NOT NULL,
			count_left int DEFAULT 0,
			count_center_left int DEFAULT 0,
			count_center int DEFAULT 0,
			count_center_right int DEFAULT 0,
			count_right int DEFAULT 0);`)
		.then(loadSourceData)
		.catch(console.error);

	client.query(`
		CREATE TABLE IF NOT EXISTS
		articles (
			title varchar(255) PRIMARY KEY NOT NULL,
			description varchar(255) NOT NULL,
			url varchar(255) NOT NULL,
			source_id int references sources(id) NOT NULL,
			author varchar(50) NOT NULL,
			url_to_image varchar(255) NOT NULL,
			published_at timestamp NOT NULL);`)
		.catch(console.error);
}

function loadSourceData() {
	client.query(`
		INSERT INTO sources VALUES
		(1, 'the-huffington-post',0,0,0,0,0),
		(2, 'the-new-york-times',0,0,0,0,0),
		(3, 'usa-today',0,0,0,0,0),
		(4, 'daily-mail',0,0,0,0,0),
		(5, 'breitbart-news',0,0,0,0,0)
		ON CONFLICT DO NOTHING;`);
}

app.get('/sources', function(request,response){
	client.query(`SELECT * FROM sources;`)
	.then(result => {
		response.send(result.rows);
	})
	.catch(err => console.error(err));
});
// app.get('/sources', function (request, response) {
// 	client.query(`SELECT * FROM sources
// 		WHERE id = $1,
// 		[request.body.sourceId];`)
// 		.then(result => {
// 			response.send(result.rows);
// 		})
// 		.catch(err => console.error(err));
// });


app.listen(PORT, function () {
	console.log('Your port is running on:', PORT);
});
