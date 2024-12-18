const express = require("express");
const { upload } = require("../config/multer");

const {
  uploadMedia,
  deleteMedia,
} = require("../controllers/cloudinary.controller");
const router = express.Router();

router.post("/upload", upload.single("file"), uploadMedia);
router.post("/delete/:id", deleteMedia);

module.exports = router; //defalut export
