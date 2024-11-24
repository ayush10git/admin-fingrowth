import { getBlog, getBlogs, addBlog, deleteBlog, editBlog, getWaitlistedUsers } from "../../../lib/action"
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  
    try {
      if (id) {
        // Fetch a specific blog
        const response = await getBlog(id);
        if (response.error) {
          return new Response(JSON.stringify({ error: response.error }), { status: 404 });
        }
        return new Response(JSON.stringify(response.blog), { status: 200 });
      }
      else{
        const response = await getBlogs;
        if (response.error) {
          return new Response(JSON.stringify({ error: response.error }), { status: 404 });
        }
        return new Response(JSON.stringify(response.blogs), { status: 200 });
      }
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
    }
  };

export const POST = async (req) => {
    try {
      const formData = await req.formData();
      const response = await addBlog(formData);
  
      if (response.error) {
        return new Response(JSON.stringify({ error: response.error }), { status: 400 });
      }
      return new Response(JSON.stringify({ success: true }), { status: 201 });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "Failed to add blog" }), { status: 500 });
    }
  };

export const PUT = async (req) => {
    try {
      const formData = await req.formData();
      const response = await editBlog(formData);
  
      if (response.error) {
        return new Response(JSON.stringify({ error: response.error }), { status: 400 });
      }
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "Failed to update blog" }), { status: 500 });
    }
  };

export const DELETE = async (req) => {
    try {
      const formData = await req.formData();
      const response = await deleteBlog(formData);
  
      if (response.error) {
        return new Response(JSON.stringify({ error: response.error }), { status: 400 });
      }
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "Failed to delete blog" }), { status: 500 });
    }
  };
  
