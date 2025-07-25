import { FastifyInstance } from "fastify";
import { getToken } from "../controllers/authController";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/token", getToken);
}
