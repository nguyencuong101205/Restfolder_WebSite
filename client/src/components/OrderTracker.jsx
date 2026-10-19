import React from 'react';
import { useTable } from '../context/TableContext';
import { X, CheckCircle, Clock, Flame, Utensils, Bell, CreditCard, Sparkles } from 'lucide-react';

const STEPS = [
  { key: 'pending', label: 'Bếp Nhận Đơn', desc: 'Đơn đã tới nhà bếp', icon: Clock },
  { key: 'preparing', label: 'Đang Chế Biến', desc: 'Nghệ nhân đang nấu', icon: Flame },
  { key: 'served', label: 'Đang Lên Món', desc: 'Tiểu nhị đang bưng lên bàn', icon: Utensils },
  { key: 'completed', label: 'Hoàn Tất', desc: 'Chúc quý khách ngon miệng', icon: CheckCircle }
];

export const OrderTracker = () => {
  const { activeOrder, tableNumber, isOrderTrackerOpen, setIsOrderTrackerOpen, setIsCallStaffModalOpen } = useTable();

  if (!isOrderTrackerOpen) return null;

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay-blur">
      <div className="relative w-full max-w-lg bg-[#18090b] border border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden animate-fade-scale flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#220d10] border-b border-[#44181c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏮</span>
            <div>
              <h3 className="font-bold text-white text-base">
                Tiến Độ Món Ăn Bàn {tableNumber}
              </h3>
              <p className="text-[11px] text-amber-300/80 font-mono">
                Mã đơn: #{activeOrder?.id || 'MỚI'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          
          {/* Progress Stepper */}
          <div className="relative px-2">
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
            <div className="absolute top-5 left-10 right-10 h-0.5 bg-stone-800 -z-0">
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
                🔔 Bếp đã nhận được đơn của Quý khách. Nghệ nhân đầu bếp đang chuẩn bị nguyên liệu.
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
          {activeOrder && activeOrder.items && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Chi tiết thực đơn đã đặt:
              </h4>

              <div className="space-y-2 bg-[#120507] p-3 rounded-xl border border-[#3b1519] max-h-56 overflow-y-auto">
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

              {/* Total Summary */}
              <div className="flex justify-between items-center pt-2 text-sm font-bold text-white">
                <span>Tổng cộng (Đã gồm 8% VAT):</span>
                <span className="text-base text-amber-400 font-black">
                  {formatVND(activeOrder.totalPrice)}
                </span>
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
              className="flex items-center justify-center gap-2 py-2.5 bg-[#250d11] hover:bg-[#341217] border border-amber-500/40 rounded-xl text-xs font-bold text-amber-200 transition-all"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Gọi Nhân Viên Bàn</span>
            </button>

            <button
              onClick={() => {
                setIsOrderTrackerOpen(false);
                setIsCallStaffModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 py-2.5 btn-chinese-gold rounded-xl text-xs font-bold shadow-lg"
            >
              <CreditCard className="w-4 h-4" />
              <span>Yêu Cầu Thanh Toán</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
