"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBookings = async ({ tenantId }) => {
  const response = await fetch(`${baseUrl}/api/bookings/tenant/${tenantId}`);
  const data = await response.json();

  return data;
};
