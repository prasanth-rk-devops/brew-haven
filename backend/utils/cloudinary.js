const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'brew-haven/menu'
    });
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (err) {
    throw new Error('Image upload failed: ' + err.message);
  }
};

module.exports = { uploadImage };