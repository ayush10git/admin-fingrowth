import React from "react";
import WaitlistComponent from "@/components/WaitlistComponent";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <table className="table-auto border-collapse border border-gray-300 min-w-[1000px] text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 font-gilroy font-medium text-lg">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 font-gilroy font-medium text-lg">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 font-gilroy font-medium text-lg">
              Request Date
            </th>
            <th className="border border-gray-300 px-4 py-2 font-gilroy font-medium text-lg text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <WaitlistComponent />
          <WaitlistComponent />
          <WaitlistComponent />
          <WaitlistComponent />
          <WaitlistComponent />
          <WaitlistComponent />
          <WaitlistComponent />
        </tbody>
      </table>
    </div>
  );
};

export default page;
