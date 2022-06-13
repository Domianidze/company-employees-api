import baseJoi from 'joi'
import joiDate from '@joi/date'

const Joi = baseJoi.extend(joiDate)

export default Joi.object({
  name: Joi.string().required(),
  websiteUrl: Joi.string().uri().required(),
  logoUrl: Joi.string().uri().required(),
  foundedDate: Joi.date().format('DD/MM/YYYY').required(),
})
