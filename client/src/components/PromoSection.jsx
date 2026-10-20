import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Tag, Sparkles, Copy, Check, Gift } from 'lucide-react';

export const PromoSection = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const promos = [
    {
      code: 'HOANGLONG10',
      badge: 'GIẢM 10%',
      title: 'Giảm 10% Hóa Đơn Bàn Đặt Trước',
      desc: 'Áp dụng cho mọi bàn đặt trước từ 2 khách hoặc đơn đặt món đầu tiên trong ngày.',
      minOrder: 'Hóa đơn từ 300.000 đ',
      tag: 'Ưu Đãi Hoàng Gia'
    },
    {
      code: 'DIMSUM50',
      badge: 'TẶNG 1 XỬNG',
      title: 'Tặng 1 Xửng Há Cảo Thủy Tinh',
      desc: 'Tặng kèm 1 xửng Há cảo tôm tươi hoàng gia cho bàn ăn đi từ 4 khách trở lên.',
      minOrder: 'Bàn từ 4 người',
      tag: 'Quà Tặng Tri Ân'
    },
    {
      code: 'LONGTINH',
      badge: 'MIỄN PHÍ TRÀ',
      title: 'Thưởng Trà Long Tỉnh Miễn Phí',
      desc: 'Thưởng thức ấm trà Long Tỉnh Tây Hồ hảo hạng nguyên chất khi gọi món vịt quay hoặc lẩu.',
      minOrder: 'Món quay & Lẩu',
      tag: 'Danh Trà Cung Đình'
    }
  ];

  const { applyVoucher, setIsCartOpen } = useCart();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyNow = (code) => {
    handleCopy(code);
    applyVoucher(code);
    setIsCartOpen(true);
  };

  return (
    <section id="khuyen-mai" className="py-10 bg-gradient-to-b from-[#140608] via-[#1a080c] to-[#120507] border-b border-[#3b1216] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest font-mono">
                MÃ GIẢM GIÁ & QUÀ TẶNG BÀN ĂN
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl sm:text-2xl font-bold font-decorative text-amber-100 uppercase tracking-wide">
                Ưu Đãi Hoàng Triều Hôm Nay
              </h2>
              <span className="font-calligraphy text-amber-400/80 text-sm hidden sm:inline tracking-widest">
                皇龍特惠 · Phúc Lộc Đong Đầy
              </span>
            </div>
          </div>
          <span className="text-xs text-stone-400">
            * Bấm <strong className="text-amber-300">"Dùng Ngay"</strong> để tự động áp dụng mã vào bàn ăn của bạn
          </span>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {promos.map((p) => {
            const isCopied = copiedCode === p.code;
            return (
              <div
                key={p.code}
                className="relative bg-gradient-to-b from-[#21090d] to-[#160608] border border-amber-500/30 hover:border-amber-400 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-0.5"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-950 border border-red-700/60 text-amber-300 text-[10px] font-bold">
                    {p.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 font-black text-xs font-mono shadow">
                    {p.badge}
                  </span>
                </div>

                <div className="space-y-1.5 mb-4">
                  <h3 className="font-bold text-sm sm:text-base text-stone-100 group-hover:text-amber-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {p.desc}
                  </p>
                  <span className="text-[11px] text-amber-400/80 font-mono block pt-1">
                    Điều kiện: {p.minOrder}
                  </span>
                </div>

                {/* Perforated Divider & Code Actions */}
                <div className="pt-3 border-t border-dashed border-amber-500/30 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#100305] border border-amber-500/50 rounded-xl">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono font-black text-amber-300 text-xs tracking-wider">
                      {p.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(p.code)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#290f13] hover:bg-[#3b151b] border border-amber-500/30 text-amber-200'
                      }`}
                      title="Sao chép mã"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-amber-400" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApplyNow(p.code)}
                      className="hl-hero-btn-gold h-8 px-3 text-xs font-bold rounded-xl flex items-center gap-1"
                      title="Áp dụng mã vào giỏ hàng ngay lập tức"
                    >
                      <Sparkles className="w-3 h-3 text-stone-950" />
                      <span>Dùng Ngay</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
