import mongoose ,{Schema,models} from 'mongoose';

const BookingSchema = new mongoose.Schema({
  userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",

  },
  name: String,
  email: String,
  idNumber: String,
  dob: String,
  days: Number,
  pricePerDay: Number,
  totalPrice: Number,
  hotelName: String,
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite during hot reload in dev
const Booking =models.Booking || mongoose.model('Booking', BookingSchema);
export default Booking;


