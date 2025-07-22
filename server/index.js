require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {login} = require('./controllers/authController')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/auth/login', login)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})