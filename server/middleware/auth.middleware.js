import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized, no token",
            });
        }

        // Get token
        token = token.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user
        const user = await User.findById(decoded.id)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed",
            error: error.message,
        });
    }
};