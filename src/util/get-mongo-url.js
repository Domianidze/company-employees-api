export default () => {
  const { env } = process
  const protocol = env.MONGO_PROTOCOL

  if (env.MONGO_PARAMS === 'mongoParams') {
    env.MONGO_PARAMS = ''
  }

  if (protocol === 'mongodb') {
    return `${protocol}://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DATABASE}?${env.MONGO_PARAMS}`
  }

  if (protocol === 'mongodb+srv') {
    return `${protocol}://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_CLUSTER}.8bito.mongodb.net/${env.MONGO_DATABASE}?${env.MONGO_PARAMS}`
  }

  throw new Error('Invalid Protocol')
}
