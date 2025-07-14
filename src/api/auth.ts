import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function authenticate() {
  const auth = Buffer.from(
    `${process.env.ADIQ_CLIENT_ID}:${process.env.ADIQ_CLIENT_SECRET}`
  ).toString("base64");
  const response = await axios.post(
    `${process.env.ADIQ_URL}/auth/oauth2/v1/token`,
    { grantType: "client_credentials" },
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.accessToken;
}
