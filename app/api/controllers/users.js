const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Create and save a new note
exports.create = (req, res) => {
    
    //create a note
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    //Save Note in database
    note.save().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the note"
        });
    });

    //Validate the request
    if(!req.body.email){
        res.status(400).send({
            message: "Note email can not be empty"
        });
    }

};

//Retrive single note by email id
exports.authenticate = (req, res) => {
    User.findone({email: req.body.email}).then((user) => {
       //Validate existance of note of given noteId
        if(!user){
            return res.status(404).send({
                message: 'user not found with email' + req.body.email
            });
        }
        else{
            if(bcrypt.compareSync(req.body.password , user.password)){
                const token = jwt.sign({id: user._id},req.app.get('secretKey'),{expiresIn: '1h'});
                res.send(user, token);
            }
            else{
                return res.status(404).send({
                    message: 'incorrect password'
                });
            }
        }
        
    }).catch((err) => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: 'User not found with email' + req.body.email
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with email " + req.body.email
        });
    });
};
