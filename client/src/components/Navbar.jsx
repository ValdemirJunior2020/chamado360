// client/src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { translations } from "../data/translations";

export default function Navbar() {
  const language = localStorage.getItem("chamado360_language") || "pt";
  const t = translations[language] || translations.pt;

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="brand-mark">✦</span>
          <span>
            <strong>{t.appName}</strong>
            <small className="d-block">{t.navSubtitle}</small>
          </span>
        </Link>
      </div>
    </nav>
  );
}
