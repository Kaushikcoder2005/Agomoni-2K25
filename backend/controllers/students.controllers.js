const mongoose = require('mongoose');
const Students = require('../models/students.model');

const GetAllStudentsData = async (req, res) => {
    const s = await Students.find({});
    const foodTypeCount = await Students.aggregate([
        {
            $group: {
                _id: "$foodType",
                count: { $sum: 1 }
            }
        }
    ]);
    return res.json({ Students: s, foodCount: foodTypeCount });
}

const CreateStudentsData = async (req, res) => {
    const { name, college_roll, year, sem, foodType } = req.body;
    try {
        if (!name || !college_roll || !year || !sem || !foodType) {
            return res.status(400).json({success:false, message: "Please fill all the fields" });
            
        }
        const checkExistingStudent = await Students.findOne({ college_roll, sem });
        
        if (checkExistingStudent) {
            return res.status(400).json({
                message: "Student already exists with this college roll and semester",
                success: false
            })
            
        }

        const Student = await Students.create({
            name,
            college_roll,
            year,
            sem,
            foodType
        })
        return res.status(200).json({
            message: "Student created successfully",
            data: Student,
            success: true
        })


    } catch (error) {
        console.error("Error creating student:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })

    }

}

const FindStudentsByName = async (req, res) => {
    const { name, college_roll, sem } = req.body;
    if (!name || !college_roll, !sem) {
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }
    try {
        const SerachStudent = await Students.findOne({ name, college_roll, sem });
        if (!SerachStudent) {
            return res.status(404).json({
                message: "Student not found"
            })
        }
        return res.status(200).json({
            message: "Student found",
            data: SerachStudent._id
        })
    } catch (error) {
        console.log("Error fetching student:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })

    }
}






module.exports = {
    CreateStudentsData,
    GetAllStudentsData,
    FindStudentsByName
}