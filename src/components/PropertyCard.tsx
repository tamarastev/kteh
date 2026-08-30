import { Link } from "react-router-dom";
import type { IProperty } from "../models/Property";
import { useFavorites } from "../context/FavoritesContext";
import StarRating from "./StarRating";
import SmartImage from "./SmartImage";
import { IconPerson } from "./Icons";
import "./PropertyCard.scss";

interface PropertyCardProps {
  property: IProperty;
  variant?: "horizontal" | "grid";
}

/** Reusable property card used on Home, Properties and Favorites pages. */
export default function PropertyCard({ property, variant = "horizontal" }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favored = isFavorite(property.id);

  return (
    <div className={`hs-card hs-card--${variant}`}>
      <Link to={`/properties/${property.id}`} className="hs-card__image-link">
        <SmartImage
          src={property.images[0]}
          fallbackSrc={property.fallbackImages[0]}
          alt={property.title}
          loading="lazy"
        />
      </Link>

      <div className="hs-card__body">
        <div className="hs-card__top">
          <div>
            <Link to={`/properties/${property.id}`} className="hs-card__title">
              {property.title}
            </Link>
            <div className="hs-card__location">
              {property.location}, {property.country}
            </div>
          </div>
          <button
            className={"hs-card__heart" + (favored ? " hs-card__heart--on" : "")}
            onClick={() => toggleFavorite(property.id)}
            aria-label={favored ? "Remove from favorites" : "Add to favorites"}
          >
            {favored ? "♥" : "♡"}
          </button>
        </div>

        {variant === "horizontal" ? (
          <>
            <div className="hs-card__capacity">
              <IconPerson size={14} /> {property.capacity}
            </div>
            <p className="hs-card__desc">{property.description}</p>
          </>
        ) : (
          <>
            <div className="hs-card__price">
              €{property.price.toLocaleString()}/{property.priceUnit === "month" ? "month" : "total"}
            </div>
            <StarRating rating={property.rating} />
          </>
        )}
      </div>
    </div>
  );
}
