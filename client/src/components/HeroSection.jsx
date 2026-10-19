import React, { useState, useEffect } from 'react';
import { ChineseSeal } from './ChineseSeal';
import { Utensils, Calendar, QrCode, Crown, Sparkles, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const HIGHLIGHTS = [
  {
    id: 'dimsum',
    name: 'Dim Sum Thủ Công',
    hanzi: '皇家手工点心',
    pinyin: 'Shǒugōng Diǎnxīn',
    icon: '🥟',
    tag: 'Điểm Tâm Nghệ Nhân',
    slogan: 'Nặn Tươi Mới 100% Mỗi Sáng',
    desc: 'Vỏ bột pha lê trong suốt mỏng tang ôm trọn tôm sú tươi giòn ngọt tự nhiên. Hấp chín tới trong xửng tre thơm nồng khói nghi ngút.',
    badge: 'Bán Chạy Nhất',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'roast',
    name: 'Vịt Quay Lò Gỗ',
    hanzi: '挂炉北京烤鸭',
    pinyin: 'Běijīng Kǎoyā',
    icon: '🦆',
    tag: 'Bí Truyền Cung Đình',
    slogan: 'Da Giòn Rụm Màu Hổ Phách',
    desc: 'Ướp 18 vị thảo mộc bí truyền, quay than củi phong 2 giờ liên tục. Da giòn rụm bóng bẩy cuốn bánh tráng & tương ngọt.',
    badge: 'Đặc Sản Hoàng Triều',
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'hotpot',
    name: 'Lẩu Uyên Ương',
    hanzi: '正宗四川鸳鸯火锅',
    pinyin: 'Yuānyāng Huǒguō',
    icon: '🍲',
    tag: 'Đệ Nhất Mỹ Vị',
    slogan: 'Nước Dùng Hầm Xương 36 Giờ',
    desc: 'Nồi lẩu đồng 2 ngăn: Một bên cay tê hoa tiêu Tứ Xuyên nồng nàn, một bên nước cốt gà hầm sâm kỷ tử thanh ngọt bổ dưỡng.',
    badge: 'Hầm Xương 36h',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'qr',
    name: 'Gọi Món Quét QR',
    hanzi: '智能扫码点餐系统',
    pinyin: 'Zhìnéng Diǎncān',
    icon: '⚡',
    tag: 'Tiện Ích Hiện Đại',
    slogan: 'Bếp Nhận Đơn Tức Thì 0 Giây',
    desc: 'Quét mã QR tại bàn để xem thực đơn hình ảnh sống động, tùy biến độ cay và gửi đơn trực tiếp vào màn hình Bếp KDS Realtime.',
    badge: 'Realtime 0 Giây',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'
  }
];

export const HeroSection = ({ onExploreMenu, onOpenReserve, onOpenQR }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-switch animation every 3000ms (3 seconds chuyển 1 lần)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HIGHLIGHTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, activeIdx]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % HIGHLIGHTS.length);
  };

  const handleCardClick = (item, idx) => {
    setActiveIdx(idx);
    if (item.id === 'qr') {
      onOpenQR();
    } else {
      onExploreMenu();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#140608] via-[#1a080c] to-[#0e0405] border-b border-[#3b1216] text-white">
      
      {/* Background radial gold & red glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 sm:pb-20 text-center flex flex-col items-center">
        
        {/* Top Imperial Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950 via-[#2e0e12] to-red-950 border border-amber-500/50 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>ẨM THỰC TRUNG HOA CUNG ĐÌNH · CHỢ LỚN SÀI GÒN</span>
        </div>

        {/* Seal and Hanzi */}
        <div className="flex items-center justify-center gap-3 mb-2.5">
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
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl font-normal leading-relaxed mt-2.5 mb-7">
          Hơn 30 năm gìn giữ tinh hoa ẩm thực Quảng Đông & Triều Châu. Từng đĩa Dim Sum nặn tay tươi mới trong ngày, Vịt quay Bắc Kinh da giòn óng ánh lò than gỗ phong và Lẩu uyên ương 2 ngăn thảo mộc thanh ngọt chuẩn vị.
        </p>

        {/* Call to Actions (Shopee / Royal Style Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-10">
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

        {/* ========================================================
            4 ANIMATED CARDS (3000ms AUTO-TRANSITION / 3000 CHUYỂN 1)
           ======================================================== */}
        <div className="w-full max-w-5xl mt-2">
          
          {/* Control Bar: Title & Next/Prev Controls */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3b1216] text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-amber-200 tracking-wider uppercase font-mono">
                ĐẶC SẮC HOÀNG LONG QUÁN
              </span>
              <span className="text-[10px] text-stone-400 hidden sm:inline">
                · Tự động chuyển món sau mỗi 3 giây
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 rounded-full bg-[#1e0a0d] border border-amber-500/40 hover:border-amber-400 text-amber-300 flex items-center justify-center transition-all hover:scale-105"
                title="Món trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 rounded-full bg-[#1e0a0d] border border-amber-500/40 hover:border-amber-400 text-amber-300 flex items-center justify-center transition-all hover:scale-105"
                title="Món kế tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* The 4 Cards in Auto-Transition Animation */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full text-left"
          >
            {HIGHLIGHTS.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item, idx)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 ${
                    isActive
                      ? 'border-2 border-amber-400 bg-gradient-to-b from-[#2a0e12] via-[#1a080a] to-[#120406] shadow-2xl scale-[1.02] sm:scale-105 z-10 -translate-y-1.5 ring-2 ring-amber-400/40'
                      : 'border border-amber-500/30 bg-[#160608]/90 hover:border-amber-400/70 hover:bg-[#200a0d] opacity-80 hover:opacity-100 hover:-translate-y-1'
                  }`}
                  style={{ minHeight: '340px' }}
                >
                  {/* Top Image Banner */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-950 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                        isActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160608] via-black/20 to-transparent pointer-events-none" />

                    {/* Active Ribbon on Top-Left */}
                    {isActive ? (
                      <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 text-stone-950 font-black text-[10px] shadow-lg flex items-center gap-1 animate-pulse">
                        <span>⭐</span>
                        <span>ĐANG GIỚI THIỆU</span>
                      </div>
                    ) : (
                      <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                        <span>{item.icon}</span>
                        <span className="ml-1">{item.badge}</span>
                      </div>
                    )}

                    {/* Hanzi on bottom-left of photo */}
                    <div className="absolute bottom-2 left-3 font-calligraphy text-amber-300 text-sm drop-shadow-md z-10">
                      {item.hanzi}
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      {/* Emoji + Title */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">{item.icon}</span>
                        <h4 className={`font-bold text-xs sm:text-sm transition-colors ${
                          isActive ? 'text-amber-300 font-black' : 'text-stone-100 group-hover:text-amber-200'
                        }`}>
                          {item.name}
                        </h4>
                      </div>

                      {/* Slogan */}
                      <p className="text-[11px] font-semibold text-amber-200/90 leading-tight">
                        {item.slogan}
                      </p>

                      {/* Description */}
                      <p className="text-[10px] sm:text-[11px] text-stone-400 mt-1.5 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {/* Chinese Hanzi & Action Hint */}
                    <div className="pt-2 border-t border-[#3b1216] flex items-center justify-between text-[10px]">
                      <span className="font-calligraphy text-amber-400/80">
                        {item.hanzi}
                      </span>
                      <span className={`font-bold ${isActive ? 'text-amber-300' : 'text-stone-400'}`}>
                        {item.id === 'qr' ? 'Mở QR →' : 'Xem món →'}
                      </span>
                    </div>
                  </div>

                  {/* 3000ms Live Progress Bar at the bottom of the active card */}
                  {isActive && (
                    <div className="w-full h-1.5 bg-black/60 overflow-hidden">
                      <div
                        key={activeIdx}
                        className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-red-500 hl-progress-bar-fill"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dots Indicator with 3s auto loop indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {HIGHLIGHTS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`transition-all rounded-full ${
                  activeIdx === idx
                    ? 'w-7 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 shadow'
                    : 'w-2 h-2 bg-stone-700 hover:bg-stone-500'
                }`}
                title={`Chuyển đến: ${item.name}`}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
