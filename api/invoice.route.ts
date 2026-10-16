import { Router } from 'express';

import {
  findAllInvoices,          //<-- alteracao nessa linha
  findInvoiceById
} from './invoice.service.ts';

const router = Router();

router.get('/', async(_request, response) => { //<-- inserido async e await
  try {
    const invoices = await findAllInvoices();    //<-- insercao dessa linha
   
    response.status(200).json(invoices);

  } catch (error) {
    console.error(error);

    response.status(500).json({error:{
      status: 500,
      messege:'Não foi possível carregar as faturas.'
    }})
  }
  
});

router.get('/:id', async(request, response) => { //<--alteracao nessas 2 linhas
  try {
       
    const id = Number(request.params.id);
    
    const invoice = await findInvoiceById(id);    //<-- novo comando substituindo antigo FOR
    
    if (!invoice) response.status(404).json({error:{  //<-- Inserido novo tratamento
      status: 404,
      message: 'Fatura não encontrada.'
    }});
    
  response.status(200).json(invoice);
  } catch (error) {
    console.error(error);

    response.status(500).json({error:{
      status: 500,
      message: 'Não foi possível carregar as faturas.'
    }});
  }

});

export default router;
