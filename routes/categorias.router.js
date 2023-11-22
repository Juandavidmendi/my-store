const express = require('express');

//necesitamos instanciar router de express ya que no tenemos accesso a app
const router = express.Router();

router.get('/:categoriaId/productos/:productoId', (req, res) =>{
    const { categoriaId, productoId } = req.params;
    res.json({
        categoriaId,
        productoId
    });
});

module.exports= router;