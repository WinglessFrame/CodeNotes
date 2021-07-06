export type CellTypes = 'code' | 'string';
export type Direction = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
