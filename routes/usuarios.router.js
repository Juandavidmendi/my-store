const express = require('express');

const router = express.Router();

//paginacion
router.get('/', (req, res)=>{
    const { limit, offset } = req.query;//los que vengan como query
    if(limit && offset){
        res.json({
            limit,
            offset
        });
    }else{
        res.send('No hay parametros');
    }
}); 




module.exports = router;