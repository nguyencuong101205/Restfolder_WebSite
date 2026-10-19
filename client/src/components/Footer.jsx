import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp, Sparkles, ExternalLink } from 'lucide-react';

export const Footer = ({ onOpenAbout, onExploreMenu, onOpenPrivateDining, onOpenReserve }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#2d221c] bg-gradient-to-b from-[#13100e] to-[#0a0807] text-stone-400 text-xs">
      {/* Top Gold Stripe */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Top Logo & Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-10 border-b border-[#251e19] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#1c1511] border border-[#c5a880]/50 flex items-center justify-center font-serif text-[#c5a880] font-black text-lg">
              萬豪
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#f5f0ea] tracking-[0.2em] uppercase">
                MAN HO CHINESE RESTAURANT
              </h3>
              <p className="text-[11px] text-[#c5a880] tracking-wider uppercase">
                JW MARRIOTT HOTEL HANOI · 萬豪中餐廳
              </p>
            </div>
          </div>

          <button
            onClick={onOpenReserve}
            className="px-6 py-2.5 bg-gradient-to-r from-[#b89358] via-[#c5a880] to-[#b89358] hover:from-[#c5a880] hover:to-[#d8bc94] text-stone-950 font-bold uppercase tracking-wider text-xs rounded-none transition-all shadow-md active:scale-95"
          >
            RESERVE A TABLE
          </button>
        </div>

        {/* 4 Columns Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          
          {/* Col 1: Location */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#c5a880] uppercase tracking-[0.2em] text-xs">
              LOCATION
            </h4>
            <div className="flex items-start gap-2.5 text-stone-300">
              <MapPin className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed text-xs">
                JW Marriott Hanoi Hotel, No. 08 Do Duc Duc Road, Tu Liem Ward, Hanoi, Vietnam
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/cAx38t9Ed4hVrTBJ9"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#c5a880] hover:underline pt-1"
            >
              <span>Xem trên Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Col 2: Contact Us */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#c5a880] uppercase tracking-[0.2em] text-xs">
              CONTACT US
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-stone-300">
                <Phone className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                <a href="tel:0903290998" className="hover:text-white transition-colors">
                  0903 290 998
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300">
                <Mail className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                <a
                  href="mailto:jw.hanoivietnamf&bsales@marriott.com"
                  className="hover:text-white transition-colors truncate text-[11px]"
                >
                  jw.hanoivietnamf&bsales@marriott.com
                </a>
              </div>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/chineserestaurant.jwmhanoi"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-[#1e1713] border border-[#3d322c] hover:border-[#c5a880] text-stone-300 hover:text-white text-[11px] transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/chineserestaurant.jwmhanoi/"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-[#1e1713] border border-[#3d322c] hover:border-[#c5a880] text-stone-300 hover:text-white text-[11px] transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Col 3: Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#c5a880] uppercase tracking-[0.2em] text-xs">
              HOURS
            </h4>
            <div className="space-y-1.5 text-xs text-stone-300 leading-relaxed">
              <p className="font-semibold text-white">MONDAY - FRIDAY LUNCH:</p>
              <p className="text-stone-400">11:30 A.M. - 2:00 P.M.</p>
              
              <p className="font-semibold text-white pt-1">SATURDAY - SUNDAY LUNCH:</p>
              <p className="text-stone-400">11:30 A.M. - 2:30 P.M.</p>

              <p className="font-semibold text-white pt-1">DINNER:</p>
              <p className="text-stone-400">5:30 P.M. - 9:00 P.M.</p>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Heritage */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#c5a880] uppercase tracking-[0.2em] text-xs">
              EXPLORE MAN HO
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={scrollToTop} className="hover:text-[#c5a880] transition-colors">
                  Home (Trang Chủ)
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-[#c5a880] transition-colors">
                  About Us (Câu Chuyện Thương Hiệu)
                </button>
              </li>
              <li>
                <button onClick={onExploreMenu} className="hover:text-[#c5a880] transition-colors">
                  Our Menus (Thực Đơn Thượng Hạng)
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivateDining} className="hover:text-[#c5a880] transition-colors">
                  Private Dining (6 Phòng Tiệc VIP)
                </button>
              </li>
              <li>
                <button onClick={onOpenReserve} className="hover:text-[#c5a880] transition-colors">
                  Reserve (Đặt Bàn Trực Tuyến)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 border-t border-[#201915] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 Man Ho Chinese Restaurant - JW Marriott Hotel Hanoi. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#17120f] border border-[#2e241e] hover:border-[#c5a880] text-[#c5a880] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
