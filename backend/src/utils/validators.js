export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 6;
}

export function validateRole(role) {
  return ['intern', 'mentor', 'hr'].includes(role);
}

export function validateInternType(type) {
  return ['summer', 'daily'].includes(type);
}

export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { valid: false, error: `${fieldName}不能为空` };
  }
  return { valid: true };
}
