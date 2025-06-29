import { connectMongoDB } from "@/lib/mongodb";
import  Booking  from "@/model/bookings";
import { NextResponse } from "next/server";

export async function POST(req){
try {
    const data=await req.json()
    await connectMongoDB();
    const booking=new Booking(data)
    await booking.save();

    return NextResponse.json({success:true ,message:"booking saved successfully!"});
} catch (error) {
    return NextResponse.json({success:false, message:error.message},{status:500});
}
}

export async function GET() {
    try{
    await connectMongoDB();
        const bookings=await Booking.find().populate("userID","name email")
        return NextResponse.json({success:true,bookings})
}
catch(error){
    return NextResponse.json({success:false,message:error.message},{status:500})
}


}