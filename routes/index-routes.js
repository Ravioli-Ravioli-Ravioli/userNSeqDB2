const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const fileUpload = require('express-fileupload');
const keys = require('../config/keys');
const multer = require('multer');
const Seq = require('../models/seq-model');
const https = require('https');
const EventEmitter = require("events").EventEmitter;
const body = new EventEmitter;
//const request = require("request");
//Get from all
//
router.get('/seqlist', (req, res) => {
  var x = "x";
  https.get("https://mbb.pregi.net/api/v1/sequence/all", (resp) => {
    var data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      all = JSON.parse(data);
      console.log(x);
      res.render('seqlist', {user: req.user, seqinfo: all});
    });
  });
});
//
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })

const app = express();

router.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/homeIn', authCheck, (req, res) => {
    res.render('homeIn', { user: req.user });
});

router.post('/addseq',  upload.single('file-to-upload'), function(req, res){
    console.log(req.body);
    var MongoClient = mongodb.MongoClient;
	  var url = keys.mongodb.dbURI;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
      if (err) {
//        console.log('Unable to connect to the Server:', err);
      } else {
//        console.log('Connected to Server');
        var dbo = db.db('seqtorr');

        dbo.collection("seqs").findOne({seqName: req.body.seqName}).then((currentSeq) => {
          console.log(currentSeq);
          if(currentSeq){
//            console.log('seq is: ', currentSeq);
          } else {

          new Seq({
            seqId: "",
            seqName: req.body.seqName,
            organism: req.body.organism,
            quality: "",
            uploader: "",
            insti: "",
            uDate: "",
            lmDate: "",
            nodes: "",
            status: "",
            allowed: "",
            filename: ""
            }).save().then((newSeq) => {
//            console.log("Inserting to database!");
            res.redirect('profile');
                });
        }
      });
      }
    });

});
///*Edit info
router.post('/editinfo', function(req, res){
    var MongoClient = mongodb.MongoClient;
	  var url = keys.mongodb.dbURI;
    console.log(req.body);
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
      if (err) {
//        console.log('Unable to connect to the Server:', err);
      } else {
//        console.log('Connected to Server');
        var dbo = db.db('seqtorr');
        var myQ = { username : req.user.username };
        var newVals = {$set: {contact: req.body.contact, dob: req.body.dob, desig: req.body.desig, insti: req.body.insti, instiAdd: req.body.instiAdd}};
        dbo.collection("users").updateOne(myQ, newVals, function(err) {
          if (err) {
            console.log(err);
          } else {
//            console.log("db updated");
//            console.log(req.user.username);
           res.redirect('profile');
          }
          db.close();
        });

      }
    });

});
///Edit info
/*
router.post('/upload', upload.single('file-to-upload'), (req, res, next) => {
  console.log(req.body);
  console.log(req.file.filename);
  res.redirect('/profile');
});
*/

module.exports = router;
