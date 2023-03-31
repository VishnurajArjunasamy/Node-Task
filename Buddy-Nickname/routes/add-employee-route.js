const express = require('express');
const router = express.Router();

const add_employee =require('../controllers/add-employee-controller')

router.post('/',add_employee)

module.exports = router