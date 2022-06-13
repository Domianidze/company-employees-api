import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { User } from '../models/index.js'
import { authSchema } from '../schemas/index.js'

export const register = async (req, res, next) => {
  try {
    await authSchema.validateAsync(req.body)

    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      const error = new Error('Email is already taken.')
      error.statusCode = 422
      throw error
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)

    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'Registered successfully!',
      userId: user._id,
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    await authSchema.validateAsync(req.body)

    const loadedUser = await User.findOne({ email: req.body.email })
    if (!loadedUser) {
      const error = new Error("User with this email doesn't exist.")
      error.statusCode = 404
      throw error
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      loadedUser.password
    )
    if (!correctPassword) {
      const error = new Error('Invalid Password')
      error.statusCode = 401
      throw error
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser.id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.status(200).json({
      token,
      userId: loadedUser.id.toString(),
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
  } catch (err) {
    next(err)
  }
}
