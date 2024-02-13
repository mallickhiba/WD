const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create a new project
router.post("/createProject", async (req, res) => {
    try {
        const { email, token, ...projectData } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "User not found" });
        }

        try {
            // Verify the token and check if the user is old enough
            const decodedToken = jwt.verify(token, "MY_SECRET");
            if (decodedToken.age < 18) {
                return res.json({ msg: "User is not old enough" });
            }
        } catch (e) {
            return res.json({ msg: "Invalid token" });
        }

        // Create a new project with the user's ID
        const newProject = await Project.create({ ...projectData, user: user._id });

        res.json({ msg: "New project created", project: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Get all projects
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Get a specific project by ID
router.get("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.json({ msg: "Project not found" });
        }
        res.json({ project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Update a project by ID
router.put("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!project) {
            return res.json({ msg: "Project not found" });
        }
        res.json({ msg: "Project updated", project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Delete a project by ID
router.delete("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.json({ msg: "Project not found" });
        }
        res.json({ msg: "Project deleted", project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
