import { InvoiceSituation } from './invoiceType.ts';

export default function situationLabel(situation: InvoiceSituation) {
    return situation === 'paid' ? 'Paga' : situation === 'overdue' ? 'Atrasada' : 'Pendete';
}