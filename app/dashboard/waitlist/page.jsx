"use client"
import React, { useState, useEffect } from "react";
import { getWaitlistedUsers } from "@/lib/action";
import WaitlistComponent from "@/components/WaitlistComponent";

const WaitlistPage = () => {
  const [waitlistedUsers, setWaitlistedUsers] = useState([]);
  
  // Fetch the waitlisted users when the component mounts
  useEffect(() => {
    async function fetchWaitlistedUsers() {
      const users = await getWaitlistedUsers();
      setWaitlistedUsers(users);
    }
    fetchWaitlistedUsers();
  }, []);

  // Function to handle status update (Accept or Reject)
  const handleStatusChange = async (userId, status) => {
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      // On success, remove the user from the list
      setWaitlistedUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.error("Error updating user status:", error.message);
    }
  };

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
          {waitlistedUsers.length > 0 ? (
            waitlistedUsers.map((user) => (
              <WaitlistComponent
                key={user._id}
                email={user.email}
                status={user.waitlist_status}
                createdAt={user.createdAt}
                onAccept={() => handleStatusChange(user._id, "ACCEPTED")}
                onReject={() => handleStatusChange(user._id, "REJECTED")}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-lg">
                No users in the waitlist.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WaitlistPage;
