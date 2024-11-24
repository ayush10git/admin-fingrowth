import BlogCard from "@/components/BlogCard";
import { blogs } from "@/data";

const page = () => {
  return (
    <div className="h-full min-h-[calc(100vh-70px)] flex flex-wrap justify-center bg-[#F4F1EF]">
      {blogs.map((blog) => (
        <div className="">
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            image={blog.image}
            author={blog.author}
            publishDate={blog.publishDate}
          />
        </div>
      ))}
    </div>
  );
};

export default page;
