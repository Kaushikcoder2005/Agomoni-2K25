const {GetAllStudentsData} = require('../controllers/students.controllers');
const express = require('express');
const router = express.Router();


router.get('/',GetAllStudentsData)

module.exports = router;