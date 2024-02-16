const Users = require("../models/User");
const Project = require("../models/Project");
var express = require("express");
var router = express.Router();


router.get('/', async (req, res) => {
    try {
        console.log("getting all the projects")
        const proj = await Project.find();
        res.json({ proj });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// GET a specific project by ID
router.get('/:id', async (req, res) => {
    try {
        console.log("getting project with id " + req.params.id)
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: "project not found" });
        }
        res.json({ project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});


router.post("/getbypidwithuser", async (req, res) => {
    try {
        const proj = await Project.findOne({ pid: req.body.pid }).populate("user")
        if (!proj) return res.json({ msg: "proj NOT FOUND" })
        res.json({ msg: "proj FOUND", data: proj })
    } catch (error) {
        console.error(error)
    }
});

/******* below are all the routes that WILL NOT pass through the middleware ********/
/*
router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: "NOT ADMIN" })
    else next()
})
*/

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
        const proj = await Project.findOne({ pid: req.body.pid})
        if (!proj) return res.json({ msg: "proj NOT FOUND" })
        await Project.deleteOne({ p: req.body.p })
        res.json({ msg: "proj DELETED" })
    } catch (error) {
        console.error(error)
    }
});


// DELETE a project
router.delete('/delete/:id', async (req, res) => {
    try {
      console.log("deleting proj w id" + req.body.pid)
      const proj = await Project.findByIdAndDelete(req.body.pid);
      if (!proj) {
        return res.status(404).json({ msg: "proj not found" });
      }
      res.json({ msg: "proj deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });

module.exports = router
