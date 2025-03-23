import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../src/components/Modal/BaseModal/Modal';

describe('Modal Component', () => {
    const mockOnCancel = jest.fn();
    const mockOnApply = jest.fn();

    const defaultProps = {
        isOpen: true,
        title: 'Test Modal',
        children: <div>Modal Content</div>,
        closeOnOverlay: true,
        isInProgress: false,
        applyBtnLabel: 'Apply',
        applyBtnInProgresLabel: 'Applying...',
        applyBtnErrorLabel: '',
        onApply: mockOnApply,
        onCancel: mockOnCancel,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders modal with correct props', () => {
        render(<Modal {...defaultProps} />);

        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
        expect(screen.getByText('Apply')).toBeInTheDocument();
    });

    it('closes modal when overlay is clicked and closeOnOverlay is true', () => {
        jest.useFakeTimers();

        act(() => { render(<Modal {...defaultProps} />); });


        jest.advanceTimersByTime(1000);

        const dialog = screen.getByRole('dialog');

        console.log(dialog);
        fireEvent.mouseDown(dialog);

        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('does not close modal when overlay is clicked and closeOnOverlay is false', () => {
        render(<Modal {...defaultProps} closeOnOverlay={false} />);

        fireEvent.mouseDown(screen.getByRole('dialog'));

        expect(mockOnCancel).not.toHaveBeenCalled();
    });

    it('calls onApply when apply button is clicked', () => {
        render(<Modal {...defaultProps} />);

        fireEvent.click(screen.getByText('Apply'));

        expect(mockOnApply).toHaveBeenCalled();
    });

    it('disables apply button when isInProgress is true', () => {
        render(<Modal {...defaultProps} isInProgress={true} />);

        expect(screen.getByText('Applying...')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Applying...'));

        expect(mockOnApply).not.toHaveBeenCalled();
    });

    it('shows error message when applyBtnErrorLabel is provided', () => {
        render(<Modal {...defaultProps} applyBtnErrorLabel="Error occurred" />);

        expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });
});