import mongoose from 'mongoose'

import { Company } from '../models/index.js'
import {
  getCompanySchema,
  postCompanySchema,
  editCompanySchema,
} from '../schemas/index.js'

export const getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find().select('-__v')

    res.json(companies)
  } catch (err) {
    next(err)
  }
}

export const getCompany = async (req, res, next) => {
  try {
    await getCompanySchema.validateAsync(req.body)

    const company = await Company.findById(
      mongoose.Types.ObjectId(req.body.id)
    ).select('-__v')

    if (!company) {
      const error = new Error('No company found with this id')
      error.statusCode = 404
      throw error
    }

    res.json(company)
  } catch (err) {
    next(err)
  }
}

export const postCompany = async (req, res, next) => {
  try {
    await postCompanySchema.validateAsync(req.body)

    const existingCompany = await Company.findById(
      mongoose.Types.ObjectId(req.body.id)
    )
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

export const editCompany = async (req, res, next) => {
  try {
    await editCompanySchema.validateAsync(req.body)

    const company = await Company.findById(mongoose.Types.ObjectId(req.body.id))

    if (!company) {
      const error = new Error('No company found with this id')
      error.statusCode = 404
      throw error
    }

    company.name = req.body.name || company.name
    company.websiteUrl = req.body.websiteUrl || company.websiteUrl
    company.logoUrl = req.body.logoUrl || company.logoUrl
    company.foundedDate = req.body.foundedDate || company.foundedDate

    await company.save()

    res.status(201).json({
      message: 'Company updated successfully!',
    })
  } catch (err) {
    next(err)
  }
}
