import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiErrors } from '../utils/ApiErrors.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponce.js';
import jwt from 'jsonwebtoken';
import { application } from 'express';
import mongoose from 'mongoose';



// Function to generate access & refresh tokens
const generateAccessAndRefreshTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token in DB
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiErrors(500, "Error generating tokens");
    }
};


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, userName, password } = req.body;

    if ([fullName, email, userName, password].some(field => !field)) {
        throw new ApiErrors(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existingUser) {
        throw new ApiErrors(400, "User already exists with this username or email");
    }

    const user = await User.create({
        fullName,
        email,
        password, // hashed automatically in the model
        userName: userName.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiErrors(500, "User creation failed");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});


// Login controller
const loginUser = asyncHandler(async (req, res) => {
    const { email, userName, password } = req.body;

    if (!(userName || email)) {
        throw new ApiErrors(400, "Username or email is required");
    }

    if (!password) {
        throw new ApiErrors(400, "Password is required");
    }

    // Find user by username or email
    const user = await User.findOne({
        $or: [{ userName: userName?.toLowerCase() }, { email }]
    });

    if (!user) {
        throw new ApiErrors(400, "User not found with this username or email");
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiErrors(401, "Invalid password");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user);

    // Remove sensitive info
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Send tokens in response (optional: also as cookies)
    return res.status(200).json(
        new ApiResponse(
            200,
            { loggedInUser, accessToken, refreshToken },
            "User logged in successfully"
        )
    );
});


// Profile controller 
const profile = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiErrors(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User profile fetched successfully")
    );
});


export { registerUser , loginUser, profile };