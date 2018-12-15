const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    content: {
        type: String,
        require: [true, "content is required"]
    },
    createdAt: {
        type: Date
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment
