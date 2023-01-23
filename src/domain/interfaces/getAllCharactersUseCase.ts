import { Character } from '../entities/character';
import { Analytics, IAnalyzer } from './analyzer';
import { CharacterRepository } from './characterRepository';
export interface GetAllCharactersUseCase {
  characterRepository: CharacterRepository;
  analyzer: IAnalyzer;

  execute(): Promise<Analytics & { characters: Array<Character> }>;
}
