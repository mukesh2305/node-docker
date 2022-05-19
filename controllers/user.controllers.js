const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
exports.signup = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            password: hashedPassword,
        });

        req.session.user = user;
        res.status(201).json({
            message: "User created successfully!",
            user: user
        });
    } catch (err) {
        res.status(500).json({
            message: "Creating user failed!"
        });
    }

}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: "Auth failed!"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            req.session.user = user;
            return res.status(401).json({
                message: "Auth successful!",
            });
        } else {
            res.status(200).json({
                message: "Auth failed!"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Auth failed!"
        });
    }
}
