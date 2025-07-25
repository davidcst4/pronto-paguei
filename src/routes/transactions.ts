import { FastifyInstance } from "fastify";
import {
  getTransactionList,
  getTransactionCount,
} from "../controllers/transactionController";

export default async function transactionRoutes(app: FastifyInstance) {
  app.post("/count", getTransactionCount);
  app.post("/list", getTransactionList);
}
