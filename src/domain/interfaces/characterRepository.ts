export type DatabaseRow = {
  character_table_id: number;
  name: string;
  gender: string;
  ability: string;
  minimal_distance: number;
  weight: number;
  born: string;
  in_space_since: string;
  nemesis_id: number;
  is_alive: boolean;
  years: number;
  secrete_code: number;
  secrete_id: number;
  character_id: number;
};

export interface CharacterRepository {
  getAllCharacters(): Promise<Array<DatabaseRow>>;
}
