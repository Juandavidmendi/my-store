const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler.js');
const app = express();
const port = process.env.PORT || 3000;

//middleware nativos de expres
app.use(express.json()); //permite recibir informacion de tipo json

const whiteList =  ['http://localhost:8080', 'https://myapp.co'];

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
};

app.use(cors(options));

app.get('/', (req, res) =>{
    res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) =>{
    res.send('Hola soy un nuevo endpoint');
});

//aplicar routes
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});
