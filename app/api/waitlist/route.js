import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import {User} from "@/models/user"; // Adjust the path based on your project structure

export async function GET() {
  try {
    await connectMongoDB();

    const users = await User.find(
        { waitlist_status: "PENDING" },  // Filter for users with 'PENDING' status
        { email: 1, waitlist_status: 1, createdAt: 1, _id: 1 }  // Select specific fields
      );      

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching waitlisted users:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlisted users" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
    try {
      await connectMongoDB();
  
      const body = await req.json();
      const { userId, status } = body;
  
      // Validate input
      if (!userId || !["ACCEPTED", "REJECTED"].includes(status)) {
        return NextResponse.json(
          { error: "Missing required fields or invalid status" },
          { status: 400 }
        );
      }
  
      // Update the user's waitlist_status
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { waitlist_status: status },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return NextResponse.json(
          { error: "User not found or update failed" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      console.error("Error processing POST request:", error);
      return NextResponse.json(
        { error: "Failed to update user waitlist status" },
        { status: 500 }
      );
    }
  }

//   export async function createDummyUsers() {
//     try {
//       // Connect to MongoDB
//       await connectMongoDB();
  
//       // Dummy data for users
//       const dummyUsers = Array.from({ length: 10 }).map((_, index) => ({
//         name: `User ${index + 1}`,
//         email: `user${index + 1}@example.com`,
//         password: "dummyPassword123", // Ideally, this should be hashed before storage
//         isAdmin: false, // Non-admin users
//         waitlist_status: "PENDING", // All users have PENDING status
//       }));
  
//       // Insert dummy users into the database
//       const insertedUsers = await User.insertMany(dummyUsers);
  
//       console.log(`${insertedUsers.length} dummy users added successfully.`);
//       return insertedUsers;
//     } catch (error) {
//       console.error("Error adding dummy users:", error);
//       throw error;
//     }
//   }

//   export async function PUT() {
//     try {
//       createDummyUsers();
  
//       return NextResponse.json({msg:"summy added successfully"}, { status: 200 });
//     } catch (error) {
//       console.error("Error fetching waitlisted users:", error);
//       return NextResponse.json(
//         { error: "Failed to fetch waitlisted users" },
//         { status: 500 }
//       );
//     }
//   }
  
  
  