import Image from "next/image";
import Link from "next/link";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

const Navbar = async () => {
  const user = await currentUser();

  console.log(user.firstName);

  return (
    <div className="flex items-center justify-between bg-[#EAE8E1] h-[70px] shadow-sm">
      <Image
        src="/logo.png"
        width={2000}
        height={2000}
        alt="fingrowth-logo"
        className="w-[12rem]"
      />
      <div className="flex items-center gap-3">
        <span className="text-[12px] font-gilroy">Welcome,</span>
        <span className="font-denton text-lg">
          {user.firstName + " " + user.lastName}
        </span>
      </div>
      <div className="flex gap-7 items-center justify-center font-gilroy text-md">
        <Link href="/dashboard/add">Add Blog</Link>
        <Link href="/dashboard/waitlist">Waitlist</Link>
        <SignOutButton className="btn flex items-center justify-center gap-1 md:px-[32px] md:py-[10px] text-white rounded-full mr-4" />
      </div>
    </div>
  );
};

export default Navbar;
