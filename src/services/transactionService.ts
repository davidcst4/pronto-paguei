import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function fetchTransactionCount(body: any, token?: string) {
  const response = await axios.post(
    `${process.env.API_BASE_URL}/v1/interface/transactions-statement/request`,
    body,
    {
      headers: { Authorization: token || "" },
    }
  );
  return response.data;
}

export async function fetchTransactionList(body: any, token?: string) {
  const response = await axios.post(
    `${process.env.API_BASE_URL}/v1/interface/transactions-statement/list`,
    body,
    {
      headers: { Authorization: token || "" },
    }
  );
  return response.data;
}
