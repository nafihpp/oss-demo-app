import { PHONE_PATTERNS } from './const';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Phone number validation for Uganda, UAE, and Greece
export const validatePhoneNumber = (input: string): ValidationResult => {
  if (typeof input !== 'string') {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  const clean = input.replace(/\s+/g, '').trim();

  if (!clean) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Optional: Reject anything containing characters other than + and digits
  if (!/^\+?\d+$/.test(clean)) {
    return {
      isValid: false,
      error: 'Phone number can only contain digits and an optional leading +',
    };
  }

  const matchedPattern = PHONE_PATTERNS.find((pattern) =>
    pattern.regex.test(clean)
  );

  if (!matchedPattern) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number',
    };
  }

  return { isValid: true };
};

// National ID validation for Uganda
export const validateUgandaNationalId = (nationalId: string): ValidationResult => {
  const cleanId = nationalId.replace(/\s+/g, '');
  
  // Uganda National ID format: CF followed by 12-14 alphanumeric characters
  const ugandaNationalIdRegex = /^CF[A-Z0-9]{12,14}$/i;
  
  if (!cleanId) {
    return { isValid: false, error: 'National ID is required' };
  }
  
  if (!ugandaNationalIdRegex.test(cleanId)) {
    return { isValid: false, error: 'Please enter a valid Uganda National ID' };
  }
  
  return { isValid: true };
};

// Generic identifier validation
export const validateIdentifier = (
  identifier: string,
  type: 'phoneNumber' | 'nationalId'
): ValidationResult => {
  switch (type) {
    case 'phoneNumber':
      return validatePhoneNumber(identifier);
    case 'nationalId':
      return validateUgandaNationalId(identifier);
    default:
      return { isValid: false, error: 'Invalid identifier type' };
  }
};