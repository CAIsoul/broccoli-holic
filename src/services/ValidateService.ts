export function validateFullName(fullname: string, ignoreWhitespace: boolean = false) {
    if (ignoreWhitespace) {
        fullname = fullname.replaceAll(' ', '');
    }

    return fullname.length >= 3;
}

export function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}