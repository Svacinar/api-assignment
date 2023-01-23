import { Secrete } from './secrete';

export interface Nemesis {
  character_id: number;
  nemesis_id: number;
  is_alive: boolean;
  years: number;
  secretes: Array<Secrete>;
}
