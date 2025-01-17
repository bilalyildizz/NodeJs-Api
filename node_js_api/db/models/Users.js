const mongoose = require('mongoose');
const CustomError = require('../../lib/Error');
const {PASS_LENGTH, HTTP_CODES} = require('../../config/Enum');
const is = require('is_js');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    is_active: {type: Boolean, default: true},
    first_name: String,
    last_name: String,
    phone_number: String,
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

class Users extends mongoose.Model{

    validPassword(password){
        return bcrypt.compareSync(password, this.password);
    }

    static validateFieldsBeforeAuth(email, password){
        if(typeof email !== 'string' || password.length < PASS_LENGTH || is.not.email(email)){
            throw new CustomError(HTTP_CODES.UNAUTHORIZED, 'Validation error', 'Invalid email or password');
        }

        return true;
    }
}

UserSchema.loadClass(Users);
module.exports = mongoose.model('users', UserSchema);