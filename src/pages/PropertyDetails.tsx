import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { properties } from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import { bookingService } from "../services/BookingService";
import { buildEmbedMapUrl, searchLocations } from "../services/GeoService";
import { getCurrentWeather } from "../services/WeatherService";
import type { IWeatherSnapshot } from "../services/WeatherService";
import StarRating from "../components/StarRating";
import Button from "../components/Button";
import SmartImage from "../components/SmartImage";
import "./PropertyDetails.scss";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === Number(id));
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  const [activeImage, setActiveImage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [weather, setWeather] = useState<IWeatherSnapshot | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);


  useEffect(() => {
    if (!property) return;
    let cancelled = false;

    searchLocations(`${property.location}, ${property.country}`)
      .then((results) => {
        if (cancelled || results.length === 0) return;

        const { lat, lon } = results[0];
        setMapUrl(buildEmbedMapUrl(lat, lon));

        setWeatherLoading(true);
        getCurrentWeather(lat, lon)
          .then((snapshot) => {
            if (!cancelled) setWeather(snapshot);
          })
          .catch(() => {
            if (!cancelled) setWeather(null);
          })
          .finally(() => {
            if (!cancelled) setWeatherLoading(false);
          });
      })
      .catch(() => setMapUrl(null));

    return () => {
      cancelled = true;
    };
  }, [property]);

  useEffect(() => {
    if (!property) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveImage((prev) => (prev + 1) % property.images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [property]);

  if (!property) {
    return (
      <div className="hs-container hs-details__not-found">
        <p>Nekretnina nije pronađena.</p>
        <Link to="/properties">Nazad na Properties</Link>
      </div>
    );
  }

  const favored = isFavorite(property.id);

  const handleScheduleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    bookingService.addBooking({
      id: `${property.id}-${Date.now()}`,
      propertyId: property.id,
      propertyTitle: property.title,
      userEmail: user.email,
      visitDate,
      fullName: user.fullName,
      phone: user.phone,
      createdAt: new Date().toISOString(),
    });

    setConfirmation(`Obilazak zakazan za ${visitDate}. Kontaktiraćemo vas uskoro!`);
    setShowForm(false);
  };

  return (
    <div className="hs-container hs-details">
      <div className="hs-details__gallery">
        <div className="hs-details__main-image-wrap">
          <SmartImage
            className="hs-details__main-image"
            src={property.images[activeImage]}
            fallbackSrc={property.fallbackImages[activeImage]}
            alt={property.title}
          />
          <button
            className={"hs-details__heart hs-details__heart--overlay" + (favored ? " hs-details__heart--on" : "")}
            onClick={() => toggleFavorite(property.id)}
            aria-label="Toggle favorite"
          >
            {favored ? "♥" : "♡"}
          </button>
        </div>
        <div className="hs-details__thumbs">
          {property.images.map((img, i) => (
            <SmartImage
              key={img}
              src={img}
              fallbackSrc={property.fallbackImages[i]}
              alt={`${property.title} ${i + 1}`}
              className={i === activeImage ? "hs-details__thumb--active" : ""}
              onClick={() => setActiveImage(i)}
            />
          ))}
        </div>
      </div>

      <div className="hs-details__info">
        <h1 className="hs-details__title">{property.title}</h1>

        <div className="hs-details__facts-box">
        <div className="hs-details__facts">
          <div>
            <span>Price:</span> €{property.price.toLocaleString()}/{property.priceUnit}
          </div>
          <div>
            <span>Location:</span> {property.location}, {property.country}
          </div>
          <div>
            <span>Property Type:</span> {property.type}
          </div>
          <div>
            <span>Size:</span> {property.size} m²
          </div>
          <div>
            <span>Rooms:</span> {property.rooms}
          </div>
          <div>
            <span>Persons:</span> {property.capacity}
          </div>
          {weatherLoading && (
            <div>
              <span>Weather:</span> Loading...
            </div>
          )}
          {weather && (
            <div>
              <span>Weather:</span> {Math.round(weather.temperatureC)}°C, {weather.description}
              {" · "}wind {Math.round(weather.windSpeedKmh)} km/h
            </div>
          )}
        </div>

        <div className="hs-details__rating-row">
          <StarRating rating={property.rating} />
          <button
            className={"hs-details__heart" + (favored ? " hs-details__heart--on" : "")}
            onClick={() => toggleFavorite(property.id)}
            aria-label="Toggle favorite"
          >
            {favored ? "♥" : "♡"}
          </button>
        </div>
        </div>

        <p className="hs-details__cta-text">
          Opportunities like this are rare. Schedule your private viewing today.
        </p>

        {confirmation ? (
          <p className="hs-details__confirmation">{confirmation}</p>
        ) : showForm ? (
          <form className="hs-details__schedule-form" onSubmit={handleScheduleSubmit}>
            <label htmlFor="visit-date">Choose a date</label>
            <input
              id="visit-date"
              type="date"
              required
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
            />
            <div className="hs-details__schedule-actions">
              <Button type="submit">Confirm</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button variant="outline" onClick={() => setShowForm(true)}>
            Schedule a viewing
          </Button>
        )}
      </div>

      <div className="hs-details__description">
        <h2>About this property</h2>
        <p>{property.longDescription}</p>
      </div>

      {mapUrl && (
        <div className="hs-details__map">
          <h2>Location</h2>
          <iframe
            title="Property location map"
            src={mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}
