const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    ThumbnailURL: { type: String, required: true },
    VideoURL: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("VideoDetails", VideoSchema);