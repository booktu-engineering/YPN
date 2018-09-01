import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import indexRouter from './routes/'


const PORT = process.env.PORT || 3400
const app = express();

// mongoose.connect(`mongodb://localhost/ypn-dev`, {
// });

mongoose.connect(`mongodb://base:Hasstrup1234@ds219051.mlab.com:19051/youthpartynigeria`);

app
  .use(cors())
  .use(logger('dev'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/api/v1', indexRouter);

app.listen(PORT, () => {
  console.log(`The Post service is listening on ${PORT}`);
});

export default app
