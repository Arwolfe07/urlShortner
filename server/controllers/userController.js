const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.signup = asyncHandler(async (req, res) => {
    const { email, password, name, location } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ message: 'User already exist\'s' })
        }
        const hashedPassword = await bcrypt.hash(password, 12); // second argument is salt
        const newUser = await User.create({ email, name, password: hashedPassword, location });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: { name: newUser.name, location: newUser.location, email: newUser.email, profilePic: newUser.profilePic, verified: newUser.isVerified }, token });
    } catch (error) {
        res.status(500).json("Something went wrong...");
    }
});

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User doesn\'t exist' });
        }

        const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: { name: existingUser.name, location: existingUser.location, email: existingUser.email, profilePic: existingUser.profilePic, verified: existingUser.isVerified }, token });

    } catch (error) {
        res.status(500).json("Something went wrong...");
    }
};