import React, { useState, useRef, useEffect } from 'react';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ChineseSeal } from './ChineseSeal';
import {
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
  ChevronDown,
  Calendar,
  Gift,
  Phone
} from 'lucide-react';

export const Header = ({
  onOpenAuth,
  onOpenKitchen,
  onOpenTableManager,
  onOpenReserve,
  onOpenAbout,
  onExploreMenu,
  currentView
}) => {
  const { tableNumber, setIsQRModalOpen, activeOrder, setIsOrderTrackerOpen, setIsCallStaffModalOpen } = useTable();
  const { totalItemsCount, total, setIsCartOpen } = useCart();
  const { user, logout, isStaff, isAdmin } = useAuth();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [latestReservation, setLatestReservation] = useState(null);

  const userDropdownRef = useRef(null);
  const moreMenuRef = useRef(null);

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  // Check saved reservation
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hoanglong_reservation');
      if (saved) setLatestReservation(JSON.parse(saved));
    } catch {}
  }, [isUserDropdownOpen]);

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
    setIsMoreMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#140608]/98 backdrop-blur-md border-b border-[#3b1216] shadow-2xl transition-all">
      {/* Full-screen backdrop to blur and dim the background when Menu or User dropdown is open */}
      {(isMoreMenuOpen || isUserDropdownOpen) && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 animate-fade-in"
          onClick={() => {
            setIsMoreMenuOpen(false);
            setIsUserDropdownOpen(false);
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-50">
        <div className="h-16 sm:h-20 hl-header-bar flex items-center justify-between gap-2 sm:gap-4">
          
          {/* ========================================================
              LEFT: BRAND LOGO + MAIN BUTTONS + 1 ICON MENU (XEM THÊM)
             ======================================================== */}
          <div className="hl-nav-group flex items-center gap-2 sm:gap-4 min-w-0">
            {/* Brand Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Về đầu trang Hoàng Long Quán"
            >
              <ChineseSeal text="皇龍" subtext="御膳" className="hidden sm:inline-flex" />
              <div className="flex flex-col justify-center">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-decorative font-black text-lg sm:text-2xl uppercase tracking-wider bg-gradient-to-r from-red-500 via-amber-300 to-yellow-400 bg-clip-text text-transparent group-hover:brightness-110 transition-all">
                    HOÀNG LONG
                  </span>
                  <span className="font-decorative font-bold text-base sm:text-xl uppercase tracking-widest text-amber-300">
                    QUÁN
                  </span>
                  <span className="font-calligraphy text-xs sm:text-sm text-amber-400/90 ml-1 hidden lg:inline tracking-widest">
                    皇龍樓
                  </span>
                </div>
                <span className="text-[9px] text-amber-400/70 font-sans tracking-widest uppercase hidden sm:block -mt-1 font-medium">
                  Ẩm Thực Cung Đình · Di Sản 30 Năm
                </span>
              </div>
            </div>

            {/* Main Navigation Buttons (Responsive: shows Thực Đơn & Đặt Bàn, 2xl shows all) */}
            <nav className="hidden xl:flex items-center gap-1.5 text-xs sm:text-sm font-semibold flex-shrink-0">
              <button
                type="button"
                onClick={onExploreMenu}
                className="hl-btn-nav hl-btn-nav-active"
              >
                Thực Đơn
              </button>
              <button
                type="button"
                onClick={onOpenReserve}
                className="hl-btn-nav"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Đặt Bàn Tiệc</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('khuyen-mai')}
                className="hl-btn-nav hidden 2xl:inline-flex"
              >
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>Ưu Đãi</span>
              </button>
              <button
                type="button"
                onClick={onOpenAbout}
                className="hl-btn-nav hidden 2xl:inline-flex"
              >
                Giới Thiệu
              </button>
            </nav>

            {/* 1 Icon Menu Xem Thêm (Các button bị ẩn đi) */}
            <div className="relative flex-shrink-0" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsMoreMenuOpen(!isMoreMenuOpen);
                  setIsUserDropdownOpen(false);
                }}
                className={`hl-btn-action flex items-center gap-1.5 text-xs font-semibold ${
                  isMoreMenuOpen ? 'hl-btn-nav-active' : ''
                }`}
                title="Xem thêm các nút & chức năng bị ẩn"
              >
                <Menu className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline">Menu</span>
              </button>

              {/* Dropdown Menu chứa các button bị ẩn */}
              {isMoreMenuOpen && (
                <div className="absolute left-0 mt-3 w-64 sm:w-72 bg-[#18080a] border-2 border-amber-500/70 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden py-2 z-50 text-left animate-fade-in text-xs sm:text-sm">
                  
                  {/* Active Order banner if cooking */}
                  {activeOrder && (
                    <div className="px-4 py-2.5 bg-red-950/70 border-b border-[#3b1519]">
                      <button
                        type="button"
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

                  {/* Section for Main Navigation on mobile / tablet */}
                  <div className="xl:hidden py-1 border-b border-[#3b1519] space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        onExploreMenu();
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-amber-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center gap-2.5 font-bold"
                    >
                      <span className="w-4 text-center">🥟</span>
                      <span>Thực Đơn Gọi Món</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        scrollToSection('khuyen-mai');
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-stone-300 hover:text-amber-200 hover:bg-[#291013] transition-colors flex items-center gap-2.5"
                    >
                      <Gift className="w-4 h-4 text-amber-400" />
                      <span>Mã Giảm Giá & Ưu Đãi</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onOpenReserve();
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-stone-300 hover:text-amber-200 hover:bg-[#291013] transition-colors flex items-center gap-2.5"
                    >
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>Đặt Bàn Tiệc Trước</span>
                    </button>
                  </div>

                  {/* Operational & Extra Buttons */}
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        onOpenAbout();
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Giới Thiệu Hoàng Long Quán</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-calligraphy">皇龍</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsCallStaffModalOpen(true);
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <Bell className="w-4 h-4 text-amber-400" />
                        <span>Gọi Phục Vụ / Tiểu Nhị</span>
                      </div>
                      <span className="text-[10px] text-stone-400">Bàn {tableNumber}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsOrderTrackerOpen(true);
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Theo Dõi Tiến Độ Đơn</span>
                      </div>
                      <span className="text-[10px] text-stone-400">Trực tiếp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (isStaff) onOpenKitchen();
                        else onOpenAuth('login');
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <ChefHat className="w-4 h-4 text-amber-400" />
                        <span>Màn Hình Bếp KDS</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono font-bold bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                        Bếp
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (isAdmin) onOpenTableManager();
                        else onOpenAuth('login');
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <QrCode className="w-4 h-4 text-amber-400" />
                        <span>Quản Lý Bàn & In Mã QR</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono font-bold bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                        Admin
                      </span>
                    </button>
                  </div>

                  {/* Hotline */}
                  <div className="pt-2 px-4 py-2 border-t border-[#3b1519] flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Hotline:</span>
                    </span>
                    <a href="tel:02838889999" className="text-amber-400 font-bold hover:underline">(028) 3888 9999</a>
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* ========================================================
              RIGHT: BÀN, GỌI BÀN, GIỎ MÓN, VÀ ICON NGƯỜI (GÓC PHẢI)
             ======================================================== */}
          <div className="hl-header-right">
            
            {/* Bàn {tableNumber} (QR Ordering) */}
            <button
              type="button"
              onClick={() => setIsQRModalOpen(true)}
              className="hl-btn-action flex items-center gap-1.5 text-xs font-semibold flex-shrink-0"
              title="Đổi số bàn hoặc quét mã QR"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse flex-shrink-0" />
              <QrCode className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Bàn {tableNumber}</span>
            </button>

            {/* Gọi Bàn (Visible on large screens, also in Menu dropdown) */}
            <button
              type="button"
              onClick={() => setIsCallStaffModalOpen(true)}
              className="hl-btn-action hidden lg:flex items-center gap-1.5 text-xs font-semibold flex-shrink-0"
              title="Gọi phục vụ / tiểu nhị"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Gọi Bàn</span>
            </button>

            {/* Giỏ Món */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hl-btn-cart flex items-center gap-1.5 text-xs flex-shrink-0"
              title="Xem giỏ món của bàn"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
              <span className="hidden sm:inline">Giỏ Món</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-xs font-black flex items-center justify-center shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* ========================================================
                TOP-RIGHT: ICON NGƯỜI (LOGIN / REGISTER MODAL)
               ======================================================== */}
            <div className="relative flex-shrink-0" ref={userDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                  setIsMoreMenuOpen(false);
                }}
                className={`hl-btn-user-circle ${
                  isUserDropdownOpen ? 'ring-2 ring-amber-400' : ''
                }`}
                title={user ? `Tài khoản VIP: ${user.name || user.username}` : 'Đăng nhập / Đăng ký thành viên VIP'}
              >
                {user ? (
                  <span className="font-bold text-xs text-amber-300">
                    {(user.name || user.username || 'U').charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-4 h-4 text-amber-300" />
                )}
                {user && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
                )}
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-[#18080a] border-2 border-amber-500/70 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden py-3 px-3.5 z-50 text-left animate-fade-in text-xs sm:text-sm">
                  {user ? (
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
                            type="button"
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
                            type="button"
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
                          type="button"
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
                      <div className="text-center pb-3 pt-1 border-b border-[#3b1519]">
                        <div className="w-10 h-10 rounded-full bg-stone-900 border border-amber-400/40 flex items-center justify-center mx-auto mb-2 text-amber-400 shadow-inner">
                          <User className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-white text-sm">Chào mừng quý khách!</h4>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          Đăng nhập hoặc đăng ký thành viên Hoàng Long Quán
                        </p>
                      </div>

                      {/* Display reservation ticket if customer booked a table */}
                      {latestReservation && (
                        <div className="my-2.5 p-2.5 bg-gradient-to-r from-[#2c0e12] to-[#1c080b] border border-amber-500/50 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-amber-400" />
                              <span>Bàn Đã Đặt: {latestReservation.code}</span>
                            </span>
                            <span className="text-[9px] bg-red-950 text-amber-200 border border-amber-500/40 px-1.5 py-0.5 rounded font-mono">
                              {latestReservation.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-300">
                            {latestReservation.date} · {latestReservation.guests} khách ({latestReservation.area === 'vip' ? latestReservation.vipRoom : 'Sảnh Cung Đình'})
                          </p>
                        </div>
                      )}

                      <div className="py-3 space-y-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            onOpenAuth('login');
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 border border-amber-400/70 text-white font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                        >
                          <LogIn className="w-4 h-4 text-amber-300" />
                          <span>Đăng Nhập</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onOpenAuth('register');
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#240e11] hover:bg-[#331418] border border-amber-500/50 hover:border-amber-400 text-amber-300 font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm"
                        >
                          <User className="w-4 h-4 text-amber-400" />
                          <span>Đăng Ký Thành Viên VIP</span>
                        </button>
                      </div>

                      <div className="pt-2 border-t border-[#3b1519] text-center">
                        <button
                          type="button"
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
      </div>
    </header>
  );
};
