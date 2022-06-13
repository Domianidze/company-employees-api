import baseJoi from 'joi'
import joiDate from '@joi/date'

const Joi = baseJoi.extend(joiDate)

export default Joi.object({
  id: Joi.string().min(24).required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  dateOfBirth: Joi.date().format('DD/MM/YYYY'),
  idNumber: Joi.number(),
  position: Joi.string(),
  startedWorkingDate: Joi.date().format('DD/MM/YYYY'),
}).min(2)
