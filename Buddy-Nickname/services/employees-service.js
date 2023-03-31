const fs = require('fs')

const showAllEmployee  = (employees)=>{
       let employeeDetails =  fs.readFileSync('assets/data/cdw_ace23_buddies.json', 'utf-8')
        return {"success":true,"details":employeeDetails}
}
module.exports = showAllEmployee