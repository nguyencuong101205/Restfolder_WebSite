import React, { useState, useEffect } from 'react';
import { orderApi } from '../api/orderApi';
import { useAuth } from '../context/AuthContext';
import { ChineseSeal } from '../components/ChineseSeal';
import { ChefHat, Clock, Flame, Utensils, CheckCircle, RefreshCw, AlertTriangle, ArrowLeft, Bell, QrCode } from 'lucide-react';

export const KitchenDashboard = ({ onBackToMenu, onOpenTableManager }) => {
  const { user, isAdmin, isKitchen } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  const fetchOrders = async () => {
    try {
      const res = await orderApi.getAllOrders(filterStatus);
      if (res.success && Array.isArray(res.data)) {
        setOrders(res.data);
      }
    } catch (err) {
      console.warn('Lỗi lấy đơn hàng nhà bếp:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Poll orders every 4 seconds
    const interval = setInterval(fetchOrders, 4000);
    return () => clearInterval(interval);
  }, [filterStatus]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await orderApi.updateStatus(orderId, newStatus);
      await fetchOrders();
    } catch (err) {
      alert(err.message || 'Lỗi cập nhật trạng thái đơn');
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;

  return (
    <div className="min-h-screen bg-[#110708] text-stone-200 pb-20">
      
      {/* Top Bar */}
      <header className="bg-[#1c0b0e] border-b border-[#44181c] sticky top-0 z-30 shadow-xl px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMenu}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-xs font-semibold text-stone-300 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về Trang Thực Đơn</span>
            </button>

            <div className="flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-amber-400" />
              <div>
                <h1 className="font-bold text-base sm:text-lg text-white leading-tight">
                  MÀN HÌNH NHÀ BẾP & ĐIỀU PHỐI (KDS)
                </h1>
                <p className="text-[11px] text-amber-300/80 font-mono">
                  Đăng nhập: {user?.name} ({user?.role?.toUpperCase()})
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={onOpenTableManager}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2a1013] hover:bg-[#38161a] border border-amber-500/40 rounded-lg text-xs font-bold text-amber-200 transition-all"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>In Mã QR Bàn</span>
              </button>
            )}

            <button
              onClick={fetchOrders}
              className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-stone-300"
              title="Làm mới danh sách"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Status Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Tất Cả Đơn', count: orders.length },
            { id: 'pending', label: '🕒 Chờ Bếp Nhận', count: pendingCount, alert: pendingCount > 0 },
            { id: 'preparing', label: '🔥 Đang Nổi Lửa', count: preparingCount },
            { id: 'served', label: '🍽️ Đang Lên Bàn' },
            { id: 'completed', label: '✅ Đã Hoàn Tất' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap flex items-center gap-2 ${
                filterStatus === tab.id
                  ? 'bg-gradient-to-r from-red-800 to-amber-700 border-amber-400 text-white shadow-lg'
                  : 'bg-[#1e0a0d] border-[#3b1519] text-stone-400 hover:border-stone-600'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${tab.alert ? 'bg-red-600 text-white animate-pulse' : 'bg-black/40 text-amber-300'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        {loading ? (
          <div className="text-center py-20 text-stone-400">Đang tải dữ liệu nhà bếp...</div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center bg-[#18090b] border border-[#3b1519] rounded-2xl max-w-md mx-auto p-8">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">Hiện tại không có đơn nào cần xử lý</h3>
            <p className="text-xs text-stone-400 mt-1">
              Khi khách hàng tại bàn quét mã QR và gửi thực đơn, các món sẽ hiển thị trực tiếp tại đây!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {orders.map((ord) => {
              const isUpdating = updatingId === ord.id;
              const hasCallStaff = ord.callStaffRequests && ord.callStaffRequests.length > 0;

              return (
                <div
                  key={ord.id}
                  className={`chinese-card rounded-2xl border-2 flex flex-col justify-between p-5 transition-all ${
                    ord.status === 'pending'
                      ? 'border-amber-500/80 bg-[#250d11] shadow-lg shadow-amber-950/40'
                      : ord.status === 'preparing'
                      ? 'border-red-600/80 bg-[#1f0b0e]'
                      : 'border-[#3b1519] bg-[#160709]'
                  }`}
                >
                  <div>
                    {/* Order Card Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#3b1519]">
                      <div>
                        <span className="text-xl font-black text-amber-300 block">
                          BÀN {ord.tableNumber}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">
                          Mã: #{ord.id.slice(-6)} · {new Date(ord.createdAt).toLocaleTimeString('vi-VN')}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {ord.status === 'pending' && (
                          <span className="px-2.5 py-1 bg-amber-500 text-stone-950 text-xs font-black rounded-lg shadow animate-pulse">
                            CHỜ NHẬN ĐƠN
                          </span>
                        )}
                        {ord.status === 'preparing' && (
                          <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-black rounded-lg shadow">
                            ĐANG NẤU
                          </span>
                        )}
                        {ord.status === 'served' && (
                          <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg shadow">
                            ĐÃ RA MÓN
                          </span>
                        )}
                        {ord.status === 'completed' && (
                          <span className="px-2.5 py-1 bg-emerald-700 text-white text-xs font-bold rounded-lg shadow">
                            HOÀN TẤT
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Customer Call Requests if any */}
                    {hasCallStaff && (
                      <div className="mt-2.5 p-2 bg-red-950/90 border border-red-500/60 rounded-xl text-xs text-red-200 flex items-start gap-2">
                        <Bell className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 animate-bounce" />
                        <div>
                          <span className="font-bold">Khách gọi phục vụ: </span>
                          <span>{ord.callStaffRequests[ord.callStaffRequests.length - 1].requestType}</span>
                          {ord.callStaffRequests[ord.callStaffRequests.length - 1].note && (
                            <p className="italic text-[10px] text-amber-200 mt-0.5">
                              "{ord.callStaffRequests[ord.callStaffRequests.length - 1].note}"
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Overall Order Note */}
                    {ord.note && (
                      <div className="mt-2 p-2 bg-[#2d1216] border border-amber-500/30 rounded-xl text-xs text-amber-200">
                        <span className="font-bold">Ghi chú bàn: </span>
                        <span>{ord.note}</span>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="mt-4 space-y-2.5">
                      {ord.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-[#120507] rounded-xl border border-[#3b1519] flex justify-between items-start"
                        >
                          <div>
                            <div className="font-bold text-sm text-white flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center font-black">
                                {item.quantity}
                              </span>
                              <span>{item.name}</span>
                            </div>

                            {/* Spice level & toppings */}
                            <div className="text-[11px] text-stone-400 mt-1 space-y-0.5 pl-6">
                              {item.spiceLevel && (
                                <span className="inline-block text-red-400 mr-2 font-medium">
                                  🌶️ {item.spiceLevel}
                                </span>
                              )}
                              {item.selectedToppings && item.selectedToppings.length > 0 && (
                                <div className="text-amber-300/80">
                                  +{item.selectedToppings.map(t => t.name).join(', ')}
                                </div>
                              )}
                              {item.note && (
                                <div className="text-amber-200 italic font-mono text-[10px]">
                                  Lưu ý: "{item.note}"
                                </div>
                              )}
                            </div>
                          </div>

                          <span className="text-xs font-bold text-amber-400">
                            {formatVND(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total Amount */}
                    <div className="mt-3 pt-2 border-t border-[#3b1519] flex justify-between items-center text-xs text-stone-300">
                      <span>Tổng tiền bàn:</span>
                      <span className="text-sm font-black text-amber-400">
                        {formatVND(ord.totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Actions / Status Advance Button */}
                  <div className="mt-4 pt-3 border-t border-[#3b1519]">
                    {ord.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, 'preparing')}
                        disabled={isUpdating}
                        className="w-full py-2.5 bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Flame className="w-4 h-4 text-amber-300" />
                        <span>NHẬN ĐƠN & BẮT ĐẦU NẤU 🔥</span>
                      </button>
                    )}

                    {ord.status === 'preparing' && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, 'served')}
                        disabled={isUpdating}
                        className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Utensils className="w-4 h-4" />
                        <span>MÓN ĐÃ CHÍN → RA BÀN PHỤC VỤ</span>
                      </button>
                    )}

                    {ord.status === 'served' && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, 'completed')}
                        disabled={isUpdating}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>THANH TOÁN & DỌN BÀN HOÀN TẤT</span>
                      </button>
                    )}

                    {ord.status === 'completed' && (
                      <div className="text-center text-xs text-emerald-400 font-semibold py-1">
                        ✓ Đơn đã hoàn tất phục vụ
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
