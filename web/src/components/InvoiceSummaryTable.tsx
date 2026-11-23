import type { Invoice } from '../types/invoiceType.ts';

import { formatCurrency, formatDate } from '../utils.ts';

interface InvoiceSummaryTablePorps {
  title: string;
  dateLabel: string;
  invoices: Invoice[];
  date: (invoice: Invoice) => string;
}

export default function InvoiceSummaryTable(
  props: InvoiceSummaryTablePorps
) {
  const base = 'p-3 border-b border-border';

  return (
    <div className="flex-1 p-4 bg-surface border-border rounded-surface">
      <h2 className="text-xl fnot-semibold">{props.title}</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              className={`${base} text-sm text-left font-medium texte-text-muted`}
            >
              Cliente
            </th>
            <th
              className={`${base} text-sm text-left font-medium texte-text-muted`}
            >
              Valor
            </th>
            <th
              className={`${base} text-sm font-medium texte-text-muted`}
            >
              {props.dateLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {props.invoices.map((invoice) => {
            return (
              <tr key={invoice.id}>
                <td className={base}>{invoice.customer.name}</td>
                <td className={`${base} tabular-nums`}>
                  {formatCurrency(invoice.amount)}
                </td>
                <td className={`${base} text-center tabular-nums`}>
                  {formatDate(props.date(invoice))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
