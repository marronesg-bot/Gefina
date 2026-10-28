export type InvoiceStatus = 'paid' | 'pending'; // estamos dizendo que so pode ser essas duas opcoes
export type InvoiceSituation = 'paid' | 'pending' | 'overdue';

interface Customer { //estamos dizemos que esse molde customer=cliente tera os seguintes dados
  id: number;       // um identifcador único, nome e email
  name: string;
  email: string;
}

export interface Invoice {   //estamos dizemos que Invoice tera os seguintes dados
  id: number;
  amount: number;          //identificador, amount= quantia em numero, status= pending ou paid
  status: InvoiceStatus; 
  situation: InvoiceSituation; 
  issueDate: string;       // issueDate=data de emissao = texto, 
  dueDate: string;         // dueDate=data de vencimento = texto, 
  customer: Customer;      // cliente=cliente = objeto 
}

export interface InvoiceInput{
  customerId: number;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}