const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seqSchema = new Schema({
    seqId: String,
    seqName: String,
    organism: String,
    quality: String,
    uploader: String,
    insti: String,
    uDate: String,
    lmDate: String,
    nodes: String,
    status: String,
    allowed: String
});

const Seq = mongoose.model('seq', seqSchema);

module.exports = Seq;
