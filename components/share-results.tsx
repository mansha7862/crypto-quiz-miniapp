"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface ShareResultsProps {
  score: number
  percentage: number
}

export function ShareResults({ score, percentage }: ShareResultsProps) {
  const [shared, setShared] = useState(false)
  const [copied, setCopied] = useState(false)

  const getShareMessage = () => {
    let message = `I just completed the Crypto IQ Test and scored ${score}/10 (${percentage}%)! `

    if (percentage === 100) {
      message += "I'm a crypto expert! 🚀"
    } else if (percentage >= 80) {
      message += "I'm very knowledgeable about crypto! 💎"
    } else if (percentage >= 60) {
      message += "My crypto knowledge is solid! 📈"
    } else if (percentage >= 40) {
      message += "I'm learning more every day! 📚"
    } else {
      message += "Time to dive deeper into crypto! 💪"
    }

    message += " Test your crypto IQ too: "
    return message
  }

  const shareMessage = getShareMessage()
  const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareMessage)}`

  const handleShareOnFarcaster = () => {
    window.open(farcasterUrl, "_blank", "width=600,height=700")
    setShared(true)

    // Reset shared status after a moment
    setTimeout(() => setShared(false), 3000)
  }

  const handleCopyShareText = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="space-y-4 mb-6">
      <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-6">
        <p className="text-purple-100 text-sm mb-4 font-medium">
          Your score has been unlocked! Share your results with the crypto community on Farcaster.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleShareOnFarcaster}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>📤</span>
            <span>{shared ? "Shared! Thanks!" : "Share Result on Farcaster"}</span>
          </button>

          <button
            onClick={handleCopyShareText}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg border border-white/20 transition flex items-center justify-center gap-2 text-sm"
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copied to clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Share Text</span>
              </>
            )}
          </button>
        </div>

        {shared && (
          <p className="text-green-300 text-sm mt-3 text-center font-medium">
            Thanks for sharing! Help others discover the Crypto IQ Test!
          </p>
        )}
      </div>
    </div>
  )
}
