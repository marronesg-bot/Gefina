// import { createServer } from 'node:http';

// createServer(function (request, response) {
//     if (request.url !== '/api/health') {
//         send(response, 404, {message: 'Recurso não encontrado'});
//         return;
//     }

//     send(response, 200, {status: 'ok'});
// }).listen(3000);
// passou disso de cima para o que esta em baixo. com o express

import express from 'express';

import invoices from './invoice.route.js';

const app = express();

app.use((request, _response, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
});

app.get('/api/health', (_request, response) => {
  // send(response, 200, { status: 'ok' }); foi feito agora pelo express
  // a parte de baixo
  response.status(200).json({ status: 'ok' });
});

app.use('/api/invoices', invoices);

app.use((_request, response) => {
  //app.user - Middleware (pronunca=ia midler)(intermediario) para tratar erros
  // send(response, 404, {messege: 'Recurso não encontrado.'});foi feito agora pelo express
  response.status(400).json({ message: 'Recurso não encontrado' });
});

app.listen(3000);
