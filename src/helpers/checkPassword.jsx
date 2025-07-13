export function checkPasswordLength(password, length) {
    return (password.length >= length);
}

export function checkPasswordConfirm(password, confirm) {
    return (password === confirm);
}

