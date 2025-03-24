import React from 'react';
import { render, screen } from '@testing-library/react';
import RequestForm, { RequestInviteFormRef, RequestFormData } from '../../src/components/Modal/RequestInvite/RequestForm';
import CustomInput from '../../src/components/CustomInput/CustomInput';

// Mock CustomInput component
jest.mock('../../src/components/CustomInput/CustomInput', () => {
    return jest.fn().mockImplementation(({ ref, type, id, name, placeholder, value, isRequired, extraValidators }) => {
        return (
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                defaultValue={value}
                data-testid={id}
            />
        );
    });
});

describe('RequestForm', () => {
    it('should render the form with all fields', () => {
        const formRef = React.createRef<RequestInviteFormRef>();
        render(<RequestForm ref={formRef} />);

        expect(screen.getByTestId('name')).toBeInTheDocument();
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('confirmEmail')).toBeInTheDocument();
    });
});