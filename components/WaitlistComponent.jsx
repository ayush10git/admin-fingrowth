import React from "react";

const WaitlistComponent = ({ email, status, createdAt, onAccept, onReject }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2 font-gilroy text-lg">{email}</td>
      <td className="border border-gray-300 px-4 py-2 font-gilroy text-lg text-yellow-500">{status}</td>
      <td className="border border-gray-300 px-4 py-2 font-gilroy text-lg">
        {new Date(createdAt).toLocaleDateString("en-GB")}
      </td>
      <td className="border border-gray-300 px-4 py-2 font-gilroy text-lg flex gap-3 justify-center">
        <button
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded mr-2"
          onClick={onAccept} // Trigger the onAccept function
        >
          Accept
        </button>
        <button
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded"
          onClick={onReject} // Trigger the onReject function
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default WaitlistComponent;
