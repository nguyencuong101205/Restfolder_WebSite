import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryTabs } from '../components/CategoryTabs';

describe('CategoryTabs Component', () => {
  const defaultProps = {
    activeCategory: 'all',
    onSelectCategory: vi.fn(),
    searchQuery: '',
    onSearchChange: vi.fn(),
    onlySpicy: false,
    onToggleSpicy: vi.fn(),
    onlyBestSeller: false,
    onToggleBestSeller: vi.fn(),
    sortByPrice: 'default',
    onSortChange: vi.fn()
  };

  it('renders all category tabs correctly', () => {
    render(<CategoryTabs {...defaultProps} />);
    expect(screen.getByText('Tất Cả Món')).toBeInTheDocument();
    expect(screen.getByText('Dim Sum Nặn Tay')).toBeInTheDocument();
    expect(screen.getByText('Vịt Quay & Nướng')).toBeInTheDocument();
    expect(screen.getAllByText('Lẩu Tứ Xuyên').length).toBeGreaterThanOrEqual(1);
  });

  it('calls onSelectCategory when a category is clicked', () => {
    const handleSelectCategory = vi.fn();
    render(<CategoryTabs {...defaultProps} onSelectCategory={handleSelectCategory} />);

    const dimsumTab = screen.getByText('Dim Sum Nặn Tay');
    fireEvent.click(dimsumTab);
    expect(handleSelectCategory).toHaveBeenCalledWith('dimsum');
  });

  it('triggers onSearchChange when user types in search input', () => {
    const handleSearchChange = vi.fn();
    render(<CategoryTabs {...defaultProps} onSearchChange={handleSearchChange} />);

    const searchInput = screen.getByPlaceholderText(/Tìm món ăn cung đình/i);
    fireEvent.change(searchInput, { target: { value: 'Bào ngư' } });
    expect(handleSearchChange).toHaveBeenCalledWith('Bào ngư');
  });

  it('triggers onToggleSpicy and onToggleBestSeller when filter buttons are clicked', () => {
    const handleToggleSpicy = vi.fn();
    const handleToggleBestSeller = vi.fn();
    render(
      <CategoryTabs
        {...defaultProps}
        onToggleSpicy={handleToggleSpicy}
        onToggleBestSeller={handleToggleBestSeller}
      />
    );

    const spicyBtn = screen.getByText('Vị Cay Tứ Xuyên');
    fireEvent.click(spicyBtn);
    expect(handleToggleSpicy).toHaveBeenCalled();

    const bestSellerBtn = screen.getByText('Món Bán Chạy');
    fireEvent.click(bestSellerBtn);
    expect(handleToggleBestSeller).toHaveBeenCalled();
  });
});
