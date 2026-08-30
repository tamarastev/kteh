import { useState } from "react";
import type { FormEvent } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IconSearch } from "./Icons";
import "./Navbar.scss";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/properties?q=${encodeURIComponent(searchTerm)}`);
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    "hs-navbar__link" + (isActive ? " hs-navbar__link--active" : "");

  return (
    <header className="hs-navbar">
      <div className="hs-navbar__inner">
        <Link to="/" className="hs-navbar__logo" onClick={() => setMenuOpen(false)}>
          Home Space
        </Link>

        <span className="hs-navbar__phone">Call us: 011 111 11</span>

        <form className="hs-navbar__search" onSubmit={handleSearchSubmit} role="search">
          <IconSearch size={16} className="hs-navbar__search-icon" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search properties"
          />
        </form>

        <button
          className="hs-navbar__burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={
            "hs-navbar__links" + (menuOpen ? " hs-navbar__links--open" : "")
          }
          key={location.pathname}
        >
          <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)} end>
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Properties
          </NavLink>
          <NavLink
            to="/favorites"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Favorites
          </NavLink>
          {isAuthenticated ? (
            <NavLink
              to="/profile"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
