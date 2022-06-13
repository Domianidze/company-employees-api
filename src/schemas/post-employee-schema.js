import baseJoi from 'joi'
import joiDate from '@joi/date'

const Joi = baseJoi.extend(joiDate)

export default Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().format('DD/MM/YYYY').required(),
  idNumber: Joi.number().required(),
  companyId: Joi.string().min(24).required(),
  position: Joi.string().required(),
  startedWorkingDate: Joi.date().format('DD/MM/YYYY').required(),
})
