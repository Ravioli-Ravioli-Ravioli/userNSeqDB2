const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};


router.get('/', authCheck, (req, res) => {
    res.render('newseq', { user: req.user });
});

router.post('/addseq', function(req, res){

    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
	var url = 'mongodb://localhost:27017/usernseq';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('seqs');

        // Get the student data passed from the form
        var seq1 = {seqID: req.body.seqID, organism: req.body.organism,
          seqQual: req.body.seqQual, owner: req.body.owner, uDate: req.body.uDate,
          lmDate: req.body.lmDate, mainServer: req.body.mainServer};

        // Insert the student data into the database
        collection.insert([seq1], function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated seq list
            res.redirect("thelist");
          }

          // Close the database
          db.close();
        });

      }
    });

});

module.exports = router;
