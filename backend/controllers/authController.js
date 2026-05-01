import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { name, email, password,adminCode } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let role = "member";
        if (adminCode === process.env.ADMIN_CODE) {
            role = "admin";
        }

        // Create new user
       const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        
   const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
         console.error(error);
        res.status(500).json({ message: "Error creating user." });
    }
};

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        // Check if user Exits
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id,
                 role: user.role }, 
                 process.env.JWT_SECRET, 
                 { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email , role: user.role} });
    } catch (error) {
        res.status(500).json({ message: "Error logging in." });
    }
}