import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTable } from '../context/TableContext';
import { orderApi } from '../api/orderApi';
import confetti from 'canvas-confetti';
import { X, Trash2, Plus, Minus, ShoppingBag, UtensilsCrossed, AlertCircle, Sparkles, Send, Tag, Check, CreditCard, Banknote, QrCode } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    paymentMethod,
    setPaymentMethod,
    discountAmount,
    vat,
    total,
    totalItemsCount
  } = useCart();

  const { tableNumber, setActiveOrder, setIsOrderTrackerOpen } = useTable();
  const [orderNote, setOrderNote] = useState('');
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherMsg, setVoucherMsg] = useState(null); // { type: 'success' | 'error', text: '' }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCartOpen) return null;

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  const handleApplyVoucherCode = (e) => {
    if (e) e.preventDefault();
    if (!voucherInput.trim()) return;
    const result = applyVoucher(voucherInput.trim());
    if (result.success) {
      setVoucherMsg({ type: 'success', text: result.message });
      setVoucherInput('');
    } else {
      setVoucherMsg({ type: 'error', text: result.message });
    }
    setTimeout(() => setVoucherMsg(null), 3500);
  };

  const handleSendOrder = async () => {
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const orderPayload = {
        tableNumber,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          spiceLevel: item.spiceLevel,
          selectedToppings: item.selectedToppings,
          note: item.note
        })),
        note: orderNote,
        customerName: `Khách Bàn ${tableNumber}`,
        voucher: appliedVoucher ? appliedVoucher.code : null,
        discount: discountAmount,
        paymentMethod
      };

      const res = await orderApi.createOrder(orderPayload);
      if (res.success && res.data) {
        // Fire celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#c8102e', '#d4af37', '#ffd700', '#ffffff']
          });
        } catch (e) {}

        // Update active order for current table & open tracker
        setActiveOrder(res.data);
        clearCart();
        setIsCartOpen(false);
        setIsOrderTrackerOpen(true);
      }
    } catch (err) {
      console.error('Lỗi gửi đơn:', err);
      setErrorMsg(err.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden modal-overlay-blur">
      <div className="absolute inset-0 bg-black/60" onClick={() => setIsCartOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#160709] border-l border-[#4a181c] shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#3b1519] bg-[#1e0a0d] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-950 border border-amber-500/50 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Giỏ Món Bàn {tableNumber}</span>
                  <span className="text-xs font-normal text-amber-400 font-calligraphy">点菜单</span>
                </h2>
                <span className="text-xs text-stone-400">
                  {totalItemsCount} món ăn đã chọn
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Cart Items List */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3">
            {errorMsg && (
              <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <UtensilsCrossed className="w-12 h-12 text-stone-600 mb-3" />
                <p className="text-sm font-semibold text-stone-300">Giỏ món bàn đang trống</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Hãy lướt qua thực đơn và chọn những món ăn truyền thống đặc sắc để gửi vào bếp nhé!
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                let unitPrice = item.price;
                if (item.selectedToppings && item.selectedToppings.length > 0) {
                  unitPrice += item.selectedToppings.reduce((sum, t) => sum + (t.price || 0), 0);
                }
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div
                    key={item.itemKey}
                    className="p-3 bg-[#220d10] border border-[#44181c] rounded-xl flex gap-3 relative group"
                  >
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-amber-500/20"
                    />

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-xs sm:text-sm font-bold text-amber-100 line-clamp-1">
                        {item.name}
                      </h4>
                      
                      {/* Customization Details */}
                      <div className="text-[11px] text-stone-400 mt-0.5 space-y-0.5">
                        <span className="inline-block text-red-300 mr-2">
                          🌶️ {item.spiceLevel}
                        </span>
                        {item.selectedToppings && item.selectedToppings.length > 0 && (
                          <div className="text-amber-300/80 line-clamp-1">
                            +{item.selectedToppings.map(t => t.name).join(', ')}
                          </div>
                        )}
                        {item.note && (
                          <div className="italic text-stone-400 text-[10px]">
                            "{item.note}"
                          </div>
                        )}
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-[#120507] px-2 py-0.5 rounded-lg border border-[#44181c]">
                          <button
                            onClick={() => updateQuantity(item.itemKey, -1)}
                            className="text-stone-300 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.itemKey, 1)}
                            className="text-amber-400 hover:text-amber-300 font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-amber-400">
                          {formatVND(itemTotal)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => removeFromCart(item.itemKey)}
                      className="absolute top-2.5 right-2.5 text-stone-500 hover:text-red-400 p-1"
                      title="Xóa món"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}

            {/* Voucher & Coupon Box */}
            {cartItems.length > 0 && (
              <div className="pt-2 border-t border-[#3b1519]">
                <label className="text-xs text-amber-300 font-semibold block mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mã Ưu Đãi Hoàng Long:</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">
                    (HOANGLONG10, DIMSUM50...)
                  </span>
                </label>

                {appliedVoucher ? (
                  <div className="p-2.5 bg-gradient-to-r from-red-950 to-[#220c10] border border-amber-500/50 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-amber-400 text-stone-950 flex items-center justify-center font-black text-xs">
                        %
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-amber-300 text-xs">
                            {appliedVoucher.code}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold">
                            (Đã áp dụng)
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-300 line-clamp-1">
                          {appliedVoucher.title}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeVoucher}
                      className="text-stone-400 hover:text-red-400 text-xs p-1"
                      title="Gỡ bỏ mã này"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyVoucherCode} className="flex gap-2">
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                      placeholder="Nhập mã voucher..."
                      className="flex-1 px-3 py-1.5 bg-[#120507] border border-[#44181c] rounded-xl text-xs text-stone-200 uppercase placeholder-stone-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 shopee-btn shopee-btn--gold text-xs font-bold rounded-xl whitespace-nowrap"
                    >
                      Áp Dụng
                    </button>
                  </form>
                )}

                {voucherMsg && (
                  <p className={`text-[11px] mt-1.5 ${voucherMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {voucherMsg.text}
                  </p>
                )}
              </div>
            )}

            {/* Payment Method Selector */}
            {cartItems.length > 0 && (
              <div className="pt-2 border-t border-[#3b1519]">
                <label className="text-xs text-amber-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hình thức thanh toán tại bàn:</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      paymentMethod === 'cash'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-[#18080a] border-[#3b1519] text-stone-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                    <span className="text-[11px] block">Tiền mặt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      paymentMethod === 'transfer'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-[#18080a] border-[#3b1519] text-stone-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                    <span className="text-[11px] block">Chuyển QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-[#18080a] border-[#3b1519] text-stone-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                    <span className="text-[11px] block">Thẻ POS</span>
                  </button>
                </div>
              </div>
            )}

            {/* Note for the overall order */}
            {cartItems.length > 0 && (
              <div className="pt-2">
                <label className="text-xs text-amber-300/90 font-medium block mb-1">
                  Ghi chú tổng cho bàn {tableNumber}:
                </label>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Ví dụ: Ưu tiên lên Dim Sum trước, chuẩn bị thêm 4 chén nhỏ..."
                  rows={2}
                  className="w-full p-2.5 bg-[#120507] border border-[#44181c] rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
            )}
          </div>

          {/* Drawer Footer: Pricing & Submit */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-[#1a080b] border-t border-[#3b1519] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Tạm tính ({totalItemsCount} món):</span>
                  <span>{formatVND(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Ưu đãi Voucher ({appliedVoucher?.code}):</span>
                    <span>-{formatVND(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>Thuế VAT (8%):</span>
                  <span>{formatVND(vat)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-amber-300 pt-1.5 border-t border-[#331114]">
                  <span>Tổng thanh toán:</span>
                  <span className="text-lg font-black text-amber-400">{formatVND(total)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={clearCart}
                  className="px-3 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700/60 rounded-xl text-stone-400 hover:text-red-300 text-xs transition-colors"
                  title="Xóa toàn bộ giỏ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleSendOrder}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 btn-chinese-primary rounded-xl text-sm font-bold shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Đang chuyển đơn vào bếp...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>GỬI ĐƠN VÀO BẾP 🏮</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-stone-500">
                Món ăn sẽ được nhà bếp bắt đầu chuẩn bị ngay sau khi bạn nhấn nút gửi đơn.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
