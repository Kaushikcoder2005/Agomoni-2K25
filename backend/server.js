const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./connect/db');
const router = require('./router/students.router');
const StaticRoute = require('./router/StaticeRoute');
const adminRouter = require('./router/Admin');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use(cors({
  origin: '',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use("/", StaticRoute)
app.use("/students", router);
app.use("/admin", adminRouter)

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