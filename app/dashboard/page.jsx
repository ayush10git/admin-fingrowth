import BlogCard from "@/components/BlogCard";
// import { blogs } from "@/data";
import { currentUser } from "@clerk/nextjs/server";
import { getAllBlogs } from "@/lib/action";

const page = async () => {
  const user = await currentUser();

  const blogs = await getAllBlogs();
  

  return (
    <div className="h-full min-h-[calc(100vh-70px)] flex flex-wrap justify-center bg-[#F4F1EF]">
      {blogs.map((blog) => (
        <div className="">
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            image={blog.image}
            author={blog.author}
            publishDate={new Date(blog.createdAt).toLocaleDateString("en-GB")}
          />
        </div>
      ))}
    </div>
  );
};

export default page;
