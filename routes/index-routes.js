const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const fileUpload = require('express-fileupload');
const keys = require('../config/keys');

const app = express();

app.use(fileUpload());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// View Seqs
router.get('/thelist', function(req, res){
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/usernseq';

	MongoClient.connect(url, function (err, db){
		if(err){
			console.log('Unable to connect to the server', err);
		} else {
			console.log('Connection Established', url);
			var collection = db.collection('seqs');

			collection.find({}).toArray(function(err, result){
				if (err){
					res.send(err); //Send to browser screen
				} else if (result.length){
					res.render('seqlist', {
						"seqlist" : result
					});
				} else {
					res.send('No documents found!');
				}
				db.close();
			});
		}
	});
});

// Add Seq
//router.get('/newseq', function(req, res){
//	res.render('newseq', {title: 'Add Sequence'})
//});

router.post('/addseq', function(req, res){
    console.log(req.body);
    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
	var url = keys.mongodb.dbURI;

    // Connect to the server
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var dbo = db.db('seqtorr');
//        var collection = db.collection('seq');

        // Get the student data passed from the form
        var seq1 = {seqID: req.body.seqID, organism: req.body.organism,
          seqQual: req.body.seqQual, owner: req.body.owner, uDate: req.body.uDate,
          lmDate: req.body.lmDate, mainServer: req.body.mainServer};

        // Insert the student data into the database
  //      dbo.collection.insert([seq1], function (err, result)
        dbo.collection("seqs").insertOne(seq1, function(err) {
          if (err) {
            console.log(err);
          } else {
             res.redirect('profile');
          }

          // Close the database
          db.close();
        });

      }
    });

});

app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let thefile = req.files.thefile;
  // Use the mv() method to place the file somewhere on your server
  thefile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

module.exports = router;
