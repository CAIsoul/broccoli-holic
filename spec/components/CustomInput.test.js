import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomInput, { DEFAULT_VALIDATORS } from '../../src/components/CustomInput/CustomInput';

describe('Test CustomInput Component', () => {
    it('renders input with default props', () => {
        render(<CustomInput type="text" id="test-input" name="test-input" />);

        // Check existence of the input element
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('id', 'test-input');
        expect(inputElement).toHaveAttribute('name', 'test-input');
    });

    it('updates input value on change', async () => {
        render(<CustomInput type="text" id="test-input" name="test-input" />);

        const inputElement = screen.getByRole('textbox');
        await userEvent.type(inputElement, 'Hello');

        expect(inputElement).toHaveValue('Hello');
    });

    it('shows error message when required input is empty', () => {
        const ref = React.createRef();
        render(
            <CustomInput
                type="text"
                id="test-input"
                name="test-input"
                isRequired={true}
                ref={ref}
            />
        );

        act(() => {
            ref.current.triggerValidation();
        });

        const errorMessage = screen.getByText(DEFAULT_VALIDATORS.REQUIRED.error);
        expect(errorMessage).toBeInTheDocument();
    });

    it('shows error message when email format is invalid', async () => {
        jest.useFakeTimers();

        const ref = React.createRef();
        render(
            <CustomInput
                type="email"
                id="test-input"
                name="test-input"
                isRequired={true}
                ref={ref}
            />
        );

        const inputElement = screen.getByRole('textbox');

        act(() => {
            fireEvent.change(inputElement, { target: { value: "invalid address" } });

            // Error message does not show immediately.
            expect(screen.queryByText(DEFAULT_VALIDATORS.EMAIL_FORMAT.error)).not.toBeInTheDocument();
            jest.advanceTimersByTime(800);
        });

        expect(screen.getByText(DEFAULT_VALIDATORS.EMAIL_FORMAT.error)).toBeInTheDocument();
    });

    it('triggerValidation returns false when validation fails', () => {
        const ref = React.createRef();
        render(
            <CustomInput
                type="text"
                id="test-input"
                name="test-input"
                isRequired={true}
                ref={ref}
            />
        );


        let isValid;
        act(() => {
            isValid = ref.current.triggerValidation();
        });

        expect(isValid).toBe(false);

        const errorMessage = screen.getByText(DEFAULT_VALIDATORS.REQUIRED.error);
        expect(errorMessage).toBeInTheDocument();
    });

    it('validateValue returns correct error message', () => {
        const ref = React.createRef();
        render(
            <CustomInput
                type="email"
                id="test-input"
                name="test-input"
                isRequired={true}
                ref={ref}
            />
        );

        const errorMessage = ref.current.validateValue('invalid-email', 1);
        expect(errorMessage).toBe(DEFAULT_VALIDATORS.EMAIL_FORMAT.error);
    });
});