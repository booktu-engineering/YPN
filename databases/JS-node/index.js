import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());


app.post('/fetch/data', (req, res) => {
  console.log(req)
})

app.listen(6543, () => {
  console.log('Database is running on port 6543')
})
