import "./StarRating.scss";

interface StarRatingProps {
  rating: number;
  max?: number;
}

/** Reusable star rating display used on PropertyCard and PropertyDetails. */
export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="hs-stars" aria-label={`Rating: ${rating} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < rating ? "hs-stars__on" : "hs-stars__off"}>
          ★
        </span>
      ))}
    </div>
  );
}
