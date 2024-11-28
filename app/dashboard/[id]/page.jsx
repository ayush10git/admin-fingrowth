"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { deletePost, getAllBlogs } from "@/lib/action";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogs = await getAllBlogs();
        const selectedBlog = blogs.find((b) => b._id === id);
        setBlog(selectedBlog);
        setFormData({
          title: selectedBlog.title,
          image: selectedBlog.image,
          content: selectedBlog.content,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      alert("Blog deleted successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) return <div>Loading...</div>;

  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="bg-[#F4F1EF] min-h-screen px-10 py-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-denton text-4xl">{blog.title}</h1>
        <div className="flex flex-col">
          <span className="font-gilroy">{blog.author}</span>
          <span className="font-gilroy font-light text-sm">
            {new Date(blog.publishDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex gap-8">
        <Image
          src={blog.image}
          height={200}
          width={200}
          alt="Blog Image"
          className="rounded-md"
        />
        <div>
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-600">
              {paragraph.trim()}
            </p>
          ))}
          <div className="flex gap-4 mt-6 justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">Edit Blog</h2>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ml-2 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
