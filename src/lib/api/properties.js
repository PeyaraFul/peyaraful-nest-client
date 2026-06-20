"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getProperties = async () => {
  const response = await fetch(`${baseUrl}/api/properties`);
  const data = await response.json();

  return data;
};

export const getProperty = async (id) => {
  const response = await fetch(`${baseUrl}/properties/${id}`);
  const data = await response.json();

  return data;
};

// export const createProperty = async (data) => {
//   const response = await fetch(`${baseUrl}/properties`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();

//   return result;
// };

// export const updateProperty = async (id, data) => {
//   const response = await fetch(`${baseUrl}/properties/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();

//   return result;
// };

// export const deleteProperty = async (id) => {
//   const response = await fetch(`${baseUrl}/properties/${id}`, {
//     method: "DELETE",
//   });

//   const result = await response.json();

//   return result;
// };
