import mongoose from 'mongoose'
import prompt from 'prompt-async'
import bcrypt from 'bcrypt'
import 'dotenv/config'

import { User } from '../models/index.js'

import { getMongoUrl } from '../util/index.js'

const createUser = async () => {
  try {
    prompt.start()

    const { email, password } = await prompt.get({
      properties: {
        email: {
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'email has to be valid',
        },
        password: {
          minLength: 3,
          message: 'password has to contain at least 3 characters',
          hidden: true,
        },
      },
    })

    const database = await mongoose.connect(getMongoUrl())

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const error = new Error('email is already taken')
      error.statusCode = 422
      throw error
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      email,
      password: hashedPassword,
    })

    const response = await user.save()

    console.log(`user id created with: ${response._id}`)

    database.disconnect()
  } catch (err) {
    console.error(err)
  }
}

createUser()
