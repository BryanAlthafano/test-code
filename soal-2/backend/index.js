const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
 
const UserRoutes = require('./modules/User/router.js')

const PORT = process.env.PORT || 8082
const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', function () {
  console.log('Connected to DB')
})

app.use('/api/users', UserRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
