import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="hs-footer">
      <div className="hs-container hs-footer__top">
        <div className="hs-footer__brand">
          <span className="hs-footer__logo">Home Space</span>
          <p>Your perfect home is just a click away.</p>
        </div>

        <div className="hs-footer__links">
          <span className="hs-footer__heading">Explore</span>
          <Link to="/properties">Properties</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="hs-footer__links">
          <span className="hs-footer__heading">Contact</span>
          <span>Call us: 011 111 111</span>
          <span>homespace@example.com</span>
        </div>
      </div>

      <div className="hs-container hs-footer__bottom">
        <span>© {new Date().getFullYear()} Home Space. Sva prava zadržana.</span>
      </div>
    </footer>
  );
}
