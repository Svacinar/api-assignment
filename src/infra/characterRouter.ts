import express from 'express';
import { Request, Response } from 'express';
import { GetAllCharactersUseCase } from '../domain/interfaces/getAllCharactersUseCase';

export default function CharacterRouter(getAllCharactersUseCase: GetAllCharactersUseCase) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      const characters = await getAllCharactersUseCase.execute();
      res.send(characters);
    } catch (err) {
      res.status(500).send({ message: 'Error fetching data' });
    }
  });
  return router;
}
