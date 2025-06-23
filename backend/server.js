const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./connect/db');
const router = require('./router/students.router');
const StaticRoute = require('./router/StaticeRoute');
const app = express();
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use("/", StaticRoute)
app.use("/students", router);

const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {

    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
        console.log("http://localhost:" + PORT);

    })
})
.catch((error)=>{
    console.log(`Error connecting to the database: ${error.message}`);
    
})