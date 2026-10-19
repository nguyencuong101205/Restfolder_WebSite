import React, { useState } from 'react';
import { Heart, Plus, Check, Flame, Star, Award, Layers } from 'lucide-react';

export const DishCard = ({ dish, onOpenDetail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  return (
    <div
      onClick={() => onOpenDetail(dish)}
      className="michelin-card group flex flex-col justify-between bg-[#19090b] rounded-2xl border border-stone-800 hover:border-amber-400/70 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div>
        {/* Michelin Style Image Box */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

          {/* Top-Right: Floating Circle Heart Button (Michelin style) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all z-10 active:scale-90"
            title="Thêm vào danh sách yêu thích"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>

          {/* Bottom-Left: Michelin "Reserve a table" style pill */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-white/95 text-stone-900 rounded-lg text-[11px] font-bold shadow-lg z-10">
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
            <span>Gọi món tại bàn</span>
          </div>

          {/* Bottom-Right: Gallery Layers Icon */}
          <div className="absolute bottom-3 right-3 p-1.5 rounded-md bg-black/60 backdrop-blur-xs text-white/80 z-10">
            <Layers className="w-3.5 h-3.5" />
          </div>

          {/* Spice or Special badge top-left if present */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {dish.isChefSpecial && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-red-900/90 border border-amber-400/60 text-amber-200 text-[10px] font-bold rounded shadow">
                <Award className="w-3 h-3 text-amber-300" />
                <span>Đặc Sản Bếp</span>
              </span>
            )}
            {dish.isBestSeller && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500 text-stone-950 text-[10px] font-black rounded shadow">
                <Star className="w-3 h-3 fill-stone-950" />
                <span>Bán Chạy</span>
              </span>
            )}
          </div>
        </div>

        {/* Michelin Style Card Content */}
        <div className="p-4 space-y-1.5">
          
          {/* Classification & Cuisine Type */}
          <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
            <span className="truncate">
              {dish.category === 'dimsum' && '🥟 Dim Sum · Quảng Đông'}
              {dish.category === 'roast' && '🦆 Món Quay · Bắc Kinh'}
              {dish.category === 'hotpot' && '🍲 Lẩu & Xào · Tứ Xuyên'}
              {dish.category === 'noodles' && '🍜 Mì Kéo · Lan Châu'}
              {dish.category === 'tea_dessert' && '🍵 Danh Trà · Tráng Miệng'}
            </span>
            <span className="text-amber-400/80 font-mono text-[11px]">₫₫</span>
          </div>

          {/* Dish Name (Michelin Headline) */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {dish.name}
            </h3>
            <span className="font-calligraphy text-amber-400 text-sm whitespace-nowrap hidden sm:inline">
              {dish.hanzi}
            </span>
          </div>

          {/* Subtitle / Restaurant location like Michelin */}
          <p className="text-[11px] text-stone-400 flex items-center gap-1">
            <span>Hoàng Long Quán</span>
            <span>·</span>
            <span>Quận 5, TP. HCM</span>
            {dish.isSpicy && <span className="text-red-400 ml-1">· 🌶️ Cay tê</span>}
          </p>

          {/* Description */}
          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed pt-1">
            {dish.description}
          </p>
        </div>
      </div>

      {/* Footer: Price & Add Button */}
      <div className="p-4 pt-2 border-t border-stone-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-stone-500 uppercase tracking-wider block leading-none">
            Giá món
          </span>
          <span className="text-base sm:text-lg font-black text-amber-400">
            {formatVND(dish.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(dish);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-red-800 to-red-950 hover:from-red-700 hover:to-red-900 border border-amber-400/60 rounded-xl text-amber-100 text-xs font-bold shadow transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 text-amber-300 stroke-[2.5]" />
          <span>Thêm Vào Bàn</span>
        </button>
      </div>
    </div>
  );
};
