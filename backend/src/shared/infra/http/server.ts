import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3333, () =>
  console.log('🚀 Server rodando! Acesse: http://localhost:3333/'),
);
