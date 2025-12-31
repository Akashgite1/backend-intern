import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {

    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Check if token is provided if not throw error
    if (!token) {
      return next(new ApiErrors(401, "You are not authenticated"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,)

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    if (!user) {
      // 
      return next(new ApiErrors(404, "Invalid Access Token"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return next(new ApiErrors(401, "Invalid Access Token"));
  }

})