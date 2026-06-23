"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBookings = async (Id) => {
  const response = await fetch(`${baseUrl}/api/bookings/${Id}`);
  const data = await response.json();

  return data;
};

// export const createBooking = async (data) => {
//   const response = await fetch(`${baseUrl}/api/bookings`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();

//   return result;
// };

// export const updateBooking = async (id, bookingStatus) => {
//   const response = await fetch(`${baseUrl}/api/bookings/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(bookingStatus),
//   });

//   const result = await response.json();

//   return result;
// };

export const updateBooking = async (id, updatedData) => {
  const response = await fetch(`${baseUrl}/api/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return response.json();
};

// export const deleteBooking = async (id) => {
//   const response = await fetch(`${baseUrl}/api/bookings/${id}`, {
//     method: "DELETE",
//   });

//   const result = await response.json();

//   return result;
// };

// export const updateBooking = async (id, updatedData) => {
//   if (!id) {
//     console.error("Error: Booking ID is missing or undefined!");
//     return null;
//   }

//   const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

//   // ইউআরএলটি কনসোলে প্রিন্ট করে দেখুন ঠিকঠাক তৈরি হচ্ছে কিনা
//   console.log(`Sending PATCH request to: ${cleanBaseUrl}/api/bookings/${id}`);

//   const response = await fetch(`${cleanBaseUrl}/api/bookings/${id}`, {
//     method: "PATCH", // ব্যাকএন্ডে PUT হলে এখানে PUT লিখুন
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedData),
//   });

//   // যদি ৫00 বা অন্য কোনো এরর আসে
//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error(
//       `Server responded with status ${response.status}:`,
//       errorText,
//     );
//     throw new Error(`Server Error: ${response.status}`);
//   }

//   return response.json();
// };
