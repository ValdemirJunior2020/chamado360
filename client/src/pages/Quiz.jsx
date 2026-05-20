// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\pages\Quiz.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalmMusicPlayer from "../components/CalmMusicPlayer";
import LoadingScreen from "../components/LoadingScreen";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { generateCallingAnalysis } from "../api/openaiApi";
import { questions } from "../data/questions";
import { translations } from "../data/translations";

export default function Quiz() {
  const navigate = useNavigate();

  const language = localStorage.getItem("chamado360_language") || "pt";
  const name = localStorage.getItem("chamado360_name") || "";
  const userId = localStorage.getItem("chamado360_userId") || "";

  const selectedQuestions = useMemo(() => {
    return questions[language] || questions.pt;
  }, [language]);

  const t = translations[language] || translations.pt;

  const getSavedAnswers = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("chamado360_answers"));

      if (Array.isArray(saved) && saved.length === selectedQuestions.length) {
        return saved;
      }

      return Array(selectedQuestions.length).fill("");
    } catch {
      return Array(selectedQuestions.length).fill("");
    }
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(getSavedAnswers);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  useEffect(() => {
    localStorage.setItem("chamado360_answers", JSON.stringify(answers));
  }, [answers]);

  const currentAnswer = answers[currentQuestionIndex] || "";
  const currentQuestion = selectedQuestions[currentQuestionIndex] || "";

  const handleAnswerChange = (value) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = value;
      return updatedAnswers;
    });

    setError("");
  };

  const handleNext = () => {
    const latestAnswer = answers[currentQuestionIndex] || "";

    if (!latestAnswer.trim()) {
      setError(t.answerRequired || "Please answer this question.");
      return;
    }

    setError("");

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setError("");

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGenerate = async () => {
    const updatedAnswers = [...answers];

    const hasEmptyAnswer = updatedAnswers.some((answer) => !answer.trim());

    if (hasEmptyAnswer) {
      setError(t.allAnswersRequired || "Please answer all questions.");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      const data = await generateCallingAnalysis({
        language,
        name,
        answers: updatedAnswers
      });

      if (!data?.success || !data?.result) {
        throw new Error(data?.message || "No result returned.");
      }

      localStorage.setItem("chamado360_result", data.result);
      localStorage.setItem("chamado360_answers", JSON.stringify(updatedAnswers));
      localStorage.setItem("chamado360_language", language);
      localStorage.setItem("chamado360_name", name);
      localStorage.setItem("chamado360_userId", userId);

      navigate("/result", {
        state: {
          result: data.result,
          answers: updatedAnswers,
          language,
          name,
          userId
        }
      });
    } catch (err) {
      console.error("Error generating analysis:", err);

      const backendMessage =
        err?.response?.data?.message ||
        err?.message ||
        t.generateError ||
        "Error generating analysis. Please try again.";

      setError(backendMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return <LoadingScreen language={language} />;
  }

  return (
    <main className="page-section quiz-page">
      <div className="container">
        <div className="quiz-layout">
          <div className="quiz-top-area">
            <CalmMusicPlayer language={language} />

            <ProgressBar
              current={currentQuestionIndex + 1}
              total={selectedQuestions.length}
            />
          </div>

          <QuestionCard
            questionNumber={currentQuestionIndex + 1}
            current={currentQuestionIndex + 1}
            totalQuestions={selectedQuestions.length}
            total={selectedQuestions.length}
            question={currentQuestion}
            answer={currentAnswer}
            value={currentAnswer}
            onAnswerChange={handleAnswerChange}
            setAnswer={handleAnswerChange}
            language={language}
          />

          {error && <div className="alert alert-warning mt-3">{error}</div>}

          <div className="quiz-actions mt-4">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
            >
              {t.back || "Voltar"}
            </button>

            {currentQuestionIndex < selectedQuestions.length - 1 ? (
              <button
                type="button"
                className="btn btn-gold"
                onClick={handleNext}
              >
                {t.next || "Próxima"}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-gold"
                onClick={handleGenerate}
              >
                {t.generateResult || "Gerar minha análise de chamado"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}