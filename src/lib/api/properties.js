"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//getting all properties for admin dashboard
export const getProperties = async () => {
  const response = await fetch(`${baseUrl}/api/properties`);
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
export const getProperty = async (propertyId) => {
  const response = await fetch(`${baseUrl}/api/properties/${propertyId}`);
  const data = await response.json();

  return data;
};

//getting a single property by owner id for my properties page
export const getOwnerProperty = async (ownerId) => {
  const response = await fetch(`${baseUrl}/api/properties/owner/${ownerId}`);
  const data = await response.json();

  return data;
};

//creating a new property
export const createProperty = async (data) => {
  const response = await fetch(`${baseUrl}/api/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};

//updating a property
export const updateProperty = async (id, propertyData) => {
  const response = await fetch(`${baseUrl}/api/properties/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(propertyData),
  });

  const result = await response.json();

  return result;
};

//adding reviews to a property
export const addReviewProperty = async (id, propertyData) => {
  const response = await fetch(`${baseUrl}/api/properties/review/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(propertyData),
  });

  const result = await response.json();

  return result;
};

//deleting a property
export const deleteProperty = async (id) => {
  const response = await fetch(`${baseUrl}/api/properties/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  return result;
};
