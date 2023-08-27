const express = require("express");
const {isAuthenticated} = require("../middleware/auth");
const { usersignup, homepage, usersignin, usersignout, userupdate, currentUserInfo, userList, userDelete } = require("../controllers/userController");
const router = express.Router();

router.get("/", homepage);

router.get("/currentUser", isAuthenticated, currentUserInfo);

router.post("/signup", usersignup);

router.post("/login", usersignin);

router.get("/signout", isAuthenticated, usersignout);

router.post("/update/:id", isAuthenticated, userupdate); 

router.get("/userList",userList);

router.get("/delete/:id", userDelete);


module.exports = router;