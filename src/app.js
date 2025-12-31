import express from 'express'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

// Create express app
const app = express(); 

// cors origin resource sharing configuration allow requests from specified origin
// or frontend application
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// 
app.use(express.json({ limit: '16kb' })); 
app.use(express.urlencoded({ extended: true, limit: '16kb' })); 
app.use(express.static('public'));
app.use(cookieParser()); 

// Routes
import userRoutes from './routes/user.routes.js';
import orderRoutes from './routes/order.routes.js';


app.use("/api/v1/user", userRoutes);
app.use("/api/v1", orderRoutes); 
// POST /api/v1/order
// GET /api/v1/orders

export { app };
