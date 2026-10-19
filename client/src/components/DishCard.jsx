import React, { useState } from 'react';
import { Heart, Plus, Star } from 'lucide-react';

export const DishCard = ({ dish, onOpenDetail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  return (
    <div
      onClick={() => onOpenDetail(dish)}
      className="group flex flex-col justify-between bg-gradient-to-b from-[#1c0a0d] via-[#150709] to-[#100406] rounded-2xl border border-amber-500/30 hover:border-amber-400 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer relative w-full hover:-translate-y-1"
      style={{ willChange: 'transform', width: '100%' }}
    >
      {/* Imperial Seal Badge on top-left */}
      <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-red-900/90 border border-amber-400/60 text-amber-200 text-[10px] font-bold shadow-md flex items-center gap-1 backdrop-blur-sm">
        <span>🏮</span>
        <span>{dish.isChefSpecial ? 'Bếp Trưởng' : 'Ngự Thiện'}</span>
      </div>

      {/* Special / Best Seller Badge on top-right */}
      {(dish.isChefSpecial || dish.isBestSeller) && (
        <div className="absolute top-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 text-[10px] font-black shadow-md flex items-center gap-1">
          <span>⭐</span>
          <span>{dish.isBestSeller ? 'BÁN CHẠY' : 'ĐẶC SẢN'}</span>
        </div>
      )}

      <div className="w-full flex-1 flex flex-col justify-between">
        {/* Product Image - Centered and High Quality */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950 flex items-center justify-center flex-shrink-0"
          style={{ width: '100%' }}
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#150709] via-transparent to-black/30 pointer-events-none" />
          
          {/* Chinese Calligraphy & Pinyin overlay on bottom of image */}
          <div className="absolute bottom-2 left-3 z-10 flex items-center gap-2">
            <span className="font-calligraphy text-amber-300 text-xs sm:text-base drop-shadow-md">
              {dish.hanzi}
            </span>
            {dish.pinyin && (
              <span className="text-[10px] text-amber-200/90 italic font-mono hidden sm:inline drop-shadow">
                ({dish.pinyin})
              </span>
            )}
          </div>
        </div>

        {/* Product Details - Aligned heights for grid consistency */}
        <div className="p-3 sm:p-4 space-y-2 flex-1 flex flex-col justify-between">
          <div>
            {/* Title - Fixed height so both cards start and align at the same line */}
            <h3 className="font-bold text-xs sm:text-base text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug h-10 sm:h-12 block">
              {dish.name}
            </h3>

            {/* Description - Fixed height */}
            <p className="text-[11px] sm:text-xs text-stone-400 line-clamp-2 leading-relaxed h-8 sm:h-10 overflow-hidden mt-1 block">
              {dish.description}
            </p>
          </div>

          <div className="space-y-2 pt-1 border-t border-[#290e11]">
            {/* Price & Flavor Tag */}
            <div className="flex items-baseline justify-between pt-0.5">
              <div className="flex items-baseline gap-1">
                <span className="text-sm sm:text-lg font-black text-amber-300">
                  {formatVND(dish.price)}
                </span>
                <span className="text-[10px] text-stone-400">/ phần</span>
              </div>
              <span className="text-[10px] font-semibold text-amber-300/90 bg-red-950/70 px-2 py-0.5 rounded-full border border-amber-500/30">
                {dish.isSpicy ? '🌶️ Cay Tứ Xuyên' : '🥟 Vị Thanh Đạm'}
              </span>
            </div>

            {/* Rating & Favorite Heart */}
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <span className="text-[11px] text-amber-200 font-bold">5.0</span>
                <span className="text-[10px] text-stone-400 hidden sm:inline">
                  (Chuẩn vị hoàng triều)
                </span>
              </div>

              {/* Like Heart */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className="p-1 hover:text-red-400 transition-colors"
                title="Yêu thích món này"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-stone-400 hover:text-red-400'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Button: Imperial Chinese Styled CTA */}
      <div className="p-3 sm:p-4 pt-0 mt-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(dish);
          }}
          className="hl-hero-btn-primary w-full text-xs font-bold py-2 sm:py-2.5 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>CHỌN MÓN NÀY</span>
        </button>
      </div>
    </div>
  );
};
