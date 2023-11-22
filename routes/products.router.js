const express = require('express');

//importar servicios
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler.js');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/products.schema.js');

//necesitamos instanciar router de express ya que no tenemos accesso a app
const router = express.Router();
//instanciamos el servicio
const service = new ProductsService();

router.get('/', async (req, res) => {
  const productos = await service.find();
  res.json(productos);
});

//ruta especifica deben ir primero
//solucionar choque entre id query parametro y nueva ruta
router.get('/filtro', (req, res) => {
  res.send('yo soy un filter');
});

//dinamico
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const products = await service.findOne(id);
      res.json(products);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error)
    }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
