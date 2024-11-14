const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const jwt = require('jsonwebtoken')

function authenticateToken (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({
      message: 'Access denied. No token provided.'
    })
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid or expired token.'
      })
    }
    req.user = decoded

    next()
  })
}

module.exports = authenticateToken
