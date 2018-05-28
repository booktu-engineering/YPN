import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import bodyParser from 'body-parser'
import indexRouter from './routes/'

console.log('Here we go')

const PORT = process.env.PORT || 3400
const app = express();

mongoose.connect(`mongodb://localhost/ypn-${process.env.NODE_ENV}`, {
});

app
  .use(logger('dev'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/api/v1', indexRouter);

app.listen(PORT, () => {
  console.log(`The Post service is listening on ${PORT}`);
});

export default app
