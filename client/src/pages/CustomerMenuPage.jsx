import React, { useState, useEffect } from 'react';
import { menuApi } from '../api/menuApi';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { CategoryTabs } from '../components/CategoryTabs';
import { DishCard } from '../components/DishCard';
import { DishListItem } from '../components/DishListItem';
import { DishDetailModal } from '../components/DishDetailModal';
import { ChevronRight, ChevronLeft, LayoutGrid, LayoutList } from 'lucide-react';

export const CustomerMenuPage = () => {
  const { tableNumber } = useTable();
  const { totalItemsCount, total, setIsCartOpen } = useCart();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // Default to Michelin Grid layout

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  useEffect(() => {
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
        setDishes(res.data);
      }
    } catch (err) {
      console.warn('Lỗi tải danh mục món ăn:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0405] text-stone-200">
      
      {/* Search & Filter Header Container (Michelin Guide style) */}
      <section className="bg-[#140608] border-b border-stone-800/80 pt-6 pb-5 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onlySpicy={onlySpicy}
            onToggleSpicy={() => setOnlySpicy(!onlySpicy)}
            onlyBestSeller={onlyBestSeller}
            onToggleBestSeller={() => setOnlyBestSeller(!onlyBestSeller)}
          />
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28">
        
        {/* Michelin Guide Counter Bar */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
              Hoàng Long Quán: 1-{dishes.length} trong số {dishes.length} món ăn
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Đang phục vụ trực tiếp tại <strong>Bàn {tableNumber}</strong> · Ẩm thực cung đình & Dim Sum
            </p>
          </div>

          {/* Right Controls: View Switcher & Pagination Arrow (Michelin style) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 rounded-xl bg-[#1c0a0c] border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-amber-200 transition-all text-xs font-semibold flex items-center gap-1.5"
              title="Chuyển chế độ xem Lưới / Danh sách"
            >
              {viewMode === 'grid' ? (
                <>
                  <LayoutList className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Dạng List</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Dạng Lưới</span>
                </>
              )}
            </button>

            <button
              className="p-2 rounded-xl bg-[#1c0a0c] border border-stone-700 text-stone-400 hover:text-white"
              title="Trang sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Cards: Michelin Guide 4-Column Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-[#1a0a0c] rounded-2xl border border-stone-800 animate-pulse"></div>
            ))}
          </div>
        ) : dishes.length === 0 ? (
          <div className="py-24 text-center bg-[#160709] border border-stone-800 rounded-3xl p-8 max-w-md mx-auto shadow-xl">
            <span className="text-4xl block mb-3">🥟</span>
            <h3 className="font-bold text-lg text-white">Không tìm thấy món ăn phù hợp</h3>
            <p className="text-xs text-stone-400 mt-1.5">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ thực đơn nhé.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* MICHELIN GUIDE 4-COLUMN CARDS */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onOpenDetail={(dishToView) => setSelectedDish(dishToView)}
              />
            ))}
          </div>
        ) : (
          /* COMPACT LIST VIEW */
          <div className="space-y-3">
            {dishes.map((dish) => (
              <DishListItem
                key={dish.id}
                dish={dish}
                onOpenDetail={(dishToView) => setSelectedDish(dishToView)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Floating Bottom Bar for Mobile Table Ordering */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 bg-gradient-to-r from-red-700 via-red-800 to-amber-700 text-white font-bold rounded-2xl shadow-2xl flex items-center justify-between border-2 border-amber-400 animate-pulse active:scale-95"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
              <span className="text-sm font-bold">Xem Giỏ Món Bàn {tableNumber}</span>
            </div>
            <div className="text-sm font-black text-amber-200 flex items-center gap-1">
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
