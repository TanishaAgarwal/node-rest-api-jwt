const express = require('express');
const router = express.Router();

const movie = require('../app/api/controllers/movies');
router.post('/', movie.create);
router.get('/', movie.findAll);
router.get('/:movieId', movie.findOne);
router.put('/:movieId', movie.update);
router.delete('/:movieId', movie.delete);

module.exports = router;