import React from 'react';
import { ChineseSeal } from './ChineseSeal';
import { Lanterns } from './Lanterns';
import { Sparkles, Utensils, Calendar, QrCode, ArrowDown, Award, Flame, Crown } from 'lucide-react';

export const HeroSection = ({ onExploreMenu, onOpenReserve, onOpenQR }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#140608] via-[#1a080c] to-[#0e0405] border-b border-[#3b1216] text-white">
      
      {/* Background radial gold glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Swaying Red Chinese Lanterns */}
      <Lanterns />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pb-24 text-center flex flex-col items-center">
        
        {/* Top Imperial Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-5 backdrop-blur-md shadow-lg">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>ẨM THỰC TRUNG HOA CUNG ĐÌNH · CHỢ LỚN SÀI GÒN</span>
        </div>

        {/* Seal and Hanzi */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <ChineseSeal text="皇龍" subtext="御膳" />
          <span className="font-calligraphy text-amber-300 text-lg sm:text-2xl tracking-[0.25em]">
            皇龍樓 · 傳承經典
          </span>
          <ChineseSeal text="吉祥" subtext="如意" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-sans uppercase tracking-tight text-white max-w-4xl leading-tight drop-shadow-lg">
          <span className="text-red-500">HOÀNG LONG</span>{' '}
          <span className="text-amber-400 font-decorative">QUÁN</span>
        </h1>
        <p className="font-decorative text-amber-300/90 text-sm sm:text-xl tracking-[0.15em] uppercase mt-2">
          Đệ Nhất Mỹ Vị Trung Hoa · Dim Sum & Lẩu Tứ Xuyên
        </p>

        {/* Subtitle Description */}
        <p className="text-stone-300 text-xs sm:text-base max-w-2xl font-normal leading-relaxed mt-4 mb-8">
          Hơn 30 năm gìn giữ tinh hoa ẩm thực Quảng Đông & Triều Châu. Từng đĩa Dim Sum nặn tay tươi mới trong ngày, Vịt quay Bắc Kinh da giòn óng ánh lò than gỗ phong và Lẩu uyên ương 2 ngăn thảo mộc thanh ngọt chuẩn vị.
        </p>

        {/* Call to Actions (Shopee / Royal Style Buttons) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Button 1: Xem Thực Đơn */}
          <button
            type="button"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 border border-amber-400/80 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-sm transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4 text-amber-300" />
            <span>XEM THỰC ĐƠN GỌI MÓN</span>
          </button>

          {/* Button 2: Đặt Bàn Tiệc */}
          <button
            type="button"
            onClick={onOpenReserve}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black uppercase tracking-wider text-xs sm:text-sm rounded-sm transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 border border-amber-300"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>ĐẶT BÀN TIỆC TRƯỚC</span>
          </button>

          {/* Button 3: Quét Mã QR Bàn */}
          <button
            type="button"
            onClick={onOpenQR}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#1f0a0d] hover:bg-[#2b0e12] border border-stone-600 hover:border-amber-400 text-stone-200 hover:text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>MÃ QR BÀN ĂN</span>
          </button>
        </div>

        {/* Highlights Strip */}
        <div className="mt-12 pt-7 border-t border-[#3b1216] w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-2 space-y-1">
            <span className="text-2xl block">🥟</span>
            <h4 className="font-bold text-xs sm:text-sm text-amber-200">Dim Sum Thủ Công</h4>
            <p className="text-[10px] text-stone-400">Nặn tươi mới 100% mỗi sáng</p>
          </div>
          <div className="p-2 space-y-1">
            <span className="text-2xl block">🦆</span>
            <h4 className="font-bold text-xs sm:text-sm text-amber-200">Vịt Quay Lò Gỗ</h4>
            <p className="text-[10px] text-stone-400">Da giòn rụm màu hổ phách</p>
          </div>
          <div className="p-2 space-y-1">
            <span className="text-2xl block">🍲</span>
            <h4 className="font-bold text-xs sm:text-sm text-amber-200">Lẩu Uyên Ương</h4>
            <p className="text-[10px] text-stone-400">Nước dùng hầm xương 36h</p>
          </div>
          <div className="p-2 space-y-1">
            <span className="text-2xl block">⚡</span>
            <h4 className="font-bold text-xs sm:text-sm text-amber-200">Gọi Món Quét QR</h4>
            <p className="text-[10px] text-stone-400">Bếp nhận đơn tức thì 0 giây</p>
          </div>
        </div>

      </div>

    </section>
  );
};
