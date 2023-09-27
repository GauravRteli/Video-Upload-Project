const express = require("express");
const router = express.Router();
const cloudinary = require("../Configs/CloudinaryConfig");
const upload = require("../Configs/multerConfig");
const VideoSchema = require("../Models/VideoSchema");
const UploadToDB = require("../Utils/UploadsDB");
const cors = require("cors");

const uploadFileToCloudinary = async (filePath, resourceType) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: resourceType,
      chunk_size: 6000000,
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ],
      eager_async: true,
    });
    return result;
  } catch (error) {
    console.error(`Error uploading file to Cloudinary: ${error}`);
    throw error;
  }
};

router.post(
  "/upload",
  upload.fields([{ name: "image" }, { name: "video" }]),
  async (req, res) => {
    console.log("Called")
    // Accessing the uploaded 'thumbnail' and 'video' files via req.files
    if (!req.files || !req.files["image"] || !req.files["video"]) {
      return res
        .status(400)
        .json({ error: "Both thumbnail and video files are required" });
    }
    const title = req.body.title;
    const description = req.body.description;

    try {
      const thumbnailFile = req.files["image"][0];
      const videoFile = req.files["video"][0];

      // Upload the thumbnail image to Cloudinary
      const thumbnailResult = await uploadFileToCloudinary(
        thumbnailFile.path,
        "image"
      );

      // Upload the video file to Cloudinary
      const videoResult = await uploadFileToCloudinary(videoFile.path, "video");

      const result = await UploadToDB(
        title,
        description,
        thumbnailResult.secure_url,
        videoResult.secure_url
      );

      // Respond to the client once both uploads are complete
      res.status(200).send({
        data: result,
      });
    } catch (error) {
      // Handle any errors that occur during the uploads or processing
      console.error(error);
      res.status(500).send("An error occurred during file upload.");
    }
  }
);

router.get("/getAllVideos", async (req, res) => {
  console.log("called");
  const data = await VideoSchema.find({});
  if (data) {
    res.status(200).send({
      data: data,
    });
  } else {
    res.status(400).send({
      message: "video not found !",
    });
  }
});
router.post("/getVideo", async (req, res) => {
  console.log("called");
  console.log(req.body);
  const data = await VideoSchema.findById(req.body.id);
  if (data) {
    res.status(200).send({
      data: data,
    });
  } else {
    res.status(400).send({
      message: "video not found !",
    });
  }
});

module.exports = router;
