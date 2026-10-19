import React, { useState, useEffect } from 'react';
import { ChineseSeal } from './ChineseSeal';
import { Utensils, Calendar, QrCode, Crown, Sparkles, ChevronRight, ChevronLeft, ArrowRight, Flame, Clock } from 'lucide-react';

const HIGHLIGHTS = [
  {
    id: 'dimsum',
    name: 'Dim Sum Thủ Công Hoàng Gia',
    shortName: 'Dim Sum Thủ Công',
    hanzi: '皇家手工点心',
    pinyin: 'Shǒugōng Diǎnxīn',
    icon: '🥟',
    tag: 'Điểm Tâm Nghệ Nhân',
    slogan: 'Nặn Tươi Mới 100% Mỗi Sáng',
    desc: 'Vỏ bột pha lê mỏng tang trong suốt ôm trọn tôm sú tươi giòn ngọt tự nhiên. Hấp chín tới trong xửng tre bốc khói nghi ngút, chấm cùng sa tế Triều Châu đậm vị.',
    quote: '皮薄馅丰 · 鲜甜多汁',
    badge: 'Bán chạy nhất ⭐',
    price: 'Từ 58.000 đ',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80',
    actionText: 'Xem Thực Đơn Dim Sum'
  },
  {
    id: 'roast',
    name: 'Vịt Quay Bắc Kinh Lò Gỗ',
    shortName: 'Vịt Quay Lò Gỗ',
    hanzi: '挂炉北京烤鸭',
    pinyin: 'Běijīng Kǎoyā',
    icon: '🦆',
    tag: 'Bí Truyền Cung Đình',
    slogan: 'Da Giòn Rụm Màu Hổ Phách',
    desc: 'Vịt tơ hảo hạng ướp 18 vị thảo mộc bí truyền, quay than củi gỗ phong 2 giờ liên tục. Lớp da giòn tan nổ bọt khí óng ánh, thái lát mỏng cuốn bánh tráng & sốt tương ngọt.',
    quote: '色泽红亮 · 外脆里嫩',
    badge: 'Đặc sản hoàng gia 👑',
    price: 'Từ 380.000 đ',
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800&auto=format&fit=crop&q=80',
    actionText: 'Xem Món Vịt Quay'
  },
  {
    id: 'hotpot',
    name: 'Lẩu Uyên Ương Tứ Xuyên 2 Ngăn',
    shortName: 'Lẩu Uyên Ương',
    hanzi: '正宗四川鸳鸯火锅',
    pinyin: 'Yuānyāng Huǒguō',
    icon: '🍲',
    tag: 'Đệ Nhất Mỹ Vị',
    slogan: 'Nước Dùng Hầm Xương 36 Giờ',
    desc: 'Nồi lẩu đồng chia hai ngăn tuyệt mỹ: Một bên cay tê nồng nàn hoa tiêu Tứ Xuyên ớt khô bùng nổ, một bên thanh ngọt bổ dưỡng từ nước cốt gà hầm nhân sâm & kỷ tử.',
    quote: '麻辣鲜香 · 滋补养生',
    badge: 'Hầm xương 36h ♨️',
    price: 'Từ 395.000 đ',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
    actionText: 'Khám Phá Vị Lẩu'
  },
  {
    id: 'qr',
    name: 'Gọi Món Thông Minh Quét Mã QR',
    shortName: 'Gọi Món Quét QR',
    hanzi: '智能扫码点餐系统',
    pinyin: 'Zhìnéng Diǎncān',
    icon: '⚡',
    tag: 'Tiện Ích Hiện Đại',
    slogan: 'Bếp Nhận Đơn Tức Thì 0 Giây',
    desc: 'Trải nghiệm đỉnh cao với mã QR đặt tại từng bàn ăn. Quý khách trực tiếp chọn món, tùy biến gia vị, ghi chú gửi thẳng đến màn hình Bếp KDS Realtime không độ trễ.',
    quote: '即扫即点 · 快捷便利',
    badge: 'Realtime 0 giây 🚀',
    price: 'Phục vụ tại bàn',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    actionText: 'Trải Nghiệm Gọi Món'
  }
];

