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
			nom : produit.nom.toUpperCase(),
			prix : produit.prix,
			type : produit.type
		};
		db.collection('Produit').find({nom : newProduct.nom.toUpperCase()}).toArray(function(err, docs){
			if(docs[0]){
				res.send("Le produit "+newProduct.nom.toUpperCase()+" existe déja");
			}
			else{
				db.collection('Produit').save(newProduct); 
				res.status(200).send('Produit ajouté');
			}
		})	
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
			prenom : user.prenom,
			panier : [],
			achats : []
		};
		db.collection('Utilisateur').save(newUser);
		res.status(200).send('Utilisateur crée');
	}
	else {
		res.status(412).send("il manque le pseudo ou le mot de passe de l'utilisateur");
	}
});

app.post('/login', function (req, res) {
	var user = req.body;
	var db = _client.db('Shop');
	if (user.username && user.password) {
		db.collection('Utilisateur').find({	$and: [ { username: user.username }, { password: user.password }]}).toArray(function (err, docs){
			if (docs[0]) { // si il existe
				db.collection('Token').find({username: user.username}).toArray(function(err, docs){
					var token = "";
					if(docs[0]){
						token = docs[0].token;	
						res.status(200).send({token : token,message :" Connecté"});
					}
					else{
						token = {
							token :  user.username + Math.floor(Math.random() * 10000),
							username : user.username
						}
						db.collection('Token').save(token);
						res.status(200).send(token.token);
					}
				})
			}
			else{
				res.send("Mauvais utilisateur ou mot de passe");
			}
		}) 
	}
	else {
		res.status(412).send("il manque le pseudo ou le mot de passe de l'utilisateur");
	}
});


app.get('/getPanier/:token', function(req ,res){
	var token = req.params.token;
	var db = _client.db('Shop');
	db.collection('Token').find({token : token}).toArray(function(err, docs){
		if(docs[0]){
			var username = docs[0].username;
			db.collection('Utilisateur').find({username: username}).toArray(function(err, docs){
				if(docs[0]){
					res.status(200).send(docs[0].panier);
				}
				else{
					res.send("le username n'existe pas");
				}
			})
		}
		else{
			res.send("pas autorisé");
		}
	});
})

app.post('/addPanier/:token', function(req, res){
	var token = req.params.token;
	var produit = req.body;
	var db = _client.db('Shop');
	db.collection('Token').find({token : token}).toArray(function(err, docs){
		if(docs[0]){
			var username = docs[0].username;
			db.collection('Utilisateur').find({username: username}).toArray(function(err, docs){
				if(docs[0]){
					var panier = docs[0].panier;
					var elem = panier.find(function(element){
						return produit.nom == element.nom;
					});
					if(elem){	
						produit.quantite = parseInt(produit.quantite);
						elem.quantite = parseInt(elem.quantite);
						produit.quantite += elem.quantite;
						var index = panier.indexOf(elem);
						panier[index] = produit;
					}
					else{
						panier.push(produit);
					}
					db.collection('Utilisateur').update( { "username": username},
   													{
   														"username" : docs[0].username,
   														"password" : docs[0].password,
   														"nom" : docs[0].nom,
   														"prenom" : docs[0].prenom, 
   														"panier":panier
   													},
   													{ upsert: true } );
					res.status(200).send(produit+" ajouté au panier");
				}
			});
		}
		else{
			res.status(401).send("Pas autorisé");
		}
	});
});

 app.delete('/deletePanier/:token', function(req, res){
 	var token = req.params.token;
 	var produit = req.body;
 	var db = _client.db('Shop');
 	db.collection('Token').find({token : token}).toArray(function(err, docs){
 		if(docs[0]){
 			var username = docs[0].username;
 			db.collection('Utilisateur').find({username: username}).toArray(function(err, docs){
 				if(docs[0]){
 					var panier = docs[0].panier;
 					var newPanier = panier.filter(function(element){
 						return element.nom != produit.nom;
 					});
 					db.collection('Utilisateur').update( { "username": username},
   													{
   														"username" : docs[0].username,
   														"password" : docs[0].password,
   														"nom" : docs[0].nom,
   														"prenom" : docs[0].prenom, 
   														"panier":newPanier
   													},
   													{ upsert: true } );
					res.status(200).send("produit supprimé au panier");
 				}
 			})
 		}
 	});
 });

 app.put('/achatProduit/:token', function(req, res){
 	var token = req.params.token;
 	var db = _client.db('Shop');
 	db.collection('Token').find({token : token}).toArray(function(err, docs){
 		if(docs[0]){
 			var username = docs[0].username;
 			db.collection('Utilisateur').find({username: username}).toArray(function(err, docs){
 				if(docs[0]){
 					var panier = docs[0].panier;
 					docs[0].achats.concat(panier);
 					db.collection('Utilisateur').update( { "username": username},
   													{
   														"username" : docs[0].username,
   														"password" : docs[0].password,
   														"nom" : docs[0].nom,
   														"prenom" : docs[0].prenom, 
   														"panier":[],
   														"achats": docs[0].achats
   													},
   													{ upsert: true } );
					res.status(200).send("produits achetés");
 				}
 			})
 		}
 	});
 });

app.listen(3000, function() {
	console.log('Server ON');
});
