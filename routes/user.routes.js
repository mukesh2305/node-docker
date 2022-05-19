const express = require("express");
const router = express.Router();
const protect = require("../middleware/user.middleware").default;
const userController = require("../controllers/user.controllers");


router.post('/signup', userController.signup);
router.post('/login', userController.login);
module.exports = router;