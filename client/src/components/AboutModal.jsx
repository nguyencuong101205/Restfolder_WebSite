import React from 'react';
import { X, Award, Sparkles, ChefHat, Heart, MapPin, Phone } from 'lucide-react';

export const AboutModal = ({ isOpen, onClose, onOpenReserve }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#14110f] border border-[#c5a880]/50 rounded-2xl shadow-2xl overflow-hidden my-8 text-stone-200">
        
        {/* Top Gold Stripe */}
        <div className="h-1 bg-gradient-to-r from-[#9e7010] via-[#c5a880] to-[#9e7010]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/80 text-stone-400 hover:text-white hover:bg-red-900/60 transition-colors"
          title="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero image banner */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-stone-950">
          <img
            src="https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/about-man-ho.png?width=600&height=356"
            alt="About Man Ho Chinese Restaurant"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-bold tracking-widest text-[#c5a880] uppercase block">
              OUR STORY & HERITAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase">
              Man Ho Chinese Restaurant
            </h2>
            <p className="text-xs text-amber-200/90 font-serif">
              JW Marriott Hotel Hanoi · 萬豪中餐廳
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-stone-300 leading-relaxed max-h-[60vh] overflow-y-auto">
          
          <div className="flex items-center gap-2 p-3 bg-[#1e1814] border-l-4 border-[#c5a880] rounded-r-xl">
            <Award className="w-6 h-6 text-[#c5a880] flex-shrink-0" />
            <p className="text-stone-200 font-medium">
              Được truyền cảm hứng từ thương hiệu ẩm thực Quảng Đông đạt <strong>1 sao MICHELIN</strong> danh giá tại Hồng Kông, Man Ho tại JW Marriott Hanoi mang đến trải nghiệm ẩm thực chuẩn mực và thăng hoa.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-serif font-bold text-[#c5a880] uppercase tracking-wider">
              Hành Trình Di Sản Ẩm Thực Vượt Thời Gian
            </h3>
            <p>
              Từ ý nghĩa sâu xa phía sau tên gọi đến những giá trị được gìn giữ qua nhiều năm tháng, Man Ho kể câu chuyện về di sản ẩm thực Quảng Đông và hành trình không ngừng theo đuổi sự hoàn hảo.
            </p>
            <p>
              Mỗi món ăn là một tác phẩm nghệ thuật tôn vinh tính nguyên bản của nguyên liệu thượng hạng: từ dim sum nặn thủ công tinh xảo, vịt quay Bắc Kinh da giòn thơm nức nướng củi phong, đến nguồn hải sản tươi sống đánh bắt trong ngày cùng yến sào, bào ngư bổ dưỡng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-[#1b1512] border border-[#3d322c] rounded-xl text-center">
              <span className="text-xl sm:text-2xl font-black text-[#c5a880] font-serif block">200+</span>
              <span className="text-[11px] text-stone-400 mt-0.5 block uppercase tracking-wider">Món Ăn Truyền Thống</span>
            </div>
            <div className="p-3.5 bg-[#1b1512] border border-[#3d322c] rounded-xl text-center">
              <span className="text-xl sm:text-2xl font-black text-[#c5a880] font-serif block">6</span>
              <span className="text-[11px] text-stone-400 mt-0.5 block uppercase tracking-wider">Phòng Ăn Riêng VIP</span>
            </div>
            <div className="p-3.5 bg-[#1b1512] border border-[#3d322c] rounded-xl text-center">
              <span className="text-xl sm:text-2xl font-black text-[#c5a880] font-serif block">150</span>
              <span className="text-[11px] text-stone-400 mt-0.5 block uppercase tracking-wider">Sức Chứa Thực Khách</span>
            </div>
          </div>

          <div className="space-y-2 border-t border-[#2b2420] pt-4">
            <h4 className="text-xs font-bold text-[#c5a880] uppercase tracking-wider">
              Địa Điểm & Liên Hệ
            </h4>
            <div className="flex items-start gap-2 text-stone-300">
              <MapPin className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" />
              <span>Khách sạn JW Marriott Hanoi, Số 08 đường Đỗ Đức Dục, Phường Từ Liêm, Hà Nội</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Phone className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
              <span>Hotline đặt bàn: 0903 290 998</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#181310] border-t border-[#2b2420] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors text-xs uppercase tracking-wider font-semibold"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              onClose();
              if (onOpenReserve) onOpenReserve();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#b89358] to-[#c5a880] hover:from-[#c5a880] hover:to-[#d8bc94] text-stone-950 font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
            <span>Đặt Bàn Ngay</span>
          </button>
        </div>

      </div>
    </div>
  );
};
