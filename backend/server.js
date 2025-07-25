const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./connect/db');
const router = require('./router/students.router');
const StaticRoute = require('./router/StaticeRoute');
const adminRouter = require('./router/Admin');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const os = require('os');
const cluster = require('cluster');


dotenv.config();

app.use(cors({
    origin: process.env.CLIENT_URL || 'https://agomoni-2k25-frontend.onrender.com/' || " http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Define all API routes first
app.use("/api", StaticRoute);
app.use("/api/students", router);
app.use("/api/admin", adminRouter);

// ✅ Serve frontend static files
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// ✅ Catch-all route to serve SPA for unmatched routes
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 8000;
const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();

    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
    // console.log(`Primary ${process.pid} is running`);
} else {

    connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log("Server is running on port " + PORT);
                console.log("http://localhost:" + PORT);
            });
        })
        .catch((error) => {
            console.log(`Error connecting to the database: ${error.message}`);
        });
}

