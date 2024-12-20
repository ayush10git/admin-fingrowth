"use server";

import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { revalidatePath } from "next/cache";

export async function createUser(user) {
  try {
    await connectMongoDB();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
}

export async function getAllBlogs() {
  try {
    const response = await fetch(`http://localhost:3000/api/blog`, {
      cache: "no-store", // Avoid caching for fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const blogs = await response.json();
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    throw error; // Let the calling code handle the error
  }
}

export async function getBlogById(id) {
  try {
    // Use the id to fetch the specific blog from the API
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      cache: "no-store", // Avoid caching for fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }

    const blog = await response.json(); // The server should return a single blog object
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    throw error; // Let the calling code handle the error
  }
}

export const deletePost = async (id) => {
  try {
    connectMongoDB();

    await Blog.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/dashboard");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

