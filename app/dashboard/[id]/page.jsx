"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { deletePost, getAllBlogs, updatePost } from "@/lib/action";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });
  const [imageFile, setImageFile] = useState(null); // Handle image file separately
  const router = useRouter();

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
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="bg-[#F4F1EF] min-h-screen px-10 py-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-denton text-4xl">{blog.title}</h1>
        <div className="flex flex-col">
          <span className="font-gilroy">{blog.author}</span>
          <span className="font-gilroy font-light text-sm">
            {blog.publishDate}
          </span>
        </div>
      </div>

      <div className="flex gap-8">
        <Image
          src={blog.image}
          height={2000}
          width={2000}
          className="w-[370px]"
          alt="Blog Image"
        />
        <div>
          {blog.content.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 text-gray-600 font-gilroy text-[17px] font-medium"
            >
              {paragraph.trim()}
            </p>
          ))}
          <div className="flex gap-4 mt-6 justify-end">
            <button
              onClick={handleEdit}
              className="btn text-white font-medium font-gilroy rounded-lg px-5 py-1 w-[6rem] hover:scale-105 transition-transform ease-in-out duration-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn text-white font-medium font-gilroy rounded-lg px-5 py-1 w-[6rem] hover:scale-105 transition-transform ease-in-out duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl mb-4">Edit Blog</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block mb-2">
                  Image (Upload new image)
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="5"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn text-white font-medium font-gilroy rounded-lg px-5 py-1 w-[6rem] hover:scale-105 transition-transform ease-in-out duration-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white font-medium font-gilroy rounded-lg px-5 py-1 w-[6rem] hover:scale-105 transition-transform ease-in-out duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
