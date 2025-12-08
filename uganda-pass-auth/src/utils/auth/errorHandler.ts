import { ERROR_MESSAGES } from '@/constants/auth';

export interface AuthError {
  code: string;
  message: string;
  originalError?: unknown;
}

/**
 * Converts API errors to user-friendly messages
 */
export function handleAuthError(error: unknown): AuthError {
  const err = error as { response?: { data?: { message?: string } }; message?: string };
  const originalMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.GENERIC_ERROR;
  
  let code: string;
  let message: string;

  if (originalMessage.includes('No identity found')) {
    code = 'NO_IDENTITY';
    message = ERROR_MESSAGES.NO_IDENTITY;
  } else if (originalMessage.includes('No device token')) {
    code = 'NO_DEVICE';
    message = ERROR_MESSAGES.NO_DEVICE;
  } else if (originalMessage.includes('Rate limit')) {
    code = 'RATE_LIMIT';
    message = ERROR_MESSAGES.RATE_LIMIT;
  } else if (originalMessage.includes('failed') || originalMessage.includes('expired')) {
    code = 'AUTH_FAILED';
    message = ERROR_MESSAGES.AUTH_FAILED;
  } else if (originalMessage.includes('Connection')) {
    code = 'CONNECTION_LOST';
    message = ERROR_MESSAGES.CONNECTION_LOST;
  } else if (originalMessage.includes('session')) {
    code = 'MISSING_SESSION';
    message = ERROR_MESSAGES.MISSING_SESSION;
  } else {
    code = 'GENERIC_ERROR';
    message = originalMessage;
  }

  return {
    code,
    message,
    originalError: error,
  };
}