import React from 'react';

interface LoadingSpinnerProps {
  text: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-zinc-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="text-brand-300 animate-pulse font-medium">{text}</p>
    </div>
  );
};