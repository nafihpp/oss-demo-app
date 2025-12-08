export * from '@/service/auth/types';

export interface PhoneNumberFormProps {
  onSubmit: (identifier: string) => Promise<void>;
  loading?: boolean;
  error?: string;
  onErrorDismiss?: () => void;
}

// Challenge Display Types
export interface ChallengeViewProps {
  challengeNumber: number;
  timeLeft: number;
  attemptsRemaining: number | null;
  onCancel: () => void;
}

// Auth Flow Types
export type AuthFlowStatus = 'form' | 'challenge' | 'success' | 'error';

export interface AuthFlowState {
  status: AuthFlowStatus;
  identifier: string;
  challengeNumber: number | null;
  accessToken: string;
  timeLeft: number;
  attemptsRemaining: number | null;
  loading: boolean;
  error: string;
}