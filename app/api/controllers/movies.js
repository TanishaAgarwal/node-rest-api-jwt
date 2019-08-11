const Movie = require('../models/movies.js');

//Create and save a new movie
exports.create = (req, res) => {
    
    //create a movie
    const movie = new Movie({
        name: req.body.name,
        released_on: req.body.released_on 
    });

    //Save Movie in database
    movie.save().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the movie"
        });
    });

    //Validate the request
    if(!req.body.released_on){
        res.status(400).send({
            message: "Movie released date is not mentioned"
        });
    }

};


//Retrieve and return all movies from db
exports.findAll = (req, res) => {
    Movie.find().then((movies) => {
        res.send(movies);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all movies."
        });
    });
};


//Retrive single movie by movieId
exports.findOne = (req, res) => {
    Movie.findById(req.params.movieId).then((movie) => {
       //Validate existance of movie of given movieId
        if(!movie){
            return res.status(404).send({
                message: 'Movie not found with id' + req.params.movieId
            });
        }
        
        res.send(movie);
    }).catch((err) => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: 'Movie not found with id' + req.params.movieId
            });
        }
        return res.status(500).send({
            message: "Error while retrieving movie with id " + req.params.movieId
        });
    });
};


//Update a movie indentified by movieId
exports.update = (req, res) => {
    
    //Find by id and update it
    Movie.findByIdAndUpdate(req.params.movieId, {
        name:req.body.name
    }, {
        new: true
    }).then(movie => {
        
        //Validating existence of movie by movieId
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error updating Movie with id " + req.params.movieId
        });
    });
/*The {new: true} option in the findByIdAndUpdate() 
method is used to return the modified document to the
 then() function instead of the original. */


     //Validate the request
    if(!req.body.released_on){
        res.status(400).send({
            message: "Movie released date is not mentioned"
        });
    }
};


//Delete a movie indentified by movieId
exports.delete = (req, res) => {
    movie.findByIdAndDelete(req.params.movieId).then((movie) => {
        if(!movie) {
            return res.status(404).send({
                message: "movie not found with id " + req.params.movieId
            });
        }
        res.send({message: "Movie deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Movie with id " + req.params.movieId
        });
    });
    
};