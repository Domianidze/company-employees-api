import mongoose from 'mongoose'

import { Company, Employee } from '../models/index.js'
import {
  addCompanySchema,
  editCompanySchema,
  findDocumentSchema,
} from '../schemas/index.js'

export const getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find().select('-__v')

    res.status(200).json(companies)
  } catch (err) {
    next(err)
  }
}

export const getCompany = async (req, res, next) => {
  try {
    await findDocumentSchema.validateAsync(req.body)

    const company = await Company.findById(mongoose.Types.ObjectId(req.body.id))
      .select('-__v')
      .populate({
        path: 'employees.employeeId',
        select: ['-companyId', '-__v'],
      })

    if (!company) {
      const error = new Error('No company found with this id')
      error.statusCode = 404
      throw error
    }

    res.status(200).json(company)
  } catch (err) {
    next(err)
  }
}

export const addCompany = async (req, res, next) => {
  try {
    await addCompanySchema.validateAsync(req.body)

    const existingCompany = await Company.findOne({ name: req.body.name })

    if (existingCompany) {
      const error = new Error('A company with this name already exists.')
      error.statusCode = 422
      throw error
    }

    const response = await Company.create({
      ...req.body,
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

    const company = await Company.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.body.id),
      },
      req.body
    )

    if (!company) {
      const error = new Error('No company found with this id')
      error.statusCode = 404
      throw error
    }

    await company.save()

    res.status(201).json({
      message: 'Company updated successfully!',
    })
  } catch (err) {
    next(err)
  }
}

export const deleteCompany = async (req, res, next) => {
  try {
    await findDocumentSchema.validateAsync(req.body)

    const company = await Company.findByIdAndRemove(
      mongoose.Types.ObjectId(req.body.id)
    )

    if (!company) {
      const error = new Error('No company found with this id')
      error.statusCode = 404
      throw error
    }

    await Employee.deleteMany({ companyId: company._id })

    res.status(200).json({
      message: 'Company deleted successfully!',
    })
  } catch (err) {
    next(err)
  }
}
