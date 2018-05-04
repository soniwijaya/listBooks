var express = require('express');
var router = express.Router();
const { logins } = require('../controllers/user.controller')

/* GET home page. */
router.post('/logins', logins)

module.exports = router;
