const VideoSchema = require("../Models/VideoSchema");
const UploadToDB = async (title, description, imageurl, videourl) => {
    const VideoDetails = new VideoSchema({
        Title : title,
        Description : description,
        ThumbnailURL : imageurl,
        VideoURL : videourl
    })
    const data = await VideoDetails.save();
    return data;
}
module.exports = UploadToDB