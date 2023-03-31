const fs = require('fs')

const addEmployee  = (newEmployee)=>{
        let buddiesLlist = JSON.parse(fs.readFileSync('assets/data/cdw_ace23_buddies.json', 'utf-8'));
        buddiesLlist.push(newEmployee)
        fs.writeFileSync('assets/data/cdw_ace23_buddies.json', JSON.stringify(buddiesLlist))
        return '{"status":true,"descp":"Employee added"}'
}

module.exports= addEmployee