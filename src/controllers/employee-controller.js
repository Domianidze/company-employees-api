import mongoose from 'mongoose'

import { Company, Employee } from '../models/index.js'
import { postEmployeeSchema } from '../schemas/index.js'

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().select('-__v')

    res.status(200).json(employees)
  } catch (err) {
    next(err)
  }
}

export const postEmployee = async (req, res, next) => {
  try {
    await postEmployeeSchema.validateAsync(req.body)

    const company = await Company.findById(
      mongoose.Types.ObjectId(req.body.companyId)
    )

    if (!company) {
      const error = new Error('No company found with this id')
      error.statusCode = 404
      throw error
    }

    const employee = await Employee.create(req.body)

    company.employees.push({
      employeeId: employee._id,
    })

    await company.save()

    res.status(201).json({
      message: 'Employee added successfully',
    })
  } catch (err) {
    next(err)
  }
}
