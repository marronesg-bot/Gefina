import InvoiceRow from './invoiceRow.tsx'; //
import type { Invoice } from './invoiceType.ts'; //

interface InvoiceTableProps {
  invoices: Invoice[];
  edit: (invoice: Invoice) => void;
}

export default function InvoiceTable(props: InvoiceTableProps) {
  const invoices = props.invoices;

  return (
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>valor</th>
          <th className="numeric-date">Data de Emissão</th>
          <th className="numeric-date">Data de Vencimento</th>
          <th>Situação</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
            edit={props.edit}
          />
        ))}
      </tbody>
    </table>
  );
}
