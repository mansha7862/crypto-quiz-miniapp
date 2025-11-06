"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

export function QuizHeader() {
  return (
    <header className="w-full flex items-center justify-between mb-12 px-4">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          Crypto IQ Test
        </h1>
        <p className="text-gray-300 text-sm md:text-base mt-2">Test your blockchain knowledge on Base</p>
      </div>
      <div>
        <ConnectButton />
      </div>
    </header>
  )
}
