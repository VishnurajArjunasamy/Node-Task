const express = require('express');
const router = express.Router();

const showAllEmployeeController = require('../controllers/employees-controller')
const specificEmployeeController = require('../controllers/specificEmployee-controller');

router.get("/", showAllEmployeeController);

router.get('/:key', specificEmployeeController);

module.exports = router;

