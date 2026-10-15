import pool from "./database.ts";
type InvoiceStatus = 'pending' | 'paid';

interface Customer {
  id: number;
  name: string;
  email: string;
}

interface Invoice {
  id: number;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  customer: Customer;
}

const invoices: Invoice[] = [
  {
    id: 1,
    amount: 125000,
    status: 'pending',
    issueDate: '2026-06-01',
    dueDate: '2026-06-15',
    customer: {
      id: 1,
      name: 'Construtora Meridiano',
      email: 'contato@meridiano.com.br',
    },
  },
  {
    id: 2,
    amount: 348000,
    status: 'paid',
    issueDate: '2026-05-12',
    dueDate: '2026-06-11',
    customer: {
      id: 1,
      name: 'Construtora Meridiano',
      email: 'contato@meridiano.com.br',
    },
  },
  {
    id: 3,
    amount: 96500,
    status: 'pending',
    issueDate: '2026-06-20',
    dueDate: '2026-07-20',
    customer: {
      id: 2,
      name: 'Gráfica Aurora',
      email: 'contato@graficaaurora.com.br',
    },
  },
];

interface InvoiceRow{
  id: number;
  amount: number;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  customer_id: number;
  cuscomer_name: string;
  customer_email: string;
}

function toInvoice(row: InvoiceRow): Invoice {
  return {
    id: row.id,
    amount: row.amount,
    status: row.status,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    customer: {
      id: row.customer_id,
      name: row.cuscomer_name,
      email: row.customer_email
    }
  };

}

const baseQuery = `

SELECT 
  invoices.id,
  invoices.amount, 
  invoices.status, 
  invoices.issue_date, 
  invoices.due_date,
  customers.id AS customer.id,
  customers.name AS customer.name,
  customers.email AS customer_email
FROM invoices
JOIN customers 
ON customers.id = invoices.customer_id
`;
export async function findAllInvoices(): Promise<Invoice[]> {
  const connect = await pool.query<InvoiceRow>(`${baseQuery} ORDER BY invoices.issue_data DESC;`);

  const invoices: Invoice[] = [];

  connect.rows.forEach(invoice => invoices.push(toInvoice(invoice)));
  return invoices;
}

export async function findInvoiceById(id:number): Promise<Invoice | undefined> {
  const connect = await pool.query<InvoiceRow>(`${baseQuery} WHERE invoices.id = $1;`, [id]);

  if (!connect.rows.length) return undefined;

  return toInvoice(connect.rows[0]);

}
