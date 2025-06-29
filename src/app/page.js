import Image from "next/image";
import HotelList from "@/components/hotellist";
export default function Home() {
  return (
<div>
  <h1 className=" text-2xl font-bold  text-center">welcome</h1>
  <HotelList/>

</div>
  );
}