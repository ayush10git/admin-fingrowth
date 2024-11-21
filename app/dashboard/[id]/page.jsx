"use client";
import { useParams, useRouter } from "next/navigation";
import { blogs } from "@/data";
import Image from "next/image";

const BlogDetails = () => {
  const { id } = useParams();

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="bg-[#F4F1EF] min-h-screen px-10 py-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-denton text-4xl">{blog.title}</h1>
        <div className="flex flex-col">
          <span className="font-denton">{blog.author}</span>
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
        />
        <div className="">
          {blog.content.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 text-gray-600 font-gilroy text-[17px] font-medium"
            >
              {paragraph.trim()}
            </p>
          ))}
          <div className="flex gap-4 mt-6 justify-end">
            <button className="btn text-white font-medium font-gilroy rounded-lg px-5 py-1 w-[6rem] hover:scale-105 transition-transform ease-in-out duration-600">
              Edit
            </button>
            <button className="btn text-white font-medium font-gilroy rounded-lg px-5 py-1 w-[6rem] hover:scale-105 transition-transform ease-in-out duration-300">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
