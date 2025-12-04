// Time formatting utilities

/**
 * Formats seconds into MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Formats current date for display
 */
export const formatCurrentDate = (): string => {
  return new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

/**
 * Formats current time for display
 */
export const formatCurrentTime = (): string => {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Gets formatted date and time for login request display
 */
export const getLoginRequestTimestamp = (): string => {
  return `${formatCurrentDate()} at ${formatCurrentTime()}`;
};