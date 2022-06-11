import bcrypt from 'bcrypt'

import { User } from '../models/index.js'

export const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      const error = new Error('Email is already taken.')
      error.statusCode = 422
      throw error
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 12)
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      })

      const response = await user.save()

      res.status(201).json({
        message: 'Registered successfully!',
        userId: response._id,
      })
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    res.status(err.statusCode).json({
      message: err.message,
    })
  }
}
