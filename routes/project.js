const Users = require("../models/User");
const Project = require("../models/Project");
var express = require("express");
var router = express.Router();

router.post("/getbypid", async (req, res) => {
    try {
        const proj = await Project.findOne({ pid: req.body.pi })
        if (!proj) return res.json({ msg: "proj NOT FOUND" })
        res.json({ msg: "PROJ FOUND", data: proj })
    } catch (error) {
        console.error(error)
    }
});

router.post("/getbypidwithuser", async (req, res) => {
    try {
        const proj = await Project.findOne({ pid: req.body.pi }).populate("user")
        if (!proj) return res.json({ msg: "proj NOT FOUND" })
        res.json({ msg: "proj FOUND", data: proj })
    } catch (error) {
        console.error(error)
    }
});

/******* below are all the routes that WILL NOT pass through the middleware ********/

router.use((req, res, next) => {
    console.log("fuck this");
    if (!req.user.admin) return res.json({ msg: "NOT ADMIN" })
    else next()
})

/******* below are all the routes that WILL pass through the middleware ********/

router.post("/create", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        await Project.create({ ...req.body, user: user._id })
        res.json({ msg: "proj ADDED" })
    } catch (error) {
        console.error(error)
    }
});

router.post("/deleteBy", async (req, res) => {
    try {
        const proj = await Project.findOne({ pid: req.body.pi })
        if (!proj) return res.json({ msg: "proj NOT FOUND" })
        await Project.deleteOne({ p: req.body.p })
        res.json({ msg: "proj DELETED" })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
