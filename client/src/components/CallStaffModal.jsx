import React, { useState } from 'react';
import { useTable } from '../context/TableContext';
import { orderApi } from '../api/orderApi';
import { X, Bell, Check, Utensils, Droplets, CreditCard, Sparkles, MessageSquare } from 'lucide-react';

const REQUEST_OPTIONS = [
  { id: 'water', label: 'Châm thêm nước lẩu', icon: Droplets, desc: 'Nước dùng gà thảo mộc hoặc sa tế' },
  { id: 'sauce', label: 'Thêm nước chấm Triều Châu', icon: Utensils, desc: 'Sa tế tôm, xì dầu tỏi ớt, dầu hào' },
  { id: 'napkin', label: 'Khăn lạnh & Ly đá thêm', icon: Sparkles, desc: 'Tiểu nhị mang đến ngay' },
  { id: 'payment', label: 'Yêu cầu thanh toán hóa đơn', icon: CreditCard, desc: 'Tiền mặt, Chuyển khoản, Thẻ' }
];

export const CallStaffModal = () => {
  const { isCallStaffModalOpen, setIsCallStaffModalOpen, tableNumber, activeOrder } = useTable();
  const [selectedRequest, setSelectedRequest] = useState('water');
  const [customNote, setCustomNote] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isCallStaffModalOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (activeOrder && activeOrder.id) {
        await orderApi.callStaff(activeOrder.id, selectedRequest, customNote);
      }
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setIsCallStaffModalOpen(false);
        setCustomNote('');
      }, 1800);
    } catch (err) {
      console.warn('Gửi gọi phục vụ:', err);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setIsCallStaffModalOpen(false);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setIsCallStaffModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay-blur animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#18090b] border-2 border-amber-500/70 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden animate-fade-in flex flex-col"
      >
        
        {/* Header */}
        <div className="p-4 bg-[#220d10] border-b border-[#44181c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400 animate-bounce" />
            <h3 className="font-bold text-white text-base">
              Gọi Tiểu Nhị Phục Vụ (Bàn {tableNumber})
            </h3>
          </div>

          <button
            onClick={() => setIsCallStaffModalOpen(false)}
            className="w-7 h-7 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {isSent ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-950 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-base font-bold text-white">Đã Báo Cho Nhân Viên!</h4>
              <p className="text-xs text-stone-300 max-w-xs mx-auto">
                Tiểu nhị đã nhận được thông báo của Bàn {tableNumber} và đang trên đường tới hỗ trợ Quý khách.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs text-stone-300">
                Quý khách cần hỗ trợ gì tại bàn? Xin vui lòng chọn nhanh bên dưới:
              </p>

              <div className="space-y-2">
                {REQUEST_OPTIONS.map((opt) => {
                  const isChecked = selectedRequest === opt.id;
                  const Icon = opt.icon;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedRequest(opt.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-red-950/80 border-amber-400 text-white shadow-md'
                          : 'bg-[#200c0e] border-[#44181c] text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isChecked ? 'bg-amber-500 text-stone-950' : 'bg-stone-900 text-amber-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                        <div className="text-[10px] text-stone-400">{opt.desc}</div>
                      </div>
                      {isChecked && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="text-xs font-semibold text-amber-300/90 block mb-1">
                  Yêu cầu hoặc ghi chú thêm:
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Ví dụ: Mang giúp đũa muỗng trẻ em..."
                  className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 btn-chinese-primary rounded-xl text-sm font-bold shadow-lg"
                >
                  <Bell className="w-4 h-4 text-amber-300" />
                  <span>RUNG CHUÔNG GỌI PHỤC VỤ</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
