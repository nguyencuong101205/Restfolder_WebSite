import React, { useState, useRef, useEffect } from 'react';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ChineseSeal } from './ChineseSeal';
import { QrCode, ShoppingBag, Bell, ChefHat, LogIn, LogOut, Clock, User, Menu, MapPin, Sparkles, ChevronDown } from 'lucide-react';

export const Header = ({ onOpenAuth, onOpenKitchen, onOpenTableManager, currentView }) => {
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

  return (
    <header className="sticky top-0 z-40 bg-[#140608]/98 backdrop-blur-md border-b border-[#3b1216] shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* ========================================================
              BÊN TRÁI: LOGO + CÁC BUTTON CHÍNH + ICON MENU (XEM THÊM)
             ======================================================== */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0">
            {/* 1. Logo Hoàng Long Quán */}
            <div
              className="flex items-center gap-2 cursor-pointer group flex-shrink-0 select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Về đầu trang thực đơn"
            >
              <ChineseSeal text="皇龍" subtext="御膳" className="hidden sm:inline-flex" />
              <div className="flex items-baseline">
                <span className="text-red-500 font-extrabold tracking-tight text-lg sm:text-2xl font-sans uppercase group-hover:text-red-400 transition-colors">
                  HOÀNG LONG
                </span>
                <span className="text-amber-400 font-bold tracking-widest text-base sm:text-2xl ml-1 uppercase font-decorative group-hover:text-amber-300 transition-colors">
                  QUÁN
                </span>
                <span className="font-calligraphy text-amber-300/80 text-xs sm:text-base ml-1.5 hidden xl:inline">
                  皇龍樓
                </span>
              </div>
            </div>

            {/* 2. Thanh các button chính (Main buttons) */}
            <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold">
              
              {/* Button chính 1: Thực Đơn */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-3 sm:px-4 py-2 rounded-full border border-amber-400/90 text-amber-200 bg-red-950/60 hover:bg-red-900/70 transition-all font-bold shadow-sm whitespace-nowrap active:scale-95"
              >
                Thực Đơn
              </button>

              {/* Button chính 2: Bàn {tableNumber} */}
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-full bg-[#1c0a0c] hover:bg-[#280f12] border border-stone-700/80 hover:border-amber-400/60 text-stone-200 hover:text-amber-200 transition-all whitespace-nowrap active:scale-95"
                title="Đổi số bàn hoặc quét mã QR"
              >
                <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                <span className="text-xs sm:text-sm">Bàn {tableNumber}</span>
              </button>

              {/* Button chính 3: Gọi Bàn */}
              <button
                onClick={() => setIsCallStaffModalOpen(true)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-full bg-[#1c0a0c] hover:bg-[#280f12] border border-stone-700/80 hover:border-amber-400/60 text-stone-200 hover:text-amber-200 transition-all whitespace-nowrap active:scale-95"
                title="Gọi tiểu nhị / nhân viên phục vụ"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                <span className="hidden sm:inline">Gọi Bàn</span>
              </button>

              {/* Button chính 4: Giỏ Món */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 border border-amber-400/60 text-white font-bold transition-all shadow-md active:scale-95 whitespace-nowrap"
                title="Xem giỏ món của bàn"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                <span className="hidden sm:inline">Giỏ Món</span>
                {totalItemsCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-xs font-black flex items-center justify-center shadow">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* 3. Icon Menu để xem thêm các button bị ẩn đi */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => {
                    setIsMoreMenuOpen(!isMoreMenuOpen);
                    setIsUserDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-full border transition-all ${
                    isMoreMenuOpen
                      ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md font-bold'
                      : 'bg-[#1c0a0c] hover:bg-[#280f12] border-stone-700/80 text-stone-300 hover:border-amber-400/60 hover:text-white'
                  }`}
                  title="Xem thêm các chức năng bị ẩn"
                >
                  <Menu className="w-4 h-4" />
                  <span className="hidden md:inline text-xs font-semibold">Xem Thêm</span>
                </button>

                {/* Dropdown các button bị ẩn */}
                {isMoreMenuOpen && (
                  <div className="absolute left-0 mt-2.5 w-64 sm:w-72 bg-[#1c0a0d] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 text-left animate-fade-scale text-xs sm:text-sm">
                    {/* Active Order banner if any */}
                    {activeOrder && (
                      <div className="px-4 py-2.5 bg-red-950/70 border-b border-[#3b1519]">
                        <button
                          onClick={() => {
                            setIsOrderTrackerOpen(true);
                            setIsMoreMenuOpen(false);
                          }}
                          className="w-full text-left font-bold text-amber-200 flex items-center justify-between text-xs"
                        >
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                            <span>Đơn Bếp #{activeOrder.id.slice(-4)}</span>
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-red-900 text-red-200">
                            {activeOrder.status === 'pending' ? 'Chờ nhận' : 'Đang nấu'}
                          </span>
                        </button>
                      </div>
                    )}

                    <div className="py-1">
                      {/* Button ẩn: Màn Hình Bếp KDS */}
                      <button
                        onClick={() => {
                          if (isStaff) onOpenKitchen();
                          else onOpenAuth('login');
                          setIsMoreMenuOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <ChefHat className="w-4 h-4 text-amber-400" />
                          <span>Màn Hình Bếp KDS</span>
                        </div>
                        <span className="text-[10px] text-amber-400 font-mono font-bold bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                          Bếp
                        </span>
                      </button>

                      {/* Button ẩn: Quản Lý Bàn & QR */}
                      <button
                        onClick={() => {
                          if (isAdmin) onOpenTableManager();
                          else onOpenAuth('login');
                          setIsMoreMenuOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <QrCode className="w-4 h-4 text-amber-400" />
                          <span>Quản Lý Bàn & In QR</span>
                        </div>
                        <span className="text-[10px] text-amber-400 font-mono font-bold bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                          Admin
                        </span>
                      </button>

                      {/* Button ẩn: Theo Dõi Tiến Độ Đơn */}
                      <button
                        onClick={() => {
                          setIsOrderTrackerOpen(true);
                          setIsMoreMenuOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span>Theo Dõi Tiến Độ Đơn</span>
                        </div>
                        <span className="text-[10px] text-stone-400">Trực tiếp</span>
                      </button>

                      {/* Button ẩn: Giới Thiệu Hoàng Long Quán */}
                      <button
                        onClick={() => {
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                          setIsMoreMenuOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>Giới Thiệu Hoàng Long Quán</span>
                        </div>
                        <span className="text-[10px] text-amber-400 font-calligraphy">皇龍</span>
                      </button>
                    </div>

                    {/* Footer trong Menu Ẩn */}
                    <div className="pt-2 px-4 py-2.5 border-t border-[#3b1519] flex items-center gap-1.5 text-[11px] text-stone-400">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>Bàn {tableNumber} · 88 Nguyễn Tri Phương, Q.5</span>
                    </div>
                  </div>
                )}
              </div>

            </nav>
          </div>


          {/* ========================================================
              BÊN TRÊN CÙNG GÓC PHẢI: ICON NGƯỜI (ĐĂNG NHẬP / ĐĂNG KÝ)
             ======================================================== */}
          <div className="relative flex-shrink-0" ref={userDropdownRef}>
            <button
              onClick={() => {
                setIsUserDropdownOpen(!isUserDropdownOpen);
                setIsMoreMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full border transition-all ${
                isUserDropdownOpen
                  ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-lg scale-105'
                  : 'bg-[#1c0a0c] hover:bg-[#280f12] border-stone-700/80 text-stone-300 hover:border-amber-400/60 hover:text-white'
              }`}
              title={user ? `Tài khoản: ${user.name}` : 'Đăng nhập / Đăng ký thành viên'}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                user ? 'bg-amber-500 text-stone-950 shadow-inner' : 'bg-stone-800 text-amber-400'
              }`}>
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline text-xs font-bold">
                {user ? (user.name || user.username) : 'Tài Khoản'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform hidden sm:inline ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Popup / Dropdown Đăng Nhập & Đăng Ký */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-[#1c0a0d] border border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden py-3 px-3.5 z-50 text-left animate-fade-scale text-xs sm:text-sm">
                
                {user ? (
                  /* GIAO DIỆN KHI ĐÃ ĐĂNG NHẬP */
                  <div>
                    <div className="flex items-center gap-3 pb-3 border-b border-[#3b1519]">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-red-600 text-stone-950 flex items-center justify-center font-black text-sm shadow">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm truncate">{user.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono uppercase font-bold border border-amber-400/30">
                            {user.role}
                          </span>
                          <span className="text-[10px] text-stone-400 font-sans">Đang đăng nhập</span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2.5 space-y-1">
                      {isStaff && (
                        <button
                          onClick={() => {
                            onOpenKitchen();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-stone-300 hover:text-white hover:bg-[#291013] rounded-lg transition-colors flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <ChefHat className="w-4 h-4 text-amber-400" />
                            <span>Vào Màn Hình Bếp KDS</span>
                          </span>
                          <span className="text-[10px] text-amber-300 font-bold bg-red-950 px-1.5 py-0.5 rounded border border-red-800">
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
                          className="w-full px-3 py-2 text-left text-stone-300 hover:text-white hover:bg-[#291013] rounded-lg transition-colors flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <QrCode className="w-4 h-4 text-amber-400" />
                            <span>Quản Lý Bàn & QR</span>
                          </span>
                          <span className="text-[10px] text-amber-300 font-bold bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">
                            Admin
                          </span>
                        </button>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#3b1519]">
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
                  /* GIAO DIỆN KHI CHƯA ĐĂNG NHẬP: ĐĂNG NHẬP HOẶC ĐĂNG KÝ */
                  <div>
                    <div className="text-center pb-3 pt-1 border-b border-[#3b1519]">
                      <div className="w-10 h-10 rounded-full bg-stone-900 border border-amber-400/40 flex items-center justify-center mx-auto mb-2 text-amber-400 shadow-inner">
                        <User className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-white text-sm">Chào mừng quý khách!</h4>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        Đăng nhập hoặc đăng ký thành viên Hoàng Long Quán
                      </p>
                    </div>

                    <div className="py-3 space-y-2.5">
                      {/* Nút 1: Đăng Nhập */}
                      <button
                        onClick={() => {
                          onOpenAuth('login');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 border border-amber-400/70 text-white font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                      >
                        <LogIn className="w-4 h-4 text-amber-300" />
                        <span>Đăng Nhập</span>
                      </button>

                      {/* Nút 2: Đăng Ký */}
                      <button
                        onClick={() => {
                          onOpenAuth('register');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#240e11] hover:bg-[#331418] border border-amber-500/50 hover:border-amber-400 text-amber-300 font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm"
                      >
                        <User className="w-4 h-4 text-amber-400" />
                        <span>Đăng Ký Thành Viên</span>
                      </button>
                    </div>

                    {/* Link quản lý / nhân viên */}
                    <div className="pt-2 border-t border-[#3b1519] text-center">
                      <button
                        onClick={() => {
                          onOpenAuth('login');
                          setIsUserDropdownOpen(false);
                        }}
                        className="text-[11px] text-stone-400 hover:text-amber-300 hover:underline transition-colors"
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
    </header>
  );
};
