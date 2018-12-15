const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const helper = require('../helper/helper');

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Name is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    comment: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    user: {type: Schema.Types.ObjectId, ref: "User"}
});


let Article = mongoose.model('Article', articleSchema);


module.exports = Article