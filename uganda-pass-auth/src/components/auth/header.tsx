import Image from 'next/image';
import { memo } from 'react';
import { Button } from '../ui/button';
import { CardHeader, CardTitle, CardDescription } from '../ui/card';

interface AuthHeaderProps {
  /** Controls whether the cancel action is shown on the right side */
  showCancelButton?: boolean;

  /** Invoked when the user clicks the cancel action */
  onCancel?: () => void;
}
function AuthHeaderComponent({ showCancelButton = false, onCancel }: AuthHeaderProps) {
  const shouldShowCancel = showCancelButton && typeof onCancel === 'function';

  return (
   <CardHeader className="flex items-center justify-between border-b">
      <div className="flex items-center gap-3">
        <Image
          src="/app-icon.svg"
          alt="X Pass application icon"
          width={42}
          height={42}
          priority
        />

        <div className="leading-tight">
          <CardTitle>X Pass</CardTitle>
          <CardDescription>Secure Auth System</CardDescription>
        </div>
      </div>

      {shouldShowCancel && (
        <Button
          variant="ghost"
          onClick={onCancel}
          aria-label="Cancel authentication"
          className="h-10 w-40 rounded-full border border-red-700 font-semibold text-red-600 hover:text-red-700"
        >
          Cancel
        </Button>
      )}
    </CardHeader>
  );
}

export default memo(AuthHeaderComponent);
