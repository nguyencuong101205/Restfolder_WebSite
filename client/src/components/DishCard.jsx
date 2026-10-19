import React from 'react';
import { Plus, Flame, Star, Award } from 'lucide-react';

export const DishCard = ({ dish, onOpenDetail }) => {
  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  return (
    <div className="chinese-card group flex flex-col justify-between">
      {/* Corner Ornaments */}
      <div className="corner-ornament-tl"></div>
      <div className="corner-ornament-tr"></div>
      <div className="corner-ornament-bl"></div>
      <div className="corner-ornament-br"></div>

      <div>
        {/* Dish Image Container */}
        <div
          className="relative h-44 sm:h-52 w-full overflow-hidden bg-stone-950 cursor-pointer"
          onClick={() => onOpenDetail(dish)}
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
          {/* Subtle gradient vignette over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#18090b] via-transparent to-black/40"></div>

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start z-10">
            {dish.isChefSpecial && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-red-800 to-amber-700 border border-amber-400 text-amber-100 text-[10px] font-bold rounded-lg shadow-lg">
                <Award className="w-3 h-3 text-amber-300" />
                <span>Bếp Trưởng Khuyên Dùng</span>
              </span>
            )}
            {dish.isBestSeller && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black text-[10px] rounded-lg shadow-lg">
                <Star className="w-3 h-3 fill-stone-950" />
                <span>Bán Chạy Nhất</span>
              </span>
            )}
          </div>

          {/* Spice Level Indicator */}
          {dish.isSpicy && (
            <div className="absolute top-2.5 right-2.5 flex items-center bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-red-500/50 shadow-lg z-10">
              {Array.from({ length: dish.spiceLevel || 1 }).map((_, i) => (
                <Flame key={i} className="w-3 h-3 text-red-500 fill-red-500 -ml-0.5 first:ml-0" />
              ))}
              <span className="text-[10px] text-red-300 ml-1 font-bold">Cay Tê</span>
            </div>
          )}

          {/* Chinese Hanzi Float on Image Bottom */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between z-10">
            <span className="font-calligraphy text-amber-300 text-base sm:text-lg tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {dish.hanzi}
            </span>
            {dish.pinyin && (
              <span className="text-[10px] text-amber-200/80 font-mono tracking-tight drop-shadow">
                {dish.pinyin}
              </span>
            )}
          </div>
        </div>

        {/* Dish Content */}
        <div className="p-4 cursor-pointer" onClick={() => onOpenDetail(dish)}>
          <h3 className="font-bold text-sm sm:text-base text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1 leading-snug">
            {dish.name}
          </h3>
          <p className="text-xs text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>
      </div>

      {/* Dish Footer: Price & Add Button */}
      <div className="p-4 pt-1 flex items-center justify-between border-t border-[#3b1519]/70 mt-1">
        <div>
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block leading-none">
            Giá niêm yết
          </span>
          <span className="text-base sm:text-lg font-black text-amber-400 tracking-tight">
            {formatVND(dish.price)}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(dish);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-red-800 via-red-900 to-red-950 hover:from-red-700 hover:to-red-800 border border-amber-400/50 rounded-xl text-amber-100 text-xs font-bold shadow-md hover:border-amber-300 transition-all active:scale-95 group-hover:shadow-[0_0_15px_rgba(200,16,46,0.5)]"
        >
          <Plus className="w-4 h-4 text-amber-300 stroke-[2.5]" />
          <span>Thêm Món</span>
        </button>
      </div>
    </div>
  );
};
