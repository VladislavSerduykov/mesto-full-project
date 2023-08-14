require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { handleError } = require('./middlewares/handleError');

const { routes } = require('./routes/route');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose
  .connect(DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to database on ${DB_ADDRESS}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.log(err);
  });

app.use(limiter);

app.use(cors());

app.use(requestLogger);

app.use(helmet());
app.use('*', express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
