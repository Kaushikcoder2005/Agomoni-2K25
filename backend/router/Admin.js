const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const {CreateAdmin,validateAdmin,adminLogin} = require("../controllers/Admin.controller");


router.post("/", upload.none(),CreateAdmin );
router.post("/validate", upload.none(), validateAdmin)
router.post("/adminLogin",adminLogin)
module.exports = router;