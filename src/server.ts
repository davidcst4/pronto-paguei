import Fastify from "fastify";
import cors from "@fastify/cors";
import { consultarTransacoesOntem } from "./services/adiq/adiqPayments";

const app = Fastify();
app.register(cors, { origin: true });

app.get("/adiq/pagamentos-ontem", async (req, reply) => {
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);
  const transactionDate = ontem.toISOString().split("T")[0].replace(/-/g, "");

  const pedidos = [
    { orderNumber: "123456", transactionDate },
    { orderNumber: "789012", transactionDate },
  ];

  try {
    const pagamentos = await consultarTransacoesOntem(pedidos);
    return pagamentos;
  } catch (err) {
    return reply.status(500).send({ error: "Erro ao consultar pagamentos" });
  }
});

app.listen({ port: 3333 }, () => {
  console.log("Servidor rodando em http://localhost:3333");
});
