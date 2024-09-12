const jwt = require('jsonwebtoken');
const User = require('./models/userModel'); // Adjust the path to your User model

const adminMiddleware = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "No token provided"
            });
        }

        // Verify the token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch the user from the database
        const user = await User.findById(userId);

        if (!user || user.usertype !== "admin") {
            return res.status(403).send({
                success: false,
                message: "Access denied. Admins only."
            });
        }

        // User is an admin, proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
};

module.exports = { adminMiddleware };
////  only admins can update status of order