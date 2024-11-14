const express = require('express')
const timeout = require('connect-timeout')

const app = express.Router()
const Utils = require('./utils')
const Functions = require('./functions')
const authenticateToken = require('../../middlewares/authenticateToken')

app.use(timeout(60000))

app.post('/login', Functions.login)
app.post('/register', Functions.register)
app.get('/', authenticateToken, Functions.getUsers)
app.get('/:id', authenticateToken, Functions.getUserById)
app.delete('/:id', authenticateToken, Functions.deleteUserById)

app.use(Utils.errorHandler)

module.exports = app
console.log("Server is online!");