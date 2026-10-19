import React from 'react';
import { Sparkles, Calendar, ChevronDown, Utensils, Award } from 'lucide-react';

export const HeroBanner = ({ onExploreMenu, onOpenReserve }) => {
  return (
    <section className="relative min-h-[82vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Hero Image from Man Ho Hanoi */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/hanjw-chinese-restaurant-wong-chi-ming/site-images/migrated-images/img-8774.jpg?width=1800&height=808"
          alt="Man Ho Chinese Restaurant at JW Marriott Hotel Hanoi"
          className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom"
          loading="eager"
        />
        {/* Multilayered Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Michelin Inspiration Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e1713]/90 border border-[#c5a880]/60 text-[#c5a880] text-xs font-bold tracking-[0.2em] uppercase mb-5 backdrop-blur-md shadow-lg animate-fade-in">
          <Award className="w-4 h-4 text-[#d4af37]" />
          <span>INSPIRED BY 1-STAR MICHELIN MAN HO HONG KONG</span>
        </div>

        {/* Hero Title - A JOURNEY THROUGH TIME */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f5f0ea] tracking-[0.12em] uppercase font-medium leading-tight max-w-4xl drop-shadow-md">
          A JOURNEY THROUGH TIME
        </h1>

        {/* Chinese Subtitle */}
        <div className="font-serif text-[#c5a880] text-sm sm:text-lg tracking-[0.3em] uppercase mt-2.5 mb-4">
          萬豪中餐廳 · 經典粵菜 · 匠心傳承
        </div>

        {/* Description paragraph matching Man Ho site */}
        <p className="text-stone-300 text-xs sm:text-base max-w-2xl font-light leading-relaxed tracking-wide drop-shadow mb-8">
          Discover the story behind Man Ho Chinese Restaurant, inspired by the one-starred Michelin Man Ho Hong Kong, at JW Marriott Hotel Hanoi, where classic recipes, refined craftsmanship, and the enduring traditions of Cantonese cuisine come together.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
          {/* Button 1: RESERVE */}
          <button
            onClick={onOpenReserve}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#b89358] via-[#c5a880] to-[#b89358] hover:from-[#c5a880] hover:to-[#d8bc94] text-stone-950 font-bold uppercase tracking-[0.18em] text-xs sm:text-sm rounded-none sm:rounded-sm transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 border border-[#d8bc94]"
          >
            <Calendar className="w-4 h-4 fill-stone-950" />
            <span>RESERVE A TABLE · ĐẶT BÀN</span>
          </button>

          {/* Button 2: EXPLORE MENUS */}
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-3.5 bg-black/40 hover:bg-[#251e19]/80 text-[#f5f0ea] border border-[#c5a880]/70 hover:border-[#c5a880] font-bold uppercase tracking-[0.18em] text-xs sm:text-sm rounded-none sm:rounded-sm transition-all backdrop-blur-md active:scale-95 flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4 text-[#c5a880]" />
            <span>EXPLORE MENUS · THỰC ĐƠN</span>
          </button>
        </div>

        {/* Bottom 4 Key Stats Bar */}
        <div className="mt-14 pt-8 border-t border-[#c5a880]/30 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-0.5">
            <span className="text-xl sm:text-3xl font-serif text-[#c5a880] font-semibold block">200+</span>
            <span className="text-[10px] sm:text-xs text-stone-400 tracking-wider uppercase font-medium">Món Ăn Quảng Đông</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-xl sm:text-3xl font-serif text-[#c5a880] font-semibold block">6</span>
            <span className="text-[10px] sm:text-xs text-stone-400 tracking-wider uppercase font-medium">Phòng Ăn Riêng VIP</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-xl sm:text-3xl font-serif text-[#c5a880] font-semibold block">150</span>
            <span className="text-[10px] sm:text-xs text-stone-400 tracking-wider uppercase font-medium">Sức Chứa Thực Khách</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-xl sm:text-3xl font-serif text-[#c5a880] font-semibold block">1-STAR</span>
            <span className="text-[10px] sm:text-xs text-stone-400 tracking-wider uppercase font-medium">Michelin Heritage</span>
          </div>
        </div>

      </div>

      {/* Down arrow scroll hint */}
      <div
        onClick={onExploreMenu}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 cursor-pointer text-[#c5a880]/70 hover:text-[#c5a880] transition-colors flex flex-col items-center gap-1 z-10"
      >
        <span className="text-[9px] tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};
