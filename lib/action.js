import { Blog } from "../models/blog";
import { User } from "../models/user";
import { connectMongoDB } from "../lib/mongodb";
import {uploadImage} from "./uploadImage"

export const getBlog = async (id) => {
    try {
      connectMongoDB();
  
      const blog = await Blog.findById(id);
  
      if (!blog) {
        return { error: "Blog not found" };
      }
  
      console.log("Blog fetched successfully");
      return { success: true, blog };
    } catch (err) {
      console.error(err);
      return { error: "Failed to fetch blog" };
    }
  };

export const getBlogs = async () => {
    try {
      connectMongoDB();
  
      const blogs = await Blog.find();
  
      if (!blogs) {
        return { error: "no Blogs created" };
      }
  
      console.log("Blogs fetched successfully");
      return { success: true, blogs };
    } catch (err) {
      console.error(err);
      return { error: "Failed to fetch blog" };
    }
  };
  
export const addBlog = async (formData) => {
    const { title, desc, image, author } = Object.fromEntries(formData);
    console.log({ title, desc, image, author });
  
    try {
      connectMongoDB();
  
      let uploadedImageUrl = null;
      if (image) {
        uploadedImageUrl = await uploadImage(image); // Upload the image to Cloudinary
      }
  
      const newBlog = new Blog({
        title,
        desc,
        image: uploadedImageUrl, // Save the Cloudinary URL
        author,
      });
  
      await newBlog.save();
      console.log("Blog added successfully");
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: "Failed to add blog" };
    }
  };

export const deleteBlog = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectMongoDB();
  
      await Blog.findByIdAndDelete(id);
      console.log("Blog deleted successfully");
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: "Failed to delete blog" };
    }
  };

export const editBlog = async (formData) => {
    const { id, title, content, image } = Object.fromEntries(formData);
  
    try {
      connectMongoDB();
  
      const updatedFields = { title, content };
      if (image) {
        const uploadedImageUrl = await uploadImage(image); // Upload new image if provided
        updatedFields.image = uploadedImageUrl; // Update the image field
      }
  
      await Blog.findByIdAndUpdate(id, updatedFields);
      console.log("Blog updated successfully");
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: "Failed to update blog" };
    }
  };
  
export const getWaitlistedUsers = async () => {
    try {
      connectMongoDB();
  
      const waitlistedUsers = await User.find({ waitlist_status: "PENDING" });
      console.log("Waitlisted users fetched successfully");
      return waitlistedUsers;
    } catch (err) {
      console.error(err);
      return { error: "Failed to fetch waitlisted users" };
    }
  };



  


