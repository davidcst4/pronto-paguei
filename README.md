# Adiq API

## Estrutura do projeto

```
adiq-api/
├── src/
│   ├── api/
│   │   ├── auth.ts             <-- Autenticação
│   │   ├── card.ts             <-- Tokenização de Cartão
│   │   ├── payment.ts          <-- Pagamentos (imediato/tardio)
│   │   ├── capture.ts          <-- Captura de pagamento
│   │   ├── cancel.ts           <-- Cancelamento
│   │   └── consult.ts          <-- Consultas
│   ├── config/
│   │   └── axios.ts            <-- Instância Axios com token automático
│   ├── index.ts                <-- Exemplo de uso das funções
├── .env                        <-- URL, ClientId, ClientSecret
├── package.json
└── tsconfig.json
```
