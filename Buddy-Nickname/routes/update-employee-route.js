const express = require('express')
const router = express.Router()

const updateEmployeeController = require('../controllers/update-employee-controller')

router.put('/',updateEmployeeController)

module.exports=router