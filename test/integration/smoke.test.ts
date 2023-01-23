import request from 'supertest';
import { it, expect } from 'vitest';
import { createApp } from '../../src/driver/app';
import getAllCharactersUseCase from '../../src/domain/useCases/getAllCharactersUseCase';
import { createMockRepository } from '../../src/domain/repositories/mockCharacterRepository';
import { Analyzer } from '../../src/domain/interfaces/analyzer';
import { testCaseWithOneCharacter } from '../fixtures/characters';

const analytics = new Analyzer();
const mockRepository = createMockRepository(testCaseWithOneCharacter.dataInput);
const useCase = new getAllCharactersUseCase(mockRepository, analytics);
const app = createApp(useCase);

it('GET / returns 200 response for health check route', async () => {
  const res = await request(app).get('/');
  const { status, text } = res;
  expect(status).toBe(200);
  expect(text).toBe('Service running');
});
it('GET /characters returns all characters with analytics', async () => {
  const res = await request(app).get('/characters');
  const { body, status } = res;
  expect(status).toBe(200);
  expect(body).toStrictEqual(testCaseWithOneCharacter.expectedResult);
});
