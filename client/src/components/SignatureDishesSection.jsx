import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Sparkles, Star, Utensils } from 'lucide-react';

export const SIGNATURE_DISHES = [
  {
    id: 'dish-manho-01',
    name: 'Jelly Fish With Sesame Oil And X.O Sauce',
    nameVi: 'Sứa Biển Dầu Mè & Xốt X.O Thượng Hạng',
    hanzi: 'XO酱麻油海蜇丝',
    price: 280000,
    image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/jelly-fish-with-sesame-oil-and-x.jpg?width=1000&height=500',
    description: 'Sứa biển giòn sần sật ướp dầu mè thơm ngậy kết hợp xốt sò điệp X.O thượng hạng đậm vị Quảng Đông.',
    tag: 'Signature Starter'
  },
  {
    id: 'dish-manho-02',
    name: 'Braised Kanto Sea Cucumber In Superior Abalone Sauce',
    nameVi: 'Hải Sâm Kanto Hầm Xốt Bào Ngư',
    hanzi: '鲍汁关东辽参',
    price: 1250000,
    image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/braised-kanto-sea-cucumber-in-superior-abalone-sauce.jpg?width=1000&height=500',
    description: 'Hải sâm Kanto quý hiếm om liu riu cùng xốt bào ngư hảo hạng cô đặc trong 36 giờ, đậm đà phong vị hoàng gia.',
    tag: 'Royal Banquet'
  },
  {
    id: 'dish-manho-03',
    name: 'Honey Glazed Premium Barbeque Iberico Pork',
    nameVi: 'Xá Xíu Heo Iberico Mật Ong Thượng Hạng',
    hanzi: '蜜汁顶级黑豚叉烧',
    price: 420000,
    image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/honey-glazed-premium-barbeque-iberico-pork.jpg?width=1000&height=500',
    description: 'Thịt heo Iberico nướng than củi mọng nước, áo lớp mật ong hoa rừng vàng óng thơm lừng và ngọt thanh tinh tế.',
    tag: 'Chef Recommendation'
  },
  {
    id: 'dish-manho-04',
    name: 'Bird’s Nest Buddha Jumps Over The Wall',
    nameVi: 'Phật Nhảy Tường Yến Sào Thượng Hạng',
    hanzi: '官燕佛跳墙',
    price: 1680000,
    image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/bird-s-nest-buddha-jumps-over-the-wall.jpg?width=1000&height=500',
    description: 'Tổ yến quan chưng cùng bào ngư Nam Phi nguyên con, hải sâm và nấm tùng nhung trong nước cốt hầm 48 giờ.',
    tag: 'Michelin Heritage'
  },
  {
    id: 'dish-manho-05',
    name: 'Man Ho Poached Noble Consort Chicken',
    nameVi: 'Gà Quý Phi Hấp Thảo Mộc Man Ho',
    hanzi: '万豪贵妃浸走地鸡',
    price: 450000,
    image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/man-ho-poached-noble-consort-chicken.jpg?width=1000&height=500',
    description: 'Gà thảo mộc thả vườn da vàng óng ngâm trong nước dùng thảo mộc thượng thang, giữ trọn vị ngọt tự nhiên tinh tế.',
    tag: 'Traditional Masterpiece'
  },
  {
    id: 'dish-manho-06',
    name: 'Chilled Sliced Fu Shan Pork Knuckle',
    nameVi: 'Chân Giò Phúc Sơn Ướp Lạnh',
    hanzi: '冰镇佛山扎蹄',
    price: 320000,
    image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/chilled-sliced-fu-shan-pork-knuckle.jpg?width=1000&height=500',
    description: 'Chân giò rút xương cuộn gân giòn sần sật, ướp ngũ vị hương và ủ đá lạnh, thái lát mỏng chấm giấm tỏi đặc trưng.',
    tag: 'Appetizer Classic'
  },
  {
    id: 'dish-manho-07',
    name: 'Man Ho Special Crispy Chicken',
    nameVi: 'Gà Da Giòn Đặc Biệt Man Ho',
    hanzi: '万豪招牌当红炸子鸡',
    price: 420000,
    image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/man-ho-special-crispy-chicken.jpg?width=1000&height=500',
    description: 'Kỹ thuật dội dầu đỉnh cao của bếp trưởng Man Ho tạo nên lớp da gà giòn rụm màu hồng ngọc, thịt ngọt mọng nước.',
    tag: 'Crispy Specialty'
  },
  {
    id: 'dish-06',
    name: 'Traditional Roasted Peking Duck',
    nameVi: 'Vịt Quay Bắc Kinh Da Giòn Thượng Hạng',
    hanzi: '北京烤鸭 (半只)',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=1000&auto=format&fit=crop&q=80',
    description: 'Món ăn hoàng gia lừng danh: da vịt quay lò gỗ phong giòn rụm, cuốn cùng bánh tráng mỏng, hành boa-rô và sốt tương ngọt.',
    tag: 'Imperial Icon'
  }
];

