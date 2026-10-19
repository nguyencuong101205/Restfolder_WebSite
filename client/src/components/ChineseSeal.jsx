import React from 'react';

export const ChineseSeal = ({ text = "皇龍", subtext = "印", className = "" }) => {
  return (
    <div className={`chinese-seal flex flex-col items-center justify-center ${className}`}>
      <span className="text-sm font-bold text-amber-200 leading-tight">{text}</span>
      {subtext && <span className="text-[10px] text-amber-300/80 leading-none">{subtext}</span>}
    </div>
  );
};
