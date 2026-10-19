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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay-blur">
      <div className="relative w-full max-w-lg bg-[#1a0b0d] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden animate-fade-scale flex flex-col max-h-[90vh]">
        
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white flex items-center justify-center transition-all border border-amber-500/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-52 sm:h-56 w-full flex-shrink-0 bg-stone-900">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b0d] via-transparent to-black/30"></div>
          
          <div className="absolute bottom-3 left-4 right-4">
            <span className="font-calligraphy text-amber-300 text-lg sm:text-xl drop-shadow">
              {dish.hanzi}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {dish.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-stone-200">
          
          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#240e11] p-3 rounded-xl border border-[#44181c]">
            {dish.description}
          </p>

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
            className="flex items-center gap-2 px-5 py-2.5 btn-chinese-primary rounded-xl text-sm font-bold shadow-lg"
          >
            <Utensils className="w-4 h-4 text-amber-300" />
            <span>Thêm Vào Thực Đơn</span>
          </button>
        </div>

      </div>
    </div>
  );
};
