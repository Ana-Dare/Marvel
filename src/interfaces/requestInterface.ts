export type ContentType = 'characters' | 'comics' | 'series';

export interface StatusResults {
currentType: ContentType;
currentTerm: string;
offset: number;
limit: number;
total: number | null
loading: boolean;
}

export interface DataApi{
  currentType: ContentType
  name: string | null;
  title: string | null;
  id: string
  thumbnail: {
    path: string | null;
    extension: string | null;
  };
}

export interface SummaryItem {
  resourceURI: string;
  name: string;
}

export interface CollectionSummary {
  available: number;
  collectionURI: string;
  items: SummaryItem[];
}

export interface Characters extends DataApi {
  description: string | null;
  comics: CollectionSummary;
  series: CollectionSummary;
}

export interface Comics extends DataApi {
  description: string | null;
  pageCount: string | null;
  prices: string | null;
  characters: string | null;
  series: CollectionSummary
  creators: string | null;
}

export interface Series extends DataApi {
  description: string | null;
  pageCount: string | null;
  startYear: string | null;
  endYear: string | null;
  creators: string | null;
  characters: string | null;
  comics: CollectionSummary
}