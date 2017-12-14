var mongo = require('mongodb').MongoClient;

var express = require('express');
var app = express();

var url = 'mongodb://localhost:27017';
var _client = "";

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongo.connect(url, function(err, client) {
	console.log("Connected successfully to server");
	_client = client;
});

app.post('/addProduct', function(req, res) {
	var body = req.body;
	var db = _client.db('Shop');
	if (body.prix && body.nom) {
		var newProduct = {
			nom : body.nom,
			prix : body.prix,
			quantite : body.quantite,
			type : body.type
		};
		db.collection('Produit').save(newProduct);
		res.status(200).send('Produit ajouté');
	} 	
	else {
		res.status(412).send('il manque le nom ou le prix du produit');
	}
});

app.get('/getProduct', function(req, res) {
	var db = _client.db('Shop');
	db.collection('Produit').find({}).toArray(function(err, docs){
		res.status(200).send(docs);
	});
})

app.listen(3000, function() {
	console.log('Server ON');
});
