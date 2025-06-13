const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const {CreateStudentsData,FindStudentsByName} = require('../controllers/students.controllers');


router.post('/',CreateStudentsData)
router.post("/findstudents",upload.none(),FindStudentsByName)


module.exports = router;