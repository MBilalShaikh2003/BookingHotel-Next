'use client';
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const HotelCard = ({ hotel }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBookNow = () => {
    if (!session?.user) {
      Swal.fire({
            icon: 'error',
            title: "LogIn To Book",
            text: "Please LogIn To Book Now !.",
          })
    } else {
      // Pass hotel name and price as query parameters
      const encodedName = encodeURIComponent(hotel.name);
      router.push(`/form?price=${hotel.pricePerDay}&name=${encodedName}`);
    }
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={hotel.image} alt={hotel.name} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
        <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-red-600">${hotel.pricePerDay}/day</span>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
