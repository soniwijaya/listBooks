const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const book = require('./routes/book')
app.use('/book', book)

module.exports = app
