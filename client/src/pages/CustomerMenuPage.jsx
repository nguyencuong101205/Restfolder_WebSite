import React, { useState, useEffect } from 'react';
import { menuApi } from '../api/menuApi';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { CategoryTabs } from '../components/CategoryTabs';
import { DishCard } from '../components/DishCard';
import { DishDetailModal } from '../components/DishDetailModal';
import { Lanterns } from '../components/Lanterns';
import { QrCode, ShoppingBag, Sparkles, Flame, Clock, Award, ChevronRight } from 'lucide-react';

export const CustomerMenuPage = () => {
  const { tableNumber, setIsQRModalOpen } = useTable();
  const { totalItemsCount, total, setIsCartOpen } = useCart();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

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
    <div className="relative min-h-screen">
      {/* Hanging Chinese Lanterns */}
      <Lanterns />

      {/* Hero Welcome Banner */}
      <section className="relative pt-12 pb-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Glow backdrop & Chinese background character */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-72 bg-gradient-to-r from-red-900/40 via-amber-600/10 to-red-900/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-5 select-none font-calligraphy text-9xl text-amber-300">
          龍
        </div>

        <div className="relative max-w-4xl mx-auto space-y-4">
          
          {/* Table Welcome Pill */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-gradient-to-r from-[#2c0e12] via-[#381217] to-[#2c0e12] border border-amber-500/60 rounded-full text-xs sm:text-sm text-amber-200 shadow-xl shadow-red-950/60">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Quý khách đang ngồi tại <strong className="text-white font-black text-sm sm:text-base">BÀN {tableNumber}</strong></span>
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="text-xs font-bold text-amber-400 hover:text-amber-200 ml-1 underline transition-colors"
            >
              (Đổi Bàn)
            </button>
          </div>

          <h2 className="font-decorative text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#faebb8] via-[#f7d774] to-[#d4af37] tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            ẨM THỰC HOÀNG GIA TRUNG HOA
          </h2>
          
          <p className="font-calligraphy text-amber-400 text-xl sm:text-3xl tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            百味中华 · 宫廷珍馐 · 点心烧腊
          </p>
          
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Kính chào Quý khách đến với Hoàng Long Quán. Quý khách vui lòng chọn món ăn yêu thích bên dưới để gửi yêu cầu trực tiếp đến đầu bếp nhà hàng.
          </p>

          {/* Quick Features Row */}
          <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs text-amber-200/90">
            <span className="flex items-center gap-1.5 bg-[#250d11]/80 px-3 py-1.5 rounded-xl border border-amber-500/30 shadow">
              🥟 Dim Sum Nặn Tươi Mỗi Ngày
            </span>
            <span className="flex items-center gap-1.5 bg-[#250d11]/80 px-3 py-1.5 rounded-xl border border-amber-500/30 shadow">
              🦆 Vịt Quay Da Giòn Lò Gỗ Phong
            </span>
            <span className="flex items-center gap-1.5 bg-[#250d11]/80 px-3 py-1.5 rounded-xl border border-amber-500/30 shadow">
              🍲 Nước Lẩu Tê Cay Trùng Khánh
            </span>
          </div>

        </div>
      </section>

      {/* Main Menu Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Category Filters */}
        <div className="mb-8">
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

        {/* Dishes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 bg-[#1c0c0e] rounded-2xl border border-[#3b1519] animate-pulse"></div>
            ))}
          </div>
        ) : dishes.length === 0 ? (
          <div className="py-20 text-center bg-[#190a0d] border border-[#3b1519] rounded-2xl p-8 max-w-md mx-auto shadow-2xl">
            <span className="text-4xl block mb-2">🏮</span>
            <h3 className="font-bold text-lg text-white">Không tìm thấy món ăn phù hợp</h3>
            <p className="text-xs text-stone-400 mt-1">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ thực đơn nhé.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dishes.map((dish) => (
              <DishCard
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
