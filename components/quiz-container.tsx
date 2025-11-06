"use client"

import { useState } from "react"
import { quizQuestions } from "./quiz-data"
import { QuizQuestion } from "./quiz-question"
import { QuizResults } from "./quiz-results"
import { QuizHeader } from "./quiz-header"
import { QuizFooter } from "./quiz-footer"

export function QuizContainer() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  const handleStart = () => {
    setQuizStarted(true)
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers, answerIndex]
    setSelectedAnswers(newAnswers)

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setQuizStarted(false)
    setQuizCompleted(false)
    setSelectedAnswers([])
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-4 py-8">
        <QuizHeader />

        <main className="flex-1 flex items-center justify-center w-full max-w-2xl">
          {!quizStarted ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl text-center transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to test your crypto knowledge?</h2>
              <p className="text-lg text-gray-200 mb-2 leading-relaxed">
                Answer 10 multiple-choice questions and see how well you know cryptocurrency! Connect your wallet to
                unlock your results.
              </p>
              <p className="text-sm text-gray-400 mb-8">Difficulty: Beginner to Intermediate</p>
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-lg"
              >
                Start Quiz
              </button>
            </div>
          ) : quizCompleted ? (
            <QuizResults score={score} totalQuestions={quizQuestions.length} onRestart={handleRestart} />
          ) : (
            <QuizQuestion
              question={quizQuestions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={quizQuestions.length}
              onAnswer={handleAnswer}
            />
          )}
        </main>

        <QuizFooter />
      </div>
    </div>
  )
}
