const Admin = require("../models/admin.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const CreateAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        const exsistingAdmin = await Admin.findOne({ username })
        if (exsistingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            username,
            password: hashedPassword
        })

        return res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: newAdmin
        })

    } catch (error) {
        console.error("Error creating admin:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}



const validateAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        
        const exsistingAdmin = await Admin.findOne({ username })
        if (!exsistingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, exsistingAdmin.password);
        if (!isMatch) return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
        const token = jwt.sign({ id: exsistingAdmin._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(200).json({
            success: true,
            message: "Admin validated successfully",
        })

    } catch (error) {
        console.error("Error validating admin:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}

const adminLogin = async (req,res) => {
    const cookie = req.cookies.adminToken || req.headers.authorization;
    const decodedToken = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!decodedToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
    });
}

module.exports = {
    CreateAdmin,
    validateAdmin,
    adminLogin
}