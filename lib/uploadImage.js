import cloudinary from "cloudinary";
import { promisify } from "util";

// Cloudinary configuration
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

// Function to upload an image buffer or file path
export const uploadImage = async (imageFile) => {
  try {
    let uploadResponse;

    if (Buffer.isBuffer(imageFile)) {
      // Convert buffer to a base64 string
      const base64String = `data:image/jpeg;base64,${imageFile.toString("base64")}`;
      uploadResponse = await promisify(cloudinary.v2.uploader.upload)(
        base64String,
        { resource_type: "auto" }
      );
    } else if (typeof imageFile === "string") {
      // If the input is a file path
      uploadResponse = await promisify(cloudinary.v2.uploader.upload)(
        imageFile,
        { resource_type: "auto" }
      );
    } else {
      throw new Error("Unsupported image format");
    }

    return uploadResponse.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("Image upload failed:", error.message);
    throw new Error("Image upload failed: " + error.message);
  }
};
