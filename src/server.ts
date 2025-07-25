import Fastify from "fastify";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import transactionRoutes from "./routes/transactions";

dotenv.config();
const app = Fastify();

app.register(authRoutes, { prefix: "/auth" });
app.register(transactionRoutes, { prefix: "/transactions" });

app.get("/", async () => {
  return "HTTP Server is running...";
});

app.listen({ port: 3333 }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 HTTP Server ready at ${address}`);
});
