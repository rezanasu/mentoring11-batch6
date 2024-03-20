const express = require("express");
const router = express.Router();
const gameRouter = require("./gameRoute.js")
const path = require("path");


router.use("/api/images", express.static(path.join(__dirname, "../uploads")))
router.use("/api/games", gameRouter)



module.exports = router;