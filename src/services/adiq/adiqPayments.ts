import axios from "axios";
import dotenv from "dotenv";
import { getAdiqAccessToken } from "./adiqAuth";
import { enviarParaOmie } from "../omie/omieService";

dotenv.config();

interface Pedido {
  orderNumber: string;
  transactionDate: string;
}

interface PaymentAuthorization {
  paymentAuthorization: {
    paymentId: string;
    statusDescription: string;
    transactionDate: string;
    authorizationCode: string;
    value: number;
    netValue: number | null;
  };
}

export async function consultarTransacoesOntem(
  pedidos: Pedido[]
): Promise<PaymentAuthorization[]> {
  const baseUrl = process.env.ADIQ_BASE_URL!;
  const { accessToken } = await getAdiqAccessToken();
  const resultados: PaymentAuthorization[] = [];

  for (const pedido of pedidos) {
    try {
      const res = await axios.get<PaymentAuthorization>(
        `${baseUrl}/v1/payments/${pedido.orderNumber}/${pedido.transactionDate}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const pagamento = res.data;
      resultados.push(pagamento);

      // Envia para Omie
      await enviarParaOmie(pagamento);
    } catch (error: any) {
      console.error(
        `Erro ao consultar pedido ${pedido.orderNumber}:`,
        error.response?.data || error.message
      );
    }
  }

  return resultados;
}
