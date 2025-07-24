import { ObjectFavoriteInterface } from "../interfaces/favoriteInterface.js";

export function setItemFavorite(
  favorite: string,
  objectFavorite: ObjectFavoriteInterface
) {
  const tooltipSaved = document.querySelector('.tooltip-saved') as HTMLDivElement;
  try {
    const existingData = localStorage.getItem(favorite);
    let updateData: Record<string, any> = {};

    if (existingData) {
      const previousData = JSON.parse(existingData);
      for (const type in objectFavorite) {
        updateData[type] = {
          ...previousData[type],
          ...objectFavorite[type],
        };
      }
      for (const type in previousData) {
        if (!updateData[type]) {
          updateData[type] = previousData[type];
        }
      }
    } else {
      updateData = objectFavorite;
    }
    localStorage.setItem(favorite, JSON.stringify(updateData));

    if (tooltipSaved) {
      tooltipSaved.style.display = "block";
      tooltipSaved.style.opacity = "1";
      setTimeout(() => {
        tooltipSaved.style.opacity = "0";
        setTimeout(() => {
          tooltipSaved.style.display = "none";
        }, 200);
      }, 1000);
    }
  } catch (erro) {
    console.error("Erro ao adicionar dados", erro);
    throw erro;
  }
}

export function removeItemfavorite(favorite: string, type: string, id: string) {
  try {
    const tooltipNotSaved = document.querySelector(
      ".tooltip-not-saved"
    ) as HTMLDivElement;
    const existingData = localStorage.getItem(favorite);
    if (!existingData) return;

    const currentData: Record<string, Record<string, any>> = JSON.parse(
      existingData
    );

    if (currentData[type] && currentData[type]?.[id]) {
      delete currentData[type][id];
    }
    if (Object.keys(currentData[type] ?? {}).length === 0) {
      delete currentData[type];
    }
    localStorage.setItem(favorite, JSON.stringify(currentData));

    if (tooltipNotSaved) {
      tooltipNotSaved.style.display = "block";
      tooltipNotSaved.style.opacity = "1";
      setTimeout(() => {
        tooltipNotSaved.style.opacity = "0";
        setTimeout(() => {
          tooltipNotSaved.style.display = "none";
        }, 200);
      }, 1000);
    }
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
  }
}
export function isItemFavorite(
  storageKey: string,
  type: string,
  id: string
): boolean {
  const objectString = localStorage.getItem(storageKey);
  if (!objectString) return false;

  try {
    const object = JSON.parse(objectString);
    return !!object[type]?.[id];
  } catch {
    return false;
  }
}
