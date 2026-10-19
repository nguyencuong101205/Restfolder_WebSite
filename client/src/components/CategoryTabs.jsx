import React from 'react';
import { Search, Flame, Star, Sparkles, Coffee, UtensilsCrossed } from 'lucide-react';

export const CATEGORIES = [
  { id: 'all', label: 'Tất Cả Món', hanzi: '全部佳肴', icon: Sparkles },
  { id: 'dimsum', label: 'Dim Sum Điểm Tâm', hanzi: '港式点心', icon: null },
  { id: 'roast', label: 'Quay & Nướng Cung Đình', hanzi: '宫廷烧腊', icon: null },
  { id: 'hotpot', label: 'Lẩu & Xào Tứ Xuyên', hanzi: '川味佳肴', icon: Flame },
  { id: 'noodles', label: 'Mì Kéo & Cơm Chiên', hanzi: '拉面炒饭', icon: UtensilsCrossed },
  { id: 'tea_dessert', label: 'Trà & Tráng Miệng', hanzi: '名茶甜点', icon: Coffee }
];

export const CategoryTabs = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onlySpicy,
  onToggleSpicy,
  onlyBestSeller,
  onToggleBestSeller
}) => {
  return (
    <div className="space-y-4">
      {/* Search & Quick Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#190a0d]/90 p-3 rounded-2xl border border-[#4d161a] shadow-xl backdrop-blur-sm">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm món ăn, vịt quay, dimsum, lẩu..."
            className="w-full pl-10 pr-8 py-2.5 bg-[#0f0406] border border-[#521c21] rounded-xl text-xs sm:text-sm text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white w-5 h-5 flex items-center justify-center rounded-full bg-stone-800"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={onToggleBestSeller}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap active:scale-95 ${
              onlyBestSeller
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 border-amber-300 shadow-md shadow-amber-900/40'
                : 'bg-[#220d10] text-amber-300 border-amber-500/30 hover:border-amber-400/70 hover:bg-[#2e1216]'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyBestSeller ? 'fill-stone-950 text-stone-950' : 'text-amber-400'}`} />
            <span>Món Bán Chạy (热卖)</span>
          </button>

          <button
            onClick={onToggleSpicy}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap active:scale-95 ${
              onlySpicy
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-400 shadow-md shadow-red-900/60 ring-1 ring-red-400'
                : 'bg-[#220d10] text-red-300 border-red-800/40 hover:border-red-500/70 hover:bg-[#2e1216]'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${onlySpicy ? 'text-yellow-300 fill-yellow-300' : 'text-red-400'}`} />
            <span>Món Cay Tê (麻辣)</span>
          </button>
        </div>

      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all text-left relative overflow-hidden group active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-[#8a141c] via-[#6e0c12] to-[#50080d] border-amber-400/90 text-white shadow-xl shadow-red-950/70 ring-1 ring-amber-400/60'
                  : 'bg-[#18090b]/80 hover:bg-[#240e11] border-[#3e1418] text-stone-300 hover:text-amber-100 hover:border-amber-500/30'
              }`}
            >
              {/* Subtle gold accent corner on active */}
              {isActive && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-bl from-amber-400 to-transparent"></div>
              )}

              {Icon && (
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-stone-900/60 text-stone-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
              )}

              <div>
                <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5 leading-tight">
                  <span>{cat.label}</span>
                </div>
                <div className={`font-calligraphy text-xs leading-none mt-1 tracking-wider ${isActive ? 'text-amber-300 font-bold' : 'text-stone-400'}`}>
                  {cat.hanzi}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
