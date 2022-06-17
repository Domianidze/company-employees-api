import mongoose from 'mongoose'

import { Company, Employee } from '../models/index.js'
import {
  addEmployeeSchema,
  editEmployeeSchema,
  findDocumentSchema,
} from '../schemas/index.js'

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find()
      .select('-__v')
      .populate({
        path: 'company',
        select: ['-employees', '-__v'],
      })

    res.status(200).json(employees)
  } catch (err) {
    next(err)
  }
}

export const getEmployee = async (req, res, next) => {
  try {
    await findDocumentSchema.validateAsync(req.body)

    const employee = await Employee.findById(
      mongoose.Types.ObjectId(req.body.id)
    )
      .select('-__v')
      .populate({
        path: 'company',
        select: ['-employees', '-__v'],
      })

    if (!employee) {
      const error = new Error('No employee found with this id')
      error.statusCode = 404
      throw error
    }

    res.status(200).json(employee)
  } catch (err) {
    next(err)
  }
}

export const addEmployee = async (req, res, next) => {
  try {
    await addEmployeeSchema.validateAsync(req.body)

    const existingEmployee = await Employee.findOne({
      idNumber: req.body.idNumber,
    })

    if (existingEmployee) {
      const error = new Error('Employee with this id number already exists.')
      error.statusCode = 422
      throw error
    }

    const company = await Company.findById(
      mongoose.Types.ObjectId(req.body.companyId)
    )

    if (!company) {
      const error = new Error('No company found with this id')
      error.statusCode = 404
      throw error
    }

    const employee = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      idNumber: req.body.idNumber,
      company: req.body.companyId,
      position: req.body.position,
      startedWorkingDate: req.body.startedWorkingDate,
    })

    company.employees.push({
      employee: employee._id,
    })

    await company.save()

    res.status(201).json({
      message: 'Employee added successfully',
      employeeId: employee._id,
    })
  } catch (err) {
    next(err)
  }
}

export const editEmployee = async (req, res, next) => {
  try {
    await editEmployeeSchema.validateAsync(req.body)

    const employee = await Employee.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.body.id),
      },
      req.body
    )

    if (!employee) {
      const error = new Error('No employee found with this id')
      error.statusCode = 404
      throw error
    }

    res.status(201).json({
      message: 'Employee updated successfully!',
    })
  } catch (err) {
    next(err)
  }
}

export const deleteEmployee = async (req, res, next) => {
  try {
    await findDocumentSchema.validateAsync(req.body)

    const employee = await Employee.findByIdAndRemove(
      mongoose.Types.ObjectId(req.body.id)
    )

    if (!employee) {
      const error = new Error('No employee found with this id.')
      error.statusCode = 404
      throw error
    }

    const company = await Company.findOne({
      employees: { employeeId: employee.id },
    })

    const updatedEmployees = company.employees.filter(
      (oldEmployee) =>
        oldEmployee.employeeId.toString() !== employee.id.toString()
    )

    company.employees = updatedEmployees

    await company.save()

    res.status(200).json({
      message: 'Employee deleted successfully!',
    })
  } catch (err) {
    next(err)
  }
}
