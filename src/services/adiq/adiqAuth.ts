import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.CLIENT_ID!;
const clientSecret = process.env.CLIENT_SECRET!;
const baseUrl = process.env.ADIQ_BASE_URL!;

export interface TokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
}

export async function getAdiqAccessToken(): Promise<TokenResponse> {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const response = await axios.post<TokenResponse>(
      `${baseUrl}/auth/oauth2/v1/token`,
      { grantType: "client_credentials" },
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao obter token da Adiq:",
      error.response?.data || error.message
    );
    throw new Error("Falha na autenticação com o gateway Adiq");
  }
}
