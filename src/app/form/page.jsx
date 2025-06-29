import BookingForm from "@/components/form"; // adjust path if needed

export default function FormPage({ searchParams }) {
  const price = parseInt(searchParams?.price || "100");
  const name = decodeURIComponent(searchParams?.name || "");

  return <BookingForm pricePerDay={price} hotelName={name} />;
}
