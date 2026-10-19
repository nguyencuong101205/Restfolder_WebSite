import React from 'react';
import { Plus, Flame, Star, Award, ChevronRight } from 'lucide-react';

export const DishListItem = ({ dish, onOpenDetail }) => {
  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  return (
    <div
      onClick={() => onOpenDetail(dish)}
      className="chinese-list-item group flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#1c0c0e] via-[#16080a] to-[#1a0b0d] border border-[#3d1519] hover:border-amber-400/60 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      {/* Subtle gold line on left edge on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Left: Dish Thumbnail Image */}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-stone-900 border border-amber-500/30 shadow-inner">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Spice badge on image corner */}
        {dish.isSpicy && (
          <div className="absolute bottom-1 right-1 flex items-center bg-black/80 backdrop-blur-xs px-1.5 py-0.5 rounded-md border border-red-500/50">
            {Array.from({ length: Math.min(dish.spiceLevel || 1, 3) }).map((_, i) => (
              <Flame key={i} className="w-2.5 h-2.5 text-red-500 fill-red-500 -ml-0.5 first:ml-0" />
            ))}
          </div>
        )}
      </div>

      {/* Middle: Dish Info */}
      <div className="flex-1 min-w-0 pr-1 sm:pr-2">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          {dish.isBestSeller && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black text-[9px] sm:text-[10px] shadow">
              <Star className="w-2.5 h-2.5 fill-stone-950" />
              <span>Bán Chạy</span>
            </span>
          )}
          {dish.isChefSpecial && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-900/80 border border-amber-400/50 text-amber-200 text-[9px] sm:text-[10px] font-bold">
              <Award className="w-2.5 h-2.5 text-amber-300" />
              <span>Đặc Sản Bếp</span>
            </span>
          )}
          <span className="font-calligraphy text-amber-400/90 text-xs sm:text-sm tracking-widest hidden sm:inline">
            {dish.hanzi}
          </span>
        </div>

        {/* Dish Title */}
        <h3 className="font-bold text-sm sm:text-base text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1 leading-snug">
          {dish.name}
        </h3>

        {/* Hanzi on mobile if not shown above */}
        <div className="sm:hidden font-calligraphy text-amber-400/80 text-xs mt-0.5">
          {dish.hanzi}
        </div>

        {/* Description */}
        <p className="text-[11px] sm:text-xs text-stone-400 line-clamp-1 sm:line-clamp-2 mt-1 leading-relaxed">
          {dish.description}
        </p>

        {/* Available Toppings hint if any */}
        {dish.toppings && dish.toppings.length > 0 && (
          <span className="hidden sm:inline-block text-[10px] text-amber-400/70 mt-1">
            + Có {dish.toppings.length} tùy chọn gia vị / món kèm
          </span>
        )}
      </div>

      {/* Right: Price & Quick Action */}
      <div className="flex flex-col items-end justify-center gap-2 flex-shrink-0 pl-1 sm:pl-3 border-l border-[#3d1519]/60">
        <span className="text-sm sm:text-lg font-black text-amber-400 whitespace-nowrap">
          {formatVND(dish.price)}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(dish);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-red-800 via-red-900 to-red-950 hover:from-red-700 hover:to-red-800 border border-amber-400/60 rounded-xl text-amber-100 text-xs font-bold shadow-md hover:border-amber-300 active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-amber-300 stroke-[2.5]" />
          <span>Thêm Món</span>
        </button>
      </div>
    </div>
  );
};
