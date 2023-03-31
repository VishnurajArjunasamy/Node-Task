const fs = require('fs')

const showSpecificService  = (employeeKey)=>{
     let buddy_list = JSON.parse(fs.readFileSync('assets/data/cdw_ace23_buddies.json', 'utf-8'))
     let employee = buddy_list.filter(emp => {
         return emp.employeeId == employeeKey || emp.realName == employeeKey
     })
     return employee
}

module.exports = showSpecificService