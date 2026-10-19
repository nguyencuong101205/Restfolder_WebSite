import React from 'react';

export const Lanterns = () => {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none z-20 overflow-hidden h-32 flex justify-between px-4 sm:px-12 lg:px-24 select-none">
      
      {/* Big Left Red Lantern */}
      <div className="lantern-sway-left flex flex-col items-center">
        {/* Hanging Golden String */}
        <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-yellow-300 shadow-[0_0_8px_#f59e0b]"></div>
        <div className="relative">
          {/* Top Brass Cap */}
          <div className="w-10 h-2.5 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-t shadow border-b border-amber-800"></div>
          {/* Main Lantern Silk Body */}
          <div
            className="w-14 h-16 bg-gradient-to-b from-red-600 via-red-700 to-red-950 rounded-2xl border border-amber-400/50 flex items-center justify-center relative overflow-hidden"
            style={{
              boxShadow: '0 0 25px rgba(239, 68, 68, 0.7), inset 0 0 15px rgba(251, 191, 36, 0.45)'
            }}
          >
            {/* Silk Rib Lines */}
            <div className="absolute inset-0 flex justify-around pointer-events-none opacity-40">
              <div className="w-px h-full bg-yellow-300"></div>
              <div className="w-px h-full bg-yellow-300"></div>
              <div className="w-px h-full bg-yellow-300"></div>
            </div>
            {/* Center Hanzi Character */}
            <span className="font-calligraphy text-amber-200 text-sm font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">
              吉祥
            </span>
          </div>
          {/* Bottom Brass Cap */}
          <div className="w-10 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-b shadow"></div>
          {/* Silk Tassel with Golden Bead */}
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2 bg-amber-400 rounded-full shadow-[0_0_6px_#f59e0b] -mt-0.5 z-10"></div>
            <div className="w-1 h-9 bg-gradient-to-b from-red-600 to-red-800 rounded-b shadow-md"></div>
          </div>
        </div>
      </div>

      {/* Center Left Small Lantern */}
      <div className="hidden md:flex lantern-sway-right flex-col items-center mt-1">
        <div className="w-0.5 h-4 bg-amber-400/80"></div>
        <div className="relative">
          <div className="w-7 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-t"></div>
          <div
            className="w-10 h-12 bg-gradient-to-b from-red-600 via-red-700 to-red-900 rounded-xl border border-amber-400/40 flex items-center justify-center"
            style={{ boxShadow: '0 0 16px rgba(220, 38, 38, 0.55)' }}
          >
            <span className="font-calligraphy text-amber-200 text-xs font-bold drop-shadow">福</span>
          </div>
          <div className="w-7 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-b"></div>
          <div className="w-0.5 h-6 bg-red-600 mx-auto"></div>
        </div>
      </div>

      {/* Center Top Imperial Plaque Watermark */}
      <div className="hidden lg:flex flex-col items-center pt-1 opacity-40">
        <div className="font-calligraphy text-amber-300 text-xs tracking-widest">
          中華宮廷珍馐 · 御膳傳承
        </div>
      </div>

      {/* Center Right Small Lantern */}
      <div className="hidden md:flex lantern-sway-left flex-col items-center mt-1">
        <div className="w-0.5 h-4 bg-amber-400/80"></div>
        <div className="relative">
          <div className="w-7 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-t"></div>
          <div
            className="w-10 h-12 bg-gradient-to-b from-red-600 via-red-700 to-red-900 rounded-xl border border-amber-400/40 flex items-center justify-center"
            style={{ boxShadow: '0 0 16px rgba(220, 38, 38, 0.55)' }}
          >
            <span className="font-calligraphy text-amber-200 text-xs font-bold drop-shadow">祿</span>
          </div>
          <div className="w-7 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-b"></div>
          <div className="w-0.5 h-6 bg-red-600 mx-auto"></div>
        </div>
      </div>

      {/* Big Right Red Lantern */}
      <div className="lantern-sway-right flex flex-col items-center">
        <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-yellow-300 shadow-[0_0_8px_#f59e0b]"></div>
        <div className="relative">
          <div className="w-10 h-2.5 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-t shadow border-b border-amber-800"></div>
          <div
            className="w-14 h-16 bg-gradient-to-b from-red-600 via-red-700 to-red-950 rounded-2xl border border-amber-400/50 flex items-center justify-center relative overflow-hidden"
            style={{
              boxShadow: '0 0 25px rgba(239, 68, 68, 0.7), inset 0 0 15px rgba(251, 191, 36, 0.45)'
            }}
          >
            <div className="absolute inset-0 flex justify-around pointer-events-none opacity-40">
              <div className="w-px h-full bg-yellow-300"></div>
              <div className="w-px h-full bg-yellow-300"></div>
              <div className="w-px h-full bg-yellow-300"></div>
            </div>
            <span className="font-calligraphy text-amber-200 text-sm font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">
              如意
            </span>
          </div>
          <div className="w-10 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 rounded-b shadow"></div>
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2 bg-amber-400 rounded-full shadow-[0_0_6px_#f59e0b] -mt-0.5 z-10"></div>
            <div className="w-1 h-9 bg-gradient-to-b from-red-600 to-red-800 rounded-b shadow-md"></div>
          </div>
        </div>
      </div>

    </div>
  );
};
