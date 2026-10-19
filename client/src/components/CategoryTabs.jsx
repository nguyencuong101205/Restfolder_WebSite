import React from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Flame, Star, X, QrCode } from 'lucide-react';
import { useTable } from '../context/TableContext';

export const CATEGORIES = [
  { id: 'all', label: 'Tất Cả Món' },
  { id: 'dimsum', label: 'Dim Sum' },
  { id: 'roast', label: 'Món Quay' },
  { id: 'hotpot', label: 'Lẩu Tứ Xuyên' },
  { id: 'noodles', label: 'Mì Kéo' },
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
  onToggleBestSeller,
  sortByPrice,
  onSortChange,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  const { tableNumber, setIsQRModalOpen } = useTable();

  return (
    <div className="space-y-3">
      {/* Search Input Bar (Shopee style header search) */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm món ăn, dim sum, vịt quay, lẩu Tứ Xuyên..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#18090b] border border-[#44181c] rounded-sm text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center text-xs"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsQRModalOpen(true)}
          className="shopee-btn shopee-btn--primary gap-1.5 flex-shrink-0"
          title="Đổi số bàn ăn"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Bàn {tableNumber}</span>
        </button>
      </div>

      {/* Shopee Style Home Filter Bar (.home-filter) */}
      <div className="shopee-filter-bar">
        <span className="shopee-filter__label">Danh mục:</span>

        {/* Category Buttons (.home-filter__btn .btn) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shopee-btn ${isActive ? 'shopee-btn--primary' : ''}`}
              >
                {cat.label}
              </button>
            );
          })}

          {/* Shopee Dropdown: Giá (Thấp đến Cao / Cao đến Thấp) */}
          <div className="shopee-select-input">
            <span className="select-input__label">
              {sortByPrice === 'asc' ? 'Giá: Thấp đến Cao' : sortByPrice === 'desc' ? 'Giá: Cao đến Thấp' : 'Giá Món'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            
            <ul className="shopee-select-input__list">
              <li
                onClick={() => onSortChange('default')}
                className="shopee-select-input__item"
              >
                Mặc định
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

          {/* Quick Filter Buttons */}
          <button
            onClick={onToggleBestSeller}
            className={`shopee-btn ${onlyBestSeller ? 'shopee-btn--gold' : ''} gap-1`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyBestSeller ? 'fill-stone-950 text-stone-950' : 'text-amber-400'}`} />
            <span>Bán Chạy</span>
          </button>

          <button
            onClick={onToggleSpicy}
            className={`shopee-btn ${onlySpicy ? 'shopee-btn--primary' : ''} gap-1`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Cay Tứ Xuyên</span>
          </button>
        </div>

        {/* Shopee Style Mini Page Controller (.home-filter__page) */}
        {totalPages > 1 && (
          <div className="home-filter__page ml-auto flex items-center">
            <span className="home-filter__page-num text-xs sm:text-sm">
              <span className="home-filter__page-current">{currentPage}</span>/{totalPages}
            </span>
            <div className="home-filter__page-control">
              <button
                type="button"
                onClick={() => onPageChange && onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="home-filter__page-btn"
                title="Trang trước"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onPageChange && onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="home-filter__page-btn"
                title="Trang kế tiếp"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
