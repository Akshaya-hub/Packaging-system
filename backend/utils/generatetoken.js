import jwt from "jsonwebtoken";

export const generateToken = (res, userID) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET,{
        expiresIn:"7d",
    })

    res.cookie("token", token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return token;
}