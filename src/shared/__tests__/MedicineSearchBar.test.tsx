import { IoIosSearch } from 'react-icons/io';
import MedicineSearchBar from '../searchbar/MedicineSearchBar';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('MedicineSearchBar', () => {
  it('renders without crashing', () => {
    render(<MedicineSearchBar />);
    const searchInput = screen.getByPlaceholderText('Search medicine..');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders the search icon', () => {
    render(<MedicineSearchBar />);
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon.tagName).toBe('svg'); // Ensure it's an SVG element
    expect(searchIcon).toHaveClass('text-gray-300');
  });

  it('updates input value on user typing', () => {
    render(<MedicineSearchBar />);
    const searchInput = screen.getByPlaceholderText('Search medicine..');
    userEvent.type(searchInput, 'paracetamol');
    expect(searchInput).toHaveValue('paracetamol');
  });

  it('applies focus styles when input is focused', () => {
    render(<MedicineSearchBar />);
    const searchInput = screen.getByPlaceholderText('Search medicine..');
    expect(searchInput).not.toHaveClass('focus-within:shadow-lg');
    userEvent.click(searchInput);
    expect(searchInput).toHaveFocus();
    expect(searchInput).toHaveClass('focus-within:shadow-lg');
  });
});
