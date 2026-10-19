import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, Mail, User, MapPin } from 'lucide-react';

export const ReservationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    guests: '2',
    area: 'main', // 'main' | 'private'
    privateRoom: 'Lotus Suite',
    specialRequests: ''
  });
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = 'MH-' + Math.floor(100000 + Math.random() * 900000);
    setReservationCode(code);
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#14110f] border border-[#c5a880]/50 rounded-2xl shadow-2xl overflow-hidden my-8 text-stone-200">
        
        {/* Top Gold Stripe */}
        <div className="h-1 bg-gradient-to-r from-[#9e7010] via-[#c5a880] to-[#9e7010]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/80 text-stone-400 hover:text-white hover:bg-red-900/60 transition-colors"
          title="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <div>
            {/* Header */}
            <div className="p-6 sm:p-8 pb-4 text-center border-b border-[#2b2420]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a221b] border border-[#c5a880]/40 text-[#c5a880] text-[11px] font-bold tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>JW Marriott Hotel Hanoi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#f5f0ea] tracking-wider uppercase font-semibold">
                Table Reservation
              </h2>
              <p className="font-serif text-[#c5a880] text-sm mt-1 tracking-widest uppercase">
                Nhà Hàng Quảng Đông Man Ho · 萬豪
              </p>
              <p className="text-xs text-stone-400 mt-2 max-w-md mx-auto">
                Trải nghiệm ẩm thực Quảng Đông thượng hạng chuẩn 1 sao MICHELIN. Đặt bàn trực tiếp để được phục vụ chu đáo nhất.
              </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 pt-6 space-y-4 text-xs sm:text-sm">
              
              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Ngày Đặt Bàn</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#1e1916] border border-[#3d322c] rounded-xl text-stone-200 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Giờ Dùng Bữa</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1e1916] border border-[#3d322c] rounded-xl text-stone-200 focus:outline-none focus:border-[#c5a880]"
                  >
                    <optgroup label="Buổi Trưa (Lunch)">
                      <option value="11:30">11:30 A.M.</option>
                      <option value="12:00">12:00 P.M.</option>
                      <option value="12:30">12:30 P.M.</option>
                      <option value="13:00">01:00 P.M.</option>
                      <option value="13:30">01:30 P.M.</option>
                    </optgroup>
                    <optgroup label="Buổi Tối (Dinner)">
                      <option value="17:30">05:30 P.M.</option>
                      <option value="18:00">06:00 P.M.</option>
                      <option value="18:30">06:30 P.M.</option>
                      <option value="19:00">07:00 P.M.</option>
                      <option value="19:30">07:30 P.M.</option>
                      <option value="20:00">08:00 P.M.</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Guests & Dining Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Số Lượng Khách</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1e1916] border border-[#3d322c] rounded-xl text-stone-200 focus:outline-none focus:border-[#c5a880]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} Khách {num >= 8 ? '(Ưu tiên phòng VIP)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Khu Vực Bàn</span>
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1e1916] border border-[#3d322c] rounded-xl text-stone-200 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="main">Sảnh Chính (Main Dining Hall)</option>
                    <option value="private">Phòng Ăn Riêng VIP (Private Suite)</option>
                  </select>
                </div>
              </div>

              {/* Private Room Selection if private */}
              {formData.area === 'private' && (
                <div className="p-3 bg-[#1e1814] border border-[#c5a880]/30 rounded-xl space-y-1.5 animate-fade-in">
                  <span className="text-xs text-[#c5a880] font-semibold block">Chọn Phòng VIP Man Ho:</span>
                  <select
                    value={formData.privateRoom}
                    onChange={(e) => setFormData({ ...formData, privateRoom: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14100e] border border-[#3d322c] rounded-lg text-stone-200 text-xs focus:border-[#c5a880]"
                  >
                    <option value="Lotus Suite">Phòng Hoa Sen (Lotus Suite - 8-12 khách)</option>
                    <option value="Dragon Room">Phòng Hoàng Long (Imperial Dragon - 12-18 khách)</option>
                    <option value="Phoenix Salon">Phòng Phượng Hoàng (Phoenix Salon - 10-14 khách)</option>
                    <option value="Peony Suite">Phòng Mẫu Đơn (Peony Suite - 6-8 khách)</option>
                    <option value="Jade Room">Phòng Ngọc Bích (Jade Room - 8-10 khách)</option>
                    <option value="Grand Banquet">Đại Tiệc Cung Đình (Grand Banquet - 30-80 khách)</option>
                  </select>
                  <p className="text-[11px] text-stone-400">
                    * Phòng VIP có quản gia riêng và thực đơn thiết kế cá nhân hóa.
                  </p>
                </div>
              )}

              {/* Guest Details */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Họ & Tên Quý Khách</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#1e1916] border border-[#3d322c] rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Số Điện Thoại</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0903 xxx xxx"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#1e1916] border border-[#3d322c] rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Nhận Xác Nhận</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#1e1916] border border-[#3d322c] rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c5a880] uppercase tracking-wider mb-1.5">
                    Ghi Chú Đặc Biệt (Dị ứng, kỷ niệm ngày cưới, sinh nhật...)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Quý khách có yêu cầu đặc biệt về vị trí ngồi, trà hay chế độ ăn xin ghi tại đây..."
                    className="w-full px-3.5 py-2.5 bg-[#1e1916] border border-[#3d322c] rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#c5a880] resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#b89358] via-[#c5a880] to-[#b89358] hover:from-[#c5a880] hover:to-[#d8bc94] text-stone-950 font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl active:scale-98 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-stone-950" />
                  <span>XÁC NHẬN ĐẶT BÀN MAN HO</span>
                </button>
                <p className="text-[11px] text-stone-400 text-center mt-2.5">
                  Hotline hỗ trợ 24/7: <a href="tel:0903290998" className="text-[#c5a880] font-bold underline">0903 290 998</a> · JW Marriott Hotel Hanoi
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Success View */
          <div className="p-8 sm:p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2a221b] border-2 border-[#c5a880] text-[#c5a880] flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-bold">
                XÁC NHẬN ĐẶT BÀN THÀNH CÔNG
              </span>
              <h3 className="text-2xl font-serif font-bold text-white uppercase">
                Cảm Ơn Quý Khách {formData.name}
              </h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Nhà hàng Man Ho tại JW Marriott Hotel Hanoi đã tiếp nhận thông tin đặt bàn của quý khách. Nhân viên sẽ liên hệ qua số {formData.phone} để hoàn tất xác nhận.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-[#1b1613] border border-[#c5a880]/30 rounded-xl p-4 text-left max-w-sm mx-auto space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#2e2520] pb-2">
                <span className="text-stone-400">Mã đặt bàn:</span>
                <span className="font-mono font-bold text-[#c5a880] text-sm">{reservationCode}</span>
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
                  {formData.area === 'private' ? formData.privateRoom : 'Sảnh Chính'}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#2e2520] pt-2">
                <span className="text-stone-400">Địa điểm:</span>
                <span className="text-[#c5a880] font-medium text-right text-[11px]">
                  JW Marriott Hanoi, Số 08 Đỗ Đức Dục, Mễ Trì, Hà Nội
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#c5a880] text-stone-950 font-bold uppercase tracking-wider rounded-xl hover:bg-[#d8bc94] transition-colors text-xs"
            >
              Hoàn Tất & Khám Phá Thực Đơn
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
