const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI;
        const con = await mongoose.connect(dbURI)
        console.log(`MongoDB Connected: ${con.connection.host}`);
        
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
        
    }
}

module.exports = {connectDB};