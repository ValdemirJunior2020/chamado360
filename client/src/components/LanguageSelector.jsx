// client/src/components/LanguageSelector.jsx
export default function LanguageSelector({ language, setLanguage, label }) {
  return (
    <div className="language-selector">
      <label className="form-label fw-semibold">{label}</label>
      <div className="row g-2">
        <div className="col-4">
          <button type="button" className={`language-btn ${language === "pt" ? "active" : ""}`} onClick={() => setLanguage("pt")}>
            🇧🇷 Português
          </button>
        </div>
        <div className="col-4">
          <button type="button" className={`language-btn ${language === "en" ? "active" : ""}`} onClick={() => setLanguage("en")}>
            🇺🇸 English
          </button>
        </div>
        <div className="col-4">
          <button type="button" className={`language-btn ${language === "es" ? "active" : ""}`} onClick={() => setLanguage("es")}>
            🇪🇸 Español
          </button>
        </div>
      </div>
    </div>
  );
}
