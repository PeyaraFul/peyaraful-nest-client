"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//getting all properties for admin dashboard
export const getProperties = async (token) => {
  const response = await fetch(`${baseUrl}/api/properties`,{
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
};
//getting approved properties for public view
export const getApprovedProperties = async () => {
  const response = await fetch(`${baseUrl}/api/properties/approved`);
  const data = await response.json();

  return data;
};

//getting featured section  properties
export const getFeaturedProperties = async () => {
  const response = await fetch(`${baseUrl}/api/properties/featured`);
  const data = await response.json();

  return data;
};

//getting a single property by property id for details page
export const getProperty = async (propertyId,token) => {
  const response = await fetch(`${baseUrl}/api/properties/${propertyId}`,{
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
};

//getting a single property by owner id for my properties page
export const getOwnerProperty = async (ownerId,token) => {
  const response = await fetch(`${baseUrl}/api/properties/owner/${ownerId}`,{
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
};

//creating a new property
export const createProperty = async (data, token) => {
  const response = await fetch(`${baseUrl}/api/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};

//updating a property
export const updateProperty = async (id, propertyData, token) => {
  const response = await fetch(`${baseUrl}/api/properties/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });

  const result = await response.json();

  return result;
};

//adding reviews to a property
export const addReviewProperty = async (id, propertyData, token) => {
  const response = await fetch(`${baseUrl}/api/properties/review/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });

  const result = await response.json();

  return result;
};

//deleting a property
export const deleteProperty = async (id, token) => {
  const response = await fetch(`${baseUrl}/api/properties/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  return result;
};
