const fs = require('fs')

const updateEmployee  = (employeeId,updatedName,updatedHobby)=>{
    let buddy_list = JSON.parse(fs.readFileSync('assets/data/cdw_ace23_buddies.json', 'utf-8'))
    let employeeIdx = buddy_list.findIndex(emp => emp.employeeId == employeeId)
    if (updatedName) { buddy_list[employeeIdx].nickName = JSON.parse(updatedName); }
    if (updatedHobby) { buddy_list[employeeIdx].hobbies = JSON.parse(updatedHobby); }
    fs.writeFileSync('assets/data/cdw_ace23_buddies.json', JSON.stringify(buddy_list))
}

module.exports = updateEmployee