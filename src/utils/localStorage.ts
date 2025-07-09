export interface Favorite {
  name: string;
  title: string;
  imagem: string;
}

export interface ObjectFavoriteInterface {
  [type: string]: {
    [id: string]: Favorite;
  };
}

export function setItemFavorite(
  favorite: string,
  objectFavorite: ObjectFavoriteInterface,
) {
  try {
    const existingData = localStorage.getItem(favorite);
    let updateData: Record<string, any> = {};

    if (existingData) {
      const previousData = JSON.parse(existingData);
      for (const tipo in objectFavorite) {
        updateData[tipo] = {
          ...previousData[tipo],
          ...objectFavorite[tipo],
        };
      }
      for (const tipo in previousData) {
        if (!updateData[tipo]) {
          updateData[tipo] = previousData[tipo];
        }
      }
    } else {
      updateData = objectFavorite;
    }

    localStorage.setItem(favorite, JSON.stringify(updateData));
  } catch (erro) {
    console.error("Erro ao adicionar dados", erro);
    throw erro;
  }
}

export function removeItemfavorite(favorite: string, type: string, id: string) {
  try {
    const existingData = localStorage.getItem(favorite);
    if (!existingData) return;

    const currentData: Record<string, Record<string, any>> = JSON.parse(
      existingData,
    );

    if (currentData[type] && currentData[type][id]) {
      delete currentData[type][id];
      console.log("deletando o id");
    }
    if (Object.keys(currentData[type]).length === 0) {
      delete currentData[type];
    }
    localStorage.setItem(favorite, JSON.stringify(currentData));
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
  }
}
 export function isItemFavorite(storageKey: string, type: string, id: string): boolean {
  const objectString = localStorage.getItem(storageKey);
  if(!objectString) return false;

  try {
    const object = JSON.parse(objectString);
    return !!object[type]?.[id];
  } catch {
    return false;
  }
}