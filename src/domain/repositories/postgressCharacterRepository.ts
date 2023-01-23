import { CharacterRepository, DatabaseRow } from '../interfaces/characterRepository';
import { Client } from 'pg';

export const createPostgresRepository = (pgConnection: Client) => {
  const postgresCharacterRepository: CharacterRepository = {
    async getAllCharacters(): Promise<Array<DatabaseRow>> {
      const result = await pgConnection.query(
        'SELECT character.id AS character_table_id, * FROM public."character" as character\n' +
          'LEFT JOIN public."nemesis" as nemesis ON character.id = nemesis.character_id\n' +
          'LEFT JOIN public."secrete" as secrete ON nemesis.id = secrete.nemesis_id\n' +
          'LIMIT 100',
      );
      console.log(result.rows);
      return result.rows;
    },
  };
  return postgresCharacterRepository;
};
