import React from "react";

const WaitlistComponent = () => {
  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2 font-gilroy text-lg">
          john@gmail.com
        </td>
        <td className="border border-gray-300 px-4 py-2 font-gilroytext-lg text-yellow-500">
          Pending
        </td>
        <td className="border border-gray-300 px-4 py-2 font-gilroytext-lg">
          28/11/24
        </td>
        <td className="border border-gray-300 px-4 py-2 font-gilroy text-lg flex gap-3 justify-center">
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded mr-2">
            Accept
          </button>
          <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded">
            Reject
          </button>
        </td>
      </tr>
    </>
  );
};

export default WaitlistComponent;
