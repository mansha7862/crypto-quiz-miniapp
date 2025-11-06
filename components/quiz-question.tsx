"use client"

import { useState } from "react"

interface QuizQuestionProps {
  question: {
    id: number
    question: string
    options: string[]
    correct: number
  }
  questionNumber: number
  totalQuestions: number
  onAnswer: (answerIndex: number) => void
}

export function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer }: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const handleOptionClick = (index: number) => {
    if (!answered) {
      setSelectedOption(index)
      setAnswered(true)
      setTimeout(() => {
        onAnswer(index)
        setSelectedOption(null)
        setAnswered(false)
      }, 600)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-blue-300">
              {Math.round((questionNumber / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight text-balance">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-medium transform ${
                selectedOption === index
                  ? index === question.correct
                    ? "bg-green-500/30 border-green-500 text-green-100 scale-105"
                    : "bg-red-500/30 border-red-500 text-red-100 scale-105"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:scale-102"
              } ${answered ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-sm font-bold mr-3 flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {selectedOption === index && (
                  <span className="ml-2 text-lg">{index === question.correct ? "✓" : "✗"}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">Take your time and think carefully about each answer.</p>
      </div>
    </div>
  )
}
