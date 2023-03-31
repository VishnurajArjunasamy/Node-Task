var fs = require('fs')
const showSpecificEmployeeService = require('../services/specific-employee-service')

const showSpecificEmployee = (req, res, err) => {
    let specificEmployee = showSpecificEmployeeService(req.params.key)
    res.send(specificEmployee)
}


module.exports = showSpecificEmployee;