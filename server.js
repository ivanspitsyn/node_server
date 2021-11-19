var express = require('express');
var bodyParser = require('body-parser');

var PORT = 3001;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var artists = [
	{
		id: 1,
		name: 'Metallica'
	},
	{
		id: 2,
		name: 'Iron Maiden'
	},
	{
		id: 3,
		name: 'Deep Purple'
	},
    {
		id: 4,
		name: 'Metallica'
	}
];

app.get('/', function(req, res) {
	res.send('Hello API');
});

app.get('/artists', function(req, res) {
	res.send(artists);
});

// через :id передается объект для поиска id:
// c помощью метода find для массивов ищется и выводится первый! значение массива
// c id равным запрашиваему (остальные игнорируются)
app.get('/artists/:id', function(req, res) {
	console.log(req.params);
	var artist = artists.find(function(arr_value) {
		return arr_value.id === Number(req.params.id);
	});
	res.send(artist);
});

// через :name передается объект для поиска name:
// c помощью метода filter для массивов ищется и выводятся все значения массива
// c name: равным запрашиваему

app.get('/artist/:name', function(req, res) {
	console.log(req.params); //params это значения в строке вызова
	var artist = artists.filter(function(arr_value) {
        console.log(arr_value.name)
		return arr_value.name === (req.params.name);
	});
	res.send(artist);
});

// app.post('/artists', function(req, res) {
// 	var artist = {
// 		id: Date.now(),
// 		name: req.body.name
// 	};
// 	artists.push(artist);
// 	res.sendStatus(artist);
// });

app.post('/artists', function(req, res) {
    var artist = {
    id: Date.now(),
    name: req.body.name
    };
    artists.push(artist);
	console.log(req.body)
	res.send(artist);
});

app.put('/artists/:id', function(req, res) {
	var artist = artists.find(function(artist) {
		return artist.name === (req.params.name);
	});
	artist.name = req.body.name;
	res.sendStatus(200);
});

app.delete('/artists/:id', function(req, res) {
	artists = artists.filter(function(artist) {
		return artist.id !== Number(req.params.id);
	});
	res.sendStatus(200);
});

app.listen(PORT, function() {
	console.log('API app started on Port',PORT);
});