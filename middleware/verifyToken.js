const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secreteKey = process.env.MySecreteKey;

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Token is required!" });
    }

    try {
        const decoded = jwt.verify(token, secreteKey);

        // Assuming you stored vendorId inside the token
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        req.vendorId = vendor._id;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;
