const express = require('express');
const router = express.Router();
const Users = require('../app/api/controllers/users');
router.post('/register', Users.create);
router.post('/authenticate', Users.authenticate);
module.exports = router;