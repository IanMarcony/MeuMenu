import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from '../../../data-source';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    return app.listen(process.env.API_PORT as unknown as number | 3333, () =>
      console.log(
        `🚀 Server rodando! Acesse: http://localhost:${process.env.API_PORT}`,
      ),
    );
  })
  .catch((error) => console.log(error));
