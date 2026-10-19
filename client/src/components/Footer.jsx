import React from 'react';
import { ChineseSeal } from './ChineseSeal';
import { MapPin, Phone, Clock, Award, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t-2 border-[#4d161a] bg-gradient-to-b from-[#18080a] to-[#0c0405] text-stone-400 text-xs">
      {/* Decorative Gold Header Top Stripe */}
      <div className="h-0.5 bg-gradient-to-r from-red-800 via-amber-400 to-red-800"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <ChineseSeal text="皇龍" subtext="御膳" />
              <div>
                <h3 className="font-decorative text-lg text-amber-300 font-bold">
                  HOÀNG LONG QUÁN
                </h3>
                <span className="font-calligraphy text-amber-400 text-sm">
                  皇龍樓 · Ẩm Thực Cung Đình
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Tự hào gìn giữ và phát triển tinh hoa ẩm thực Trung Hoa qua các món Dim Sum tươi nặn thủ công, Vịt quay Bắc Kinh giòn rụm và Lẩu Tứ Xuyên trứ danh.
            </p>
            <div className="pt-2 font-calligraphy text-amber-400/90 text-sm tracking-widest">
              客至如归 · 福禄双全
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-xs">
              Địa Chỉ & Liên Hệ
            </h4>
            <div className="flex items-start gap-2 text-stone-300">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Số 88 Đại Lộ Hoàng Long, Quận 5 (Chợ Lớn), TP. Hồ Chí Minh</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Hotline đặt bàn: (028) 3888 9999</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Mở cửa: 09:00 - 23:00 hàng ngày</span>
            </div>
          </div>

          {/* Architecture & Tech Specs */}
          <div className="space-y-2">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-xs">
              Kiến Trúc Kỹ Thuật
            </h4>
            <ul className="space-y-1.5 text-stone-400 text-[11px]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Mô hình <strong>MVC</strong> (Model - View - Controller)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Xác thực bảo mật <strong>JWT</strong> (JSON Web Token)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>React SPA + Node.js Express RESTful API</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Quét mã QR gọi món thời gian thực</span>
              </li>
            </ul>
          </div>

          {/* Trademarks & QR */}
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-xs">
              Tiện Ích Khách Hàng
            </h4>
            <p className="text-[11px] text-stone-400">
              Mỗi bàn ăn đều trang bị mã QR riêng biệt. Khách hàng chỉ cần quét bằng camera điện thoại để gọi món và theo dõi đơn trực tiếp.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-red-950 border border-amber-500/30 text-amber-300 rounded-lg text-[10px]">
                🏮 Trải nghiệm ẩm thực 5 sao
              </span>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-[#2e0f12] flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <p>© 2026 Hoàng Long Quán (皇龍樓). All rights reserved.</p>
          <p className="text-amber-500/70 font-calligraphy text-xs">
            恭喜发财 · 万事如意 · 阖家幸福
          </p>
        </div>
      </div>
    </footer>
  );
};
