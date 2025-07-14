import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.ADIQ_URL;

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.ADIQ_CLIENT_ID}:${process.env.ADIQ_CLIENT_SECRET}`
  ).toString("base64");

  const response = await axios.post(
    `${BASE_URL}/auth/oauth2/v1/token`,
    { grantType: "client_credentials" },
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.accessToken;
}

export async function consultarPorPaymentId(paymentId: string) {
  const token = await getAccessToken();

  const response = await axios.get(`${BASE_URL}/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function consultarPorOrderNumber(
  orderNumber: string,
  dataFormatoYyyyMmDd: string
) {
  const token = await getAccessToken();

  const response = await axios.get(
    `${BASE_URL}/v1/payments/${orderNumber}/${dataFormatoYyyyMmDd}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
