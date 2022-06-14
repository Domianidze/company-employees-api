import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      const err = new Error('Please provide a Bearer token.')
      err.statusCode = 401
      next(err)
    }

    const [, token] = authorization.split(' ')

    if (!token) {
      const err = new Error('Please provide a valid Bearer token.')
      err.statusCode = 401
      next(err)
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken) {
      const error = new Error('Not authorized.')
      error.statusCode = 403
      throw error
    }

    req.user = decodedToken.userId
    next()
  } catch (err) {
    next(err)
  }
}
