"use client";
import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5"; // For image icon

const BlogPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("desc", formData.desc);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("author", "Author Name"); // Add the author dynamically or statically

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Blog post added successfully!");
        setFormData({
          title: "",
          image: null,
          desc: "",
        });
      } else {
        setError(result.error || "An error occurred while adding the blog.");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto box p-8 rounded-xl space-y-6"
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Add New Blog
      </h2>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-gray-600 font-medium mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors ease-in-out"
        />
      </div>

      {/* Custom Image Input */}
      <div className="flex flex-col">
        <label htmlFor="image" className="block text-gray-600 font-medium mb-2">
          Choose Image
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="image"
            className="cursor-pointer bg-gradient-to-r from-black to-[#32325d] text-white py-4 px-8 rounded-full flex items-center justify-center w-full sm:w-[270px] hover:scale-105 transform transition-all duration-300 ease-in-out shadow-lg"
          >
            <IoImageOutline size={24} className="mr-2" />
            <span className="font-medium">Click to select</span>
          </label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleChange}
            className="hidden"
          />
        </div>
        {formData.image && (
          <div className="mt-4 text-gray-600">
            <span>Selected: {formData.image.name}</span>
          </div>
        )}
        {formData.image && formData.image.type.startsWith("image") && (
          <div className="mt-4 flex justify-center">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="max-w-[200px] h-auto rounded-lg border-2 border-gray-200"
            />
          </div>
        )}
      </div>

      {/* Description Textarea */}
      <div>
        <label htmlFor="desc" className="block text-gray-600 font-medium mb-2">
          Description
        </label>
        <textarea
          id="desc"
          name="desc"
          placeholder="Write your blog content here"
          value={formData.desc}
          onChange={handleChange}
          rows={6}
          className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors ease-in-out"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 mt-6 text-white bg-gradient-to-r from-black to-[#32325d] rounded-full hover:scale-105 transition-all duration-300 ease-in-out shadow-lg ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding Blog..." : "Add Blog Post"}
      </button>

      {error && <div className="text-red-600 mt-4">{error}</div>}
    </form>
  );
};

export default BlogPostForm;
