import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";

export async function POST(req) {
  try {
    await connectMongoDB(); // Ensure the database connection is established

    const body = await req.json();
    const { title, content, author, imageUrl } = body;

    // Validate input
    if (!title || !content || !author) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, or author" },
        { status: 400 }
      );
    }

    // Save to the database
    const newBlog = await Blog.create({
      title,
      content,
      author,
      image: imageUrl || null, // Optional field
    });

    return NextResponse.json(newBlog, { status: 201 }); // Return the created blog post
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
