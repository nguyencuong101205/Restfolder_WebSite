import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CorePillarsSection = ({ onOpenAbout, onExploreMenu, onOpenPrivateDining }) => {
  const pillars = [
    {
      title: 'About Us',
      subtitle: 'Về Chúng Tôi · 萬豪故事',
      image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/about-man-ho.png?width=600&height=356',
      description: 'From the meaning behind its name to the values upheld through the years, Man Ho tells a story of Cantonese culinary heritage and an enduring pursuit of excellence.',
      descVi: 'Gìn giữ tinh hoa ẩm thực Quảng Đông truyền thống và không ngừng theo đuổi sự hoàn hảo trong từng hương vị.',
      actionText: 'Learn More · Khám Phá',
      action: onOpenAbout
    },
    {
      title: 'Our Menu',
      subtitle: 'Thực Đơn Tinh Hoa · 頂級菜單',
      image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/our-menu.png?width=600&height=356',
      description: 'Experience the timeless artistry of traditional Cantonese cuisine, from the refined flavors of the iconic Peking Duck and handcrafted dim sum to the finest locally sourced seafood.',
      descVi: 'Trải nghiệm nghệ thuật ẩm thực từ Vịt quay Bắc Kinh da giòn, dim sum thủ công đến hải sản tươi sống thượng hạng.',
      actionText: 'Explore Menus · Xem Thực Đơn',
      action: onExploreMenu
    },
    {
      title: 'Private Dining Rooms',
      subtitle: 'Phòng Ăn Riêng VIP · 貴賓包房',
      image: 'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/private-dining-room.png?width=600&height=356',
      description: 'Discover Man Ho’s distinctive private dining experiences, where elegant settings, bespoke menus, and personalized service are thoughtfully tailored to every occasion and guest.',
      descVi: 'Không gian 6 phòng tiệc VIP riêng biệt với quản gia chuyên biệt và thực đơn yến tiệc thiết kế riêng theo yêu cầu.',
      actionText: 'Learn More · Đặt Phòng VIP',
      action: onOpenPrivateDining
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0e0c0b] border-b border-[#241c18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-2.5">
          <span className="text-xs font-bold text-[#c5a880] uppercase tracking-[0.25em]">
            EXQUISITE CANTONESE HOSPITALITY
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#f5f0ea] tracking-wider uppercase font-medium">
            The Man Ho Experience
          </h2>
          <div className="w-16 h-0.5 bg-[#c5a880] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
            Nơi hội tụ đỉnh cao nghệ thuật chế tác ẩm thực Trung Hoa tại khách sạn 5 sao JW Marriott Hotel Hanoi.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between bg-[#14110f] border border-[#2b221d] hover:border-[#c5a880]/70 rounded-none sm:rounded-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                {/* Photo with zoom effect */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-transparent to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <span className="text-[11px] font-bold tracking-widest text-[#c5a880] uppercase block">
                    {p.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#f5f0ea] tracking-wide uppercase group-hover:text-[#c5a880] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {p.description}
                  </p>
                  <p className="text-[11px] text-stone-400 italic">
                    {p.descVi}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-7 pt-0 mt-4">
                <button
                  type="button"
                  onClick={p.action}
                  className="w-full py-3 px-4 border border-[#c5a880]/70 hover:border-[#c5a880] bg-transparent hover:bg-[#c5a880] text-[#c5a880] hover:text-stone-950 font-bold uppercase tracking-[0.16em] text-xs transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>{p.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
