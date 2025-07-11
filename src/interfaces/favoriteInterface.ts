export interface FavoriteData{
  name: string;
  title: string;
  imagem: string;
}

export interface ObjectFavoriteInterface {
  [type: string]: {
    [id: string]: FavoriteData;
  };
}