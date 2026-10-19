import React from 'react';
import { ChineseSeal } from './ChineseSeal';
import { Utensils, Calendar, QrCode, Crown, Sparkles } from 'lucide-react';

export const HeroSection = ({ onExploreMenu, onOpenReserve, onOpenQR }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#140608] via-[#1a080c] to-[#0e0405] border-b border-[#3b1216] text-white">
      
      {/* Background radial gold & red glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-20 text-center flex flex-col items-center">
        
        {/* Top Imperial Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950 via-[#2e0e12] to-red-950 border border-amber-500/50 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
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
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-sans uppercase tracking-tight max-w-4xl leading-tight drop-shadow-xl mt-1">
          <span className="text-red-500">HOÀNG LONG</span>{' '}
          <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-decorative">
            QUÁN
          </span>
        </h1>

        <p className="font-decorative text-amber-300/90 text-xs sm:text-base tracking-[0.15em] uppercase mt-2">
          ❖ Đệ Nhất Mỹ Vị Trung Hoa · Dim Sum & Lẩu Tứ Xuyên ❖
        </p>

        {/* Subtitle Description */}
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl font-normal leading-relaxed mt-3 mb-8">
          Hơn 30 năm gìn giữ tinh hoa ẩm thực Quảng Đông & Triều Châu. Từng đĩa Dim Sum nặn tay tươi mới trong ngày, Vịt quay Bắc Kinh da giòn óng ánh lò than gỗ phong và Lẩu uyên ương 2 ngăn thảo mộc thanh ngọt chuẩn vị.
        </p>

        {/* Call to Actions (Shopee / Royal Style Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Button 1: Xem Thực Đơn */}
          <button
            type="button"
            onClick={onExploreMenu}
            className="hl-hero-btn-primary w-full sm:w-auto"
          >
            <Utensils className="w-4 h-4 text-amber-300" />
            <span>XEM THỰC ĐƠN GỌI MÓN</span>
          </button>

          {/* Button 2: Đặt Bàn Tiệc */}
          <button
            type="button"
            onClick={onOpenReserve}
            className="hl-hero-btn-gold w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>ĐẶT BÀN TIỆC TRƯỚC</span>
          </button>

          {/* Button 3: Quét Mã QR Bàn */}
          <button
            type="button"
            onClick={onOpenQR}
            className="hl-hero-btn-dark w-full sm:w-auto"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>MÃ QR BÀN ĂN</span>
          </button>
        </div>

        {/* Highlights 4-Column Strip */}
        <div className="hl-features-grid">
          <div className="hl-feature-card group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3b1216] to-[#1c080b] border border-amber-500/50 flex items-center justify-center mb-2.5 shadow-md group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
              <span className="text-2xl drop-shadow">🥟</span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-amber-200 group-hover:text-amber-300 transition-colors">
              Dim Sum Thủ Công
            </h4>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              Nặn tươi mới 100% mỗi sáng
            </p>
            <span className="font-calligraphy text-amber-400/50 text-xs mt-1.5 block">
              手工点心
            </span>
          </div>

          <div className="hl-feature-card group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3b1216] to-[#1c080b] border border-amber-500/50 flex items-center justify-center mb-2.5 shadow-md group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
              <span className="text-2xl drop-shadow">🦆</span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-amber-200 group-hover:text-amber-300 transition-colors">
              Vịt Quay Lò Gỗ
            </h4>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              Da giòn rụm màu hổ phách
            </p>
            <span className="font-calligraphy text-amber-400/50 text-xs mt-1.5 block">
              挂炉烤鸭
            </span>
          </div>

          <div className="hl-feature-card group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3b1216] to-[#1c080b] border border-amber-500/50 flex items-center justify-center mb-2.5 shadow-md group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
              <span className="text-2xl drop-shadow">🍲</span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-amber-200 group-hover:text-amber-300 transition-colors">
              Lẩu Uyên Ương
            </h4>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              Nước dùng hầm xương 36h
            </p>
            <span className="font-calligraphy text-amber-400/50 text-xs mt-1.5 block">
              鸳鸯火锅
            </span>
          </div>

          <div className="hl-feature-card group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3b1216] to-[#1c080b] border border-amber-500/50 flex items-center justify-center mb-2.5 shadow-md group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
              <span className="text-2xl drop-shadow">⚡</span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-amber-200 group-hover:text-amber-300 transition-colors">
              Gọi Món Quét QR
            </h4>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              Bếp nhận đơn tức thì 0 giây
            </p>
            <span className="font-calligraphy text-amber-400/50 text-xs mt-1.5 block">
              扫码点餐
            </span>
          </div>
        </div>

      </div>

    </section>
  );
};
