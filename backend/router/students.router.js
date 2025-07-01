const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const {CreateStudentsData,FindStudentsByName,FindStudentsByID} = require('../controllers/students.controllers');


router.post('/',CreateStudentsData)
router.post("/findstudents",upload.none(),FindStudentsByName)
router.post("/studentData",upload.none(),FindStudentsByID)


module.exports = router;