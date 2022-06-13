import baseJoi from 'joi'
import joiDate from '@joi/date'

const Joi = baseJoi.extend(joiDate)

export default Joi.object({
  id: Joi.string().min(24).required(),
  name: Joi.string(),
  websiteUrl: Joi.string().uri(),
  logoUrl: Joi.string().uri(),
  foundedDate: Joi.date().format('DD/MM/YYYY'),
}).min(2)
