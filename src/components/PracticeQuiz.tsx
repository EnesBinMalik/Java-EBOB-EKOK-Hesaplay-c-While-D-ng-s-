import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../utils/quizQuestions';

export const PracticeQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isComplete = answeredCount === QUIZ_QUESTIONS.length;

  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-white">
              EBOB & EKOK Kavram Testi ve Alıştırmalar
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {answeredCount} / {QUIZ_QUESTIONS.length} Soru Cevaplandı
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          While döngüsü mantığını, EBOB ve EKOK kurallarını pekiştirmek için hazırlanmış çoktan seçmeli soruları yanıtlayın.
        </p>

        {showResults && (
          <div className="mt-4 p-4 rounded-lg bg-indigo-950/40 border border-indigo-800/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-indigo-400" />
              <div>
                <div className="text-sm font-semibold text-white">
                  Test Tamamlandı: {correctCount} / {QUIZ_QUESTIONS.length} Doğru
                </div>
                <div className="text-xs text-slate-400">
                  {correctCount === QUIZ_QUESTIONS.length
                    ? 'Tebrikler! Konuyu ve döngü yapısını mükemmel anladınız.'
                    : 'Açıklamaları inceleyerek eksiklerinizi tamamlayabilirsiniz.'}
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yeniden Çöz</span>
            </button>
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="text-sm font-semibold text-white">
                  {idx + 1}. {q.question}
                </h4>
                {showResults && (
                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Doğru
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-rose-400 font-medium">
                        <XCircle className="w-4 h-4" /> Yanlış
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2 mt-3">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let borderClass = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700';
                  if (showResults) {
                    if (isThisCorrect) {
                      borderClass = 'border-emerald-600/60 bg-emerald-950/30 text-emerald-200 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      borderClass = 'border-rose-600/60 bg-rose-950/30 text-rose-300';
                    }
                  } else if (isThisSelected) {
                    borderClass = 'border-indigo-500 bg-indigo-950/40 text-indigo-200 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={showResults}
                      className={`text-left text-xs p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${borderClass}`}
                    >
                      <span>{option}</span>
                      <span className="text-[11px] font-mono text-slate-500 ml-2 shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {showResults && (
                <div className="mt-3.5 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded">
                  <strong className="text-indigo-400">Açıklama:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!showResults && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowResults(true)}
            disabled={!isComplete}
            className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-900 bg-indigo-400 hover:bg-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
          >
            {isComplete ? 'Cevapları Kontrol Et' : `Tüm Soruları Cevaplayınız (${answeredCount}/${QUIZ_QUESTIONS.length})`}
          </button>
        </div>
      )}
    </div>
  );
};
