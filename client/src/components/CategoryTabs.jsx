import React from 'react';
import { Search, SlidersHorizontal, Flame, Star, X, QrCode } from 'lucide-react';
import { useTable } from '../context/TableContext';

export const CATEGORIES = [
  { id: 'all', label: 'Tất Cả Món' },
  { id: 'dimsum', label: 'Dim Sum Điểm Tâm' },
  { id: 'roast', label: 'Món Quay Cung Đình' },
  { id: 'hotpot', label: 'Lẩu Tứ Xuyên Cay Tê' },
  { id: 'noodles', label: 'Mì Kéo & Cơm Chiên' },
  { id: 'tea_dessert', label: 'Trà & Tráng Miệng' }
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
  const { tableNumber, setIsQRModalOpen } = useTable();

  return (
    <div className="space-y-4">
      {/* Michelin Guide Search Bar Row */}
      <div className="flex items-center gap-3">
        {/* Large Pill Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm món ăn, dim sum, vịt quay, lẩu, mì kéo..."
            className="w-full pl-11 pr-10 py-3 bg-[#18090b] border border-stone-700/80 rounded-full text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-md transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center text-xs"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Right QR Table Button (Similar to Map button in Michelin) */}
        <button
          onClick={() => setIsQRModalOpen(true)}
          className="p-3 sm:px-4 sm:py-3 rounded-full bg-[#1e0a0d] border border-amber-500/50 hover:border-amber-400 text-amber-300 flex items-center gap-2 shadow-md transition-all active:scale-95 flex-shrink-0"
          title="Quét hoặc chọn mã QR bàn"
        >
          <QrCode className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline text-xs font-bold text-white">Bàn {tableNumber}</span>
        </button>
      </div>

      {/* Michelin Guide Filter Chips Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {/* Filter Slider Icon Button */}
        <button
          onClick={() => {
            onSelectCategory('all');
            onSearchChange('');
          }}
          className="p-2.5 rounded-full bg-[#1e0a0d] border border-stone-700 hover:border-stone-500 text-stone-300 flex items-center justify-center flex-shrink-0 transition-all"
          title="Bộ lọc thực đơn"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-300" />
        </button>

        {/* Category Pills */}
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-full border whitespace-nowrap transition-all font-medium flex-shrink-0 ${
                isActive
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold shadow-md'
                  : 'bg-[#18090b] border-stone-800 text-stone-300 hover:border-stone-600 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}

        {/* Quick Filter: Bán Chạy */}
        <button
          onClick={onToggleBestSeller}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border whitespace-nowrap transition-all font-medium flex-shrink-0 ${
            onlyBestSeller
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 border-amber-300 font-bold shadow-md'
              : 'bg-[#18090b] border-stone-800 text-stone-300 hover:border-amber-500/50 hover:text-amber-300'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${onlyBestSeller ? 'fill-stone-950 text-stone-950' : 'text-amber-400'}`} />
          <span>Bán Chạy Nhất</span>
        </button>

        {/* Quick Filter: Cay Tứ Xuyên */}
        <button
          onClick={onToggleSpicy}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border whitespace-nowrap transition-all font-medium flex-shrink-0 ${
            onlySpicy
              ? 'bg-red-600 text-white border-red-400 font-bold shadow-md'
              : 'bg-[#18090b] border-stone-800 text-stone-300 hover:border-red-500/50 hover:text-red-400'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${onlySpicy ? 'text-white fill-white' : 'text-red-400'}`} />
          <span>Món Cay Tứ Xuyên</span>
        </button>
      </div>
    </div>
  );
};
