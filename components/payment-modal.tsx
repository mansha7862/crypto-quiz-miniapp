"use client"

import { useState } from "react"
import { useAccount, useBalance, useSendTransaction } from "wagmi"
import { parseEther } from "viem"

interface PaymentModalProps {
  address: string
  onPaymentSuccess: () => void
}

export function PaymentModal({ address, onPaymentSuccess }: PaymentModalProps) {
  const { isConnected } = useAccount()
  const { data: balance } = useBalance({ address: address as `0x${string}` })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { sendTransaction, isPending } = useSendTransaction()

  const PAYMENT_AMOUNT = "0.00001" // 0.00001 ETH in wei
  const RECEIVER_ADDRESS = "0x0000000000000000000000000000000000000000" // Placeholder address

  const handlePayment = async () => {
    try {
      setIsProcessing(true)
      setError(null)

      // Check if user has sufficient balance
      if (balance && balance.value < parseEther(PAYMENT_AMOUNT)) {
        setError("Insufficient balance. You need at least 0.00001 ETH on Base.")
        setIsProcessing(false)
        return
      }

      // Send transaction
      sendTransaction({
        to: RECEIVER_ADDRESS as `0x${string}`,
        value: parseEther(PAYMENT_AMOUNT),
      })

      // Simulate payment processing for demo
      setTimeout(() => {
        setIsProcessing(false)
        setSuccess(true)
        setTimeout(() => {
          onPaymentSuccess()
        }, 1000)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed")
      setIsProcessing(false)
    }
  }

  // For demo purposes, allow skipping payment
  const handleSkipPayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentSuccess()
    }, 500)
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Unlock Your Score</h3>
        <p className="text-gray-300 text-sm">
          Complete a transaction on Base to reveal your full score and share it with the community.
        </p>
      </div>

      <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-sm text-blue-100">Payment Amount</span>
          <span className="font-bold text-lg text-blue-300">0.00001 ETH</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-blue-100">Network</span>
          <span className="font-semibold text-blue-300">Base Sepolia</span>
        </div>
      </div>

      {balance && (
        <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-purple-100">
            Balance:{" "}
            <span className="font-semibold">
              {balance.formatted} {balance.symbol}
            </span>
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
          <p className="text-red-100 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
          <p className="text-green-100 text-sm font-semibold">Payment successful! Unlocking your score...</p>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handlePayment}
          disabled={isProcessing || isPending || !isConnected}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
        >
          {isProcessing || isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Processing...
            </span>
          ) : (
            "Complete Payment"
          )}
        </button>

        <button
          onClick={handleSkipPayment}
          disabled={isProcessing}
          className="w-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg border border-white/20 transition text-sm"
        >
          {isProcessing ? "Processing..." : "Demo: Skip Payment"}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        This is a demo on Base Sepolia testnet. No real funds are transferred.
      </p>
    </div>
  )
}
