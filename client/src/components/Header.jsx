import React, { useState } from 'react';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ChineseSeal } from './ChineseSeal';
import { QrCode, ShoppingBag, Bell, ChefHat, LogIn, LogOut, Flame, Clock, CheckCircle, User, Menu, X } from 'lucide-react';

export const Header = ({ onOpenAuth, onOpenKitchen, onOpenTableManager, currentView }) => {
  const { tableNumber, setIsQRModalOpen, activeOrder, setIsOrderTrackerOpen, setIsCallStaffModalOpen } = useTable();
  const { totalItemsCount, total, setIsCartOpen } = useCart();
  const { user, logout, isStaff, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  return (
    <header className="sticky top-0 z-40 bg-[#140608]/95 backdrop-blur-md border-b border-[#3b1216] shadow-xl">
      {/* Michelin Style Clean Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Michelin-style Brand Typography */}
          <div className="flex items-center gap-3">
            <ChineseSeal text="皇龍" subtext="御膳" className="hidden sm:inline-flex" />
            <div className="flex items-baseline cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-red-500 font-extrabold tracking-tight text-xl sm:text-2xl font-sans uppercase">
                HOÀNG LONG
              </span>
              <span className="text-amber-400 font-bold tracking-widest text-lg sm:text-2xl ml-1.5 uppercase font-decorative">
                QUÁN
              </span>
              <span className="font-calligraphy text-amber-300/80 text-sm sm:text-base ml-2 hidden md:inline">
                皇龍樓
              </span>
            </div>
          </div>

          {/* Right: Michelin-style Nav Tabs */}
          <div className="hidden lg:flex items-center gap-2 text-xs sm:text-sm font-semibold">
            
            {/* Tab: Thực Đơn (Active Pill) */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-2 rounded-full border border-amber-400/80 text-amber-200 bg-red-950/40 shadow-sm hover:bg-red-900/60 transition-all"
            >
              Thực Đơn
            </button>

            {/* Tab: Bàn Quét QR */}
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="px-3.5 py-2 rounded-full text-stone-300 hover:text-amber-200 hover:bg-[#240e11] transition-all flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Bàn {tableNumber}</span>
            </button>

            {/* Tab: Trạng thái đơn (nếu có đơn đang xử lý) */}
            {activeOrder && (
              <button
                onClick={() => setIsOrderTrackerOpen(true)}
                className="px-3.5 py-2 rounded-full bg-red-950/80 border border-red-500/60 text-red-200 hover:bg-red-900 transition-all flex items-center gap-1.5 live-pulse"
              >
                {activeOrder.status === 'pending' && <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
                {activeOrder.status === 'preparing' && <Flame className="w-3.5 h-3.5 text-red-400 animate-bounce" />}
                {activeOrder.status === 'served' && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                <span>Đơn Bếp (#{activeOrder.id.slice(-4)})</span>
              </button>
            )}

            {/* Tab: Gọi Phục Vụ */}
            <button
              onClick={() => setIsCallStaffModalOpen(true)}
              className="px-3.5 py-2 rounded-full text-stone-300 hover:text-amber-200 hover:bg-[#240e11] transition-all flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Gọi Bàn</span>
            </button>

            {/* Tab: Giỏ Món (Badge count) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 border border-amber-400/60 text-white font-bold transition-all flex items-center gap-2 shadow-lg active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Giỏ Món</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-xs font-black flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User & Menu Dropdown Pill */}
            <div className="flex items-center pl-2 ml-1 border-l border-stone-800">
              {isStaff ? (
                <div className="flex items-center gap-1.5 bg-[#250d10] p-1.5 rounded-full border border-amber-500/40">
                  <button
                    onClick={onOpenKitchen}
                    className="flex items-center gap-1 px-3 py-1 bg-amber-500 text-stone-950 font-bold rounded-full text-xs"
                    title="Màn hình Bếp KDS"
                  >
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>{isAdmin ? 'Quản Lý' : 'Bếp KDS'}</span>
                  </button>
                  <button
                    onClick={logout}
                    className="p-1.5 text-stone-400 hover:text-red-300 rounded-full"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 p-2 rounded-full bg-[#1c0a0c] hover:bg-[#2b1013] border border-stone-700/60 text-stone-300 hover:text-amber-200 transition-all"
                  title="Đăng nhập Bếp / Quản lý"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <Menu className="w-4 h-4 text-stone-400" />
                </button>
              )}
            </div>

          </div>

          {/* Right Mobile Icons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#240e11] border border-amber-500/40 text-xs text-amber-200"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Bàn {tableNumber}</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-red-800 text-white border border-amber-400/50"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-[#200c0e] border border-stone-700 text-stone-300"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 px-2 border-t border-[#331114] space-y-2 bg-[#170608]">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setIsCallStaffModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 rounded-xl bg-[#240d10] border border-[#44181c] text-stone-200 flex items-center gap-2"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Gọi Phục Vụ</span>
              </button>

              <button
                onClick={() => {
                  setIsQRModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 rounded-xl bg-[#240d10] border border-[#44181c] text-stone-200 flex items-center gap-2"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Đổi Số Bàn</span>
              </button>
            </div>

            {activeOrder && (
              <button
                onClick={() => {
                  setIsOrderTrackerOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full p-2 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-bold flex items-center justify-between"
              >
                <span>Xem Tiến Độ Đơn Bếp (#{activeOrder.id.slice(-4)})</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </button>
            )}

            <button
              onClick={() => {
                if (isStaff) onOpenKitchen();
                else onOpenAuth();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>{isStaff ? 'Vào Màn Hình Bếp KDS' : 'Đăng Nhập Quản Lý / Bếp'}</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
