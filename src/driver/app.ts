import characterRouter from '../infra/characterRouter';
import serviceRouter from '../infra/serviceRouter';
import { GetAllCharactersUseCase } from '../domain/interfaces/getAllCharactersUseCase';
import express from 'express';
export const createApp = (characterUseCase: GetAllCharactersUseCase) => {
  const app = express();
  app.use(express.json());

  app.use('/', serviceRouter());

  app.use('/characters', characterRouter(characterUseCase));

  return app;
};
