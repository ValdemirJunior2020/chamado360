// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\components\QuestionCard.jsx

export default function QuestionCard({
  questionNumber,
  current,
  totalQuestions,
  total,
  question,
  answer,
  value,
  onAnswerChange,
  setAnswer
}) {
  const safeCurrent = Number(questionNumber || current || 1);
  const safeTotal = Number(totalQuestions || total || 15);
  const safeAnswer = answer ?? value ?? "";

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (onAnswerChange) {
      onAnswerChange(newValue);
      return;
    }

    if (setAnswer) {
      setAnswer(newValue);
    }
  };

  return (
    <div className="question-card card-premium">
      <div className="question-number-pill">
        {safeCurrent} / {safeTotal}
      </div>

      <h2 className="question-title">{question}</h2>

      <textarea
        className="form-control modern-textarea"
        value={safeAnswer}
        onChange={handleChange}
        rows="6"
        placeholder="Escreva sua resposta aqui..."
      />
    </div>
  );
}