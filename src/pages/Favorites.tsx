import { properties } from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";
import PropertyCard from "../components/PropertyCard";
import "./Favorites.scss";

export default function Favorites() {
  const { favoriteIds } = useFavorites();
  const favoriteProperties = properties.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="hs-favorites hs-container">
      <h1>Favorites</h1>

      {favoriteProperties.length === 0 ? (
        <p className="hs-favorites__empty">
          Još uvek nemate sačuvanih nekretnina. Dodajte ih klikom na ♡ na kartici nekretnine.
        </p>
      ) : (
        <div className="hs-favorites__grid">
          {favoriteProperties.map((p) => (
            <PropertyCard key={p.id} property={p} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
