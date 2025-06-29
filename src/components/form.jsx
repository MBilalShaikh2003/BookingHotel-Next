'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

export default function BookingForm({ pricePerDay = 100 , hotelName=''}) {
  const {data:session}=useSession()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idNumber: '',
    dob: '',
    days: '',
    userID:session?.user?.id,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const days = parseInt(formData.days);
    if (!isNaN(days)) {
      setTotalPrice(days * pricePerDay);
    } else {
      setTotalPrice(0);
    }
  }, [formData.days, pricePerDay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const bookingData = {
    ...formData,
    hotelName,
    pricePerDay,
    totalPrice,
  };

  try {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    const result = await res.json();

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: "Booking Confirmed",
        text: "Your booking has been submitted successfully!",
      });

      setFormData({
        name: '',
        email: '',
        idNumber: '',
        dob: '',
        days: '',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: "Booking Failed",
        text: result.message || "Something went wrong.",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: "Error",
      text: "An unexpected error occurred. Please try again.",
    });
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg mt-10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-red-600">{hotelName} Booking Form</h2>

      <label className="block mb-2">
        Full Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 mt-1 rounded"
        />
      </label>

      <label className="block mb-2">
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 mt-1 rounded"
        />
      </label>

      <label className="block mb-2">
        CNIC / Passport
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          required
          className="w-full border p-2 mt-1 rounded"
        />
      </label>

      <label className="block mb-2">
        Date of Birth
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className="w-full border p-2 mt-1 rounded"
        />
      </label>

      <label className="block mb-2">
        Number of Days
        <input
          type="number"
          name="days"
          value={formData.days}
          onChange={handleChange}
          required
          min="1"
          className="w-full border p-2 mt-1 rounded"
        />
      </label>

      <div className="text-lg font-bold mt-4 mb-6 text-center">
        Total Price: <span className="text-red-600">${totalPrice}</span>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition"
      >
        Submit Booking
      </button>
    </form>
  );
}
