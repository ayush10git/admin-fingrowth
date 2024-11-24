import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";

export async function POST(req) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { title, content, author, imageUrl } = body;

    // Validate input
    if (!title || !content || !author) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, or author" },
        { status: 400 }
      );
    }

    const newBlog = await Blog.create({
      title,
      content,
      author,
      image: imageUrl || null,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();

    const blogs = await Blog.find({});

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}