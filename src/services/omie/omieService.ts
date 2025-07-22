import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const OMIE_URL = process.env.OMIE_URL!;
const APP_KEY = process.env.OMIE_APP_KEY!;
const APP_SECRET = process.env.OMIE_APP_SECRET!;

interface OmieContaReceber {
  cabecalho: {
    codigo_cliente_omie: number;
    data_vencimento: string;
    valor_documento: number;
    numero_documento: string;
  };
  recebimento: {
    data_recebimento: string;
    valor_recebido: number;
    forma_pagamento: string;
  };
}

export async function enviarParaOmie(pagamento: any) {
  const valor =
    pagamento.paymentAuthorization.netValue ??
    pagamento.paymentAuthorization.value;
  const payload = {
    call: "IncluirContaReceber",
    app_key: APP_KEY,
    app_secret: APP_SECRET,
    param: [
      {
        cabecalho: {
          codigo_cliente_omie: 123456, // Altere conforme necessário
          data_vencimento:
            pagamento.paymentAuthorization.transactionDate.split("T")[0],
          valor_documento: valor / 100,
          numero_documento: pagamento.paymentAuthorization.paymentId,
        },
        recebimento: {
          data_recebimento:
            pagamento.paymentAuthorization.transactionDate.split("T")[0],
          valor_recebido: valor / 100,
          forma_pagamento: "CartaoCredito",
        },
      },
    ],
  };

  try {
    const response = await axios.post(OMIE_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Enviado para Omie:", response.data);
  } catch (error: any) {
    console.error(
      "Erro ao enviar para Omie:",
      error.response?.data || error.message
    );
  }
}
