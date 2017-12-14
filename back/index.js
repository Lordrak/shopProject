var mongo = require('mongodb').MongoClient; // daron

var express = require('express'); 
var app = express(); // daron

var url = 'mongodb://localhost:27017';
var _client = "";

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // pour le mettre dans le bon format

app.use(function(req, res, next) {
 res.header(`Access-Control-Allow-Origin`, `*`); // tout le monde peut faire
 res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`); // crud
 res.header(`Access-Control-Allow-Headers`, `Content-Type`); // sais pas
 next(); // res.header sert à faire le lien entre le back et le front
});

mongo.connect(url, function(err, client) { // le client est comme localhost(HOTE) ici on réutilise la variable url
	console.log("Connected successfully to server");
	_client = client;
});

app.post('/addProduct', function(req, res) { // on utilise ici express avec app
	var produit = req.body; // information que l'utilisateur va donner (la vue, le controlleur)
	var db = _client.db('Shop'); // 
	if (produit.prix && produit.nom) { // SI ça existe DONC fais le
		var newProduct = {
			nom : produit.nom,
			prix : produit.prix,
			quantite : produit.quantite,
			type : produit.type
		};
		db.collection('Produit').save(newProduct); 
		res.status(200).send('Produit ajouté');
	} 	
	else {
		res.status(412).send('il manque le nom ou le prix du produit'); //sinon voila
	}
});

app.get('/getProduct', function(req, res) {
	var db = _client.db('Shop');
	db.collection('Produit').find({}).toArray(function(err, docs){
		res.status(200).send(docs);
	});
});

app.post('/createUser', function(req, res) {
	var user = req.body;
	var db = _client.db('Shop');
	if (user.username && user.password) {
		var newUser = {
			username: user.username,
			password : user.password,
			nom : user.nom,
			prenom : user.prenom
		};
		db.collection('Utilisateur').save(newUser);
		res.status(200).send('Utilisateur crée');
	}
	else {
		res.status(412).send("il manque le nom ou le mot de passe de l'utilisateur");
	}
});

app.post('/login', function (req, res) {
	var user = req.body;
	var db = _client.db('Shop');
	if (user.username && user.password) {
		db.collection('Utilisateur').find({	$and: [ { username: user.username }, { password: user.password }]}).toArray(function (err, docs){
			if (docs) { // si il existe
				var token = {
					token : user.username + Math.floor(Math.random() * 10000) + 1;
					username : user.username;
				}
			}
		}) 
	}
})

app.listen(3000, function() {
	console.log('Server ON');
});
