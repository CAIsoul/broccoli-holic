import { validateFullName, validateEmail } from '../../src/services/ValidateService';
import '@testing-library/jest-dom';

describe('Test ValidationService', () => {
    // Test validateFullName
    const fullNameTestData = [
        { params: ['', false], expected: false },
        { params: ['John', false], expected: true },
        { params: ['Jo ', false], expected: true },
        { params: ['J o', false], expected: true },
        { params: [' Joe ', false], expected: true },
        { params: ['', true], expected: false },
        { params: ['Jane', true], expected: true },
        { params: ['Ja ', true], expected: false },
        { params: ['J e', true], expected: true },
    ];

    fullNameTestData.forEach(data => {
        const { params, expected } = data;
        const [value, shouldTrim] = params;

        it(`Validate full name: [${value}] ${shouldTrim ? 'with' : 'without'} trim.`, () => {
            const result = validateFullName.apply(this, params);
            expect(result).toBe(expected);
        });
    });

    // Test validateEmail
    const emailTestData = [
        { email: '', expected: false },
        { email: 'emailaddress!', expected: false },
        { email: 'emailaddress@', expected: false },
        { email: 'emailaddress@@!', expected: false },
        { email: 'emailaddress@@hotmail.', expected: false },
        { email: 'emailaddress@.com', expected: false },
        { email: 'a@b.c', expected: true },
        { email: 'emailaddress@shanghai.co', expected: true },
        { email: 'emailaddress@gmail.com', expected: true },
        { email: 'emailaddress@1.com', expected: true },
    ];

    emailTestData.forEach(({ email, expected }) => {
        it(`Validate email address: [${email}]`, () => {
            expect(validateEmail(email)).toBe(expected);
        });
    });
});

