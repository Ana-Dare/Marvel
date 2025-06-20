export type ContenType = 'characters' | 'comics' | 'series';

export interface StatusResults {
currentType: ContenType;
currentTerm: string;
offset: number;
limit: number;
total: number | null
loading: boolean;
}

export interface DataApi{
  currentType: ContenType;
  name: string | null;
  title: string | null;
  description: string | null;
  id: string;
  thumbnail: {
    path: string | null;
    extension: string | null;
  };
}