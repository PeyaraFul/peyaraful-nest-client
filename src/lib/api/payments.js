"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//get all payments
export const getPayments = async () => {
  const response = await fetch(`${baseUrl}/api/payments`);
  const data = await response.json();

  return data;
};

//get a single payment by owner id
export const getPaymentData = async (id) => {
  const response = await fetch(`${baseUrl}/api/payments/${id}`);
  const data = await response.json();

  return data;
};


// createPayment
export const createPayment = async (data) => {
  const response = await fetch(`${baseUrl}/api/createPayment`, {
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
