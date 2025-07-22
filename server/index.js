require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pool = require('./connection')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})