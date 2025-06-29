import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/model/user";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();

    const user = await User.findOne({ email }).select("_id");

    return NextResponse.json({ userExists: !!user }, { status: 200 });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
