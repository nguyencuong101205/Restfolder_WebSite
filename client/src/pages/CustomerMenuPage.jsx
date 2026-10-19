import React, { useState, useEffect } from 'react';
import { menuApi } from '../api/menuApi';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { HeroBanner } from '../components/HeroBanner';
import { CorePillarsSection } from '../components/CorePillarsSection';
import { SignatureDishesSection } from '../components/SignatureDishesSection';
import { CategoryTabs } from '../components/CategoryTabs';
import { DishCard } from '../components/DishCard';
import { DishListItem } from '../components/DishListItem';
import { DishDetailModal } from '../components/DishDetailModal';
import { ChevronRight, ChevronLeft, LayoutGrid, LayoutList, Sparkles, Utensils } from 'lucide-react';

const ITEMS_PER_PAGE = 8; // Strictly 2 dishes per row x 4 rows per page (or 2x2)

export const CustomerMenuPage = ({
  onOpenReserve,
  onOpenAbout,
  onOpenPrivateDining
}) => {
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

  const scrollToMenu = () => {
    const el = document.getElementById('menu-dish-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
    <div className="min-h-screen bg-[#0e0c0b] text-stone-200">
      
      {/* 1. Hero Banner: A Journey Through Time */}
      <HeroBanner
        onExploreMenu={scrollToMenu}
        onOpenReserve={onOpenReserve}
      />

      {/* 2. Core Pillars Section: About Us, Our Menu, Private Dining Rooms */}
      <CorePillarsSection
        onOpenAbout={onOpenAbout}
        onExploreMenu={scrollToMenu}
        onOpenPrivateDining={onOpenPrivateDining}
      />

      {/* 3. Signature Dishes Slider: 14 Masterpieces */}
      <SignatureDishesSection
        onSelectDish={(dish) => setSelectedDish(dish)}
        onExploreMenu={scrollToMenu}
      />

      {/* 4. Interactive Menu Section (Our Menus) */}
      <section id="menu-dish-list" className="bg-[#120f0d] pt-16 sm:pt-20 pb-28 border-t border-[#241c18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Menu Section Header Matching Man Ho Website */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
            <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.25em]">
              THE ART OF CANTONESE CUISINE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#f5f0ea] tracking-wider uppercase font-medium">
              Explore Our Menus
            </h2>
            <div className="w-16 h-0.5 bg-[#c5a880] mx-auto my-2" />
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Khám phá thực đơn ẩm thực Quảng Đông truyền thống với hơn 200 món ăn tinh tuyển từ dim sum nặn tay thủ công, vịt quay Bắc Kinh da giòn đến hải sản sống cao cấp.
            </p>
          </div>

          {/* Filter Bar Container */}
          <div className="bg-[#161210] border border-[#2b221d] rounded-sm p-4 sm:p-5 shadow-lg mb-8">
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

          {/* Counter & View Switcher Bar */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#2b221d]">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-[#c5a880] uppercase tracking-wider font-serif">
                Thực Đơn Man Ho ({dishes.length} món)
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline">
                · Trang {currentPage}/{totalPages}
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline">
                · Đang phục vụ Bàn {tableNumber}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-3 py-1.5 border border-[#c5a880]/50 hover:border-[#c5a880] bg-[#1a1411] text-[#c5a880] text-xs font-semibold rounded-sm transition-all flex items-center gap-1.5"
                title="Chuyển chế độ xem"
              >
                {viewMode === 'grid' ? (
                  <>
                    <LayoutList className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Dạng Danh Sách</span>
                  </>
                ) : (
                  <>
                    <LayoutGrid className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Dạng Lưới (2 món/hàng)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Product Grid / List */}
          {loading ? (
            <div
              className="chinese-menu-grid-2col grid grid-cols-2 gap-3.5 sm:gap-6 w-full"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '20px',
                width: '100%'
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] sm:aspect-[16/10] bg-[#1a1412] rounded-sm border border-[#2d221c] animate-pulse"></div>
              ))}
            </div>
          ) : dishes.length === 0 ? (
            <div className="py-24 text-center bg-[#161210] border border-[#2b221d] rounded-sm p-8 max-w-md mx-auto shadow-xl">
              <span className="text-4xl block mb-3">🥟</span>
              <h3 className="font-bold text-lg text-white font-serif">Không tìm thấy món ăn phù hợp</h3>
              <p className="text-xs text-stone-400 mt-1.5">
                Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ thực đơn nhé.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            /* PRODUCT GRID: STRICTLY 2 DISHES PER ROW WITH CENTERED PHOTOS & ALIGNED TEXTS */
            <div
              className="chinese-menu-grid-2col grid grid-cols-2 gap-3.5 sm:gap-6 w-full"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '20px',
                width: '100%'
              }}
            >
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

          {/* Bottom Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-center mt-12 space-y-2.5">
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

        </div>
      </section>

      {/* Floating Bottom Bar for Mobile Table Ordering */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#b89358] via-[#c5a880] to-[#b89358] text-stone-950 font-bold rounded-sm shadow-2xl flex items-center justify-between border border-[#d8bc94] active:scale-95"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-950 text-[#c5a880] font-black text-xs flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">Xem Giỏ Món Bàn {tableNumber}</span>
            </div>
            <div className="text-xs font-black text-stone-950 flex items-center gap-1">
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
