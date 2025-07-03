const mongoose = require('mongoose');
const Students = require('../models/students.model');
const jwt = require('jsonwebtoken');

const GetAllStudentsData = async (req, res) => {
    const student = await Students.find({});
    const foodTypeCount = await Students.aggregate([
        {
            $group: {
                _id: "$foodType",
                count: { $sum: 1 }
            }
        }
    ]);


    const cookies = req.cookies.token || req.headers.authorization;
    if (!cookies) return res.status(401).json({ success: false, message: "Token missing" });
    const decoded = jwt.verify(cookies, process.env.JWT_SECRET)

    return res.json({ Students: student, foodCount: foodTypeCount, userID: decoded.id });
}

const CreateStudentsData = async (req, res) => {
    const { name, college_roll, year, sem, foodType } = req.body;
    try {
        if (!name || !college_roll || !year || !sem || !foodType) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        const checkExistingStudent = await Students.findOne({ college_roll, sem });

        if (checkExistingStudent) {
            return res.status(400).json({
                message: "Student already exists!",
                success: false
            });
        }

        const Student = new Students({
            name,
            college_roll,
            year,
            sem,
            foodType
        });

        await Student.validate(); // Triggers custom validation
        await Student.save();

        const token = jwt.sign({ id: Student._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            message: "Student created successfully",
            data: Student,
            success: true
        });

    } catch (error) {
        console.error("Error creating student:", error.message);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: error.message,
                success: false
            });
        }

        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        });
    }
};


const FindStudentsByName = async (req, res) => {
    const { college_roll, sem } = req.body;
    if (!college_roll || !sem) {
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }
    try {
        const SerachStudent = await Students.findOne({ college_roll, sem });
        if (!SerachStudent) {
            return res.status(400).json({
                message: "Student not found",
                success: false,
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Student found successfully",
            data: SerachStudent
        })
    } catch (error) {
        console.log("Error fetching student:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        })

    }
}

const FindStudentsByID = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            message: "Please provide a student ID"
        })
    }
    try {
        const SerachStudent = await Students.findById(id);
        if (!SerachStudent) {
            return res.status(400).json({
                message: "Student not found",
                success: false,
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Student found successfully",
            data: SerachStudent
        })

    } catch (error) {
        console.log("Error fetching student by ID:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        })
    }
}





module.exports = {
    CreateStudentsData,
    GetAllStudentsData,
    FindStudentsByName,
    FindStudentsByID
}