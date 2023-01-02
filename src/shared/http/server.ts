import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();
const port: number = 3000 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.directory))

app.use(routes);

app.use(errors());

//  MIDDLEWARE PARA ERROS
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'Error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    });
  },
);

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
