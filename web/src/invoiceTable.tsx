import { Invoice } from './invoiceType.ts'; //
import InvoiceRow from './invoiceRow.tsx';  //

interface InvoiceTableProps {
    invoices: Invoice[];
}


export default function InvoiceTable(props: InvoiceTableProps) {
    const invoices = props.invoices;

    return <table>
        <thead>
            <tr>
                <th>Cliente</th>
                <th>valor</th>
                <th className='numeric-date'>Data de Emissão</th>
                <th className='numeric-date'>Data de Vencimento</th>
                <th>Situação</th>
            </tr>
        </thead>
        <tbody>
            {invoices.map(invoice => (
                <InvoiceRow key={invoice.id} invoice={invoice} />
            ))}
        </tbody>
    </table>
}