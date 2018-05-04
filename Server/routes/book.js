const express = require('express');
const router = express.Router();
const cors = require('cors')

const {
  viewBook,
  translateDes,
  curreny
} = require('../controllers/book.controller')

router.get('/view' , cors(), viewBook)

router.get('/translate', cors(), translateDes)

router.get('/curreny', cors(), curreny)

module.exports = router;
