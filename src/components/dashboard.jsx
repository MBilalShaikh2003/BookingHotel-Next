'use client';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/booking');
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);


  const handleReject = async (id) => {
  try {
    const res = await fetch(`/api/booking/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.success) {
      await Swal.fire({
        icon: 'success',
        title: "Booking Rejected",
        text: "The booking has been deleted successfully!",
      });

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } else {
      console.error("Failed to delete booking", result.message);
    }
  } catch (error) {
    console.error("Error to delete booking", error);
    Swal.fire({
      icon: 'error',
      title: "Booking Not Rejected",
      text: "An error occurred while rejecting.",
    });
  }
};

const handleApprove = async (booking) => {
  try {
    const res = await fetch('/api/send-approval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: booking.email,
        name: booking.name,
        hotelName: booking.hotelName,
      }),
    });

    const result = await res.json();

    if (result.success) {
      await Swal.fire({
        icon: 'success',
        title: 'Booking Approved!',
        text: 'Confirmation email sent to user.',
      });
    } else {
      console.error(result.error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send confirmation email.',
      });
    }
  } catch (err) {
    console.error('Approval Error:', err);
    Swal.fire({
      icon: 'error',
      title: 'Network Error',
      text: 'Please try again later.',
    });
  }
};



  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Hotel</th>
              <th className="border p-2">Days</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Booked At</th>
              <th className="border p-2">Approve</th>
              <th className="border p-2">Reject</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border p-2">{booking.name}</td>
                <td className="border p-2">{booking.email}</td>
                <td className="border p-2">{booking.hotelName}</td>
                <td className="border p-2">{booking.days}</td>
                <td className="border p-2">${booking.totalPrice}</td>
                <td className="border p-2">{new Date(booking.bookedAt).toLocaleString()}</td>
                <td className="border p-2"><button className=' bg-green-400 font-bold text-white rounded-2xl p-4  hover:bg-green-700 hover:cursor-pointer' onClick={()=>handleApprove(booking)}>Approve</button></td>
                <td className="border p-2"><button className=' bg-red-400 font-bold text-white rounded-2xl p-4 hover:bg-red-700 hover:cursor-pointer ' onClick={()=>handleReject(booking._id)}>Reject</button></td>
              </tr>
            ))}
          </tbody>     
        </table>
      )}
    </div>
  );
}

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ⛔ Redirect if not admin
//   useEffect(() => {
//     if (status === 'loading') return; // wait for session to load

//     if (!session) {
//       router.push('/login'); // not logged in
//     } else if (session.user.role !== 'admin') {
//       router.push('/'); // not admin
//     }
//   }, [session, status, router]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await fetch('/api/booking');
//         const data = await res.json();
//         if (data.success) {
//           setBookings(data.bookings);
//         }
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (session?.user?.role === 'admin') {
//       fetchBookings();
//     }
//   }, [session]);

//   const handleReject = async (id) => {
//     try {
//       const res = await fetch(`/api/booking/${id}`, {
//         method: "DELETE",
//       });
//       const result = await res.json();
//       if (result.success) {
//         await Swal.fire({
//           icon: 'success',
//           title: "Booking Rejected",
//           text: "The booking has been deleted successfully!",
//         });

//         setBookings((prev) => prev.filter((booking) => booking._id !== id));
//       } else {
//         console.error("Failed to delete booking", result.message);
//       }
//     } catch (error) {
//       console.error("Error to delete booking", error);
//       Swal.fire({
//         icon: 'error',
//         title: "Booking Not Rejected",
//         text: "An error occurred while rejecting.",
//       });
//     }
//   };

//   if (status === 'loading' || (session && session.user.role !== 'admin')) {
//     return <p className="text-center mt-10">Loading or Redirecting...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       {loading ? (
//         <p>Loading bookings...</p>
//       ) : bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <table className="w-full table-auto border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Hotel</th>
//               <th className="border p-2">Days</th>
//               <th className="border p-2">Total Price</th>
//               <th className="border p-2">Booked At</th>
//               <th className="border p-2">Approve</th>
//               <th className="border p-2">Reject</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td className="border p-2">{booking.name}</td>
//                 <td className="border p-2">{booking.email}</td>
//                 <td className="border p-2">{booking.hotelName}</td>
//                 <td className="border p-2">{booking.days}</td>
//                 <td className="border p-2">${booking.totalPrice}</td>
//                 <td className="border p-2">{new Date(booking.bookedAt).toLocaleString()}</td>
//                 <td className="border p-2">
//                   <button className='bg-green-400 font-bold text-white rounded-2xl p-4 hover:bg-green-700 hover:cursor-pointer'>Approve</button>
//                 </td>
//                 <td className="border p-2">
//                   <button
//                     className='bg-red-400 font-bold text-white rounded-2xl p-4 hover:bg-red-700 hover:cursor-pointer'
//                     onClick={() => handleReject(booking._id)}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
