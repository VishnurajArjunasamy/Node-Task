const fs = require('fs')

const deleteEmployee  = (employeeId)=>{
        let buddy_list = JSON.parse(fs.readFileSync('assets/data/cdw_ace23_buddies.json', 'utf-8'))
        let employeeIdx = buddy_list.findIndex(emp => emp.employeeId == employeeId)
        if (employeeIdx!=-1) { buddy_list.splice(employeeIdx, 1) }
        fs.writeFileSync('assets/data/cdw_ace23_buddies.json', JSON.stringify(buddy_list))
        return {"success":true}
}

module.exports = deleteEmployee