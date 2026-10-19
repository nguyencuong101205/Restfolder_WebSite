import React, { useState, useRef, useEffect } from 'react';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { QrCode, ShoppingBag, Bell, ChefHat, LogIn, LogOut, Clock, User, Menu, MapPin, Sparkles, ChevronDown, Calendar, Phone } from 'lucide-react';

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
  const { totalItemsCount, total, setIsCartOpen } = useCart();
  const { user, logout, isStaff, isAdmin } = useAuth();
  
  // Dropdown states
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const moreMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#120f0d]/98 backdrop-blur-md border-b border-[#2b221d] shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-20 sm:h-22 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* ========================================================
              LEFT: MAN HO BRAND LOGO (JW MARRIOTT HOTEL HANOI)
             ======================================================== */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <div
              className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Man Ho Chinese Restaurant - JW Marriott Hotel Hanoi"
            >
              {/* Chinese Seal Stamp (萬豪) */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-br from-[#9e7010] via-[#c5a880] to-[#805505] p-[1.5px] shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#18120e] rounded-sm flex items-center justify-center font-serif text-[#c5a880] font-black text-sm sm:text-base tracking-widest border border-[#c5a880]/30">
                  萬豪
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[#f5f0ea] font-serif font-bold tracking-[0.2em] text-lg sm:text-2xl uppercase group-hover:text-[#c5a880] transition-colors leading-none">
                    MAN HO
                  </span>
                  <span className="text-[#c5a880] font-serif text-[11px] sm:text-xs font-semibold tracking-widest uppercase hidden md:inline">
                    中餐廳
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-stone-400 font-sans tracking-[0.16em] uppercase mt-0.5 font-medium">
                  CHINESE RESTAURANT · JW MARRIOTT HANOI
                </span>
              </div>
            </div>

            {/* Main Navigation Links (Matching Man Ho Hanoi Website) */}
            <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold tracking-[0.14em] uppercase text-stone-300">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-[#c5a880] transition-colors"
              >
                Home
              </button>
              <button
                onClick={onOpenAbout}
                className="hover:text-[#c5a880] transition-colors"
              >
                About Us
              </button>
              <button
                onClick={onExploreMenu}
                className="hover:text-[#c5a880] transition-colors"
              >
                Our Menus
              </button>
              <button
                onClick={() => scrollToSection('signature-dishes')}
                className="hover:text-[#c5a880] transition-colors"
              >
                Signature Dishes
              </button>
              <button
                onClick={onOpenPrivateDining}
                className="hover:text-[#c5a880] transition-colors"
              >
                Private Dining
              </button>
            </nav>
          </div>

          {/* ========================================================
              RIGHT: ACTIONS & UTILITIES (RESERVE, BÀN, GIỎ, USER)
             ======================================================== */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* 1. RESERVE A TABLE (Prominent Man Ho Gold CTA) */}
            <button
              onClick={onOpenReserve}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#b89358] via-[#c5a880] to-[#b89358] hover:from-[#c5a880] hover:to-[#d8bc94] text-stone-950 font-bold uppercase tracking-[0.15em] text-[11px] sm:text-xs rounded-none sm:rounded-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5 border border-[#d8bc94]"
              title="Đặt bàn trước tại Man Ho"
            >
              <Calendar className="w-3.5 h-3.5 fill-stone-950" />
              <span>RESERVE</span>
            </button>

            {/* 2. Bàn {tableNumber} (QR Ordering) */}
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-sm bg-[#1c1613] hover:bg-[#281f1b] border border-[#3d322c] hover:border-[#c5a880] text-stone-200 hover:text-[#c5a880] transition-all text-xs font-semibold"
              title="Quét QR hoặc đổi số bàn ăn"
            >
              <QrCode className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="hidden sm:inline">Bàn {tableNumber}</span>
              <span className="sm:hidden">{tableNumber}</span>
            </button>

            {/* 3. Gọi Bàn */}
            <button
              onClick={() => setIsCallStaffModalOpen(true)}
              className="hidden md:flex items-center gap-1 sm:gap-1.5 px-3 py-2 rounded-sm bg-[#1c1613] hover:bg-[#281f1b] border border-[#3d322c] hover:border-[#c5a880] text-stone-200 hover:text-[#c5a880] transition-all text-xs font-semibold"
              title="Gọi phục vụ / quản gia"
            >
              <Bell className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Gọi Bàn</span>
            </button>

            {/* 4. Giỏ Món */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-sm bg-[#221a15] hover:bg-[#2d221c] border border-[#c5a880]/60 hover:border-[#c5a880] text-[#f5f0ea] font-bold transition-all shadow-md active:scale-95 text-xs"
              title="Xem giỏ món của bàn"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="hidden lg:inline text-[11px] uppercase tracking-wider">Giỏ Món</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#c5a880] text-stone-950 text-[10px] font-black flex items-center justify-center shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* 5. Menu Icon Button (Xem thêm chức năng bị ẩn) */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => {
                  setIsMoreMenuOpen(!isMoreMenuOpen);
                  setIsUserDropdownOpen(false);
                }}
                className={`flex items-center gap-1 p-2 rounded-sm border transition-all text-xs ${
                  isMoreMenuOpen
                    ? 'bg-[#c5a880] text-stone-950 border-[#c5a880] shadow-md font-bold'
                    : 'bg-[#1c1613] hover:bg-[#281f1b] border-[#3d322c] text-stone-300 hover:border-[#c5a880] hover:text-white'
                }`}
                title="Xem thêm chức năng"
              >
                <Menu className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 sm:w-72 bg-[#171310] border border-[#c5a880]/50 rounded-xl shadow-2xl overflow-hidden py-2 z-50 text-left animate-fade-scale text-xs">
                  
                  {/* Active Order banner if cooking */}
                  {activeOrder && (
                    <div className="px-4 py-2.5 bg-[#2a1c14] border-b border-[#3d2e24]">
                      <button
                        onClick={() => {
                          setIsOrderTrackerOpen(true);
                          setIsMoreMenuOpen(false);
                        }}
                        className="w-full text-left font-bold text-[#c5a880] flex items-center justify-between text-xs"
                      >
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#c5a880] animate-spin" />
                          <span>Đơn Bếp #{activeOrder.id.slice(-4)}</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-900">
                          {activeOrder.status === 'pending' ? 'Chờ nhận' : 'Đang nấu'}
                        </span>
                      </button>
                    </div>
                  )}

                  <div className="py-1">
                    {/* Story modal */}
                    <button
                      onClick={() => {
                        onOpenAbout();
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#221a15] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#c5a880]" />
                        <span>Về Chúng Tôi (About Us)</span>
                      </div>
                      <span className="text-[10px] text-[#c5a880] font-serif">萬豪</span>
                    </button>

                    {/* Private Dining */}
                    <button
                      onClick={() => {
                        onOpenPrivateDining();
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#221a15] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-[#c5a880]" />
                        <span>Phòng Ăn Riêng VIP (Private Dining)</span>
                      </div>
                      <span className="text-[10px] text-[#c5a880] font-mono">6 SUITES</span>
                    </button>

                    {/* KDS Kitchen */}
                    <button
                      onClick={() => {
                        if (isStaff) onOpenKitchen();
                        else onOpenAuth('login');
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#221a15] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <ChefHat className="w-4 h-4 text-[#c5a880]" />
                        <span>Màn Hình Bếp KDS</span>
                      </div>
                      <span className="text-[10px] text-[#c5a880] font-mono font-bold bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                        Bếp
                      </span>
                    </button>

                    {/* Table Manager */}
                    <button
                      onClick={() => {
                        if (isAdmin) onOpenTableManager();
                        else onOpenAuth('login');
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#221a15] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <QrCode className="w-4 h-4 text-[#c5a880]" />
                        <span>Quản Lý Bàn & In QR</span>
                      </div>
                      <span className="text-[10px] text-[#c5a880] font-mono font-bold bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                        Admin
                      </span>
                    </button>

                    {/* Order Tracker */}
                    <button
                      onClick={() => {
                        setIsOrderTrackerOpen(true);
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#221a15] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#c5a880]" />
                        <span>Theo Dõi Tiến Độ Đơn</span>
                      </div>
                      <span className="text-[10px] text-stone-400">Trực tiếp</span>
                    </button>
                  </div>

                  {/* Hotline in Menu */}
                  <div className="pt-2 px-4 py-2.5 border-t border-[#2b221d] flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>Hotline Man Ho:</span>
                    </span>
                    <a href="tel:0903290998" className="text-[#c5a880] font-bold">0903 290 998</a>
                  </div>

                </div>
              )}
            </div>

            {/* 6. Top-Right User Profile & Auth Icon */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => {
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                  setIsMoreMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-sm border transition-all ${
                  isUserDropdownOpen
                    ? 'bg-[#c5a880] text-stone-950 border-[#c5a880] shadow-lg'
                    : 'bg-[#1c1613] hover:bg-[#281f1b] border-[#3d322c] text-stone-300 hover:border-[#c5a880] hover:text-white'
                }`}
                title={user ? `Tài khoản: ${user.name}` : 'Đăng nhập / Đăng ký thành viên'}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  user ? 'bg-[#c5a880] text-stone-950' : 'bg-stone-800 text-[#c5a880]'
                }`}>
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="hidden sm:inline text-xs font-semibold">
                  {user ? (user.name || user.username) : 'Tài Khoản'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform hidden sm:inline ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-[#171310] border border-[#c5a880]/50 rounded-xl shadow-2xl overflow-hidden py-3 px-3.5 z-50 text-left animate-fade-scale text-xs">
                  {user ? (
                    <div>
                      <div className="flex items-center gap-3 pb-3 border-b border-[#2b221d]">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c5a880] to-[#805505] text-stone-950 flex items-center justify-center font-serif font-black text-sm shadow">
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
                            onClick={() => {
                              onOpenKitchen();
                              setIsUserDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-stone-300 hover:text-white hover:bg-[#241c17] rounded-lg transition-colors flex items-center justify-between"
                          >
                            <span className="flex items-center gap-2">
                              <ChefHat className="w-4 h-4 text-[#c5a880]" />
                              <span>Vào Màn Hình Bếp KDS</span>
                            </span>
                            <span className="text-[10px] text-[#c5a880] font-bold bg-[#291e17] px-1.5 py-0.5 rounded border border-[#c5a880]/30">
                              Bếp
                            </span>
                          </button>
                        )}

                        {isAdmin && (
                          <button
                            onClick={() => {
                              onOpenTableManager();
                              setIsUserDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-stone-300 hover:text-white hover:bg-[#241c17] rounded-lg transition-colors flex items-center justify-between"
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

                      <div className="pt-2 border-t border-[#2b221d]">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors flex items-center gap-2 font-bold"
                        >
                          <LogOut className="w-4 h-4 text-red-400" />
                          <span>Đăng Xuất Khỏi Hệ Thống</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center pb-3 pt-1 border-b border-[#2b221d]">
                        <div className="w-10 h-10 rounded-full bg-stone-900 border border-[#c5a880]/40 flex items-center justify-center mx-auto mb-2 text-[#c5a880] shadow-inner font-serif font-black">
                          萬豪
                        </div>
                        <h4 className="font-bold text-white text-sm">Chào mừng quý khách</h4>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          Đăng nhập hoặc đăng ký thành viên Man Ho Hanoi
                        </p>
                      </div>

                      <div className="py-3 space-y-2">
                        <button
                          onClick={() => {
                            onOpenAuth('login');
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#b89358] via-[#c5a880] to-[#b89358] hover:from-[#c5a880] hover:to-[#d8bc94] text-stone-950 font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                        >
                          <LogIn className="w-4 h-4 text-stone-950" />
                          <span>Đăng Nhập</span>
                        </button>

                        <button
                          onClick={() => {
                            onOpenAuth('register');
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full py-2.5 px-4 rounded-lg bg-[#221a15] hover:bg-[#2d221c] border border-[#c5a880]/50 hover:border-[#c5a880] text-[#c5a880] font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm"
                        >
                          <User className="w-4 h-4 text-[#c5a880]" />
                          <span>Đăng Ký Thành Viên VIP</span>
                        </button>
                      </div>

                      <div className="pt-2 border-t border-[#2b221d] text-center">
                        <button
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

          </div>

        </div>
      </div>
    </header>
  );
};
