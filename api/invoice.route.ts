import { Router } from 'express';

import {
  findAllInvoices,          //<-- alteracao nessa linha
  findInvoiceById,
  insertInvoice,
  modifyInvoice,
  removeInvoice

} from './invoice.service.ts';

import { invoiceSchema, toFieldErros } from './invoice.schema.ts';

const router = Router();

function parseId(value: string): number | undefined {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) return undefined;

  return id;
}

router.get('/', async (_request, response) => { //<-- inserido async e await


  const invoices = await findAllInvoices();    //<-- insercao dessa linha

  response.status(200).json(invoices);

});

router.get('/:id', async (request, response) => { 

  const id = parseId(request.params.id);

  if (!id) {
    response.status(400).json({error: {
      status: 400,
      message: 'dentificador inválido.'
    }});

    return;
  }

  const invoice = await findInvoiceById(id);    

  if (!invoice) response.status(404).json({
    error: {  //<-- Inserido novo tratamento
      status: 404,
      message: 'Fatura não encontrada.'
    }
  });

  response.status(200).json(invoice);
});

router.post('/', async (request, response) => {
  const result = invoiceSchema.safeParse(request.body);

  if (!result.success) {
    return response.status(400).json({
      error: {
        status: 400,
        message: 'Dados inválidos',
        fields: toFieldErros(result.error)
      }
    });
  }

  const invoice = await insertInvoice(result.data);

  response.status(201).json(invoice);
});

router.put('/:id', async (request, response) => {
   const id = parseId(request.params.id);

  if (!id) {
    response.status(400).json({error: {
      status: 400,
      message: 'dentificador inválido.'
    }});

    return;
  }

  const invoice = await modifyInvoice(
    id,
    request.body
  );

  if (!invoice) response.status(404).json({
    error: {
      status: 404,
      message: 'Fatura não encontrada.'
    }
  });

  response.status(200).json(invoice);
});

router.delete('/:id', async (request, response) => {
   const id = parseId(request.params.id);

  if (!id) {
    response.status(400).json({error: {
      status: 400,
      message: 'dentificador inválido.'
    }});

    return;
  }

  const deleted = await removeInvoice (id);

  if (!deleted) response.status(404).json({
    error: {
      status: 404,
      message: 'Fatura não encontrada.'
    }
  });

  response.status(204).end();

});

export default router;
