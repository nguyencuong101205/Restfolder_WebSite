import React from 'react';

export const Lanterns = () => {
  return (
    <div className="pointer-events-none select-none absolute inset-x-0 top-0 z-20 overflow-hidden h-40">
      
      {/* Left Red Lantern */}
      <div className="absolute top-0 left-4 sm:left-10 lantern-sway-left flex flex-col items-center">
        <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-yellow-300"></div>
        <div className="relative flex flex-col items-center">
          <div className="w-8 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-t shadow"></div>
          <div
            className="w-12 h-16 bg-gradient-to-b from-red-600 via-red-700 to-red-950 rounded-2xl border-2 border-amber-400/60 flex items-center justify-center relative overflow-hidden shadow-2xl"
            style={{
              boxShadow: '0 0 25px rgba(220, 38, 38, 0.7), inset 0 0 12px rgba(251, 191, 36, 0.5)'
            }}
          >
            <span className="font-calligraphy text-amber-200 text-xs font-black drop-shadow z-10">
              吉祥
            </span>
          </div>
          <div className="w-8 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-b"></div>
          <div className="w-0.5 h-8 bg-red-600"></div>
        </div>
      </div>

      {/* Right Red Lantern */}
      <div className="absolute top-0 right-4 sm:right-10 lantern-sway-right flex flex-col items-center">
        <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-yellow-300"></div>
        <div className="relative flex flex-col items-center">
          <div className="w-8 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-t shadow"></div>
          <div
            className="w-12 h-16 bg-gradient-to-b from-red-600 via-red-700 to-red-950 rounded-2xl border-2 border-amber-400/60 flex items-center justify-center relative overflow-hidden shadow-2xl"
            style={{
              boxShadow: '0 0 25px rgba(220, 38, 38, 0.7), inset 0 0 12px rgba(251, 191, 36, 0.5)'
            }}
          >
            <span className="font-calligraphy text-amber-200 text-xs font-black drop-shadow z-10">
              如意
            </span>
          </div>
          <div className="w-8 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-b"></div>
          <div className="w-0.5 h-8 bg-red-600"></div>
        </div>
      </div>

    </div>
  );
};