export const SignatureDishesSection = ({ onSelectDish, onExploreMenu }) => {
  const sliderRef = useRef(null);
  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section id="signature-dishes" className="py-16 sm:py-24 bg-[#120f0d] border-b border-[#241c18] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Matching Man Ho Website */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.25em] block">
              14 CURATED CREATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#f5f0ea] tracking-wider uppercase font-medium">
              Signature Dishes
            </h2>
            <div className="w-16 h-0.5 bg-[#c5a880] my-2" />
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Discover a curated selection of 14 signature dishes that embody the essence of Man Ho. From handcrafted dim sum and premium seafood to celebrated banquet specialties, each creation showcases the harmony of exceptional ingredients, refined Cantonese techniques, and timeless culinary heritage.
            </p>
          </div>

          {/* Controls: Prev/Next & View All */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onExploreMenu}
              className="px-5 py-2.5 border border-[#c5a880]/70 hover:border-[#c5a880] bg-[#1d1612] hover:bg-[#c5a880] text-[#c5a880] hover:text-stone-950 font-bold uppercase tracking-wider text-xs transition-all"
            >
              View All Menus
            </button>
            <button
              onClick={scrollLeft}
              className="p-2.5 rounded-full border border-stone-700 bg-[#1a1411] text-stone-300 hover:text-white hover:border-[#c5a880] transition-colors"
              title="Xem món trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 rounded-full border border-stone-700 bg-[#1a1411] text-stone-300 hover:text-white hover:border-[#c5a880] transition-colors"
              title="Xem món kế tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SIGNATURE_DISHES.map((dish) => (
            <div
              key={dish.id}
              onClick={() => onSelectDish && onSelectDish(dish)}
              className="group flex-shrink-0 w-[290px] sm:w-[340px] bg-[#161210] border border-[#2d221c] hover:border-[#c5a880] rounded-none sm:rounded-sm overflow-hidden transition-all duration-300 cursor-pointer snap-start flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Image Container with zoom & tags */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Tag on top left */}
                  <div className="absolute top-3 left-3 bg-[#1d1612]/90 border border-[#c5a880]/50 text-[#c5a880] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-sm backdrop-blur-xs">
                    {dish.tag}
                  </div>

                  {/* Hanzi on bottom right */}
                  <div className="absolute bottom-2 right-3 font-serif text-amber-200/90 text-xs tracking-widest drop-shadow">
                    {dish.hanzi}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-100 group-hover:text-[#c5a880] transition-colors leading-snug line-clamp-1">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-[#c5a880] font-medium line-clamp-1">
                    {dish.nameVi}
                  </p>
                  <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="p-4 sm:p-5 pt-0 mt-auto border-t border-[#2d221c] pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase">Giá Phục Vụ</span>
                  <span className="text-sm sm:text-base font-bold text-[#c5a880]">
                    {formatVND(dish.price)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectDish) onSelectDish(dish);
                  }}
                  className="px-3.5 py-2 bg-[#261d18] hover:bg-[#c5a880] text-stone-200 hover:text-stone-950 border border-[#c5a880]/50 hover:border-[#c5a880] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Đặt Món</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
