import { expect, it } from 'vitest';
import getAllCharactersUseCase from '../src/domain/useCases/getAllCharactersUseCase';
import { Analyzer } from '../src/domain/interfaces/analyzer';
import { createMockRepository } from '../src/domain/repositories/mockCharacterRepository';
import { testCaseWithOneCharacter } from './fixtures/characters';

const mockRepository = createMockRepository(testCaseWithOneCharacter.dataInput);
const analyzer = new Analyzer();

const allCharactersUseCase = new getAllCharactersUseCase(mockRepository, analyzer);

it('parses data correctly', async () => {
  expect(JSON.parse(JSON.stringify(await allCharactersUseCase.execute()))).toStrictEqual(
    testCaseWithOneCharacter.expectedResult,
  );
});
