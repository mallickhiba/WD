var express = require("express");
var router = express.Router();
const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ email });
    if (user) return res.json({ msg: "User Already Exists" });
    await Users.create({
      ...req.body,
      password: await bcrypt.hash(password, 5),
    });
    return res.json({ msg: "User Registered" });
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.json({ msg: "User not found" });

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) return res.json({ msg: "Wrong Password" });

    const token = jwt.sign(
      {
        email,
        createdAt: new Date(),
        age: user.age,
      },
      "MY_SECRET",
      { expiresIn: "1d" }
    );
    res.json({
      msg:
        "Logged in sucessfully. this user is an admin: " + user.admin + " token: " +token,});
  } 
  catch (error) {
    console.error(error);
  }
});

module.exports = router;
