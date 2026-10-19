import React from 'react';
import { useTable } from '../context/TableContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ChineseSeal } from './ChineseSeal';
import { QrCode, ShoppingBag, Bell, ChefHat, LogIn, LogOut, Flame, Clock, CheckCircle } from 'lucide-react';

export const Header = ({ onOpenAuth, onOpenKitchen, onOpenTableManager, currentView }) => {
  const { tableNumber, setIsQRModalOpen, activeOrder, setIsOrderTrackerOpen, setIsCallStaffModalOpen } = useTable();
  const { totalItemsCount, total, setIsCartOpen } = useCart();
  const { user, logout, isStaff, isAdmin } = useAuth();

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  const getStatusBadge = () => {
    if (!activeOrder) return null;
    switch (activeOrder.status) {
      case 'pending':
        return (
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/90 border border-amber-500/60 text-amber-300 rounded-full text-xs font-bold hover:bg-amber-900 transition-all live-pulse shadow-md"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Bếp đã nhận đơn (#{activeOrder.id.slice(-4)})</span>
          </button>
        );
      case 'preparing':
        return (
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/90 border border-red-500/70 text-red-300 rounded-full text-xs font-bold hover:bg-red-900 transition-all live-pulse shadow-md"
          >
            <Flame className="w-3.5 h-3.5 text-red-400 animate-bounce" />
            <span>Đang nổi lửa nấu...</span>
          </button>
        );
      case 'served':
        return (
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/90 border border-emerald-500/70 text-emerald-300 rounded-full text-xs font-bold hover:bg-emerald-900 transition-all shadow-md"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Đang lên món</span>
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#120507]/95 backdrop-blur-md border-b border-[#4d161a] shadow-2xl">
      {/* Decorative Gold Header Top Stripe */}
      <div className="h-1 bg-gradient-to-r from-red-800 via-amber-400 to-red-800"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand & Logo */}
          <div className="flex items-center gap-3">
            <ChineseSeal text="皇龍" subtext="御膳" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-decorative text-lg sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 drop-shadow">
                  HOÀNG LONG QUÁN
                </h1>
                <span className="hidden md:inline font-calligraphy text-amber-400 text-lg">
                  皇龍樓
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-200/70 tracking-widest font-light uppercase">
                Ẩm Thực Trung Hoa · Dim Sum & Lẩu Tứ Xuyên
              </p>
            </div>
          </div>

          {/* Center Table QR Indicator & Order Status */}
          <div className="hidden md:flex items-center gap-3">
            {/* Table Badge Button */}
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#250f12] hover:bg-[#38161a] border border-amber-500/50 rounded-xl text-xs sm:text-sm text-amber-200 transition-all shadow-inner group active:scale-95"
              title="Nhấn để đổi bàn hoặc quét mã QR"
            >
              <QrCode className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="font-bold text-white">Bàn: {tableNumber}</span>
              <span className="text-[10px] font-bold text-amber-300 bg-red-950/90 px-2 py-0.5 rounded-md border border-red-800">
                Đổi Bàn
              </span>
            </button>

            {/* Live Order Status */}
            {getStatusBadge()}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Table Badge */}
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="md:hidden flex items-center gap-1 px-2.5 py-1.5 bg-[#250f12] border border-amber-500/40 rounded-lg text-xs text-amber-200"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-white">Bàn {tableNumber}</span>
            </button>

            {/* Call Waiter Button */}
            <button
              onClick={() => setIsCallStaffModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-950 to-stone-900 hover:from-red-900 hover:to-stone-800 border border-red-800/60 rounded-xl text-xs sm:text-sm text-red-200 transition-all shadow active:scale-95"
              title="Gọi nhân viên phục vụ bàn"
            >
              <Bell className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline font-bold">Gọi Phục Vụ</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 border border-amber-400/60 rounded-xl text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-red-950/60 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Giỏ Món</span>
              {totalItemsCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-black bg-amber-400 text-stone-950 rounded-full shadow-md animate-bounce">
                  {totalItemsCount}
                </span>
              )}
              {total > 0 && (
                <span className="hidden lg:inline text-xs text-amber-200 font-semibold">
                  ({formatVND(total)})
                </span>
              )}
            </button>

            {/* Staff / Admin Dashboard Access */}
            {isStaff ? (
              <div className="flex items-center gap-1 bg-[#220d10] p-1 rounded-xl border border-amber-500/40 shadow-inner">
                <button
                  onClick={onOpenKitchen}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentView === 'kitchen' ? 'bg-amber-500 text-stone-950 shadow' : 'text-amber-200 hover:bg-red-950'
                  }`}
                  title="Màn hình Bếp & Nhân viên (KDS)"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{isAdmin ? 'Quản Lý' : 'Màn Hình Bếp'}</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={onOpenTableManager}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      currentView === 'tables' ? 'bg-amber-500 text-stone-950 shadow' : 'text-amber-200 hover:bg-red-950'
                    }`}
                    title="In mã QR tất cả các bàn"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline">Mã QR Bàn</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  className="p-1.5 text-stone-400 hover:text-red-300 transition-colors"
                  title="Đăng xuất tài khoản nhân viên"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-2 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/60 rounded-xl text-xs text-stone-300 font-semibold transition-all active:scale-95"
                title="Đăng nhập dành cho Quản lý & Bếp"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Nhân Viên</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
