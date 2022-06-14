export default (err, req, res, next) => {
  const error = err

  if (error.isJoi) {
    error.statusCode = 422
  }

  if (!error.statusCode) {
    error.statusCode = 500
  }

  res.status(error.statusCode).json({
    message: error.message,
  })

  next()
}
