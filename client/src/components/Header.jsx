import React, { useState, useRef, useEffect } from 'react';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ChineseSeal } from './ChineseSeal';
import { QrCode, ShoppingBag, Bell, ChefHat, LogIn, LogOut, Flame, Clock, CheckCircle, User, Menu, X, MapPin } from 'lucide-react';

export const Header = ({ onOpenAuth, onOpenKitchen, onOpenTableManager, currentView }) => {
  const { tableNumber, setIsQRModalOpen, activeOrder, setIsOrderTrackerOpen, setIsCallStaffModalOpen } = useTable();
  const { totalItemsCount, total, setIsCartOpen } = useCart();
  const { user, logout, isStaff, isAdmin } = useAuth();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#140608]/98 backdrop-blur-md border-b border-[#3b1216] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo (Michelin Guide style: HOÀNG LONG QUÁN 皇龍樓) */}
          <div className="flex items-center gap-3">
            <ChineseSeal text="皇龍" subtext="御膳" className="hidden sm:inline-flex" />
            <div
              className="flex items-baseline cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-red-500 font-extrabold tracking-tight text-xl sm:text-2xl font-sans uppercase group-hover:text-red-400 transition-colors">
                HOÀNG LONG
              </span>
              <span className="text-amber-400 font-bold tracking-widest text-lg sm:text-2xl ml-1.5 uppercase font-decorative group-hover:text-amber-300 transition-colors">
                QUÁN
              </span>
              <span className="font-calligraphy text-amber-300/80 text-sm sm:text-base ml-2 hidden md:inline">
                皇龍樓
              </span>
            </div>
          </div>

          {/* Right: Michelin-style Navigation links & User/Menu button */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold">
            
            {/* Nav Pill 1: Restaurants -> Thực Đơn (Active rounded border pill) */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-2 rounded-full border border-amber-400/90 text-amber-200 bg-red-950/50 hover:bg-red-900/60 transition-all font-bold shadow-sm"
            >
              Thực Đơn
            </button>

            {/* Nav Pill 2: Hotels -> Bàn Quét QR */}
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-stone-300 hover:text-amber-200 hover:bg-[#240e11] transition-all"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Bàn {tableNumber}</span>
            </button>

            {/* Nav Pill 3: Magazine -> Gọi Phục Vụ */}
            <button
              onClick={() => setIsCallStaffModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-stone-300 hover:text-amber-200 hover:bg-[#240e11] transition-all"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Gọi Bàn</span>
            </button>

            {/* Nav Pill 4: My Lists -> Giỏ Món */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 border border-amber-400/60 text-white font-bold transition-all shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Giỏ Món</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-xs font-black flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Rightmost: User Avatar + Hamburger Button [ 👤 ☰ ] (Michelin style) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full border transition-all ${
                  isDropdownOpen
                    ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-lg'
                    : 'bg-[#1c0a0c] hover:bg-[#280f12] border-stone-700/80 text-stone-300 hover:border-amber-400/60 hover:text-white'
                }`}
                title="Tài khoản & Tiện ích"
              >
                <div className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center">
                  <User className={`w-3.5 h-3.5 ${isDropdownOpen ? 'text-stone-950' : 'text-amber-400'}`} />
                </div>
                <Menu className="w-4 h-4" />
              </button>

              {/* Michelin Style Dropdown Menu (Ảnh 2) */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 sm:w-72 bg-[#1c0a0d] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 text-left animate-fade-scale text-xs sm:text-sm">
                  
                  {/* Auth header */}
                  <div className="px-4 py-3 border-b border-[#3b1519]">
                    {isStaff ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white leading-tight">{user?.name}</p>
                          <span className="text-[10px] text-amber-400 font-mono uppercase">{user?.role}</span>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setIsDropdownOpen(false);
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-400 rounded-lg hover:bg-stone-900"
                          title="Đăng xuất"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-stone-300">
                        <button
                          onClick={() => {
                            onOpenAuth();
                            setIsDropdownOpen(false);
                          }}
                          className="font-bold text-amber-300 hover:underline"
                        >
                          Đăng Nhập
                        </button>
                        <span>|</span>
                        <button
                          onClick={() => {
                            onOpenAuth();
                            setIsDropdownOpen(false);
                          }}
                          className="hover:text-white hover:underline"
                        >
                          Quản Lý / Bếp
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Active Order status if any */}
                  {activeOrder && (
                    <div className="px-4 py-2 bg-red-950/60 border-b border-[#3b1519]">
                      <button
                        onClick={() => {
                          setIsOrderTrackerOpen(true);
                          setIsDropdownOpen(false);
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

                  {/* Menu Items (matching Ảnh 2 list) */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                    >
                      <span>Thực Đơn Nhà Hàng (Menu)</span>
                      <span className="text-[10px] text-amber-400 font-calligraphy">点心</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsQRModalOpen(true);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                    >
                      <span>Đổi Số Bàn & Quét QR</span>
                      <span className="text-[11px] font-bold text-amber-300">Bàn {tableNumber}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsCallStaffModalOpen(true);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                    >
                      <span>Gọi Tiểu Nhị Phục Vụ</span>
                      <Bell className="w-3.5 h-3.5 text-amber-400" />
                    </button>

                    <button
                      onClick={() => {
                        if (isStaff) onOpenKitchen();
                        else onOpenAuth();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                    >
                      <span>Màn Hình Bếp KDS</span>
                      <ChefHat className="w-3.5 h-3.5 text-amber-400" />
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          onOpenTableManager();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-stone-300 hover:text-white hover:bg-[#291013] transition-colors flex items-center justify-between"
                      >
                        <span>In Mã QR Toàn Bộ Bàn</span>
                        <QrCode className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    )}
                  </div>

                  {/* Bottom Footer Item (matching Ảnh 2: Vietnam - English - USD) */}
                  <div className="pt-2 px-4 py-2.5 border-t border-[#3b1519] flex items-center gap-1.5 text-[11px] text-stone-400">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>Bàn {tableNumber} · Hoàng Long Quán (TP. HCM)</span>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
