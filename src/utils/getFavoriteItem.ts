import { ContentType, DataApi } from "../interfaces/requestInterface.js";

export class FavoriteItem {
  private getFavoriteItem(id: string): boolean {
    let dataLocalStorage = [];
    try {
      dataLocalStorage = JSON.parse(localStorage.getItem("characters") || "");
    } catch (error) {
      return false;
    }

    const characters: Array<{}> = dataLocalStorage;
    return characters.includes(id);
  }

  public setFavoriteItem(type: ContentType, id: string): void {
    const storageKey = "favorites";
    let dataLocalStorage = [];
    try {
      dataLocalStorage = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
    } catch (error) {
      console.warn("Erro ao ler localStorage.");
    }
    if (!dataLocalStorage[type]) {
      dataLocalStorage[type] = {};
    }
    dataLocalStorage[type][id] = dataLocalStorage;
    localStorage.setItem(storageKey, JSON.stringify(dataLocalStorage));
  }

  private buscarItemFavorito(tipo: ContentType, id: string): object | null {
    const storageKey = "favoritos";

    try {
      const data = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
      return data[tipo]?.[id] ?? null;
    } catch (error) {
      console.error("Erro ao buscar item favorito:", error);
      return null;
    }
  }
}
