import { FastifyRequest, FastifyReply } from "fastify";
import {
  fetchTransactionList,
  fetchTransactionCount,
} from "../services/transactionService";

export async function getTransactionCount(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await fetchTransactionCount(
      request.body,
      request.headers.authorization
    );
    reply.send(result);
  } catch (error) {
    reply.code(500).send({ message: "Erro ao buscar total de transações" });
  }
}

export async function getTransactionList(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await fetchTransactionList(
      request.body,
      request.headers.authorization
    );
    reply.send(result);
  } catch (error) {
    reply.code(500).send({ message: "Erro ao listar transações" });
  }
}
