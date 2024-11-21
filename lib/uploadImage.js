import cloudinary from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
export const uploadImage = async (image) => {
  try {
    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        image,
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
    });
    return uploadedImage; // Return the secure URL of the uploaded image
  } catch (error) {
    throw new Error("Image upload failed: " + error.message);
  }
};
