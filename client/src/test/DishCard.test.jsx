import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DishCard } from '../components/DishCard';

describe('DishCard Component', () => {
  const mockDish = {
    id: 'dish-01',
    name: 'Há Cảo Thủy Tinh Tôm Tươi',
    hanzi: '水晶蝦餃',
    pinyin: 'Shuǐjīng Xiājiǎo',
    category: 'dimsum',
    price: 68000,
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=700',
    description: 'Vỏ bánh trong suốt thấy rõ tôm tươi nguyên con, thơm lừng dầu mè hảo hạng.',
    isSpicy: false,
    isBestSeller: true,
    isChefSpecial: false
  };

  it('renders dish title, hanzi, pinyin and price in VND format', () => {
    const handleOpenDetail = vi.fn();
    render(<DishCard dish={mockDish} onOpenDetail={handleOpenDetail} />);

    expect(screen.getByText('Há Cảo Thủy Tinh Tôm Tươi')).toBeInTheDocument();
    expect(screen.getByText('水晶蝦餃')).toBeInTheDocument();
    expect(screen.getByText('(Shuǐjīng Xiājiǎo)')).toBeInTheDocument();
    expect(screen.getByText('68.000 đ')).toBeInTheDocument();
  });

  it('displays BÁN CHẠY badge when isBestSeller is true', () => {
    render(<DishCard dish={mockDish} onOpenDetail={vi.fn()} />);
    expect(screen.getByText('BÁN CHẠY')).toBeInTheDocument();
  });

  it('shows spicy flavor tag appropriately', () => {
    const spicyDish = { ...mockDish, isSpicy: true };
    const { rerender } = render(<DishCard dish={mockDish} onOpenDetail={vi.fn()} />);
    expect(screen.getByText('🥟 Vị Thanh Đạm')).toBeInTheDocument();

    rerender(<DishCard dish={spicyDish} onOpenDetail={vi.fn()} />);
    expect(screen.getByText('🌶️ Cay Tứ Xuyên')).toBeInTheDocument();
  });

  it('calls onOpenDetail when clicking the card or button', () => {
    const handleOpenDetail = vi.fn();
    render(<DishCard dish={mockDish} onOpenDetail={handleOpenDetail} />);

    const button = screen.getByText('CHỌN MÓN NÀY');
    fireEvent.click(button);
    expect(handleOpenDetail).toHaveBeenCalledWith(mockDish);
  });
});
