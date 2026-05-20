// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\pages\Result.jsx

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import WhatsAppFeedback from "../components/WhatsAppFeedback";
import { translations } from "../data/translations";
import { classifyCalling } from "../services/callingClassifier";
import { savePublicCalling } from "../services/callingPublicService";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const storedLanguage = localStorage.getItem("chamado360_language") || "pt";
  const storedName = localStorage.getItem("chamado360_name") || "";
  const storedUserId = localStorage.getItem("chamado360_userId") || "";

  const language = location.state?.language || storedLanguage;
  const name = location.state?.name || storedName;
  const userId = location.state?.userId || storedUserId;
  const result = location.state?.result || "";
  const answers = location.state?.answers || [];

  const t = translations[language] || translations.pt;

  const [copied, setCopied] = useState(false);
  const [publicSaved, setPublicSaved] = useState(false);

  const callingSummary = useMemo(() => {
    return classifyCalling({
      answers,
      language
    });
  }, [answers, language]);

  useEffect(() => {
    const saveCallingToWall = async () => {
      const alreadySavedKey = `chamado360_public_saved_${userId}`;

      if (!name || !userId || !callingSummary?.callingTitle) return;
      if (localStorage.getItem(alreadySavedKey)) return;

      try {
        await savePublicCalling({
          name,
          userId,
          language,
          callingTitle: callingSummary.callingTitle,
          ephesiansGift: callingSummary.ephesiansGift
        });

        localStorage.setItem(alreadySavedKey, "true");
        setPublicSaved(true);
      } catch (error) {
        console.error("Error saving public calling:", error);
      }
    };

    saveCallingToWall();
  }, [name, userId, language, callingSummary]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], {
      type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Chamado360-${name || "resultado"}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleRestart = () => {
    navigate("/");
  };

  if (!result) {
    return (
      <main className="page-shell">
        <section className="container py-5 text-center">
          <div className="premium-card mx-auto result-empty-card">
            <h1>Chamado360</h1>
            <p>{t.resultNotFound || "No result found."}</p>
            <button className="btn btn-gold" onClick={handleRestart}>
              {t.restart || "Start again"}
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell result-page">
      <section className="container py-5">
        <div className="result-hero text-center mb-4">
          <span className="section-kicker">Chamado360</span>
          <h1>{t.resultTitle || "Resultado da sua análise de chamado"}</h1>
          <p>{t.resultSubtitle || "Leia com oração, sabedoria e maturidade."}</p>
        </div>

        <div className="calling-summary-card mb-4">
          <div>
            <span className="section-kicker">Efésios 4:11</span>
            <h3>
              {name}: {callingSummary.callingTitle}
            </h3>
            <p>
              Esta é uma leitura inicial baseada nas suas respostas. Confirme com oração,
              frutos, maturidade, serviço prático e liderança cristã madura.
            </p>
          </div>

          <span className="calling-summary-badge">
            {callingSummary.ephesiansGift}
          </span>
        </div>

        <div className="result-actions mb-4">
          <button className="btn btn-light-gold" onClick={handleCopy}>
            {copied ? t.copied || "Copied" : t.copyResult || "Copy result"}
          </button>

          <button className="btn btn-outline-light" onClick={handleDownload}>
            {t.downloadTxt || "Download .txt"}
          </button>

          <button className="btn btn-outline-warning" onClick={handleRestart}>
            {t.restart || "Start again"}
          </button>
        </div>

        <ResultCard result={result} />

        <WhatsAppFeedback language={language} name={name} userId={userId} />

        {publicSaved && (
          <div className="text-center mt-3 text-light opacity-75">
            Seu chamado resumido foi adicionado ao mural.
          </div>
        )}
      </section>
    </main>
  );
};

export default Result;