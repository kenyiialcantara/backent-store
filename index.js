const express = require('express');

const routerApi = require('./routes');
const cors = require('cors');
const {
  errorHandler,
  logErros,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = ['http://localhost:8080', 'http://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('HOla mi server en express');
});

app.get('/nuevaruta', (req, res) => {
  res.send('Hoa soy nueva ruta');
});

routerApi(app);

app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Running in port ', port);
});
