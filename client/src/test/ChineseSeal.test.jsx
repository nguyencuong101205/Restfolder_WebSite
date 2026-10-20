import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChineseSeal } from '../components/ChineseSeal';

describe('ChineseSeal Component', () => {
  it('renders default imperial seal text', () => {
    render(<ChineseSeal />);
    expect(screen.getByText('皇龍')).toBeInTheDocument();
    expect(screen.getByText('印')).toBeInTheDocument();
  });

  it('renders custom text and subtext correctly', () => {
    render(<ChineseSeal text="主廚" subtext="特選" />);
    expect(screen.getByText('主廚')).toBeInTheDocument();
    expect(screen.getByText('特選')).toBeInTheDocument();
  });
});
