const showAllEmployeeService = require('../services/employees-service')

const showAllEmployee =(req, res, err) => {
        let data = showAllEmployeeService()
        if(data.success){
            res.status(200).send(data.details);
        }
}

module.exports = showAllEmployee;