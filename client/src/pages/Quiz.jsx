// client/src/pages/Quiz.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalmMusicPlayer from "../components/CalmMusicPlayer";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import LoadingScreen from "../components/LoadingScreen";
import { questions } from "../data/questions";
import { translations } from "../data/translations";
import { generateCallingAnalysis } from "../api/openaiApi";

export default function Quiz() {
  const navigate = useNavigate();
  const language = localStorage.getItem("chamado360_language") || "pt";
  const name = localStorage.getItem("chamado360_name") || "";
  const t = translations[language] || translations.pt;
  const activeQuestions = questions[language] || questions.pt;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("chamado360_answers");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return Array(activeQuestions.length).fill("");
      }
    }
    return Array(activeQuestions.length).fill("");
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!name) navigate("/");
  }, [name, navigate]);

  useEffect(() => {
    localStorage.setItem("chamado360_answers", JSON.stringify(answers));
  }, [answers]);

  const updateAnswer = (value) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = value;
      return next;
    });
  };

  const goNext = () => {
    setError("");
    if (!answers[currentIndex]?.trim()) {
      setError(t.requiredAnswer);
      return;
    }
    setCurrentIndex((prev) => Math.min(prev + 1, activeQuestions.length - 1));
  };

  const goBack = () => {
    setError("");
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleGenerate = async () => {
    setError("");
    if (!answers[currentIndex]?.trim()) {
      setError(t.requiredAnswer);
      return;
    }

    setIsLoading(true);
    try {
      const data = await generateCallingAnalysis({ language, name, answers });
      if (!data.success) throw new Error(data.message || "Failed");
      localStorage.setItem("chamado360_result", data.result);
      navigate("/result");
    } catch (err) {
      console.error(err);
      setError(t.errorResult);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingScreen message={t.loading} />;

  return (
    <section className="page-section quiz-section">
      <div className="container">
        <CalmMusicPlayer language={language} />
        <ProgressBar current={currentIndex} total={activeQuestions.length} />

        <QuestionCard
          question={activeQuestions[currentIndex]}
          value={answers[currentIndex] || ""}
          onChange={updateAnswer}
          label={t.question}
          index={currentIndex}
          total={activeQuestions.length}
        />

        {error && <div className="alert alert-warning mt-3">{error}</div>}

        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4">
          <button type="button" className="btn btn-outline-light btn-lg" onClick={goBack} disabled={currentIndex === 0}>
            {t.back}
          </button>

          {currentIndex < activeQuestions.length - 1 ? (
            <button type="button" className="btn btn-gold btn-lg" onClick={goNext}>
              {t.next}
            </button>
          ) : (
            <button type="button" className="btn btn-gold btn-lg" onClick={handleGenerate}>
              {t.generate}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
