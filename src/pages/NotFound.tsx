import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="hs-container" style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
      <h1>404</h1>
      <p>Stranica koju tražite ne postoji.</p>
      <Link to="/">Nazad na početnu</Link>
    </div>
  );
}
