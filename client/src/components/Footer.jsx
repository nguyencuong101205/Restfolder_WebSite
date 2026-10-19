import React from 'react';
import { ChineseSeal } from './ChineseSeal';
import { MapPin, Phone, Clock, Award, ShieldCheck, ArrowUp, Sparkles, Heart } from 'lucide-react';

export const Footer = ({ onOpenAbout, onExploreMenu, onOpenReserve }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t-2 border-[#4d161a] bg-gradient-to-b from-[#18080a] to-[#0c0405] text-stone-400 text-xs relative z-10">
      {/* Decorative Gold Header Top Stripe */}
      <div className="h-1 bg-gradient-to-r from-red-800 via-amber-400 to-red-800" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Brand Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-[#2e0f12] gap-4">
          <div className="flex items-center gap-3">
            <ChineseSeal text="皇龍" subtext="御膳" />
            <div>
              <h3 className="font-decorative text-xl sm:text-2xl text-amber-300 font-bold tracking-wider">
                HOÀNG LONG QUÁN
              </h3>
              <span className="font-calligraphy text-amber-400 text-sm sm:text-base">
                皇龍樓 · Ẩm Thực Trung Hoa Cung Đình Đệ Nhất
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenReserve}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black uppercase tracking-wider text-xs rounded-sm transition-all shadow-md active:scale-95"
            >
              Đặt Bàn Tiệc Ngay
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-sm bg-[#1c0a0c] border border-stone-700 hover:border-amber-400 text-amber-300 hover:text-white transition-colors"
              title="Về đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Columns Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          
          {/* Col 1: Brand Info & Philosophy */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-xs">
              Về Chúng Tôi
            </h4>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Tự hào hơn 30 năm gìn giữ và phát triển tinh hoa ẩm thực Quảng Đông & Tứ Xuyên. Nổi danh với Dim Sum thủ công tươi nặn mỗi sáng, Vịt quay Bắc Kinh da giòn óng ánh và Lẩu uyên ương thảo mộc hầm xương 36 giờ.
            </p>
            <div className="font-calligraphy text-amber-400/90 text-sm tracking-widest pt-1">
              客至如归 · 福禄双全 · 萬事如意
            </div>
          </div>

          {/* Col 2: Hệ Thống Chi Nhánh */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-xs">
              Hệ Thống Chi Nhánh
            </h4>
            <div className="space-y-2 text-[11px] text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Trụ sở chính: Số 88 Đại Lộ Hoàng Long, Quận 5 (Chợ Lớn), TP.HCM</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Chi nhánh 2: 126 Nguyễn Tri Phương, Quận 5, TP.HCM</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Chi nhánh 3: Số 18 Phố Mã Mây, Quận Hoàn Kiếm, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* Col 3: Hotline & Giờ Mở Cửa */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-xs">
              Liên Hệ & Đặt Bàn
            </h4>
            <div className="space-y-2 text-[11px] text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Hotline: <strong className="text-amber-300">(028) 3888 9999</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Hotline tiệc: <strong className="text-amber-300">0903 290 998</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Giờ mở cửa: 09:00 - 23:00 (hàng ngày)</span>
              </div>
            </div>
            <div className="pt-1">
              <span className="inline-block px-2.5 py-1 bg-red-950 border border-amber-500/30 text-amber-300 rounded text-[10px]">
                🏮 Phục vụ cả ngày Lễ & Tết
              </span>
            </div>
          </div>

          {/* Col 4: Công Nghệ Nhà Hàng Thông Minh */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-xs">
              Tiện Ích Công Nghệ
            </h4>
            <ul className="space-y-1.5 text-stone-400 text-[11px]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Mô hình <strong>MVC RESTful API</strong> hiện đại</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Bảo mật phân quyền <strong>JWT Token</strong></span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Gọi món tại bàn qua <strong>Mã QR trực tiếp</strong></span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Màn hình bếp <strong>KDS Realtime</strong> không độ trễ</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="mt-6 pt-6 border-t border-[#2e0f12] flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <p>© 2026 Hoàng Long Quán (皇龍樓). Toàn bộ bản quyền thuộc về hệ thống nhà hàng.</p>
          <p className="text-amber-500/80 font-calligraphy text-xs">
            恭喜发财 · 万事如意 · 阖家幸福
          </p>
        </div>

      </div>
    </footer>
  );
};
