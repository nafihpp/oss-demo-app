import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import ErrorAlert from '@/components/ui/error-alert';
import { validateIdentifier } from '@/utils/auth/validation';
import { cn, focusRing, textStyles } from '@/utils';
import type { PhoneNumberFormProps } from '@/types';

export default function PhoneNumberForm(props: PhoneNumberFormProps) {
  const { onSubmit, loading, error, onErrorDismiss } = props;
  const [identifier, setIdentifier] = useState('');

  /**
   * Memoized validation so it does not recompute every render.
   */
  const { isValid: isValidPhone, error: validationError } = useMemo(() => {
    return validateIdentifier(identifier, 'phoneNumber');
  }, [identifier]);

  const shouldShowValidationError =
    identifier.length > 0 && !isValidPhone && Boolean(validationError);

  /**
   * Standardized and safe submit handler.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading && isValidPhone && identifier.trim()) {
      await onSubmit(identifier.trim());
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} noValidate>
        <div className="relative">
          <Input
            value={identifier}
            required
            disabled={loading}
            type="tel"
            placeholder="Enter registered mobile number"
            onChange={(e) => setIdentifier(e.target.value)}
            aria-invalid={shouldShowValidationError}
            aria-describedby={shouldShowValidationError ? 'phone-error' : undefined}
            autoComplete="tel"
            inputMode="tel"
            className={cn(
              'h-[72px] pl-6 text-lg bg-gray-100 rounded-full border-0 shadow-none mb-4',
              focusRing,
              shouldShowValidationError
                ? 'border border-red-500 ring-red-500'
                : 'focus:border-yellow-400 focus:ring-yellow-400'
            )}
          />

          <Button
            type="submit"
            variant="secondary"
            disabled={!isValidPhone || loading}
            className={cn(
              'absolute hover:!bg-yellow-600 !cursor-pointer right-2 bottom-2 h-14 w-[160px] rounded-full font-normal',
              'bg-yellow-600 text-white dark:bg-gray-700 dark:text-gray-200',
              'disabled:cursor-not-allowed'
            )}
            aria-disabled={!isValidPhone || loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Proceed'
            )}
          </Button>
        </div>
      </form>

      {/* Inline validation error */}
      {shouldShowValidationError && (
        <p
          id="phone-error"
          className={cn('text-sm text-center mt-2', textStyles.error)}
          role="alert"
        >
          {validationError}
        </p>
      )}

      {/* Server/API error */}
      {error && onErrorDismiss && (
        <ErrorAlert message={error} onDismiss={onErrorDismiss} />
      )}
    </div>
  );
}
