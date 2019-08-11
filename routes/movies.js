const express = require('express');
const router = express.Router();

const movie = require('../app/api/controllers/movies');
router.post('/movies', movie.create);
router.get('/movies', movie.findAll);
router.get('/movies/:movieId', movie.findOne);
router.put('/movies/:movieId', movie.update);
router.delete('/movies/:movieId', movie.delete);

module.exports = router;