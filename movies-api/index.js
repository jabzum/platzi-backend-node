const express = require('express');
const cors = require('cors');

const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

//Enabling cors
app.use(cors());

//Body parser
app.use(express.json()); //Permite que cuando se envíen datos de tipo json, los pueda interpretar.

/* function isLeap(anio) {
  return (anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0 ? 1 : 0;
}

app.get('/', function (req, res) {
  res.send('hello world');
});

app.get('/json', function (req, res) {
  res.json({ hello: 'hello world' });
});

app.get('/bisiesto/:anio', (req, res) => {
  const anio = req.params.anio;
  res.json({
    message: anio + ' is leap-year? ' + (isLeap(anio) ? 'Yes' : 'No'),
    result: isLeap(anio),
  });
}); */

//routes
moviesApi(app);

//Catch 404
app.use(notFoundHandler);

//Los middlewares de tipo error siempre tienen que ir al final de las rutas. Las rutas también son middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log('Listening http://localhost:' + config.port);
});
