import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Flame, Check, Utensils } from 'lucide-react';

const SPICE_OPTIONS = [
  { id: 'Không cay', label: 'Không cay', desc: 'Thanh đạm, phù hợp trẻ nhỏ', icon: null },
  { id: 'Cay vừa', label: 'Cay dịu thơm', desc: 'Sa tế Triều Châu dịu nhẹ', icon: Flame },
  { id: 'Cay Tứ Xuyên', label: 'Cay tê Tứ Xuyên 🔥', desc: 'Hoa tiêu & ớt khô nồng nàn', icon: Flame }
];

export const DishDetailModal = ({ dish, onClose }) => {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState(dish?.isSpicy ? 'Cay vừa' : 'Không cay');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [note, setNote] = useState('');

  if (!dish) return null;

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' đ';

  const toggleTopping = (topping) => {
    setSelectedToppings(prev => {
      const exists = prev.some(t => t.name === topping.name);
      if (exists) {
        return prev.filter(t => t.name !== topping.name);
      } else {
        return [...prev, topping];
      }
    });
  };

  const toppingsExtraPrice = selectedToppings.reduce((sum, t) => sum + (t.price || 0), 0);
  const singleUnitPrice = dish.price + toppingsExtraPrice;
  const currentTotal = singleUnitPrice * quantity;

  const handleAdd = () => {
    addToCart(dish, {
      quantity,
      spiceLevel,
      selectedToppings,
      note
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay-blur"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#18080a] border border-amber-500/50 rounded-sm shadow-2xl overflow-hidden animate-fade-scale flex flex-col max-h-[90vh]"
      >
        
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-red-700 text-stone-200 hover:text-white flex items-center justify-center transition-all border border-amber-500/30 shadow-lg"
          title="Đóng"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Modal Image & Title Banner */}
        <div className="relative h-56 sm:h-64 w-full flex-shrink-0 bg-stone-900 overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18080a] via-black/40 to-black/30"></div>
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {dish.isBestSeller && (
              <span className="shopee-btn shopee-btn--gold text-[10px] h-6 px-2.5 font-bold">
                ⭐ Bán Chạy
              </span>
            )}
            {dish.isChefSpecial && (
              <span className="shopee-btn shopee-btn--primary text-[10px] h-6 px-2.5 font-bold">
                👨‍🍳 Đặc Sản Quán
              </span>
            )}
          </div>

          {/* Dish Names Overlay on Image */}
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <div className="flex items-baseline gap-2">
              <span className="font-calligraphy text-amber-300 text-xl sm:text-2xl drop-shadow-md">
                {dish.hanzi}
              </span>
              {dish.pinyin && (
                <span className="text-xs text-amber-200/80 italic font-mono">
                  ({dish.pinyin})
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight drop-shadow mt-0.5">
              {dish.name}
            </h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg sm:text-xl font-black text-red-500">
                {formatVND(dish.price)}
              </span>
              <span className="text-xs text-stone-400 line-through">
                {formatVND(Math.round(dish.price * 1.15 / 1000) * 1000)}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-900/70 text-red-200 font-bold ml-1 border border-red-700/50">
                Ưu đãi -15%
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Body: Full Dish Information */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-stone-200">
          
          {/* Detailed Description */}
          <div className="bg-[#200a0d] p-3.5 rounded-sm border border-[#44181c] shadow-inner space-y-1.5">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
              📖 Thông Tin & Hương Vị Món Ăn
            </span>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {dish.description}
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-stone-400 border-t border-[#3b1216]">
              <span>🥢 Phục vụ nóng tại bàn</span>
              <span>•</span>
              <span>{dish.inStock ? '🟢 Còn hàng' : '🔴 Tạm hết'}</span>
              <span>•</span>
              <span>Hoàng Long Quán</span>
            </div>
          </div>

          {/* Spice Level Selection */}
          <div>
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
              Lựa chọn mức độ cay (辣度选择)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SPICE_OPTIONS.map((opt) => {
                const isSelected = spiceLevel === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSpiceLevel(opt.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-red-900/60 border-amber-400 text-white shadow-md ring-1 ring-amber-400/50'
                        : 'bg-[#220c0f] border-[#44181c] text-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <span className="text-[10px] text-stone-400 block mt-0.5">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Toppings */}
          {dish.toppings && dish.toppings.length > 0 && (
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                Món ăn kèm & Topping thêm (加料)
              </label>
              <div className="space-y-2">
                {dish.toppings.map((top, idx) => {
                  const isChecked = selectedToppings.some(t => t.name === top.name);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTopping(top)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-amber-950/40 border-amber-400 text-amber-100'
                          : 'bg-[#220c0f] border-[#44181c] text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-amber-500 border-amber-400 text-stone-950' : 'border-stone-600'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm">{top.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400">
                        +{formatVND(top.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chef Note Input */}
          <div>
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
              Ghi chú cho Đầu Bếp (备注)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ví dụ: Ít dầu mỡ, không hành lá, mang ra cùng món khác..."
              className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#3b1519]">
            <span className="text-xs text-stone-400">Số lượng đĩa / phần</span>
            <div className="flex items-center gap-3 bg-[#120507] px-3 py-1.5 rounded-xl border border-[#44181c]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-200"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-white w-5 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 rounded-lg bg-amber-600 hover:bg-amber-500 flex items-center justify-center text-stone-950 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer: Add Button */}
        <div className="p-4 bg-[#140608] border-t border-[#3b1519] flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-stone-400 block leading-tight">Tổng món này</span>
            <span className="text-lg sm:text-xl font-black text-amber-400">
              {formatVND(currentTotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-2.5 shopee-btn shopee-btn--primary text-xs sm:text-sm font-bold shadow-lg h-10"
          >
            <Utensils className="w-4 h-4 text-white" />
            <span>Thêm Vào Bàn Ăn</span>
          </button>
        </div>

      </div>
    </div>
  );
};
