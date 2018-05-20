import express from 'express';
import mongoose from 'mongoose';
import postRouter from './routes/post'

const PORT = process.env.PORT || 3400
const app = express();

mongoose.connect('mongodb://localhost/ypn-posts', {
});

app.use('/posts', postRouter);

app.listen(PORT, () => {
  console.log(`The Post service is listening on ${PORT}`);
});
