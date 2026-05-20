// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\pages\Quiz.jsx

import { useEffect, useState } from "react";
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

  const selectedQuestions = questions[language] || questions.pt;
  const t = translations[language] || translations.pt;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    Array(selectedQuestions.length).fill("")
  );
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  const currentAnswer = answers[currentQuestionIndex];

  const handleAnswerChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
    localStorage.setItem("chamado360_answers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    setError("");

    if (!currentAnswer.trim()) {
      setError(t.answerRequired || "Please answer this question.");
      return;
    }

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError("");

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleGenerate = async () => {
    setError("");

    const hasEmptyAnswer = answers.some((answer) => !answer.trim());

    if (hasEmptyAnswer) {
      setError(t.allAnswersRequired || "Please answer all questions.");
      return;
    }

    setIsGenerating(true);

    try {
      const data = await generateCallingAnalysis({
        language,
        name,
        answers
      });

      if (!data?.success || !data?.result) {
        throw new Error(data?.message || "No result returned.");
      }

      localStorage.setItem("chamado360_result", data.result);
      localStorage.setItem("chamado360_answers", JSON.stringify(answers));
      localStorage.setItem("chamado360_language", language);
      localStorage.setItem("chamado360_name", name);
      localStorage.setItem("chamado360_userId", userId);

      navigate("/result", {
        state: {
          result: data.result,
          answers,
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
            totalQuestions={selectedQuestions.length}
            question={selectedQuestions[currentQuestionIndex]}
            answer={currentAnswer}
            onAnswerChange={handleAnswerChange}
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
              {t.back}
            </button>

            {currentQuestionIndex < selectedQuestions.length - 1 ? (
              <button
                type="button"
                className="btn btn-gold"
                onClick={handleNext}
              >
                {t.next}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-gold"
                onClick={handleGenerate}
              >
                {t.generateResult}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}