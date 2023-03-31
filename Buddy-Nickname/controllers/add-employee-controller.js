var fs = require('fs')
const addEmployeeService = require('../services/add-employee-service')

const addEmployee = async (req, res) => {
        let report = JSON.parse(addEmployeeService(req.body))
        if(report.status===true){
            res.status(201).send(report)
        }
}

module.exports = addEmployee