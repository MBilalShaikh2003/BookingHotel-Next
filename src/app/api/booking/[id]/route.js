import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/model/bookings";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;
    await Booking.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Booking deleted." });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
