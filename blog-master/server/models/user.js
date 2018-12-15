const mongoose = require('mongoose')
const Schema = mongoose.Schema
const helper = require('../helper/helper');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Minimum name length is 2'],
        maxlength: [30, 'Maximum name length is 30']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            isAsync: true,
            validator: function(v, cb) {
                setTimeout(function() {
                    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    var msg = v + ' is not a valid email!';
                    cb(emailRegex.test(v), msg);
                }, 5);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'Minimum password length is 8'],
        maxlength: [16, 'Maximum password length is 16']
    }
})


userSchema.pre('save', function(next) {
    this.password = helper.hashPassword(this.password)
    next();
});

let User = mongoose.model('User', userSchema);


module.exports = User