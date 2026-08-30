import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";
import { properties, propertyTypes } from "../data/properties";
import { searchLocations } from "../services/GeoService";
import type { IGeoSuggestion } from "../services/GeoService";
import { IconPin } from "../components/Icons";
import "./Properties.scss";

const PAGE_SIZE = 6;

interface Filters {
  where: string;
  persons: string;
  fromDate: string;
  toDate: string;
  propertyType: string;
}

const emptyFilters: Filters = {
  where: "",
  persons: "",
  fromDate: "",
  toDate: "",
  propertyType: "",
};

export default function Properties() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [draft, setDraft] = useState<Filters>({ ...emptyFilters, where: initialQuery });
  const [applied, setApplied] = useState<Filters>({ ...emptyFilters, where: initialQuery });
  const [currentPage, setCurrentPage] = useState(1);

  // Live location suggestions from the free OpenStreetMap Nominatim API.
  const [suggestions, setSuggestions] = useState<IGeoSuggestion[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (draft.where.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        setSuggestionsLoading(true);
        const results = await searchLocations(draft.where);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 450);

    return () => clearTimeout(timeout);
  }, [draft.where]);

  const handleSearch = () => {
    setApplied(draft);
    setCurrentPage(1);
    setShowSuggestions(false);
  };

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesWhere =
        !applied.where ||
        `${p.title} ${p.location} ${p.country}`
          .toLowerCase()
          .includes(applied.where.toLowerCase());
      const matchesPersons = !applied.persons || p.capacity >= Number(applied.persons);
      const matchesType = !applied.propertyType || p.type === applied.propertyType;
      return matchesWhere && matchesPersons && matchesType;
    });
  }, [applied]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <div className="hs-properties hs-container">
      <div className="hs-filters">
        <div className="hs-filters__field hs-filters__field--where">
          <label htmlFor="where">Where to?</label>
          <input
            id="where"
            value={draft.where}
            onChange={(e) => setDraft({ ...draft, where: e.target.value })}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="City, country..."
            autoComplete="off"
          />
          {showSuggestions && (suggestionsLoading || suggestions.length > 0) && (
            <ul className="hs-filters__suggestions">
              {suggestionsLoading && <li className="hs-filters__loading">Searching...</li>}
              {!suggestionsLoading &&
                suggestions.map((s) => (
                  <li
                    key={`${s.lat}-${s.lon}`}
                    onMouseDown={() => setDraft({ ...draft, where: s.displayName })}
                  >
                    <IconPin size={13} /> {s.displayName}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="hs-filters__field">
          <label htmlFor="persons">How many persons?</label>
          <input
            id="persons"
            type="number"
            min={1}
            value={draft.persons}
            onChange={(e) => setDraft({ ...draft, persons: e.target.value })}
            placeholder="e.g. 4"
          />
        </div>

        <div className="hs-filters__field">
          <label htmlFor="from">From date</label>
          <input
            id="from"
            type="date"
            value={draft.fromDate}
            onChange={(e) => setDraft({ ...draft, fromDate: e.target.value })}
          />
        </div>

        <div className="hs-filters__field">
          <label htmlFor="to">To date</label>
          <input
            id="to"
            type="date"
            value={draft.toDate}
            onChange={(e) => setDraft({ ...draft, toDate: e.target.value })}
          />
        </div>

        <div className="hs-filters__field">
          <label htmlFor="type">Property type</label>
          <select
            id="type"
            value={draft.propertyType}
            onChange={(e) => setDraft({ ...draft, propertyType: e.target.value })}
          >
            <option value="">Any</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button className="hs-filters__search" onClick={handleSearch}>
          SEARCH
        </button>
      </div>

      <h2 className="hs-section-title">We recommend for you:</h2>

      <div className="hs-properties__list">
        {pageItems.map((p) => (
          <PropertyCard key={p.id} property={p} variant="horizontal" />
        ))}
        {pageItems.length === 0 && (
          <p className="hs-properties__empty">
            Nema nekretnina koje odgovaraju izabranim filterima.
          </p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
