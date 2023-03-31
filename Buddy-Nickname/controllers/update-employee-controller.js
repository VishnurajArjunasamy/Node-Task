var fs = require('fs')
const updateEmployeeService = require('../services/update-employee-service')

const update = (req, res) => {
    let employeeId = req.query.employeeId
    let updatedName = req.query.nickName
    let updatedHobby = req.query.hobbies
    updateEmployeeService(employeeId,updatedName,updatedHobby)
    
    res.json("employee updated")

}

module.exports = update