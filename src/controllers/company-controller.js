import { Company } from '../models/index.js'
import { postCompanySchema } from '../schemas/index.js'

export const postCompany = async (req, res, next) => {
  try {
    await postCompanySchema.validateAsync(req.body)

    const existingCompany = await Company.findOne({ name: req.body.name })
    if (existingCompany) {
      const error = new Error('A company with this name already exists.')
      error.statusCode = 422
      throw error
    }

    const response = await Company.create({
      name: req.body.name,
      websiteUrl: req.body.websiteUrl,
      logoUrl: req.body.logoUrl,
      foundedDate: req.body.foundedDate,
      employees: [],
    })

    res.status(201).json({
      message: 'Company created successfully!',
      companyId: response._id,
    })
  } catch (err) {
    next(err)
  }
}
