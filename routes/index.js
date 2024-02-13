const express = require('express');
const router = express.Router();

const authRouter = require("./auth");
const projectRouter = require("./project");
const taskRouter = require("./task");
const activityRouter = require("./activity");


router.use("/auth", authRouter);
router.use("/project", projectRouter);
router.use("/task", taskRouter);
router.use("/activity", activityRouter);

module.exports = router;