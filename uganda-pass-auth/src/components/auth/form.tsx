import Image from 'next/image';
import PhoneNumberForm from './phone-input';
import { APP_INFO } from '@/constants/auth';
import { cn, textStyles } from '@/utils';
import { PhoneNumberFormProps } from '@/types';

type LoginFormContentProps = Omit<PhoneNumberFormProps, 'className'>;

export default function LoginFormContent(props: LoginFormContentProps) {
  const {  onSubmit,loading, error, onErrorDismiss } = props;

  /**
   * Splits the tagline into lines in a predictable, readable way.
   * This avoids inline `.map()` logic in JSX.
   */
  const renderTagline = () => {
    if (!APP_INFO.TAGLINE.includes(': ')) return APP_INFO.TAGLINE;

    const [lead, rest] = APP_INFO.TAGLINE.split(': ');
    return (
      <>
        {lead}:<br />
        {rest}
      </>
    );
  };

  /**
   * Help links are extracted for cleaner JSX in the main return.
   */
  const HelpLinks = () => (
    <div className="mt-12 space-y-2">
      <p>
        <span className="border-b !cursor-pointer border-black font-medium text-[16px]">
          Learn how X Pass works
        </span>
      </p>
      <p className="text-sm md:text-base">
        <span className="border-b !cursor-pointer border-black font-medium text-[16px]">
          Need help signing in? Get support
        </span>
      </p>
    </div>
  );

  /**
   * App Store buttons extracted to prevent clutter.
   */
  const StoreButtons = () => (
    <div className="flex flex-row gap-4 mt-6">
      <Image
        src="/google-play.svg"
        alt="Download on Google Play"
        width={138}
        height={54}
        priority={false}
        className='!cursor-pointer'
      />
      <Image
        src="/app-store.svg"
        alt="Download on the App Store"
        width={138}
        height={54}
        priority={false}
        className='!cursor-pointer'
      />
    </div>
  );

  return (
    <>
      {/* Title */}
      <h1 className={cn('mb-2 text-xl md:text-2xl', textStyles.heading)}>
        Sign in Securely with {APP_INFO.NAME}
      </h1>

      {/* Tagline */}
      <p className={cn('mb-6 md:mb-10 text-sm md:text-base', textStyles.body)}>
        {renderTagline()}
      </p>

      {/* Phone number form */}
      <PhoneNumberForm
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        onErrorDismiss={onErrorDismiss}
      />

      {/* help links */}
      <HelpLinks />

      {/* App Store buttons */}
      <StoreButtons />
    </>
  );
}
