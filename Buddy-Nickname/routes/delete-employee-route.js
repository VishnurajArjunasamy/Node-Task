const express  = require('express')
const router = express.Router()

const deleteEmployee = require('../controllers/delete-employee-controller')

router.delete('/',deleteEmployee)

module.exports = router