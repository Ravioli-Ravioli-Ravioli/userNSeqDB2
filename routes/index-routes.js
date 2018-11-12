const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const fileUpload = require('express-fileupload');
const keys = require('../config/keys');
const multer = require('multer');
const upload = multer({
  dest: '../uploads/' // this saves your file into a directory called "uploads"
});

const app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
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
             res.redirect('upload');
          }

          // Close the database
          db.close();
        });

      }
    });

});

router.post('/upload', upload.single('file-to-upload'), (req, res, next) => {
  console.log(req.body);
  console.log(req.file.path);
  res.redirect('/profile');
});

module.exports = router;
