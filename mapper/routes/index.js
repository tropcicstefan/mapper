var express = require('express'),
router = express.Router(),
mongodb = require('mongodb');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/locationlist',(req, res, next)=>{
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/mapper';

	MongoClient.connect(url, (err, database)=>{
		if(err){
			console.log('failure', err);
		} 
		else {
			console.log('success');
			var db=database.db('mapper');
			var collection = db.collection('location');
			collection.find({}).toArray((err, result)=>{
				if(err){
					console.log(err);
				}else if(result.length){
					res.render('locationlist', {
						"locationlist" : result
					});
				}else{
					res.send('no docs found');
				}
				database.close();
			});
		}
	});
});

router.get('/paygas=:id',(req, res, next)=>{
	res.render('paygas', {
		"id" : req.params.id
	});
});


router.get('/position/:lat/:lon',(req, res, next)=>{
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/mapper';

	MongoClient.connect(url, (err, database)=>{
		if(err){
			console.log('failure', err);
		} 
		else {
			var db=database.db('mapper');
			var collection = db.collection('location');
			var lat = parseFloat(req.params.lat);
			var lon = parseFloat(req.params.lon);
			collection.find({latitude: {$lt: lat+0.00005, $gt: lat-0.00005}, longitude: {$lt: lon+0.00005, $gt: lon-0.00005}}).toArray((err, result)=>{
				if(err){
					console.log(err);
				}else if(result.length){
					console.log(result[0]._id.toString());
					res.render('position', {
						"location" : result
					});
				}else{
					res.render('noposition');
				}
				database.close();
			});
		}
	});
});

router.get('/positionhidden/:lat/:lon',(req, res, next)=>{
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/mapper';

	MongoClient.connect(url, (err, database)=>{
		if(err){
			console.log('failure', err);
		} 
		else {
			var db=database.db('mapper');
			var collection = db.collection('location');
			var lat = parseFloat(req.params.lat);
			var lon = parseFloat(req.params.lon);
			collection.find({latitude: {$lt: lat+0.00005, $gt: lat-0.00005}, longitude: {$lt: lon+0.00005, $gt: lon-0.00005}}).toArray((err, result)=>{
				if(err){
					console.log(err);
				}else if(result.length){
					console.log(result[0]._id.toString());
					res.render('positionhidden', {
						"location" : result
					});
				}else{
					res.render('noposition');
				}
				database.close();
			});
		}
	});
});

router.get('/newlocation',(req, res, next)=>{
	res.render('newlocation', {title: 'Add Location'});
});

router.post('/addlocation', (req, res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/mapper';
	console.log(req.body);
	MongoClient.connect(url,(err, database)=>{
		if(err){
			console.log('failure', err);
		}else{
			var db=database.db('mapper');
			var collection = db.collection('location');

			var location1 = {"name" : req.body.location,
			 "text" : req.body.description, "pic" : req.body.image, 
			 "latitude" : parseFloat(req.body.lat), "longitude" : parseFloat(req.body.lon),
			  "userid" : 2 };
			collection.insert(location1, (err, result)=>{
				if(err) console.log(err);
				else{
					console.log(location1._id);
					res.redirect('/paygas='+location1._id);
				}
				database.close();
			});

		}

	});
});

module.exports = router;
