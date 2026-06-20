"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFavorites = async ({ tenantId }) => {
  const response = await fetch(`${baseUrl}/api/favorites/tenant/${tenantId}`);
  const data = await response.json();

  return data;
};
