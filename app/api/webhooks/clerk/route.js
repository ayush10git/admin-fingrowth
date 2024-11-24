import { clerkClient } from "@clerk/nextjs";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { createUser } from "@/lib/action"; // Your DB action to create a user

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- missing svix headers", {
      status: 400,
    });
  }

  // Parse body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Invalid webhook signature", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, username } = evt.data;

    // Map fields to your user model
    const userData = {
      name: `${first_name} ${last_name}`.trim(),
      email:
        email_addresses[0]?.email_address || "no-email-provided@example.com",
      password: "default_password_placeholder", // Placeholder password
      isAdmin: false, // Default to false unless specified
      waitlist_status: "PENDING", // Default value
    };

    console.log("Mapped user data:", userData);

    try {
      const newUser = await createUser(userData); // Create user in DB

      if (newUser) {
        // Update Clerk's metadata with the new MongoDB user ID
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id.toString(),
          },
        });

        return NextResponse.json({
          message: "New user created successfully",
          user: newUser,
        });
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user in DB:", error);
      return new Response("Failed to create user in DB", { status: 500 });
    }
  }

  console.log(`Unhandled event type: ${eventType}`);
  return new Response("Unhandled event type", { status: 400 });
}
