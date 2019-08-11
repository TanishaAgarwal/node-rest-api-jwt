const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt round which will be used for hashing plain text password. 

//user schema

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    }
});

//Hash password before saving it to database
//Mongoose provide middleware(pre/post hooks)
// which we can use to manipulate our data before/after inserting into database.
UserSchema.pre('save', (next) =>{
    this.password = bcrypt.hashSync(this.password,saltRounds);
    next();
});

module.exports = mongoose.model('User', UserSchema);