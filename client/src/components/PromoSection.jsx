import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Tag, Sparkles, Copy, Check, Gift } from 'lucide-react';

export const PromoSection = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const promos = [
    {
      code: 'HOANGLONG10',
      title: 'Giảm 10% Hóa Đơn Bàn Đặt Trước',
      desc: 'Áp dụng cho mọi bàn đặt trước từ 2 khách hoặc đơn đặt món đầu tiên trong ngày.',
      minOrder: 'Từ 300.000 đ',
      tag: 'Ưu Đãi Hoàng Gia'
    },
    {
      code: 'DIMSUM50',
      title: 'Tặng 1 Xửng Há Cảo Thủy Tinh',
      desc: 'Tặng kèm 1 xửng Há cảo tôm tươi hoàng gia cho bàn ăn đi từ 4 khách trở lên.',
      minOrder: 'Bàn từ 4 người',
      tag: 'Quà Tặng Tri Ân'
    },
    {
      code: 'LONGTINH',
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
    <section id="khuyen-mai" className="py-10 bg-gradient-to-b from-[#140608] to-[#1a080c] border-b border-[#3b1216] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest font-mono">
                MÃ GIẢM GIÁ & QUÀ TẶNG BÀN ĂN
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-decorative text-amber-100 uppercase">
              Ưu Đãi Hoàng Triều Hôm Nay
            </h2>
          </div>
          <span className="text-xs text-stone-400">
            * Chọn "Dùng Ngay" để tự động áp dụng mã vào bàn ăn của bạn
          </span>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {promos.map((p) => {
            const isCopied = copiedCode === p.code;
            return (
              <div
                key={p.code}
                className="relative bg-[#1f090d] border border-amber-500/30 hover:border-amber-400 rounded-sm p-4 sm:p-5 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                {/* Ribbon Tag */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-2 py-0.5 rounded-sm bg-red-950 border border-red-700/60 text-red-200 text-[10px] font-bold">
                    {p.tag}
                  </span>
                  <span className="text-[11px] text-amber-400/80 font-mono">
                    {p.minOrder}
                  </span>
                </div>

                <div className="space-y-1.5 mb-4">
                  <h3 className="font-bold text-sm sm:text-base text-stone-100 group-hover:text-amber-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                {/* Code Actions */}
                <div className="pt-3 border-t border-[#3b1519] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#120507] border border-dashed border-amber-500/60 rounded-sm">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono font-black text-amber-300 text-xs tracking-wider">
                      {p.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(p.code)}
                      className={`px-2.5 py-1.5 text-xs font-bold rounded-sm transition-all flex items-center gap-1 ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#2b1014] hover:bg-[#3d161c] border border-amber-500/30 text-amber-200'
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
                      className="shopee-btn shopee-btn--gold h-8 px-2.5 text-xs font-bold"
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
