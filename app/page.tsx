"use client";

import { useEffect, useState } from "react";

useEffect(() => {
  if (typeof window !== "undefined") {
    window?.farcaster?.actions?.ready?.();   // 👈 signals ready state
  }
}, []);


export default function Home() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = [
    { q: "What is the maximum supply of Bitcoin?", a: "21 million", options: ["10 million", "21 million", "100 million", "Unlimited"] },
    { q: "Who created Ethereum?", a: "Vitalik Buterin", options: ["Satoshi Nakamoto", "Vitalik Buterin", "CZ", "Elon Musk"] },
    { q: "Which chain uses MATIC token?", a: "Polygon", options: ["Ethereum", "Polygon", "Solana", "Base"] },
    { q: "What is the smallest Bitcoin unit?", a: "Satoshi", options: ["Wei", "Gwei", "Satoshi", "Nano"] },
    { q: "What does 'DeFi' stand for?", a: "Decentralized Finance", options: ["Defined Finance", "Decentralized Finance", "Definite Funds", "Deep Finance"] },
    { q: "Base chain is developed by?", a: "Coinbase", options: ["Binance", "Coinbase", "Polygon Labs", "Solana Foundation"] },
    { q: "Which token powers Ethereum network?", a: "ETH", options: ["BTC", "ETH", "SOL", "USDT"] },
    { q: "Which wallet is made by Coinbase?", a: "Smart Wallet", options: ["MetaMask", "Smart Wallet", "Trust Wallet", "Rainbow"] },
    { q: "Which chain is Layer 2 on Ethereum?", a: "Base", options: ["Base", "Bitcoin", "Solana", "BNB"] },
    { q: "What is a Farcaster Frame?", a: "Mini app inside cast", options: ["Airdrop", "Mini app inside cast", "NFT", "Gas fee"] }
  ];

  // 🪄 Farcaster Mini App Ready Trigger
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window?.farcaster?.actions?.ready?.();
      } catch (err) {
        console.log("Farcaster SDK not found yet:", err);
      }
    }
  }, []);

  const handleAnswer = (option: string) => {
    if (option === questions[step].a) {
      setScore(score + 1);
    }
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#111] to-[#222] text-white p-4">
      <div className="max-w-md w-full bg-[#1b1b1b] p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">🧠 Crypto IQ Quiz</h1>

        {!finished ? (
          <>
            <p className="text-lg mb-4 text-center">{questions[step].q}</p>
            <div className="flex flex-col gap-3">
              {questions[step].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-3 rounded-lg bg-[#333] hover:bg-[#555] transition"
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="mt-4 text-center text-sm opacity-60">
              Question {step + 1} of {questions.length}
            </p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">🎉 Quiz Complete!</h2>
            <p className="text-lg mb-4">
              You scored <span className="font-semibold">{score}</span> / {questions.length}
            </p>
            <button
              onClick={() => window?.farcaster?.actions?.openUrl?.("https://warpcast.com")}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Share on Farcaster
            </button>
          </div>
        )}
      </div>
      <p className="mt-6 text-xs opacity-60 text-center">
        Built with ❤️ on Base + Farcaster
      </p>
    </main>
  );
}
