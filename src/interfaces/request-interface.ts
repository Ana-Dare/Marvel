export type ContenType = 'characters' | 'comics' | 'series';

export interface StatusResults {
currentType: ContenType;
currentTerm: string;
offset: number;
limit: number;
total: number | null
loading: boolean;
}