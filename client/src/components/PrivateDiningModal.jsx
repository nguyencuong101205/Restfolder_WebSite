import React from 'react';
import { X, Users, Sparkles, ShieldCheck, Wine, Crown, Check } from 'lucide-react';

export const PrivateDiningModal = ({ isOpen, onClose, onOpenReserve }) => {
  if (!isOpen) return null;

  const suites = [
    {
      name: 'Lotus Suite (Phòng Hoa Sen)',
      capacity: '8 - 12 Khách',
      desc: 'Không gian thanh tịnh với tông màu gỗ trầm và hoa văn sen cung đình, lý tưởng cho các buổi tiệc gia đình ấm cúng và tiếp đón đối tác ngoại giao.',
      tag: 'Phòng VIP Tiêu Chuẩn'
    },
    {
      name: 'Imperial Dragon (Phòng Hoàng Long)',
      capacity: '12 - 18 Khách',
      desc: 'Phòng tiệc sang trọng bậc nhất với bàn tròn hoàng gia xoay tự động, tầm nhìn hướng vườn xanh ngát và trang bị phòng khách đón tiếp riêng.',
      tag: 'Đại Tiệc Hoàng Gia'
    },
    {
      name: 'Phoenix Salon (Phòng Phượng Hoàng)',
      capacity: '10 - 14 Khách',
      desc: 'Thiết kế tinh xảo kết hợp nghệ thuật ánh sáng và tranh thêu tay truyền thống Quảng Đông, tạo cảm giác quý phái và lãng mạn.',
      tag: 'Tiệc Doanh Nhân'
    },
    {
      name: 'Jade Room (Phòng Ngọc Bích)',
      capacity: '6 - 10 Khách',
      desc: 'Không gian riêng tư tuyệt đối, phong thủy thịnh vượng với các điểm nhấn ngọc bích sang trọng, chuyên phục vụ các thực đơn yến tiệc cá nhân hóa.',
      tag: 'Gặp Gỡ Thượng Lưu'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#14110f] border border-[#c5a880]/50 rounded-2xl shadow-2xl overflow-hidden my-8 text-stone-200">
        
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

        {/* Hero image banner */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-stone-950">
          <img
            src="https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/private-dining-room.png?width=600&height=356"
            alt="Private Dining Rooms at Man Ho"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-bold tracking-widest text-[#c5a880] uppercase block">
              BESPOKE EXPERIENCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase">
              Private Dining Suites
            </h2>
            <p className="text-xs text-amber-200/90 font-serif">
              6 Không Gian Phòng Ăn Riêng Biệt · JW Marriott Hotel Hanoi
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-stone-300 leading-relaxed max-h-[60vh] overflow-y-auto">
          
          <p className="text-stone-300">
            Khám phá trải nghiệm ẩm thực riêng tư đẳng cấp tại Man Ho, nơi không gian sang trọng, thực đơn thiết kế riêng theo khẩu vị và dịch vụ quản gia phục vụ 1:1 được chuẩn bị chu đáo cho từng sự kiện quan trọng của quý khách.
          </p>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 bg-[#1e1814] border border-[#3d322c] rounded-xl flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
              <span className="text-xs font-semibold text-stone-200">Quản gia riêng biệt</span>
            </div>
            <div className="p-3 bg-[#1e1814] border border-[#3d322c] rounded-xl flex items-center gap-2">
              <Wine className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
              <span className="text-xs font-semibold text-stone-200">Trà & Rượu hảo hạng</span>
            </div>
            <div className="p-3 bg-[#1e1814] border border-[#3d322c] rounded-xl flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
              <span className="text-xs font-semibold text-stone-200">Thực đơn cá nhân hóa</span>
            </div>
          </div>

          {/* Suite List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-serif font-bold text-[#c5a880] uppercase tracking-wider">
              Danh Sách Phòng VIP
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {suites.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#1a1412] border border-[#3d322c] hover:border-[#c5a880]/60 rounded-xl transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-white text-xs sm:text-sm font-serif">{s.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2a221b] border border-[#c5a880]/40 text-[#c5a880] font-bold">
                      {s.capacity}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#181310] border-t border-[#2b2420] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors text-xs uppercase tracking-wider font-semibold"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              onClose();
              if (onOpenReserve) onOpenReserve();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#b89358] to-[#c5a880] hover:from-[#c5a880] hover:to-[#d8bc94] text-stone-950 font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
            <span>Đặt Phòng VIP Ngay</span>
          </button>
        </div>

      </div>
    </div>
  );
};
