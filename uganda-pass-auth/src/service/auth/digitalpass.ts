import api from '../interceptor';
import type { DigitalPassInitiateResponse } from './types';

/**
 * Base payload for Digital Pass challenge initiation.
 */
interface ChallengePayload {
  identifier: string;
  identifier_type: 'phoneNumber' | 'nationalId';
}

/**
 * Payload for SSO challenge initiation.
 */
interface SSOChallengePayload extends ChallengePayload {
  partner_session_id: string;
}

/**
 * Response shape for session status checks.
 */
interface SessionStatusResponse {
  status: string;
  attemptsRemaining: number;
  expiresAt: string;
}

// -------------------------------------------------------------------------------------------------
// DigitalPassAuth Service
// -------------------------------------------------------------------------------------------------

export const digitalPassAuth = {
  /**
   * Initiates a Digital Pass login challenge.
   */
  async initiateChallenge(
    payload: ChallengePayload
  ): Promise<DigitalPassInitiateResponse> {
    const { identifier, identifier_type } = payload;

    const response = await api.post('/auth/digital-pass/initiate', {
      identifier,
      identifier_type,
    });

    return response.data;
  },

  /**
   * Initiates a Digital Pass SSO challenge.
   */
  async initiateSSOChallenge(
    payload: SSOChallengePayload
  ): Promise<DigitalPassInitiateResponse> {
    const { partner_session_id, identifier, identifier_type } = payload;

    const response = await api.post('/auth/digital-pass/sso-initiate', {
      partner_session_id,
      identifier,
      identifier_type,
    });

    return response.data;
  },

  /**
   * Opens an SSE stream for real-time challenge updates.
   */
  setupSSEStream(accessToken: string, isSSO: boolean = false): EventSource {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const endpoint = isSSO
      ? '/auth/digital-pass/session/sso-stream'
      : '/auth/digital-pass/session/stream';

    const url = `${baseUrl}${endpoint}?access_token=${encodeURIComponent(
      accessToken
    )}`;

    return new EventSource(url);
  },

  /**
   * Fetches the current Digital Pass authentication session status.
   */
  async getSessionStatus(accessToken: string): Promise<SessionStatusResponse> {
    const response = await api.get('/auth/digital-pass/session/status', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  },
};
