import Joi from 'joi'

export default Joi.object({
  id: Joi.string().min(24).required(),
})
