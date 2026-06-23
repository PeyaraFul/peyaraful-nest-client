"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//getting all users
export const getUsers = async () => {
  const response = await fetch(`${baseUrl}/api/users`);
  const data = await response.json();

  return data;
};

//role change
export const updateUserRole = async (id, role) => {
  const response = await fetch(`${baseUrl}/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: role }),
  });

  const result = await response.json();

  return result;
};
