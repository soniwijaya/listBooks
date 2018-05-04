const express = require('express');
const router = express.Router();
const cors = require('cors')

const {
  viewBook,
  searchBook,
  translateDes,
  curreny,
} = require('../controllers/book.controller')

router.get('/view' , cors(), viewBook)

router.get('/view/:id' , cors(), searchBook)

router.get('/translate/:bahasa/:description', cors(), translateDes)

router.get('/curreny/:valueKonversi/:nominalKonversi', cors(), curreny)

module.exports = router;
