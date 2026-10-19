import React, { useState, useEffect } from 'react';
import { menuApi } from '../api/menuApi';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { CategoryTabs } from '../components/CategoryTabs';
import { DishCard } from '../components/DishCard';
import { DishListItem } from '../components/DishListItem';
import { DishDetailModal } from '../components/DishDetailModal';
import { ChevronRight, ChevronLeft, LayoutGrid, LayoutList } from 'lucide-react';

const ITEMS_PER_PAGE = 8; // Exactly 4 dishes per row x 2 rows per page

export const CustomerMenuPage = () => {
  const { tableNumber } = useTable();
  const { totalItemsCount, total, setIsCartOpen } = useCart();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);
  const [sortByPrice, setSortByPrice] = useState('default'); // 'default' | 'asc' | 'desc'
  const [selectedDish, setSelectedDish] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // Default to grid
  const [currentPage, setCurrentPage] = useState(1);

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on filter changes
    fetchDishes();
  }, [activeCategory, searchQuery, onlySpicy, onlyBestSeller]);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const res = await menuApi.getDishes({
        category: activeCategory,
        search: searchQuery,
        spicyOnly: onlySpicy,
        bestSellerOnly: onlyBestSeller
      });
      if (res.success && Array.isArray(res.data)) {
        let list = [...res.data];
        if (sortByPrice === 'asc') {
          list.sort((a, b) => a.price - b.price);
        } else if (sortByPrice === 'desc') {
          list.sort((a, b) => b.price - a.price);
        }
        setDishes(list);
      }
    } catch (err) {
      console.warn('Lỗi tải danh mục món ăn:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (sortType) => {
    setSortByPrice(sortType);
    setCurrentPage(1);
    let list = [...dishes];
    if (sortType === 'asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortType === 'desc') {
      list.sort((a, b) => b.price - a.price);
    } else {
      fetchDishes();
      return;
    }
    setDishes(list);
  };

  // Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(dishes.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDishes = dishes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const menuSection = document.getElementById('menu-dish-list');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0405] text-stone-200">
      
      {/* Shopee Style Filter Bar Container */}
      <section className="bg-[#140608] border-b border-[#3b1216] pt-4 pb-4 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto space-y-3">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onlySpicy={onlySpicy}
            onToggleSpicy={() => setOnlySpicy(!onlySpicy)}
            onlyBestSeller={onlyBestSeller}
            onToggleBestSeller={() => setOnlyBestSeller(!onlyBestSeller)}
            sortByPrice={sortByPrice}
            onSortChange={handleSortChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* Main Content Area */}
      <main id="menu-dish-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-28">
        
        {/* Counter & View Switcher Bar */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#3b1216]">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-amber-200">
              Thực Đơn Hoàng Long Quán ({dishes.length} món)
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              · Trang {currentPage}/{totalPages}
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              · Bàn {tableNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="shopee-btn gap-1 text-xs py-1 h-8"
              title="Chuyển chế độ xem"
            >
              {viewMode === 'grid' ? (
                <>
                  <LayoutList className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dạng List</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dạng Lưới (2 món/hàng)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Grid / List */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3.5 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-[#1a0a0c] rounded-sm border border-[#3b1519] animate-pulse"></div>
            ))}
          </div>
        ) : dishes.length === 0 ? (
          <div className="py-24 text-center bg-[#160709] border border-[#3b1216] rounded-sm p-8 max-w-md mx-auto shadow-xl">
            <span className="text-4xl block mb-3">🥟</span>
            <h3 className="font-bold text-lg text-white">Không tìm thấy món ăn phù hợp</h3>
            <p className="text-xs text-stone-400 mt-1.5">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ thực đơn nhé.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* SHOPEE STYLE PRODUCT GRID: 2 COLUMNS (2 DISHES PER ROW) */
          <div className="grid grid-cols-2 gap-3.5 sm:gap-6">
            {paginatedDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onOpenDetail={(dishToView) => setSelectedDish(dishToView)}
              />
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-3">
            {paginatedDishes.map((dish) => (
              <DishListItem
                key={dish.id}
                dish={dish}
                onOpenDetail={(dishToView) => setSelectedDish(dishToView)}
              />
            ))}
          </div>
        )}

        {/* Shopee Style Bottom Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
            <div className="shopee-pagination">
              {/* Previous page button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="shopee-pagination-btn"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  className={`shopee-pagination-btn ${
                    currentPage === pageNum ? 'shopee-pagination-btn--active' : ''
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next page button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="shopee-pagination-btn"
                title="Trang kế tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs text-stone-400 font-medium">
              Đang hiển thị {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, dishes.length)} trong tổng số {dishes.length} món ăn
            </span>
          </div>
        )}

      </main>

      {/* Floating Bottom Bar for Mobile Table Ordering */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 bg-gradient-to-r from-red-700 via-red-800 to-amber-700 text-white font-bold rounded-sm shadow-2xl flex items-center justify-between border border-amber-400 animate-pulse active:scale-95"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
              <span className="text-xs font-bold">Xem Giỏ Món Bàn {tableNumber}</span>
            </div>
            <div className="text-xs font-black text-amber-200 flex items-center gap-1">
              <span>{formatVND(total)}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Dish Customization Modal */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}

    </div>
  );
};
