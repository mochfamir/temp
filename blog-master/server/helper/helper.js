var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    hashPassword(password) {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
        
    },
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    },
    generateToken(id, email) {
        return token = jwt.sign({id, email}, 'secret');
    },
    decodeToken(token, cb) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (!err) {
                cb(null, decoded)
            } else {
                return {err: err.message, msg: 'token invalid'}
            }
        });
    },
    getDate(date) {
        let today = new Date(date);
        console.log(today)
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();
        let month = ''
        if(dd<10) {
            dd = '0'+dd
        } 
        switch (mm) {
            case 1:
                month = 'Jan'
                break;
            case 2:
                month = 'Feb'
                break;
            case 3:
                month = 'Mar'
                break;
            case 4:
                month = 'Apr'
                break;
            case 5:
                month = 'May'
                break;
            case 6:
                month = 'Jun'
                break;
            case 7:
                month = 'Jul'
                break;
            case 8:
                month = 'Aug'
                break;
            case 9:
                month = 'Sep'
                break;
            case 10:
                month = 'Oct'
                break;
            case 11:
                month = 'Nov'
                break;
            case 12:
                month = 'Des'
                break;
            default:
                break;
        }
        
        today = `${month} ${dd}`
        console.log(today)
        return today
    }
};