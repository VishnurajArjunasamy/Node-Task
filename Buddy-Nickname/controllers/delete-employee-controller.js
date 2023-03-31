var fs = require('fs')
const deleteEmployeeService = require('../services/delete-employee-service')

const deleteEmployee = (req, res) => { 
        let data  = deleteEmployeeService(req.query.employeeId)
        if(data.success){
            res.status(200).send("employee deleted")
        }
}

module.exports = deleteEmployee