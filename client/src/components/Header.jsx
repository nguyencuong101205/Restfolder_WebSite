import React, { useState, useRef, useEffect } from 'react';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  Phone,
  Calendar,
  QrCode,
  ShoppingBag,
  Bell,
  ChefHat,
  LogIn,
  LogOut,
  Clock,
  User,
  Menu,
  X,
  MapPin,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Header = ({
  onOpenAuth,
  onOpenKitchen,
  onOpenTableManager,
  onOpenReserve,
  onOpenAbout,
  onOpenPrivateDining,
  onExploreMenu,
  currentView
}) => {
  const { tableNumber, setIsQRModalOpen, activeOrder, setIsOrderTrackerOpen, setIsCallStaffModalOpen } = useTable();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { user, logout, isStaff, isAdmin } = useAuth();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  const userDropdownRef = useRef(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d0b0a]/98 backdrop-blur-md border-b border-[#241c17] shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 sm:h-24 flex items-center justify-between gap-4">
          
          {/* =========================================================================
              COL 1 (LEFT): OFFICIAL MAN HO LOGO (FROM JW MARRIOTT MARDI-GRAS CDN)
             ========================================================================= */}
          <div className="flex items-center flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 cursor-pointer select-none group"
              title="Man Ho Chinese Restaurant - JW Marriott Hotel Hanoi"
            >
              <img
                src="https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/logo-man-ho-osb-1.png"
                alt="Man Ho Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
            </a>
          </div>

          {/* =========================================================================
              COL 2 (CENTER): HOTLINE & MAIN NAV LINKS (EXACT MAN HO HANOI STRUCTURE)
             ========================================================================= */}
          <div className="hidden lg:flex flex-col items-center justify-center flex-1 px-4">
            
            {/* Top Phone Row */}
            <div className="flex items-center gap-2 text-[11px] text-[#c5a880] tracking-widest uppercase mb-1.5 font-sans font-semibold">
              <Phone className="w-3 h-3 text-[#c5a880]" />
              <a href="tel:0903290998" className="hover:text-white transition-colors">
                0903 290 998
              </a>
              <span className="text-stone-600">|</span>
              <span className="text-stone-400 font-normal">JW MARRIOTT HOTEL HANOI</span>
            </div>

            {/* Bottom Nav Links */}
            <nav className="flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-[0.18em] font-medium text-stone-200">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-[#c5a880] transition-colors py-1"
              >
                Home
              </button>
              <button
                type="button"
                onClick={onOpenAbout}
                className="hover:text-[#c5a880] transition-colors py-1"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={onExploreMenu}
                className="hover:text-[#c5a880] transition-colors py-1"
              >
                Our Menus
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('signature-dishes')}
                className="hover:text-[#c5a880] transition-colors py-1"
              >
                Signature Dishes
              </button>
              <button
                type="button"
                onClick={onOpenPrivateDining}
                className="hover:text-[#c5a880] transition-colors py-1"
              >
                Private Dining
              </button>
            </nav>
          </div>

          {/* =========================================================================
              COL 3 (RIGHT): LANGUAGE, RESERVE BUTTON, TABLE & CART, USER PROFILE
             ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Language Switcher (EN | VI) */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-[#17120f] border border-[#2e241e] text-[11px] font-bold tracking-wider text-stone-400">
              <button
                type="button"
                onClick={() => setLang('EN')}
                className={`transition-colors ${lang === 'EN' ? 'text-[#c5a880]' : 'hover:text-white'}`}
              >
                EN
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setLang('VI')}
                className={`transition-colors ${lang === 'VI' ? 'text-[#c5a880]' : 'hover:text-white'}`}
              >
                VI
              </button>
            </div>

            {/* Prominent Gold RESERVE Button */}
            <button
              type="button"
              onClick={onOpenReserve}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#b89358] via-[#c5a880] to-[#b89358] hover:from-[#c5a880] hover:to-[#d8bc94] text-stone-950 font-bold uppercase tracking-[0.16em] text-[11px] sm:text-xs rounded-none transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 fill-stone-950" />
              <span>RESERVE</span>
            </button>

            {/* Bàn {tableNumber} (QR Code Table Order) */}
            <button
              type="button"
              onClick={() => setIsQRModalOpen(true)}
              className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-sm bg-[#1c1511] hover:bg-[#281e19] border border-[#3d2e24] hover:border-[#c5a880] text-[#c5a880] text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Đổi số bàn hoặc quét mã QR"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bàn {tableNumber}</span>
              <span className="sm:hidden">{tableNumber}</span>
            </button>

            {/* Giỏ Món (Shopping Bag) */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-sm bg-[#221914] hover:bg-[#2d211b] border border-[#c5a880]/60 hover:border-[#c5a880] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              title="Xem giỏ món của bàn"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#c5a880]" />
              {totalItemsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#c5a880] text-stone-950 text-[10px] font-black flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User Profile & Auth Icon Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                type="button"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className={`p-2 rounded-sm border transition-all ${
                  isUserDropdownOpen
                    ? 'bg-[#c5a880] text-stone-950 border-[#c5a880] shadow-md'
                    : 'bg-[#1c1511] hover:bg-[#281e19] border-[#3d2e24] text-stone-300 hover:border-[#c5a880] hover:text-white'
                }`}
                title="Tài khoản / Đăng nhập / Đăng ký"
              >
                <User className="w-4 h-4" />
              </button>

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-[#161210] border border-[#c5a880]/50 rounded-sm shadow-2xl overflow-hidden py-3 px-3.5 z-50 text-left animate-fade-scale text-xs">
                  {user ? (
                    <div>
                      <div className="flex items-center gap-3 pb-3 border-b border-[#2b211a]">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c5a880] to-[#805505] text-stone-950 flex items-center justify-center font-serif font-black text-sm shadow">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm truncate">{user.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c5a880]/20 text-[#c5a880] font-mono uppercase font-bold border border-[#c5a880]/30">
                              {user.role}
                            </span>
                            <span className="text-[10px] text-stone-400 font-sans">Đang hoạt động</span>
                          </div>
                        </div>
                      </div>

                      <div className="py-2 space-y-1">
                        {isStaff && (
                          <button
                            type="button"
                            onClick={() => {
                              onOpenKitchen();
                              setIsUserDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-stone-300 hover:text-white hover:bg-[#241a14] rounded transition-colors flex items-center justify-between"
                          >
                            <span className="flex items-center gap-2">
                              <ChefHat className="w-4 h-4 text-[#c5a880]" />
                              <span>Màn Hình Bếp KDS</span>
                            </span>
                            <span className="text-[10px] text-[#c5a880] font-bold bg-[#291e17] px-1.5 py-0.5 rounded border border-[#c5a880]/30">
                              Bếp
                            </span>
                          </button>
                        )}

                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => {
                              onOpenTableManager();
                              setIsUserDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-stone-300 hover:text-white hover:bg-[#241a14] rounded transition-colors flex items-center justify-between"
                          >
                            <span className="flex items-center gap-2">
                              <QrCode className="w-4 h-4 text-[#c5a880]" />
                              <span>Quản Lý Bàn & QR</span>
                            </span>
                            <span className="text-[10px] text-[#c5a880] font-bold bg-[#291e17] px-1.5 py-0.5 rounded border border-[#c5a880]/30">
                              Admin
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#2b211a]">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors flex items-center gap-2 font-bold"
                        >
                          <LogOut className="w-4 h-4 text-red-400" />
                          <span>Đăng Xuất Khỏi Hệ Thống</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center pb-3 pt-1 border-b border-[#2b211a]">
                        <div className="w-10 h-10 rounded-full bg-stone-900 border border-[#c5a880]/40 flex items-center justify-center mx-auto mb-2 text-[#c5a880] shadow-inner font-serif font-black">
                          萬豪
                        </div>
                        <h4 className="font-bold text-white text-sm">Tài Khoản Thành Viên</h4>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          Đăng nhập hoặc đăng ký thành viên Man Ho Hanoi
                        </p>
                      </div>

                      <div className="py-3 space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            onOpenAuth('login');
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full py-2.5 px-4 bg-gradient-to-r from-[#b89358] via-[#c5a880] to-[#b89358] hover:from-[#c5a880] hover:to-[#d8bc94] text-stone-950 font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                        >
                          <LogIn className="w-4 h-4 text-stone-950" />
                          <span>Đăng Nhập</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onOpenAuth('register');
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full py-2.5 px-4 bg-[#221914] hover:bg-[#2d211b] border border-[#c5a880]/50 hover:border-[#c5a880] text-[#c5a880] font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm"
                        >
                          <User className="w-4 h-4 text-[#c5a880]" />
                          <span>Đăng Ký Thành Viên VIP</span>
                        </button>
                      </div>

                      <div className="pt-2 border-t border-[#2b211a] text-center">
                        <button
                          type="button"
                          onClick={() => {
                            onOpenAuth('login');
                            setIsUserDropdownOpen(false);
                          }}
                          className="text-[11px] text-stone-400 hover:text-[#c5a880] hover:underline transition-colors"
                        >
                          Dành cho Quản Lý & Bếp Trưởng &rarr;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm bg-[#1c1511] border border-[#3d2e24] text-stone-300 hover:text-white"
              title="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* =========================================================================
          MOBILE NAVIGATION DRAWER
         ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#120e0c] border-b border-[#2b211a] px-6 py-5 space-y-4 animate-fade-in text-xs uppercase tracking-widest font-medium">
          <div className="flex flex-col space-y-3 pb-3 border-b border-[#251b15]">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left py-1 text-stone-200 hover:text-[#c5a880]"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-left py-1 text-stone-200 hover:text-[#c5a880]"
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onExploreMenu();
              }}
              className="text-left py-1 text-stone-200 hover:text-[#c5a880]"
            >
              Our Menus
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('signature-dishes')}
              className="text-left py-1 text-stone-200 hover:text-[#c5a880]"
            >
              Signature Dishes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPrivateDining();
              }}
              className="text-left py-1 text-stone-200 hover:text-[#c5a880]"
            >
              Private Dining
            </button>
          </div>

          {/* Mobile Extra Controls */}
          <div className="flex flex-col space-y-2 pt-1 text-stone-400 normal-case">
            <a
              href="tel:0903290998"
              className="flex items-center gap-2 py-1 text-[#c5a880] font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline: 0903 290 998</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCallStaffModalOpen(true);
              }}
              className="flex items-center gap-2 py-1 text-stone-300 hover:text-white text-left"
            >
              <Bell className="w-4 h-4 text-[#c5a880]" />
              <span>Gọi nhân viên phục vụ</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsOrderTrackerOpen(true);
              }}
              className="flex items-center gap-2 py-1 text-stone-300 hover:text-white text-left"
            >
              <Clock className="w-4 h-4 text-[#c5a880]" />
              <span>Theo dõi đơn bếp</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
