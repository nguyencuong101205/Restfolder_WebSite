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
      className="group flex flex-col justify-between bg-[#19090b] rounded-sm border border-[#3d1519] hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden cursor-pointer relative w-full"
      style={{ willChange: 'transform', width: '100%' }}
    >
      {/* Shopee Style 3D Ribbon: "Yêu Thích" on top-left */}
      <div className="shopee-favourite-badge flex items-center gap-1">
        <Check className="w-2.5 h-2.5 stroke-[3]" />
        <span>Yêu thích</span>
      </div>

      {/* Shopee Style Sale / Chef Special Tag on top-right */}
      {(dish.isChefSpecial || dish.isBestSeller) && (
        <div className="shopee-sale-off">
          <span className="text-[10px] font-black text-red-700 leading-tight">ĐẶC</span>
          <span className="text-[9px] font-bold text-stone-900 leading-none">SẢN</span>
        </div>
      )}

      <div className="w-full">
        {/* Product Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950" style={{ width: '100%' }}>
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
          
          {/* Chinese Hanzi & Pinyin on bottom-left of photo */}
          <div className="absolute bottom-2 left-3 z-10 flex items-center gap-2">
            <span className="font-calligraphy text-amber-300 text-xs sm:text-sm drop-shadow">
              {dish.hanzi}
            </span>
            {dish.pinyin && (
              <span className="text-[10px] text-amber-200/80 italic font-mono hidden sm:inline drop-shadow">
                ({dish.pinyin})
              </span>
            )}
          </div>
        </div>

        {/* Product Details (Shopee home-product-item__name, price, rating) */}
        <div className="p-3 sm:p-4 space-y-1.5">
          {/* Title */}
          <h3 className="font-bold text-xs sm:text-base text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1 sm:line-clamp-2 leading-snug">
            {dish.name}
          </h3>

          {/* Short description preview for 2-column view */}
          {dish.description && (
            <p className="text-[11px] sm:text-xs text-stone-400 line-clamp-1 sm:line-clamp-2 leading-relaxed">
              {dish.description}
            </p>
          )}

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
          <div className="text-[10px] text-stone-400 flex justify-between items-center pt-0.5 border-t border-[#2d1114]">
            <span>{dish.isSpicy ? '🌶️ Vị Cay Tê' : '🥟 Vị Thanh Đạm'}</span>
            <span className="text-amber-400 font-medium">Hoàng Long Quán</span>
          </div>
        </div>
      </div>

      {/* Button: Shopee Style Rectangular .shopee-btn */}
      <div className="p-3 pt-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(dish);
          }}
          className="shopee-btn shopee-btn--primary w-full gap-1.5 text-xs font-bold"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Đặt Món Ngay</span>
        </button>
      </div>
    </div>
  );
};
