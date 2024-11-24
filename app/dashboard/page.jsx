import BlogCard from "@/components/BlogCard";
import { blogs } from "@/data";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();

  return (
    <div className="h-full min-h-[calc(100vh-70px)] flex flex-wrap justify-center bg-[#F4F1EF]">
      {blogs.map((blog) => (
        <div className="">
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            image={blog.image}
            author={user.firstName + user.lastName}
            publishDate={blog.publishDate}
          />
        </div>
      ))}
    </div>
  );
};

export default page;
