const express = require("express");
const router = express.Router();
const cloudinary = require("../helpers/cloudinary");
const upload = require("../helpers/multer");

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new image
    const newImage = {
      cloudinary_id: result.public_id,
      image_url: result.secure_url,
    };
    // Save image
    await newImage.save();
    res.json(newImage);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;