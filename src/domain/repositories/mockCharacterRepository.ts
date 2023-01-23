import { CharacterRepository, DatabaseRow } from '../interfaces/characterRepository';
export const createMockRepository = (allDataMock: Array<DatabaseRow>) => {
  const mockRepository: CharacterRepository = {
    async getAllCharacters() {
      return allDataMock;
    },
  };
  return mockRepository;
};
