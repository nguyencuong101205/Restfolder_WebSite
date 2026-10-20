import React from 'react';
import { X, Award, Sparkles, ChefHat, Heart, MapPin, Phone, Flame } from 'lucide-react';
import { ChineseSeal } from './ChineseSeal';

export const AboutModal = ({ isOpen, onClose, onOpenReserve }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 modal-overlay-blur overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#18090b] border-2 border-amber-500/70 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-8 text-stone-200 animate-fade-in"
      >
        
        {/* Chinese Top Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-[#2d1115] to-[#1e0a0d] border-b border-[#4d161a] text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-red-700 text-stone-200 hover:text-white flex items-center justify-center transition-all border border-amber-500/30 shadow-lg"
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="flex justify-center mb-1.5">
            <ChineseSeal text="皇龍" subtext="典故" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-decorative text-amber-200 uppercase">
            CÂU CHUYỆN HOÀNG LONG QUÁN
          </h2>
          <p className="font-calligraphy text-amber-400 text-xs sm:text-sm mt-0.5">
            皇龍樓 · Tinh Hoa Ẩm Thực Cung Đình Hơn Ba Thập Kỷ
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-stone-300 leading-relaxed max-h-[65vh] overflow-y-auto">
          
          <div className="flex items-center gap-3 p-3.5 bg-[#240e11] border-l-4 border-amber-400 rounded-r-xl">
            <Award className="w-7 h-7 text-amber-400 flex-shrink-0" />
            <p className="text-stone-200 font-medium">
              Hoàng Long Quán (皇龍樓) tự hào là điểm đến ẩm thực Trung Hoa danh tiếng hàng đầu tại khu vực Chợ Lớn (Quận 5, TP.HCM), gìn giữ vẹn nguyên phong vị ẩm thực Quảng Đông & Tứ Xuyên qua nhiều thế hệ.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>Bí Quyết 36 Giờ Nấu Nước Dùng Thượng Hạng</span>
            </h3>
            <p>
              Tất cả nước cốt súp lẩu và nước dùng dim sum tại quán đều được hầm thủ công liên tục 36 tiếng từ xương heo, xương gà thả đồi, sò điệp khô Nhật Bản và hơn 15 vị thuốc bắc bổ dưỡng (kỷ tử, hoài sơn, đảng sâm, hoa cúc tuyết...). Nhờ đó, nước dùng có độ ngọt thanh sâu lắng, tự nhiên mà không cần bất kỳ chất điều vị nhân tạo nào.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              <span>Lò Quay Bắc Kinh Bằng Gỗ Phong Cổ Truyền</span>
            </h3>
            <p>
              Những chú vịt quay Bắc Kinh tại Hoàng Long Quán được tuyển chọn kỹ lưỡng, tẩm ướp mạch nha hoa quế và treo sấy gió 24 giờ trước khi đưa vào lò quay bằng gỗ phong nguyên khối. Lớp da vịt khi ra lò bóng bẩy, giòn tan như pha lê nhưng phần thịt vẫn mọng nước và đậm đà hương thơm đặc trưng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-[#130507] border border-[#3b1519] rounded-xl text-center">
              <span className="text-xl font-black text-amber-400 font-mono block">100+</span>
              <span className="text-[11px] text-stone-400 mt-0.5 block">Món Dim Sum & Lẩu</span>
            </div>
            <div className="p-3 bg-[#130507] border border-[#3b1519] rounded-xl text-center">
              <span className="text-xl font-black text-amber-400 font-mono block">30 Năm</span>
              <span className="text-[11px] text-stone-400 mt-0.5 block">Di Sản Gia Truyền</span>
            </div>
            <div className="p-3 bg-[#130507] border border-[#3b1519] rounded-xl text-center">
              <span className="text-xl font-black text-amber-400 font-mono block">100%</span>
              <span className="text-[11px] text-stone-400 mt-0.5 block">Tươi Mới Trong Ngày</span>
            </div>
          </div>

          <div className="space-y-2 border-t border-[#3b1519] pt-4">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Hệ Thống Nhà Hàng Hoàng Long Quán
            </h4>
            <div className="flex items-start gap-2 text-stone-300">
              <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>Trụ sở chính: Số 88 Đại Lộ Hoàng Long, Quận 5 (Chợ Lớn), TP. Hồ Chí Minh</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Hotline đặt bàn tiệc: (028) 3888 9999 · 0903 290 998</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#140608] border-t border-[#3b1519] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors text-xs"
          >
            Đóng Cửa Sổ
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenReserve) onOpenReserve();
            }}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 border border-amber-400/80 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Đặt Bàn Thưởng Thức Ngay</span>
          </button>
        </div>

      </div>
    </div>
  );
};
