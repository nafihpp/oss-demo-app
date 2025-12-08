// Authentication related constants
export const AUTH_CONSTANTS = {
  CHALLENGE_TIMER_SECONDS: 150 as number,
  POLLING_INTERVAL_MS: 3000 as number,
  IDENTIFIER_TYPES: {
    PHONE_NUMBER: 'phoneNumber' as const,
    NATIONAL_ID: 'nationalId' as const,
  },
};

// Error messages
export const ERROR_MESSAGES = {
  NO_IDENTITY: 'Phone number not registered with Uganda Pass. Please register your identity first or use a different number.',
  NO_DEVICE: 'Device not registered for Uganda Pass. Please register your device first.',
  RATE_LIMIT: 'Too many attempts. Please wait and try again later.',
  AUTH_FAILED: 'Authentication failed or expired',
  CONNECTION_LOST: 'Connection lost',
  MISSING_SESSION: 'Missing partner session ID for OAuth2 flow',
  GENERIC_ERROR: 'Failed to initiate challenge',
} as const;

// App information
export const APP_INFO = {
  NAME: 'X Pass',
  SUBTITLE: 'Powered by NITAU • Secure Login',
  TAGLINE: 'One login for all government services: fast, private, and protected.',
} as const;