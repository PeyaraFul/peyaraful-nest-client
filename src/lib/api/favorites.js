"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFavorites = async ({ tenantId }) => {
  const response = await fetch(`${baseUrl}/api/favorites/tenant/${tenantId}`);
  const data = await response.json();

  return data;
};

//add a property to favorites
export const createFavorite = async (data) => {
  const response = await fetch(`${baseUrl}/api/createFavorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    ...result,
  };
};

//delete a property from favorites
export const deleteFavorite = async (id) => {
  const response = await fetch(`${baseUrl}/api/deleteFavorite/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    ...result,
  };
};
