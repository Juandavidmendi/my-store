const express = require('express');

const productosRouter = require('./products.router');
const categoriasRouter = require('./categorias.router');
const usuariosRouter = require('./usuarios.router.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/productos', productosRouter);
  router.use('/categorias', categoriasRouter);
  router.use('/usuarios', usuariosRouter);
}

module.exports = routerApi;
