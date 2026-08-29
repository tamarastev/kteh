import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { favoritesService } from "../services/FavoritesService";

interface FavoritesContextValue {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const GUEST_KEY = "guest";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const emailKey = user?.email ?? GUEST_KEY;

  // Lazy-initialize from whatever user is already known on first render
  // (AuthProvider restores the session synchronously), so there is no
  // window where a "save" effect could run before the real data loads.
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() =>
    favoritesService.getFavorites(emailKey)
  );

  // Re-sync only when the logged-in user actually changes (e.g. logout then
  // a different account logs in during the same session). This effect only
  // *reads*, so it can never clobber storage.
  useEffect(() => {
    setFavoriteIds(favoritesService.getFavorites(emailKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailKey]);

  const toggleFavorite = (id: number) => {
    const updated = favoritesService.toggleFavorite(emailKey, id);
    setFavoriteIds(updated);
  };

  const isFavorite = (id: number) => favoriteIds.includes(id);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
}
