"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { PaymentModal } from "./payment-modal"
import { ShareResults } from "./share-results"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
  const { address } = useAccount()
  const [paid, setPaid] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(true)
  const percentage = Math.round((score / totalQuestions) * 100)

  const handlePaymentSuccess = () => {
    setPaid(true)
    setShowPaymentModal(false)
  }

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect! You're a crypto expert!"
    if (percentage >= 80) return "Excellent! You know your crypto well!"
    if (percentage >= 60) return "Good job! You have solid crypto knowledge!"
    if (percentage >= 40) return "Not bad! Keep learning about crypto!"
    return "Keep studying! Crypto is complex!"
  }

  const getPerformanceBadge = () => {
    if (percentage === 100) return "🚀"
    if (percentage >= 80) return "💎"
    if (percentage >= 60) return "📈"
    if (percentage >= 40) return "📚"
    return "💪"
  }

  return (
    <div className="w-full max-w-2xl">
      {showPaymentModal && address ? (
        <PaymentModal address={address} onPaymentSuccess={handlePaymentSuccess} />
      ) : (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          {!paid && !address && (
            <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-100 font-medium text-center">Please connect your wallet to unlock your score</p>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Quiz Complete!</h2>

            <div className="mb-6">
              <div className="text-7xl mb-3">{getPerformanceBadge()}</div>
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                {score}/{totalQuestions}
              </div>
              <p className="text-2xl md:text-3xl font-semibold text-gray-200 mt-4">{percentage}%</p>
            </div>

            <p className="text-xl text-gray-300 mb-6">{getPerformanceMessage()}</p>
          </div>

          {paid && <ShareResults score={score} percentage={percentage} />}

          <button
            onClick={onRestart}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg border border-white/20 transition mt-6 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