export const HeroSection = ({ onExploreMenu, onOpenReserve, onOpenQR }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-switch animation every 3000ms (3 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HIGHLIGHTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeItem = HIGHLIGHTS[activeIdx];

  const handleAction = (item) => {
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
            LUXURY SPOTLIGHT SHOWCASE CARD (Auto-animates every 3000ms)
           ======================================================== */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full max-w-4xl bg-gradient-to-r from-[#220c10] via-[#1a080a] to-[#140507] border-2 border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden text-left relative transition-all duration-500 group"
        >
          {/* Top Gold Border Glow */}
          <div className="h-1 bg-gradient-to-r from-red-700 via-amber-400 to-red-700" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Photo Banner */}
            <div className="md:col-span-5 relative h-56 md:h-72 overflow-hidden bg-stone-950">
              <img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.name}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 animate-fade-scale"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-black/20 to-[#1a080a]/90 pointer-events-none" />

              {/* Badge on Photo */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-red-700 to-red-900 border border-amber-400/80 text-amber-200 text-[10px] font-bold shadow-lg flex items-center gap-1">
                <span>{activeItem.icon}</span>
                <span>{activeItem.badge}</span>
              </div>

              {/* Hanzi Watermark bottom */}
              <div className="absolute bottom-2.5 left-3 font-calligraphy text-amber-300 text-sm sm:text-base drop-shadow-md">
                {activeItem.hanzi}
              </div>
            </div>

            {/* Right Information Details */}
            <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeItem.tag}</span>
                  </span>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-900 border border-amber-500/40 text-amber-300 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400 animate-spin" />
                    <span>Tự động chuyển mỗi 3s</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                  {activeItem.name}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-amber-300/90 mt-0.5">
                  ★ {activeItem.slogan}
                </p>

                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  {activeItem.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#3b1216] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-stone-400 block">Mức giá ẩm thực:</span>
                  <span className="text-sm sm:text-base font-black text-amber-400">
                    {activeItem.price}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAction(activeItem)}
                  className="hl-hero-btn-primary py-2 px-4 text-xs font-bold rounded-xl flex items-center gap-1.5 active:scale-95 shadow-lg"
                >
                  <span>{activeItem.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 3000ms Live Countdown Progress Bar running along bottom */}
          <div className="w-full h-1 bg-stone-900 overflow-hidden">
            <div
              key={activeIdx}
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-red-600 hl-progress-bar-fill"
            />
          </div>
        </div>

        {/* ========================================================
            4 SYNCHRONIZED INTERACTIVE CARDS (3000ms Auto-Slide Tabs)
           ======================================================== */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="hl-features-grid"
        >
          {HIGHLIGHTS.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`hl-feature-card group cursor-pointer transition-all duration-300 relative ${
                  isActive ? 'hl-card-active' : 'opacity-85 hover:opacity-100'
                }`}
              >
                {/* Photo Thumbnail with circular badge */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2.5 border-2 border-amber-500/60 shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/75 text-center text-[10px] py-0.5">
                    {item.icon}
                  </span>
                </div>

                <h4 className={`font-bold text-xs sm:text-sm tracking-wide transition-colors ${
                  isActive ? 'text-amber-300 font-black' : 'text-stone-200 group-hover:text-amber-200'
                }`}>
                  {item.shortName}
                </h4>

                <p className="text-[10px] sm:text-[11px] text-stone-400 mt-0.5 leading-snug line-clamp-1">
                  {item.slogan}
                </p>

                <span className="font-calligraphy text-amber-400/60 text-xs mt-1 block">
                  {item.hanzi}
                </span>

                {/* Active Indicator Line inside card */}
                {isActive && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-400 rounded-b shadow-sm" />
                )}
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
