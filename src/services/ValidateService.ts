export function validateFullName(fullname: string, shouldTrim: boolean = false) {
    if (shouldTrim) {
        fullname = fullname.trim();
    }

    return fullname.length >= 3;
}

export function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

