import { useEffect, useRef, useState } from 'react';
import type { customerOption } from './customerType.ts';
import InvoiceForm from './InvoiceForm.tsx';
import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  updateInvoice,
} from './invoiceApi.ts';
import InvoiceTable from './invoiceTable.tsx'; //quero trazer os componentes que estao naquele arquivo invoiceTable
import type {
  Invoice,
  InvoiceFieldErros,
  InvoiceInput,
} from './invoiceType.ts'; //esse objetos precisam obedecer um formato de uma invoice(fatura)

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]); // essa funcao é algo parecido com lista de invoices
  const [customerOptions, setCustomersOpitions] = useState<
    customerOption[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [fieldErros, setFieldErros] = useState<InvoiceFieldErros>({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogContent, setDialogContent] = useState(false);
  const [target, setTarget] = useState<Invoice | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal(invoice: Invoice | null) {
    setTarget(invoice);
    setFormError(null);
    setDialogContent(true);

    dialogRef.current?.showModal();
  }

  function closeModal() {
    setFormError(null);

    dialogRef.current?.close();
  }

  useEffect(() => {
    async function getInvoices() {
      try {
        const datas = await getAllInvoices();
        setInvoices(datas);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }

      setLoading(false);
    }

    getInvoices();
  }, []);

  useEffect(() => {
    async function getCustomersOptions() {
      try {
        const response = await fetch('/api/customers/options');

        if (!response.ok)
          throw new Error('Falha ao buscar clientes.');
        const datas = await response.json();
        setCustomersOpitions(datas);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    }

    getCustomersOptions();
  }, []);

  async function refresh() {
    try {
      const datas = await getAllInvoices();
      setInvoices(datas);
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  async function submit(datas: InvoiceInput) {
    setBusy(true);
    setFormError(null);

    try {
      if (!target) {
        const failure = await createInvoice(datas);

        if (failure) return setFieldErros(failure.fields);
      } else {
        await updateInvoice(target.id, datas);
      }
      closeModal();
      await refresh();
    } catch (error) {
      if (error instanceof Error) setFormError(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function confirm() {
    if (!target) return;
    setBusy(true);
    setFormError(null);
    try {
      await deleteInvoice(target.id);

      setConfirmDelete(false);
      closeModal();
      await refresh();
    } catch (error) {
      if (error instanceof Error) setFormError(error.message);
    }
    setBusy(false);
  }

  if (loading) return <p>Carregando faturas...</p>;

  if (error) return <p>{error}</p>;

  return (
    <>
      <header className="page-header">
        <h1>Faturas</h1>
        <button
          className="button-primary"
          type="button"
          onClick={() => openModal(null)}
        >
          Nova Fatura
        </button>
      </header>
      <div className="panel">
        <InvoiceTable invoices={invoices} edit={openModal} />
      </div>

      <dialog
        className="invoice-modal"
        ref={dialogRef}
        onClose={() => {
          setDialogContent;
          setDialogContent(false);
          setFieldErros({});
        }}
      >
        {dialogContent && (
          <InvoiceForm
            invoice={target}
            customers={customerOptions}
            error={formError}
            fieldErros={fieldErros}
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
            confirm={confirm}
            onDelete={() => setConfirmDelete(true)}
            onCancel={closeModal}
            onSubmit={submit}
            busy={busy}
          />
        )}
      </dialog>
    </>
  );
}
