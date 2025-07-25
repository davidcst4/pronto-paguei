import { FastifyRequest, FastifyReply } from "fastify";
import { requestToken } from "../services/authService";

export async function getToken(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = await requestToken();
    reply.send(token);
  } catch (error) {
    reply.code(500).send({ message: "Erro ao obter token" });
  }
}
