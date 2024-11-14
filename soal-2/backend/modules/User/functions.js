const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const schema = User

async function register (req, res, next) {
  try {
    const data = JSON.parse(JSON.stringify(req.body))

    const isExistUser = await User.findOne({ email: data.email })

    if (isExistUser) {
      return res.status(400).json({ message: 'Email is already registered.' })
    }

    console.log('register password', data.password)

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(data.password, salt)

    const newUser = await new schema({
      fullname: data.fullname,
      email: data.email,
      role: data.role,
      password: hashedPassword
    }).save()

    return res.status(201).json({
      message: 'Registration successful!',
      data: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role
      }
    })
  } catch (error) {
    return next(error)
  }
}

async function login (req, res, next) {
  try {
    const data = JSON.parse(JSON.stringify(req.body))

    if (!data.email || !data.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' })
    }

    const user = await schema.findOne({ email: data.email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid login!' })
    }

    const isMatch = bcrypt.compareSync(data.password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: `Invalid login ${isMatch}` })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    )

    res.status(200).json({
      message: 'Login successful',
      data: {
        token: token,
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

async function getUsers (req, res, next) {
  try {
    const users = await schema.find()

    if (!users.length) {
      return res.status(404).json({ message: 'No users found.' })
    }

    res.status(200).json({
      message: 'Success',
      data: users.map(user => ({
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }))
    })
  } catch (error) {
    return next(error)
  }
}

async function getUserById (req, res, next) {
  try {
    const userId = req.params.id
    const user = await schema.findById(userId)

    if (!user) {
      return res.status(401).json({ message: 'User not found.' })
    }

    res.status(200).json({
      message: 'Success',
      data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    return next(error)
  }
}

async function deleteUserById (req, res, next) {
  try {
    const userId = req.params.id
    const user = await schema.findByIdAndDelete(userId)

    if (!user) {
      return res.status(401).json({ message: 'User not found.' })
    }

    res.status(200).json({ message: 'User deleted successfully!' })
  } catch (error) {
    return next(error)
  }
}

module.exports = { register, login, getUsers, getUserById, deleteUserById }
