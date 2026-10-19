import React, { useRef } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Flame, Star, X } from 'lucide-react';

export const CATEGORIES = [
  { id: 'all', label: 'Tất Cả Món', hanzi: '全部', icon: '🏮' },
  { id: 'chef_special', label: 'Đặc Sản Quán', hanzi: '招牌', icon: '⭐' },
  { id: 'dimsum', label: 'Dim Sum Nặn Tay', hanzi: '点心', icon: '🥟' },
  { id: 'roast', label: 'Vịt Quay & Nướng', hanzi: '烧腊', icon: '🦆' },
  { id: 'soup_abalone', label: 'Bào Ngư & Tổ Yến', hanzi: '鲍燕', icon: '🦪' },
  { id: 'meat', label: 'Sơn Hào Hải Vị', hanzi: '佳肴', icon: '🥩' },
  { id: 'hotpot', label: 'Lẩu Tứ Xuyên', hanzi: '火锅', icon: '🍲' },
  { id: 'noodles', label: 'Mì Kéo & Hủ Tiếu', hanzi: '面食', icon: '🍜' },
  { id: 'tea_dessert', label: 'Danh Trà & Tráng Miệng', hanzi: '甜品', icon: '🍵' }
];

const QUICK_TAGS = [
  'Há Cảo Tôm',
  'Vịt Quay Bắc Kinh',
  'Bào Ngư Sốt Dầu Hào',
  'Lẩu Tứ Xuyên',
  'Trà Long Tỉnh'
];

export const CategoryTabs = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onlySpicy,
  onToggleSpicy,
  onlyBestSeller,
  onToggleBestSeller,
  sortByPrice,
  onSortChange,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  const tabsContainerRef = useRef(null);

  const scrollTabs = (offset) => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Main Search Bar */}
      <div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm món ăn cung đình, dim sum nặn tay, vịt quay giòn da, lẩu Tứ Xuyên..."
            className="w-full pl-11 pr-10 py-3 bg-[#18080a] border border-amber-500/30 hover:border-amber-400/60 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 shadow-inner transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center text-xs transition-colors"
              title="Xóa tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Search Chips */}
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none text-[11px] text-stone-400">
          <span className="text-amber-400/80 font-semibold flex-shrink-0">Gợi ý tìm kiếm:</span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSearchChange(tag)}
              className="px-2.5 py-0.5 rounded-full bg-[#1e0a0d] hover:bg-[#2e1014] border border-[#44181c] hover:border-amber-400/50 text-stone-300 hover:text-amber-200 transition-all flex-shrink-0 whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Category Carousel Tabs */}
      <div className="relative flex items-center">
        {/* Left scroll arrow */}
        <button
          type="button"
          onClick={() => scrollTabs(-200)}
          className="hidden md:flex absolute -left-2 z-10 w-7 h-7 rounded-full bg-[#18080a] border border-amber-500/40 text-amber-300 items-center justify-center shadow-lg hover:bg-red-950 transition-colors"
          title="Xem danh mục trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable list of categories */}
        <div
          ref={tabsContainerRef}
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none w-full scroll-smooth px-1"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-800 to-red-950 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-[#18080a] border-[#3b1216] text-stone-300 hover:text-white hover:border-stone-600 hover:bg-[#240e11]'
                }`}
              >
                <span className="text-base flex-shrink-0">{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="font-calligraphy text-[11px] text-amber-400/70 ml-0.5">
                  {cat.hanzi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right scroll arrow */}
        <button
          type="button"
          onClick={() => scrollTabs(200)}
          className="hidden md:flex absolute -right-2 z-10 w-7 h-7 rounded-full bg-[#18080a] border border-amber-500/40 text-amber-300 items-center justify-center shadow-lg hover:bg-red-950 transition-colors"
          title="Xem thêm danh mục"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Sub-filter & Sorting Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#2d1114]">
        
        {/* Left: Filter Buttons & Price dropdown */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Price dropdown */}
          <div className="shopee-select-input">
            <span className="select-input__label">
              {sortByPrice === 'asc' ? 'Giá: Thấp đến Cao' : sortByPrice === 'desc' ? 'Giá: Cao đến Thấp' : 'Sắp xếp theo Giá'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-2" />
            
            <ul className="shopee-select-input__list">
              <li
                onClick={() => onSortChange('default')}
                className="shopee-select-input__item"
              >
                Mặc định theo đầu bếp
              </li>
              <li
                onClick={() => onSortChange('asc')}
                className="shopee-select-input__item"
              >
                Giá: Thấp đến Cao
              </li>
              <li
                onClick={() => onSortChange('desc')}
                className="shopee-select-input__item"
              >
                Giá: Cao đến Thấp
              </li>
            </ul>
          </div>

          {/* Quick Filters */}
          <button
            type="button"
            onClick={onToggleBestSeller}
            className={`shopee-btn ${onlyBestSeller ? 'shopee-btn--gold' : ''} gap-1.5`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyBestSeller ? 'fill-stone-950 text-stone-950' : 'text-amber-400'}`} />
            <span>Món Bán Chạy</span>
          </button>

          <button
            type="button"
            onClick={onToggleSpicy}
            className={`shopee-btn ${onlySpicy ? 'shopee-btn--primary' : ''} gap-1.5`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Vị Cay Tứ Xuyên</span>
          </button>
        </div>

        {/* Right: Mini Page Controller */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2 text-xs text-stone-400 ml-auto">
            <span>
              Trang <strong className="text-amber-300 font-bold">{currentPage}</strong>/{totalPages}
            </span>
            <div className="flex items-center rounded-lg border border-amber-500/30 overflow-hidden bg-[#18080a]">
              <button
                type="button"
                onClick={() => onPageChange && onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-1.5 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-amber-200"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-[#3b1216]" />
              <button
                type="button"
                onClick={() => onPageChange && onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-1.5 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-amber-200"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
