import * as dotenv from 'dotenv';
import { Client } from 'pg';
import { Analyzer } from './domain/interfaces/analyzer';
import getAllCharactersUseCase from './domain/useCases/getAllCharactersUseCase';
import { createApp } from './driver/app';
import { createPostgresRepository } from './domain/repositories/postgressCharacterRepository';

dotenv.config();
const analytics = new Analyzer();
const databaseConnection = new Client({
  connectionString: process.env.PG_DB_STRING,
});

async function startServer() {
  const PORT = process.env.PORT || 8080;
  await databaseConnection.connect();
  const postgresRepository = createPostgresRepository(databaseConnection);
  const useCase = new getAllCharactersUseCase(postgresRepository, analytics);

  const app = createApp(useCase);

  app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
}

startServer().catch((err) => {
  console.error(err);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing the connection...');
  databaseConnection.end();
  process.exit();
});
