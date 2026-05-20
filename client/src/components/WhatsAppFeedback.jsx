// client/src/components/WhatsAppFeedback.jsx
import { useState } from "react";
import { translations } from "../data/translations";
import { saveFeedback } from "../services/feedbackService";

const links = {
  pt: {
    yes: "https://wa.me/17543669922?text=Ol%C3%A1%2C%20eu%20usei%20o%20Chamado360%20e%20gostei%20da%20minha%20an%C3%A1lise.",
    no: "https://wa.me/17543669922?text=Ol%C3%A1%2C%20eu%20usei%20o%20Chamado360%20e%20n%C3%A3o%20gostei%20muito%20da%20minha%20an%C3%A1lise.%20Gostaria%20de%20dar%20um%20feedback."
  },
  en: {
    yes: "https://wa.me/17543669922?text=Hello%2C%20I%20used%20Chamado360%20and%20I%20liked%20my%20analysis.",
    no: "https://wa.me/17543669922?text=Hello%2C%20I%20used%20Chamado360%20and%20I%20did%20not%20really%20like%20my%20analysis.%20I%20would%20like%20to%20share%20feedback."
  },
  es: {
    yes: "https://wa.me/17543669922?text=Hola%2C%20us%C3%A9%20Chamado360%20y%20me%20gust%C3%B3%20mi%20an%C3%A1lisis.",
    no: "https://wa.me/17543669922?text=Hola%2C%20us%C3%A9%20Chamado360%20y%20no%20me%20gust%C3%B3%20mucho%20mi%20an%C3%A1lisis.%20Me%20gustar%C3%ADa%20dar%20mi%20opini%C3%B3n."
  }
};

export default function WhatsAppFeedback({ language, name, userId }) {
  const [saved, setSaved] = useState(false);
  const t = translations[language] || translations.pt;
  const languageLinks = links[language] || links.pt;

  const handleFeedback = async (feedback) => {
    try {
      await saveFeedback({ name, userId, language, feedback });
      setSaved(true);
    } catch (error) {
      console.error("Feedback save error:", error);
    }

    window.open(languageLinks[feedback], "_blank", "noopener,noreferrer");
  };

  return (
    <section className="feedback-card card-premium text-center">
      <h2>{t.feedbackQuestion}</h2>
      <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
        <button type="button" className="btn btn-success btn-lg" onClick={() => handleFeedback("yes")}>
          {t.feedbackYes}
        </button>
        <button type="button" className="btn btn-outline-light btn-lg" onClick={() => handleFeedback("no")}>
          {t.feedbackNo}
        </button>
      </div>
      {saved && <p className="mt-3 text-gold">{t.feedbackSaved}</p>}
    </section>
  );
}
