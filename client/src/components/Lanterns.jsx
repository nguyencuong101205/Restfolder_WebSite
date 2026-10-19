import React from 'react';

export const Lanterns = () => {
  return (
    <div className="pointer-events-none select-none flex justify-between items-start px-4 sm:px-12 max-w-7xl mx-auto -mb-16 relative z-10">
      
      {/* Left Red Lantern */}
      <div className="lantern-sway-left flex flex-col items-center">
        <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-yellow-300"></div>
        <div className="relative">
          <div className="w-8 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-t shadow"></div>
          <div
            className="w-11 h-13 bg-gradient-to-b from-red-600 via-red-700 to-red-950 rounded-2xl border border-amber-400/50 flex items-center justify-center relative overflow-hidden"
            style={{
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(251, 191, 36, 0.4)'
            }}
          >
            <span className="font-calligraphy text-amber-200 text-xs font-black drop-shadow z-10">
              吉祥
            </span>
          </div>
          <div className="w-8 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-b"></div>
          <div className="w-0.5 h-6 bg-red-600 mx-auto"></div>
        </div>
      </div>

      {/* Right Red Lantern */}
      <div className="lantern-sway-right flex flex-col items-center">
        <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-yellow-300"></div>
        <div className="relative">
          <div className="w-8 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-t shadow"></div>
          <div
            className="w-11 h-13 bg-gradient-to-b from-red-600 via-red-700 to-red-950 rounded-2xl border border-amber-400/50 flex items-center justify-center relative overflow-hidden"
            style={{
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(251, 191, 36, 0.4)'
            }}
          >
            <span className="font-calligraphy text-amber-200 text-xs font-black drop-shadow z-10">
              如意
            </span>
          </div>
          <div className="w-8 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-b"></div>
          <div className="w-0.5 h-6 bg-red-600 mx-auto"></div>
        </div>
      </div>

    </div>
  );
};
