const express = require("express");
const UserController = require("../components/users/UserController");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const { authentication, authorization } = Auth;

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/all",[authorization], [authentication], UserController.getAllUser);
router.get("/unique/:id", [authentication], UserController.getUserDetail);
router.patch('/update/:id',[authentication],UserController.updateUser);
router.put('/delete/:id',[authorization],[authentication],UserController.deactivateUser);


module.exports = router;
