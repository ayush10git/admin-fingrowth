"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BlogCard = ({ id, title, author, image, publishDate }) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col justify-between p-4 m-5 bg-[#EAE8E1] w-[250px] h-[500px] rounded-lg hover:scale-105 transition-transform ease-in-out duration-300 box"
      onClick={() => router.push(`/dashboard/${id}`)} 
    >
      <Image
        src={image}
        width={2000}
        height={2000}
        alt={title}
        className="w-[220px] h-[330px] rounded-t-lg object-cover"
      />
      <div className="flex flex-col">
        <div className="font-gilroy flex gap-2">
          <span>Title: </span>
          <span className="font-denton font-medium">{title}</span>
        </div>
        <span className="font-gilroy ">
          Author: <span className="font-denton font-medium">{author}</span>
        </span>
        <span className="font-gilroy">
          Published on: <span className="font-denton font-medium">{publishDate}</span>
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
