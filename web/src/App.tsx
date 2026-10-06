import { useState, useEffect } from 'react';

import InvoiceTable from './invoiceTable.tsx'; //quero trazer os componentes que estao naquele arquivo invoiceTable
import { Invoice } from './invoiceType.ts';   //esse objetos precisam obedecer um formato de uma invoice(fatura)

// invoice=fatura

// const invoices: Invoice[] = [     //(const valor nao sera alterado). "Crie uma lista chamada invoices(faturas), e essa  
//   {                               //lista só pode conter coisas que tenham o formato de uma Invoice(fatura)."
//     id: 1,
//     amount: 125000,               // temos primeiramente objeto nota fiscal
//     status: 'pending',
//     issueDate: '2026-06-01',
//     dueDate: '2026-06-15',
//     customer: {
//       id: 1,                         // em seguida objeto cliente
//       name: 'Construtora Meridiano',
//       email: 'contato@meridiano.com.br',
//     }
//   },{
//     id: 2,
//     amount: 348000,
//     status: 'paid',
//     issueDate: '2026-05-12',
//     dueDate: '2026-06-11',
//     customer: {
//       id: 1,
//       name: 'Construtora Meridiano',
//       email: 'contato@meridiano.com.br',
//     }
//   },{
//     id: 3,
//     amount: 96500,
//     status: 'pending',
//     issueDate: '2026-06-20',
//     dueDate: '2026-07-20',
//     customer: {
//       id: 2,
//       name: 'Gráfica Aurora',
//       email: 'contato@graficaaurora.com.br',
//     }
//   },
// ];



export default function App() {
    const[invoices, setInvoices] = useState<Invoice[]>([]); // essa funcao é algo parecido com lista de invoices
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function getInvoices() {
        try {
            const response = await fetch('/api/invoices');

            if(!response.ok) 
              setError ('Não foi possível carregar faturas.');

            const datas = await response.json();
            setInvoices(datas);
            
        } catch {
             setError ('Não foi possível carregar faturas.');
        }

        setLoading(false);
      }

      getInvoices();
    },[]);

    if (loading) return <p>Carregando faturas...</p>;

    if (error) return <p>{error}</p>;

    return <InvoiceTable invoices={invoices} />
  }