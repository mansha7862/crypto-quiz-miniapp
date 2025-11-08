"use client";

import { useEffect, useState } from "react";

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

  // ✅ FIXED: Farcaster Ready signal with retry logic
  useEffect(() => {
    if (typeof window === "undefined") return;

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window?.farcaster?.actions?.ready) {
        window.farcaster.actions.ready();
        console.log("✅ Farcaster ready called successfully");
        clearInterval(interval);
      } else if (attempts > 15) {
        console.warn("⚠️ Farcaster SDK not found after waiting");
        clearInterval(inter
