import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './routes';
import config from './config';

const PORT = process.env.PORT || 4600;
const app = express();

mongoose.connect(config.mongoUrl);

app
  .use(logger('dev'))
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/api', api)
  .listen(PORT, () => {
    console.log(`election service listening on ${PORT}`)
  });

