import express from 'express';
import { Request, Response } from 'express';
export default function serviceRouter() {
  const router = express.Router();

  router.get('/health-check', async (req: Request, res: Response) => {
    try {
      res.send('Service running');
    } catch (err) {
      res.status(500).send({ message: 'Error encountered' });
    }
  });
  router.get('/', async (req: Request, res: Response) => {
    try {
      res.send('Service running');
    } catch (err) {
      res.status(500).send({ message: 'Error encountered' });
    }
  });
  return router;
}
