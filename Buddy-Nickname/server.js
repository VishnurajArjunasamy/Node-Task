var express = require('express');
var fs = require('fs')
var app = express()
const cors = require('cors')
require('dotenv').config();

//routes
const employees = require('./routes/employees-route')
const addEmployee = require('./routes/add-employee-route')
const updateEmployee = require('./routes/update-employee-route')
const deleteEmployee = require('./routes/delete-employee-route')

const port = process.env.PORT

app.use(express.json());

app.use(cors())

app.use('/employees', employees);

app.use('/add_employee', addEmployee)

app.use('/update_employee/', updateEmployee) // http://localhost:4009/update_employee/?employeeId=2045&nickName="tony"&hobbies="reading"

app.use('/delete_employee', deleteEmployee)

app.listen(port, () => {
    console.log("Server started listening in port " + port)
    // cdwAce23Budies=[]
    // fs.writeFileSync('assets/data/cdw_ace23_buddies.json',JSON.stringify(cdwAce23Budies))
}) 