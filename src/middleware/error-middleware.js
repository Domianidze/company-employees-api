export default (err, _req, _res) => {
  const error = err

  if (error.isJoi) {
    error.statusCode = 422
  }

  if (!error.statusCode) {
    error.statusCode = 500
  }

  _res.status(error.statusCode).json({
    message: error.message,
  })
}
