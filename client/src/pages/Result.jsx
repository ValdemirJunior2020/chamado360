// client/src/pages/Result.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import WhatsAppFeedback from "../components/WhatsAppFeedback";
import { translations } from "../data/translations";

export default function Result() {
  const navigate = useNavigate();
  const language = localStorage.getItem("chamado360_language") || "pt";
  const name = localStorage.getItem("chamado360_name") || "";
  const userId = localStorage.getItem("chamado360_userId") || "";
  const t = translations[language] || translations.pt;
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedResult = localStorage.getItem("chamado360_result") || "";
    setResult(savedResult);
  }, []);

  const copyResult = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadTxt = () => {
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Chamado360-${name || "resultado"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const restart = () => {
    localStorage.removeItem("chamado360_answers");
    localStorage.removeItem("chamado360_result");
    navigate("/");
  };

  if (!result) {
    return (
      <section className="page-section center-section">
        <div className="card-premium text-center empty-card">
          <h1>{t.noResult}</h1>
          <button className="btn btn-gold mt-3" type="button" onClick={restart}>{t.restart}</button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section result-section">
      <div className="container">
        <div className="result-actions card-premium">
          <div>
            <h1>Chamado360</h1>
            <p>{t.subtitle}</p>
          </div>
          <div className="d-flex flex-column flex-md-row gap-2">
            <button type="button" className="btn btn-outline-light" onClick={copyResult}>{copied ? t.copied : t.copy}</button>
            <button type="button" className="btn btn-outline-light" onClick={downloadTxt}>{t.download}</button>
            <button type="button" className="btn btn-gold" onClick={restart}>{t.restart}</button>
          </div>
        </div>

        <ResultCard result={result} />
        <WhatsAppFeedback language={language} name={name} userId={userId} />
      </div>
    </section>
  );
}
