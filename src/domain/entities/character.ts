import { Nemesis } from './nemesis';
import { Secrete } from './secrete';

type characterRow = {
  character_table_id: number;
  name: string;
  gender: string;
  ability: string;
  minimal_distance: number;
  weight: number;
  born: string;
  in_space_since: string;
};
export class Character implements Character {
  nemesis: Array<Nemesis>;
  constructor(row: characterRow) {
    this.id = row.character_table_id;
    this.name = row.name;
    this.gender = row.gender;
    this.ability = row.ability;
    this.minimal_distance = row.minimal_distance;
    this.weight = row.weight;
    this.born = row.born;
    this.in_space_since = row.in_space_since;
    this.nemesis = [];
  }
  addNemesis(nemesis: Pick<Nemesis, 'nemesis_id' | 'is_alive' | 'years' | 'character_id'>) {
    const isAlreadyStored = this.nemesis.some((value) => value.nemesis_id === nemesis.nemesis_id);
    if (!isAlreadyStored) {
      this.nemesis.push({ ...nemesis, secretes: [] });
    }
  }
  addSecrete(secrete: Secrete) {
    if (this.nemesis.length) {
      const nemesisIndex = this.nemesis.findIndex(
        (nemesis) => secrete.nemesis_id === nemesis.nemesis_id,
      );
      if (nemesisIndex >= 0) {
        this.nemesis[nemesisIndex].secretes.push(secrete);
      }
    }
  }
}

export interface Character {
  id: number;
  name: string;
  gender: string;
  ability: string;
  minimal_distance: number;
  weight: number;
  born: string;
  in_space_since: string;
  nemesis: Array<Nemesis>;
}
