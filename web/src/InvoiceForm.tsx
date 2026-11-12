import {
  type SetStateAction,
  type SubmitEvent,
  useState,
} from 'react';
import type { customerOption } from './customerType.ts';
import type {
  Invoice,
  InvoiceFieldErros,
  InvoiceInput,
  InvoiceStatus,
} from './invoiceType.ts';

interface InvoiceFormProps {
  invoice: Invoice | null;
  customers: customerOption[];
  error: string | null;
  fieldErros: InvoiceFieldErros;
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<SetStateAction<boolean>>;
  confirm: () => void;
  onDelete: () => void;
  onCancel: () => void;
  onSubmit: (values: InvoiceInput) => void;
  busy: boolean;
}

export default function InvoiceForm(props: InvoiceFormProps) {
  const [customerId, setCustomerID] = useState(
    !props.invoice ? undefined : String(props.invoice.customer.id),
  );
  const [amount, setAmount] = useState(
    !props.invoice ? '' : (props.invoice.amount / 100).toFixed(2),
  );
  const [status, setStatus] = useState<InvoiceStatus>(
    !props.invoice ? 'pending' : props.invoice.status,
  );
  const [issueDate, setIssueDate] = useState(
    !props.invoice ? '' : props.invoice.issueDate,
  );
  const [dueDate, setDueDate] = useState(
    !props.invoice ? '' : props.invoice.dueDate,
  );

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    props.setConfirmDelete(false);

    props.onSubmit({
      customerId: Number(customerId),
      amount: Math.round(Number(amount) * 100),
      status,
      issueDate,
      dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{!props.invoice ? 'Criar fatura' : 'Editar faturas'}</h2>
      <div className="field">
        <label htmlFor="customer">Cliente</label>
        <select
          id="customer"
          value={customerId}
          onChange={(event) => setCustomerID(event.target.value)}
          required
        >
          <option value="">Selecione um Cliente</option>
          {props.customers.map((customer) => {
            return (
              <option key={customer.id} value={customer.id}>
                {customer.name} - {customer.email}
              </option>
            );
          })}
        </select>
      </div>
      <div className="field">
        <label htmlFor="amount">Valor</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
      </div>
      <div className="horizontal-fields">
        <div className="field">
          <label htmlFor="status">Situação</label>
          <select
            id="status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as InvoiceStatus)
            }
          >
            <option value="pending">Pendente</option>
            <option value="paid">Paga</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="issueDate">Emissão</label>
          <input
            id="issueDate"
            type="date"
            value={issueDate}
            onChange={(event) => setIssueDate(event.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="dueDate">Vencimento</label>
          <input
            id="dueDate"
            type="date"
            min={issueDate}
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            required
          />
        </div>
      </div>

      {!props.error ? null : <p>{props.error}</p>}

      <div className="form-actions">
        {!props.invoice ? null : (
          <button
            className="button-danger"
            type="button"
            onClick={props.onDelete}
            disabled={props.busy}
          >
            {props.busy && props.confirmDelete
              ? 'Excluindo...'
              : 'Excluir'}
          </button>
        )}
        <button
          className="button-secondary"
          type="button"
          onClick={props.onCancel}
          disabled={props.busy}
        >
          Cancelar
        </button>
        <button
          className="button-primary"
          type="submit"
          disabled={props.busy}
        >
          {props.busy && !props.confirmDelete
            ? 'Salvando...'
            : 'Salvar'}
        </button>
      </div>

      {props.confirmDelete && (
        <div className="confirm-form">
          <p>
            A exclusão é definitiva e não pode ser desfeita. Deseja
            prosseguir?
          </p>

          <button
            className="button-secundary"
            type="button"
            onClick={() => props.setConfirmDelete(false)}
            disabled={props.busy}
          >
            Não
          </button>
          <button
            className="button-danger"
            type="button"
            onClick={props.confirm}
            disabled={props.busy}
          >
            Sim
          </button>
        </div>
      )}

      {props.fieldErros.customerId && (
        <p className="form-error">{props.fieldErros.customerId}</p>
      )}
      {props.fieldErros.amount && (
        <p className="form-error">{props.fieldErros.amount}</p>
      )}
      {props.fieldErros.status && (
        <p className="form-error">{props.fieldErros.status}</p>
      )}
      {props.fieldErros.issueDate && (
        <p className="form-error">{props.fieldErros.issueDate}</p>
      )}
      {props.fieldErros.dueDate && (
        <p className="form-error">{props.fieldErros.dueDate}</p>
      )}
      {!props.error && <p className="form-error">{props.error}</p>}
    </form>
  );
}
