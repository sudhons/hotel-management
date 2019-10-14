import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import router from './router';

const app = express();
const PORT = process.env.PORT;
const apiPrefix = 'api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/${apiPrefix}`, (req, res) => {
  return res.send('Welcome');
});

app.use(`/${apiPrefix}`, router);

app.listen(PORT, () => {
  console.log(`started on port ${PORT}`);
});
