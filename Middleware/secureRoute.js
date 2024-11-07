import jwt from 'jsonwebtoken';

import UserDb from '../Models/User-model.js';

export const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({
                message: "No token found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECREATE);
        if (!decoded) {
            return res.status(400).json({
                message: "Invalid Token"
            })
        }
        const user = await UserDb.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(400).json({
            message: error
        })

    }

}