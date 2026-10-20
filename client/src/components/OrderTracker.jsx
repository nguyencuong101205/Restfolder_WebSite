import React, { useState, useEffect } from 'react';
import { useTable } from '../context/TableContext';
import { orderApi } from '../api/orderApi';
import { X, CheckCircle, Clock, Flame, Utensils, Bell, CreditCard, Sparkles, RefreshCw, ShoppingBag } from 'lucide-react';

const STEPS = [
  { key: 'pending', label: 'Bếp Nhận Đơn', desc: 'Đơn đã tới nhà bếp', icon: Clock },
  { key: 'preparing', label: 'Đang Chế Biến', desc: 'Nghệ nhân đang nấu', icon: Flame },
  { key: 'served', label: 'Đang Lên Món', desc: 'Tiểu nhị đang bưng lên bàn', icon: Utensils },
  { key: 'completed', label: 'Hoàn Tất', desc: 'Chúc quý khách ngon miệng', icon: CheckCircle }
];

export const OrderTracker = () => {
  const { activeOrder, setActiveOrder, tableNumber, isOrderTrackerOpen, setIsOrderTrackerOpen, setIsCallStaffModalOpen } = useTable();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Poll current order status while tracker is open
  useEffect(() => {
    if (!isOrderTrackerOpen || !tableNumber) return;

    const syncStatus = async () => {
      try {
        const res = await orderApi.getActiveTableOrder(tableNumber);
        if (res.success) {
          setActiveOrder(res.data);
        }
      } catch (err) {
        // silent fail on network glitch
      }
    };

    syncStatus();
    const interval = setInterval(syncStatus, 4000);
    return () => clearInterval(interval);
  }, [isOrderTrackerOpen, tableNumber]);

  if (!isOrderTrackerOpen) return null;

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await orderApi.getActiveTableOrder(tableNumber);
      if (res.success) {
        setActiveOrder(res.data);
      }
    } catch (err) {
      console.warn('Lỗi làm mới đơn:', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const getStepIndex = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'preparing': return 1;
      case 'served': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const currentStep = getStepIndex(activeOrder?.status || 'pending');

  const scrollToMenu = () => {
    setIsOrderTrackerOpen(false);
    const el = document.getElementById('menu-dish-list');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      onClick={() => setIsOrderTrackerOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay-blur animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#18090b] border-2 border-amber-500/70 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden animate-fade-in flex flex-col max-h-[90vh]"
      >
        
        {/* Header */}
        <div className="p-4 bg-[#220d10] border-b border-[#44181c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏮</span>
            <div>
              <h3 className="font-bold text-white text-base">
                Tiến Độ Món Ăn Bàn {tableNumber}
              </h3>
              <p className="text-[11px] text-amber-300/80 font-mono">
                {activeOrder ? `Mã đơn: #${activeOrder.id.slice(-6)}` : 'Trạng thái: Chưa có đơn'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {activeOrder && (
              <button
                type="button"
                onClick={handleManualRefresh}
                className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 flex items-center justify-center transition-all border border-stone-700"
                title="Làm mới trạng thái"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              </button>
            )}
            <button
              onClick={() => setIsOrderTrackerOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-all border border-stone-700"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {!activeOrder ? (
            /* Empty State */
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#250d11] border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
                <Utensils className="w-8 h-8 opacity-80" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base font-decorative">
                  Bàn {tableNumber} Chưa Có Món Đang Nấu
                </h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                  Quý khách hãy chọn những món ăn đặc sắc từ thực đơn và nhấn "Gửi đơn vào bếp" để bắt đầu theo dõi tiến độ thời gian thực nhé!
                </p>
              </div>
              <button
                type="button"
                onClick={scrollToMenu}
                className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-600 hover:to-amber-600 border border-amber-400/80 rounded-xl text-white font-bold text-xs shadow-lg transition-all"
              >
                Khám Phá Thực Đơn Ngay
              </button>
            </div>
          ) : (
            /* Active Order Tracking */
            <>
              {/* Progress Stepper */}
              <div className="relative px-2 pt-2">
                <div className="flex justify-between items-center relative z-10">
                  {STEPS.map((step, idx) => {
                    const isPassed = idx <= currentStep;
                    const isCurrent = idx === currentStep;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="flex flex-col items-center text-center w-24">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                            isCurrent
                              ? 'bg-red-700 border-amber-400 text-amber-200 shadow-lg shadow-red-900/60 ring-4 ring-amber-400/20 scale-110'
                              : isPassed
                              ? 'bg-amber-600 border-amber-300 text-stone-950 font-bold'
                              : 'bg-[#220c0f] border-stone-700 text-stone-500'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-bold mt-2 ${isPassed ? 'text-amber-200' : 'text-stone-500'}`}>
                          {step.label}
                        </span>
                        <span className="text-[9px] text-stone-400 hidden sm:block">
                          {step.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Connecting Track Line */}
                <div className="absolute top-7 left-10 right-10 h-0.5 bg-stone-800 -z-0">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-500"
                    style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Status Message Box */}
              <div className="p-3.5 bg-[#250d11] border border-amber-500/30 rounded-xl text-center">
                {currentStep === 0 && (
                  <p className="text-xs text-amber-200">
                    🔔 Bếp đã nhận được đơn của Bàn {tableNumber}. Nghệ nhân đang chuẩn bị nguyên liệu.
                  </p>
                )}
                {currentStep === 1 && (
                  <p className="text-xs text-amber-200 flex items-center justify-center gap-1.5 font-medium">
                    <Flame className="w-4 h-4 text-red-400 animate-bounce" />
                    <span>Nồi lẩu và chảo lửa đang đỏ rực! Các món sẽ được dọn lên ngay khi chín tới.</span>
                  </p>
                )}
                {currentStep === 2 && (
                  <p className="text-xs text-emerald-300 font-medium">
                    🍜 Món ăn đang được tiểu nhị bưng ra bàn Quý khách! Xin vui lòng chờ trong giây lát.
                  </p>
                )}
                {currentStep === 3 && (
                  <p className="text-xs text-amber-300 font-bold">
                    ✨ Món ăn đã phục vụ đầy đủ. Kính chúc Quý khách có bữa ăn thật ngon miệng!
                  </p>
                )}
              </div>

              {/* Ordered Dishes Details */}
              {activeOrder.items && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Chi tiết thực đơn ({activeOrder.items.length} món):
                    </h4>
                    {activeOrder.paymentMethod && (
                      <span className="text-[10px] text-stone-400 font-mono">
                        PTTT: {activeOrder.paymentMethod === 'cash' ? 'Tiền mặt' : activeOrder.paymentMethod === 'transfer' ? 'Chuyển khoản QR' : 'Thẻ POS'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 bg-[#120507] p-3 rounded-xl border border-[#3b1519] max-h-48 overflow-y-auto">
                    {activeOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start text-xs border-b border-[#2b0f13] pb-2 last:border-b-0 last:pb-0">
                        <div>
                          <span className="font-bold text-white">{item.quantity}x {item.name}</span>
                          <div className="text-[10px] text-stone-400 space-x-1">
                            {item.spiceLevel && <span>🌶️ {item.spiceLevel}</span>}
                            {item.note && <span className="italic">"{item.note}"</span>}
                          </div>
                        </div>
                        <span className="text-amber-400 font-medium">
                          {formatVND(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary row */}
                  <div className="space-y-1 pt-1 text-xs">
                    {activeOrder.discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Ưu đãi giảm giá {activeOrder.voucher ? `(${activeOrder.voucher})` : ''}:</span>
                        <span>-{formatVND(activeOrder.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-1 text-sm font-bold text-white border-t border-[#3b1519]">
                      <span>Tổng cộng (Đã gồm 8% VAT):</span>
                      <span className="text-base text-amber-400 font-black">
                        {formatVND(activeOrder.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsOrderTrackerOpen(false);
                    setIsCallStaffModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 bg-[#250d11] hover:bg-[#341217] border border-amber-500/40 rounded-xl text-xs font-bold text-amber-200 transition-all active:scale-95"
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Gọi Tiểu Nhị</span>
                </button>

                <button
                  onClick={() => {
                    setIsOrderTrackerOpen(false);
                    setIsCallStaffModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 btn-chinese-gold rounded-xl text-xs font-bold shadow-lg active:scale-95"
                >
                  <CreditCard className="w-4 h-4 text-stone-950" />
                  <span>Yêu Cầu Thanh Toán</span>
                </button>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
