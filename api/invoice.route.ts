import { Router } from 'express';

import {
  findAllInvoices,          //<-- alteracao nessa linha
  findInvoiceById,
  insertInvoice,
  modifyInvoice,
  removeInvoice

} from './invoice.service.ts';

const router = Router();

router.get('/', async (_request, response) => { //<-- inserido async e await
  try {
    const invoices = await findAllInvoices();    //<-- insercao dessa linha

    response.status(200).json(invoices);

  } catch (error) {
    console.error(error);

    response.status(500).json({
      error: {
        status: 500,
        messege: 'Não foi possível encontrar a fatura.'
      }
    })
  }

});

router.get('/:id', async (request, response) => { //<--alteracao nessas 2 linhas
  try {

    const id = Number(request.params.id);

    const invoice = await findInvoiceById(id);    //<-- novo comando substituindo antigo FOR

    if (!invoice) response.status(404).json({
      error: {  //<-- Inserido novo tratamento
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });

    response.status(200).json(invoice);
  } catch (error) {
    console.error(error);

    response.status(500).json({
      error: {
        status: 500,
        message: 'Não foi possível encontrar a fatura.'
      }
    });
  }

});

router.post('/', async (request, response) => {
  try {
    const invoice = await insertInvoice(request.body);

    if (!invoice) response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });

    response.status(201).json(invoice);
  } catch (error) {
    console.error(error);

    response.status(500).json({
      error: {
        status: 500,
        message: 'Não foi possível inserir  fatura.'
      }
    });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const invoice = await modifyInvoice(
      Number(request.params.id),
      request.body
    );

    if (!invoice) response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });

    response.status(200).json(invoice);
  } catch (error) {
    console.error(error);

    response.status(500).json({
      error: {
        status: 500,
        message: 'Não foi possível modificar fatura.'
      }
    });
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const deleted = await removeInvoice(Number(request.params.id));

    if (!deleted) response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });

    response.status(204).end();

  } catch (error) {
    console.error(error);

    response.status(500).json({
        error: {
        status: 500,
        message: 'Não foi possível remover fatura.'
      }
    });
  }
})

export default router;
