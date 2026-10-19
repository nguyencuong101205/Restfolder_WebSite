import React, { useState } from 'react';
import { Heart, Plus, Star, Check } from 'lucide-react';

export const DishCard = ({ dish, onOpenDetail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  // Fake slight old price for Shopee discount effect
  const oldPrice = Math.round(dish.price * 1.15 / 1000) * 1000;

  return (
    <div
      onClick={() => onOpenDetail(dish)}
      className="group flex flex-col justify-between bg-gradient-to-b from-[#1a080b] to-[#120507] rounded-2xl border border-amber-500/30 hover:border-amber-400/80 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer relative w-full hover:-translate-y-1"
      style={{ willChange: 'transform', width: '100%' }}
    >
      {/* Luxury Chinese Badge: "Yêu Thích" on top-left */}
      <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-red-700/90 border border-amber-400/60 text-white text-[10px] font-bold shadow-md flex items-center gap-1 backdrop-blur-sm">
        <Check className="w-2.5 h-2.5 stroke-[3] text-amber-300" />
        <span>Yêu thích</span>
      </div>

      {/* Luxury Chef Special Tag on top-right */}
      {(dish.isChefSpecial || dish.isBestSeller) && (
        <div className="absolute top-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 text-[10px] font-black shadow-md flex items-center gap-1">
          <span>⭐</span>
          <span>ĐẶC SẢN</span>
        </div>
      )}

      <div className="w-full flex-1 flex flex-col justify-between">
        {/* Product Image - Căn giữa ảnh (object-center) */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a080b] via-transparent to-black/20 pointer-events-none"></div>
          
          {/* Chinese Hanzi & Pinyin on bottom-left of photo */}
          <div className="absolute bottom-2 left-3 z-10 flex items-center gap-2">
            <span className="font-calligraphy text-amber-300 text-xs sm:text-sm drop-shadow-md">
              {dish.hanzi}
            </span>
            {dish.pinyin && (
              <span className="text-[10px] text-amber-200/80 italic font-mono hidden sm:inline drop-shadow">
                ({dish.pinyin})
              </span>
            )}
          </div>
        </div>

        {/* Product Details - Căn thẳng hàng đồng đều (Title & Description fixed heights) */}
        <div className="p-3 sm:p-4 space-y-1.5 flex-1 flex flex-col justify-between">
          <div>
            {/* Title - Fixed height h-12 để các thẻ luôn bắt đầu cùng hàng và thẳng nhau tuyệt đối */}
            <h3 className="font-bold text-xs sm:text-base text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug h-12 block">
              {dish.name}
            </h3>

            {/* Description preview - Fixed height h-10 để chữ mô tả cả 2 thẻ bắt đầu và kết thúc cùng 1 hàng */}
            <p className="text-[11px] sm:text-xs text-stone-400 line-clamp-2 leading-relaxed h-10 overflow-hidden mt-1 block">
              {dish.description}
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            {/* Price Row: Old price + Current red price */}
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-sm sm:text-base font-black text-red-500">
                {formatVND(dish.price)}
              </span>
              <span className="text-[11px] text-stone-500 line-through">
                {formatVND(oldPrice)}
              </span>
            </div>

            {/* Action Row: Heart Like, Rating 5 Stars, Order Count */}
            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
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
                    isLiked ? 'fill-red-500 text-red-500' : 'text-stone-400'
                  }`}
                />
              </button>

              {/* Stars Rating & Sold Count */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                </div>
                <span className="text-[10px] text-stone-400">
                  Đã gọi {Math.floor(dish.price / 1000)} phần
                </span>
              </div>
            </div>

            {/* Origin / Category */}
            <div className="text-[10px] text-stone-400 flex justify-between items-center pt-1 border-t border-[#2d1114]">
              <span>{dish.isSpicy ? '🌶️ Vị Cay Tê' : '🥟 Vị Thanh Đạm'}</span>
              <span className="text-amber-400 font-medium">Hoàng Long Quán</span>
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
          className="hl-hero-btn-primary w-full text-xs font-bold py-2 sm:py-2.5 rounded-xl shadow-md active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Đặt Món Ngay</span>
        </button>
      </div>
    </div>
  );
};
