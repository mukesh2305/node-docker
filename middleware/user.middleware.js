const protect = (req, res, next) => {
    const { user } = req.session;
    console.log("user", user);
    if (!user) {
        return res.status(401).json({
            message: "Auth failed!"
        });
    }
    req.user = user;
    next();
}

module.exports = protect;