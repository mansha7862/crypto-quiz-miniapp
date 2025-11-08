export const metadata = {
  title: "Crypto Quiz",
  description: "Test your crypto knowledge on Base + Farcaster",
  other: {
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: "https://crypto-quiz-miniapp.vercel.app/og-image.png",
      button: {
        title: "Play Quiz",
        action: {
          type: "launch_frame",
          name: "Crypto Quiz",
          url: "https://crypto-quiz-miniapp.vercel.app",
          splashImageUrl: "https://crypto-quiz-miniapp.vercel.app/splash.png",
          splashBackgroundColor: "#111111"
        }
      }
    })
  }
};
