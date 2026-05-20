// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\pages\Home.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CallingWall from "../components/CallingWall";
import LanguageSelector from "../components/LanguageSelector";
import { translations } from "../data/translations";
import { saveUserName } from "../services/nameService";

export default function Home() {
  const navigate = useNavigate();

  const savedLanguage = localStorage.getItem("chamado360_language") || "pt";

  const [language, setLanguage] = useState(savedLanguage);
  const [name, setName] = useState(
    localStorage.getItem("chamado360_name") || ""
  );
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const t = translations[language] || translations.pt;

  const handleStart = async (event) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError(t.nameRequired);
      return;
    }

    setIsSaving(true);

    try {
      const userId = await saveUserName({
        name,
        language
      });

      localStorage.setItem("chamado360_name", name.trim());
      localStorage.setItem("chamado360_userId", userId || "");
      localStorage.setItem("chamado360_language", language);
      localStorage.removeItem("chamado360_result");
      localStorage.removeItem("chamado360_answers");

      navigate("/quiz");
    } catch (err) {
      console.error("Error saving user name:", err);
      setError(t.savingError);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="page-section home-hero">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="hero-copy">
              <div className="hero-language-box mb-4">
                <LanguageSelector
                  language={language}
                  setLanguage={setLanguage}
                  label={t.languageLabel}
                />
              </div>

              <div className="eyebrow">✦ Chamado • Propósito • Sabedoria</div>

              <h1>{t.appName}</h1>

              <p className="lead">{t.subtitle}</p>

              <div className="scripture-card card-premium">
                <p>{t.mainPhrase}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <form className="home-card card-premium" onSubmit={handleStart}>
              <div>
                <label className="form-label fw-semibold">
                  {t.namePlaceholder}
                </label>

                <input
                  className="form-control form-control-lg modern-input"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t.namePlaceholder}
                />
              </div>

              {error && (
                <div className="alert alert-warning mt-3 mb-0">{error}</div>
              )}

              <button
                type="submit"
                className="btn btn-gold w-100 btn-lg mt-4"
                disabled={isSaving}
              >
                {isSaving ? "..." : t.start}
              </button>

              <div className="balanced-warning mt-4">
                <strong>⚖</strong>
                <span>{t.warning}</span>
              </div>
            </form>
          </div>
        </div>

        <section className="mt-5">
          <CallingWall language={language} />
        </section>
      </div>
    </main>
  );
}