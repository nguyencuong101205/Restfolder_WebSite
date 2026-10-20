import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, Mail, User, MapPin } from 'lucide-react';
import { ChineseSeal } from './ChineseSeal';

export const ReservationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    guests: '4',
    area: 'main', // 'main' | 'vip'
    vipRoom: 'Phòng Long Phụng (VIP 1)',
    specialRequests: ''
  });
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = 'HL-' + Math.floor(100000 + Math.random() * 900000);
    setReservationCode(code);
    
    try {
      const reservationData = {
        ...formData,
        code,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('hoanglong_reservation', JSON.stringify(reservationData));
      
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c8102e', '#ffd700', '#d4af37', '#ffffff']
      });
    } catch (e) {}

    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 modal-overlay-blur overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#18090b] border-2 border-amber-500/70 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-8 text-stone-200 animate-fade-in"
      >
        
        {/* Chinese Top Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-[#2d1115] to-[#1e0a0d] border-b border-[#4d161a] text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-red-700 text-stone-200 hover:text-white flex items-center justify-center transition-all border border-amber-500/30 shadow-lg"
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="flex justify-center mb-1.5">
            <ChineseSeal text="皇龍" subtext="訂座" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-decorative text-amber-200 uppercase">
            ĐẶT BÀN TIỆC HOÀNG LONG
          </h2>
          <p className="font-calligraphy text-amber-400 text-xs sm:text-sm mt-0.5">
            Phục Vụ Yến Tiệc Cung Đình · Trải Nghiệm Thượng Hạng
          </p>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm">
            
            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Ngày dùng bữa:</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-stone-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Khung giờ đến:</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-stone-200 focus:outline-none focus:border-amber-400"
                >
                  <optgroup label="Buổi Trưa (10:30 - 14:00)">
                    <option value="11:00">11:00 Sáng</option>
                    <option value="11:30">11:30 Sáng</option>
                    <option value="12:00">12:00 Trưa</option>
                    <option value="12:30">12:30 Trưa</option>
                    <option value="13:00">13:00 Chiều</option>
                  </optgroup>
                  <optgroup label="Buổi Tối (17:00 - 22:30)">
                    <option value="17:30">17:30 Chiều</option>
                    <option value="18:00">18:00 Tối</option>
                    <option value="18:30">18:30 Tối</option>
                    <option value="19:00">19:00 Tối</option>
                    <option value="19:30">19:30 Tối</option>
                    <option value="20:00">20:00 Tối</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Guests & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Số lượng khách:</span>
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-stone-200 focus:outline-none focus:border-amber-400"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 30].map((num) => (
                    <option key={num} value={num}>
                      {num} Khách {num >= 6 ? '(Ưu đãi phòng VIP)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Khu vực bàn:</span>
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-stone-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="main">Sảnh Cung Đình (Nhộn nhịp)</option>
                  <option value="vip">Phòng Riêng VIP (Yên tĩnh, riêng tư)</option>
                </select>
              </div>
            </div>

            {/* VIP Room Selection */}
            {formData.area === 'vip' && (
              <div className="p-3 bg-[#240e11] border border-amber-500/40 rounded-xl space-y-1 animate-fade-in">
                <span className="text-xs text-amber-300 font-bold block">Chọn Phòng VIP:</span>
                <select
                  value={formData.vipRoom}
                  onChange={(e) => setFormData({ ...formData, vipRoom: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#140608] border border-[#44181c] rounded-lg text-stone-200 text-xs focus:border-amber-400"
                >
                  <option value="Phòng Long Phụng (VIP 1)">Phòng Long Phụng (VIP 1 - Sức chứa 8-12 khách)</option>
                  <option value="Phòng Tứ Quý (VIP 2)">Phòng Tứ Quý (VIP 2 - Sức chứa 10-16 khách)</option>
                  <option value="Phòng Cát Tường (VIP 3)">Phòng Cát Tường (VIP 3 - Sức chứa 6-8 khách)</option>
                  <option value="Đại Tiệc Hoàng Triều">Đại Tiệc Hoàng Triều (20-30 khách)</option>
                </select>
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-2.5 pt-1">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Họ & Tên quý khách:</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required
                  className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Số điện thoại:</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="09xx xxx xxx"
                    required
                    className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email (tùy chọn):</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  Ghi chú tiệc (Sinh nhật, kỷ niệm, chuẩn bị món trước...):
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Quý khách cần chuẩn bị bánh kem, hoa tươi hay yêu cầu riêng xin ghi tại đây..."
                  className="w-full px-3 py-2 bg-[#120507] border border-[#44181c] rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-400 resize-none text-xs"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-xl active:scale-98 flex items-center justify-center gap-2 border border-amber-400/80"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>XÁC NHẬN ĐẶT BÀN TIỆC HOÀNG LONG</span>
              </button>
              <p className="text-[10px] text-stone-400 text-center mt-2">
                Hotline hỗ trợ đặt bàn trực tiếp: <a href="tel:02838889999" className="text-amber-400 font-bold underline">(028) 3888 9999</a>
              </p>
            </div>

          </form>
        ) : (
          /* Confirmation Success View */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold font-mono">
                TIẾP NHẬN ĐẶT BÀN THÀNH CÔNG
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-decorative text-white">
                Kính Chào Quý Khách {formData.name}
              </h3>
              <p className="text-xs text-stone-300 max-w-md mx-auto">
                Hoàng Long Quán đã nhận thông tin đặt bàn của quý khách. Quản lý sẽ liên hệ số <strong>{formData.phone}</strong> trong vòng 10 phút để xác nhận chu đáo nhất.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-[#120507] border border-amber-500/30 rounded-xl p-4 text-left max-w-sm mx-auto space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#3b1519] pb-2">
                <span className="text-stone-400">Mã đặt bàn:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{reservationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Thời gian:</span>
                <span className="text-stone-200 font-semibold">{formData.time} · {formData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Số lượng:</span>
                <span className="text-stone-200 font-semibold">{formData.guests} Khách</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Khu vực:</span>
                <span className="text-stone-200 font-semibold">
                  {formData.area === 'vip' ? formData.vipRoom : 'Sảnh Cung Đình'}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#3b1519] pt-2">
                <span className="text-stone-400">Địa chỉ:</span>
                <span className="text-amber-300 font-medium text-right text-[11px]">
                  Số 88 Đại Lộ Hoàng Long, Quận 5 (Chợ Lớn), TP.HCM
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black uppercase tracking-wider rounded-xl hover:from-amber-400 hover:to-yellow-400 transition-colors text-xs shadow-md"
            >
              Hoàn Tất & Khám Phá Thực Đơn
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
