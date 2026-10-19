import React, { useState, useEffect } from 'react';
import { ChineseSeal } from './ChineseSeal';
import { Utensils, Calendar, QrCode, Crown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const SLIDES = [
  {
    id: 'dimsum',
    heading: 'Dim Sum Thủ Công Hoàng Gia',
    hanzi: '皇家手工点心',
    shortTitle: 'Dim Sum Thủ Công',
    icon: '🥟',
    tag: 'ẨM THỰC NGHỆ NHÂN CUNG ĐÌNH',
    description: 'Nặn tươi mới 100% mỗi sáng · Vỏ bột pha lê ôm trọn tôm sú tươi giòn ngọt tự nhiên',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=1920&auto=format&fit=crop',
    actionType: 'menu',
    actionText: 'XEM THỰC ĐƠN GỌI MÓN'
  },
  {
    id: 'roast',
    heading: 'Vịt Quay Bắc Kinh Lò Gỗ Than Phong',
    hanzi: '挂炉北京烤鸭',
    shortTitle: 'Vịt Quay Lò Gỗ',
    icon: '🦆',
    tag: 'BÍ TRUYỀN HOÀNG TRIỀU',
    description: 'Da giòn rụm màu hổ phách · Tẩm ướp 18 vị thảo mộc cung đình quay lửa than 2 giờ',
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?q=80&w=1920&auto=format&fit=crop',
    actionType: 'menu',
    actionText: 'XEM MÓN VỊT QUAY'
  },
  {
    id: 'hotpot',
    heading: 'Lẩu Uyên Ương Tứ Xuyên 2 Ngăn',
    hanzi: '正宗四川鸳鸯火锅',
    shortTitle: 'Lẩu Uyên Ương',
    icon: '🍲',
    tag: 'ĐỆ NHẤT MỸ VỊ',
    description: 'Nước dùng hầm xương 36 giờ · Cay tê hoa tiêu Tứ Xuyên & Gà sâm thảo mộc bổ dưỡng',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1920&auto=format&fit=crop',
    actionType: 'reserve',
    actionText: 'ĐẶT BÀN TIỆC TRƯỚC'
  },
  {
    id: 'qr',
    heading: 'Gọi Món Thông Minh Quét Mã QR',
    hanzi: '智能扫码点餐系统',
    shortTitle: 'Gọi Món Quét QR',
    icon: '⚡',
    tag: 'TIỆN ÍCH HIỆN ĐẠI TẠI BÀN',
    description: 'Bếp nhận đơn tức thì 0 giây · Thực đơn hình ảnh sống động đặt món trực tiếp tại bàn',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop',
    actionType: 'qr',
    actionText: 'MÃ QR BÀN ĂN'
  }
];

export const HeroSection = ({ onExploreMenu, onOpenReserve, onOpenQR }) => {
  const [curIndex, setCurIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto Slider: 3000ms chuyển 1 ảnh (giống logic The_Band)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3000); // 3000ms chuyển 1 slide
    return () => clearInterval(timer);
  }, [isPaused, curIndex]);

  const handlePrev = () => {
    setCurIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handleButtonClick = (actionType) => {
    if (actionType === 'reserve') {
      onOpenReserve();
    } else if (actionType === 'qr') {
      onOpenQR();
    } else {
      onExploreMenu();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0c0405] border-b border-[#3b1216]">
      
      {/* ========================================================
          THE BAND STYLE AUTO-SLIDER (#slider)
          - Trượt ngang mượt mà (translateX)
          - 3000ms tự động chuyển slide
          - Hover dừng chuyển động
          - Mũi tên trái / phải hiện khi rê chuột
          - Dots indicator ở góc dưới
         ======================================================== */}
      <div
        id="slider"
        className="hl-band-slider group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slider Track (Trượt ngang mượt mà) */}
        <div
          className="hl-band-slider-track"
          style={{ transform: `translateX(-${curIndex * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div key={slide.id} className="hl-band-slider-item">
              <img
                src={slide.image}
                alt={slide.heading}
                loading="eager"
              />
              {/* Dark luxury vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0405] via-black/40 to-black/50 pointer-events-none" />

              {/* Text Content Overlay (Chuẩn The Band .text-content) */}
              <div className="hl-band-text-content">
                
                {/* Top Badge & Seals */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-amber-500/50 text-amber-300 text-[11px] font-bold tracking-widest uppercase mb-3 backdrop-blur-md shadow-lg">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>{slide.tag}</span>
                </div>

                <div className="flex items-center justify-center gap-2.5 mb-2">
                  <ChineseSeal text="皇龍" subtext="御膳" />
                  <span className="font-calligraphy text-amber-300 text-lg sm:text-xl tracking-[0.2em] drop-shadow">
                    {slide.hanzi}
                  </span>
                  <ChineseSeal text="吉祥" subtext="如意" />
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-sans uppercase tracking-tight text-white leading-tight drop-shadow-2xl">
                  {slide.heading}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-base font-medium text-stone-200 mt-2 max-w-2xl mx-auto drop-shadow leading-relaxed">
                  {slide.description}
                </p>

                {/* CTA Action Button */}
                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleButtonClick(slide.actionType)}
                    className="hl-hero-btn-primary py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <Utensils className="w-4 h-4 text-amber-300" />
                    <span>{slide.actionText}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenReserve}
                    className="hl-hero-btn-gold py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold shadow-2xl hidden sm:flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <Calendar className="w-4 h-4 text-stone-950" />
                    <span>ĐẶT BÀN TIỆC</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Mũi tên trái / phải (Chuẩn The Band .arrow-container) */}
        <button
          type="button"
          onClick={handlePrev}
          className="hl-band-arrow hl-band-arrow--left"
          title="Ảnh trước"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="hl-band-arrow hl-band-arrow--right"
          title="Ảnh kế tiếp"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dấu chấm chỉ số (Indicators chuẩn The Band) */}
        <div className="hl-band-indicator-container">
          {SLIDES.map((slide, idx) => (
            <span
              key={slide.id}
              onClick={() => setCurIndex(idx)}
              className={`hl-band-indicator ${curIndex === idx ? 'hl-band-indicator--active' : ''}`}
              title={`Chuyển đến: ${slide.heading}`}
            />
          ))}
        </div>

      </div>

      {/* Decorative Gold Border Stripe */}
      <div className="h-1 bg-gradient-to-r from-red-800 via-amber-400 to-red-800" />

    </section>
  );
};
