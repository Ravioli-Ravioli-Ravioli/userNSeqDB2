const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seqSchema = new Schema({
    seqId: String,
    organism: String,
    seqQual: String,
    userId: String,
    uDate: Date,
    lmDate: Date,
    server: String
});

const Seq = mongoose.model('seq', seqSchema);

module.exports = Seq;
