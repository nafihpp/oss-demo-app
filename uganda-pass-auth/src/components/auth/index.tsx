'use client';
import { useState, useEffect, useRef } from 'react';
import { digitalPassAuth } from '@/service/auth/digitalpass';
import { detectLoginContext, handleAuthSuccess } from '@/service/auth/oauth';
import { useSearchParams } from 'next/navigation';
import { ERROR_MESSAGES, AUTH_CONSTANTS } from '@/constants/auth';
import { handleAuthError } from '@/utils/auth/errorHandler';
import type { SSEEvent, AuthFlowStatus } from '@/types';
import AuthLayout from './layout';
import LoginFormContent from './form';
import ChallengeView from './challenge';

export default function DigitalPassLogin() {
  const searchParams = useSearchParams();
  const context = detectLoginContext(searchParams);
  const [timeLeft, setTimeLeft] = useState(AUTH_CONSTANTS.CHALLENGE_TIMER_SECONDS);
  const [challengeNumber, setChallengeNumber] = useState<number | null>(null);
  const [status, setStatus] = useState<AuthFlowStatus>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);


  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const handleSubmit = async (identifier: string) => {
    setLoading(true);
    setError('');

    try {
      let result;
      const identifierType = AUTH_CONSTANTS.IDENTIFIER_TYPES.PHONE_NUMBER;

      if (context.type === 'oauth2') {
        if (!context.partnerSessionId) {
          throw new Error(ERROR_MESSAGES.MISSING_SESSION);
        }

        result = await digitalPassAuth.initiateSSOChallenge({
          partner_session_id: context.partnerSessionId,
          identifier,
          identifier_type: identifierType,
        });
      } else {
        result = await digitalPassAuth.initiateChallenge({
          identifier,
          identifier_type: identifierType,
        });
      }

      setChallengeNumber(result.challenge_number);
      setStatus('challenge');

      startSSEMonitoring(result.access_token, context.type === 'oauth2');
    } catch (err: unknown) {
      const authError = handleAuthError(err);
      setError(authError.message);
    } finally {
      setLoading(false);
    }
  };

  const startSSEMonitoring = (accessToken: string, isSSO: boolean) => {
    try {
      const eventSource = digitalPassAuth.setupSSEStream(accessToken, isSSO);
      eventSourceRef.current = eventSource;

      eventSource.onmessage = (event) => {
        const data: SSEEvent = JSON.parse(event.data);

        switch (data.type) {
          case 'status':
            setAttemptsRemaining(data.attemptsRemaining || null);
            if (data.status === 'verified') {
              setStatus('success');
            } else if (data.status === 'failed' || data.status === 'expired') {
              setStatus('error');
              setError(ERROR_MESSAGES.AUTH_FAILED);
            }
            break;

          case 'redirect':
            eventSource.close();
            window.location.href = data.redirect_uri!;
            break;

          case 'tokens':
            eventSource.close();
            handleAuthSuccess(context, {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              user: data.user,
            });
            break;

          case 'error':
            eventSource.close();
            setStatus('error');
            setError(data.message || ERROR_MESSAGES.AUTH_FAILED);
            break;
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        startPolling(accessToken, isSSO);
      };
    } catch (error) {
      console.error('Failed to setup SSE:', error);
      startPolling(accessToken, isSSO);
    }
  };

  const handleBackToForm = () => {
    setStatus('form');
    setError('');
    setChallengeNumber(null);
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
  };

  const startPolling = (accessToken: string, isSSO: boolean) => {
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const status = await digitalPassAuth.getSessionStatus(accessToken);
        setAttemptsRemaining(status.attemptsRemaining);

        if (status.status === 'verified') {
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }

          if (isSSO) {
            setStatus('success');
          } else {
            window.location.href = '/dashboard';
          }
        } else if (['failed', 'expired'].includes(status.status)) {
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }
          setStatus('error');
          setError(ERROR_MESSAGES.AUTH_FAILED);
        }
      } catch (error) {
        console.error('Polling error:', error);
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
        setStatus('error');
        setError(ERROR_MESSAGES.CONNECTION_LOST);
      }
    }, AUTH_CONSTANTS.POLLING_INTERVAL_MS);
  };

  if (status === 'challenge') {
    return (
      <AuthLayout
        showCancelButton
        onCancel={handleBackToForm}
        rightSideImage="/right-single-phone.svg"
        rightSideImageWidth={600}
        rightSideImageHeight={600}
        rightSideImageClass="w-full h-[378px] object-contain"
      >
        <ChallengeView
          challengeNumber={challengeNumber!}
          timeLeft={timeLeft}
          attemptsRemaining={attemptsRemaining!}
          onCancel={handleBackToForm}
        />
      </AuthLayout>
    );
  }
  return (
    <AuthLayout>
      <LoginFormContent
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        onErrorDismiss={() => setError('')}
      />
    </AuthLayout>
  );
}







        