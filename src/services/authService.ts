import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function requestToken() {
  const response = await axios.post(
    `${process.env.BASE_URL}/auth/oauth2/v1/token`,
    {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    }
  );
  return response.data;
}
