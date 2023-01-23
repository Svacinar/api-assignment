import { GetAllCharactersUseCase } from '../interfaces/getAllCharactersUseCase';
import { CharacterRepository, DatabaseRow } from '../interfaces/characterRepository';
import { Character } from '../entities/character';
import { IAnalyzer } from '../interfaces/analyzer';

type CharacterCache = Record<number, Character>;

export default class getAllCharactersUseCase implements GetAllCharactersUseCase {
  characterRepository: CharacterRepository;
  analyzer: IAnalyzer;
  constructor(characterRepository: CharacterRepository, analyzer: IAnalyzer) {
    this.characterRepository = characterRepository;
    this.analyzer = analyzer;
  }

  async execute() {
    const nemesisDataExistsIn = (row: DatabaseRow) => {
      return !!row.character_id && !!row.nemesis_id && !!row.is_alive;
    };
    const secreteDataExistsIn = (row: DatabaseRow) => {
      return !!row.nemesis_id && !!row.secrete_code;
    };
    const characterRows = await this.characterRepository.getAllCharacters();
    const characters: CharacterCache = {};
    characterRows.forEach((row) => {
      let cachedCharacter = characters[row.character_table_id];
      if (!cachedCharacter) {
        this.analyzer.analyzeRow(row);
        cachedCharacter = new Character(row);
      }
      if (nemesisDataExistsIn(row)) {
        cachedCharacter.addNemesis({
          character_id: row.character_id,
          nemesis_id: row.nemesis_id,
          is_alive: row.is_alive,
          years: row.years,
        });
      }
      if (secreteDataExistsIn(row)) {
        cachedCharacter.addSecrete({
          nemesis_id: row.nemesis_id,
          secrete_code: row.secrete_code,
          secrete_id: row.secrete_id,
        });
      }
      characters[row.character_table_id] = cachedCharacter;
    });
    const analytics = this.analyzer.getAnalytics();
    return {
      ...analytics,
      characters: Object.values(characters),
    };
  }
}
