import { consultarPorPaymentId, consultarPorOrderNumber } from "./api/consult";

async function testarConsultas() {
  const paymentId = "1234567890abcdef";
  const orderNumber = "0000000000001";
  const data = "20241008";

  try {
    const porId = await consultarPorPaymentId(paymentId);
    console.log("Consulta por PaymentId:\n", porId);

    const porOrder = await consultarPorOrderNumber(orderNumber, data);
    console.log("Consulta por OrderNumber:\n", porOrder);
  } catch (err: any) {
    console.error("Erro ao consultar:", err?.response?.data || err.message);
  }
}

testarConsultas();
