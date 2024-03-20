const express = require("express");
const router = express.Router();
const GameController = require("../controllers/gameController.js")
const multer = require("../middlewares/multer.js")

router.get("/", GameController.findAll);
router.get("/:id", GameController.findOne);
router.post("/", GameController.create);
router.post("/uploads", multer, GameController.uploads);
router.put("/:id", GameController.update);
router.delete("/:id", GameController.destroy);


module.exports = router;