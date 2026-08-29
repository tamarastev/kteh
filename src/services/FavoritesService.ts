const keyFor = (email: string) => `hs_favorites_${email}`;

export interface IFavoritesService {
  getFavorites(email: string): number[];
  toggleFavorite(email: string, propertyId: number): number[];
}

class FavoritesServiceImpl implements IFavoritesService {
  getFavorites(email: string): number[] {
    const raw = localStorage.getItem(keyFor(email));
    if (!raw) return [];
    try {
      return JSON.parse(raw) as number[];
    } catch {
      return [];
    }
  }

  toggleFavorite(email: string, propertyId: number): number[] {
    const current = this.getFavorites(email);
    const updated = current.includes(propertyId)
      ? current.filter((id) => id !== propertyId)
      : [...current, propertyId];
    localStorage.setItem(keyFor(email), JSON.stringify(updated));
    return updated;
  }
}

export const favoritesService: IFavoritesService = new FavoritesServiceImpl();
