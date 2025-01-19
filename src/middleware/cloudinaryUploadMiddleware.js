const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const config = require("@config");

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

// Configure Multer-Storage-Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipe-reel-uploads", // Specify the folder name
    format: async (req, file) => "png", // File format
    public_id: (req, file) => file.originalname.split(".")[0], // File name without extension
  },
});

// Create Multer Instance
const upload = multer({ storage });

// Export Cloudinary and Upload Middleware
module.exports = {
  cloudinary,
  upload,
};
