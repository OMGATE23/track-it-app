import React, { useEffect, useState } from 'react'


const quotes = [
  "Good things come to those who wait",
  "Patience is a virtue.",
  "Stay positive.",
  "Great things take time.",
  "Keep going.",
  "Almost there!",
  "Hang tight.",
  "Good things ahead.",
  "Stay tuned.",
  "Trust the process.",
  "Hold on."
];

const colors = [
  "text-blue-500",
  "text-yellow-500",
  "text-fuchsia-500",
  "text-red-400",
  "text-purple-400",
  "text-green-400",
  "text-orange-500",
  "text-teal-500",
  "text-sky-600",
  'text-emerald-500',
  "text-pink-500"
];


const AIPageLoader = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      setFadeIn(false);
    }, 4000);

    const fadeInTimeout = setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setFadeIn(true);
    }, 4500);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(fadeInTimeout);
    };
  }, [currentQuoteIndex]);
  return (
    <div className='text-center flex flex-col items-center gap-2'>
      <p className='text-xl font-semibold text-zinc-900'>Loading...</p>
      <div className={`quote text-lg ${fadeIn ? 'fade-in' : 'fade-out'} ${colors[currentQuoteIndex]}`}>
        <p className='font-[300]'>{quotes[currentQuoteIndex]}</p>
      </div>
    </div>
  )
}

export default AIPageLoader