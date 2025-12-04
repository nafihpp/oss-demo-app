import { Clock, Hourglass } from "lucide-react";
import { LoadingSvg } from "@/components/loading";
import { formatTime, getLoginRequestTimestamp } from "@/utils/time";
import { APP_INFO } from "@/constants/auth";
import type { ChallengeViewProps } from "@/types";
import { useMemo } from "react";
import { cn } from "@/utils";

export default function ChallengeView(props: ChallengeViewProps) {
  const { challengeNumber, timeLeft } = props;

  // Stable timestamp (captured once)
  const loginTimestamp = useMemo(() => getLoginRequestTimestamp(), []);

  // Memoized formatted time
  const remainingTime = useMemo(() => formatTime(timeLeft), [timeLeft]);

  // Safe tagline parsing with graceful fallback
  const { title, subtitle } = useMemo(() => {
    const parts = APP_INFO.TAGLINE.split(":");
    return {
      title: parts[0]?.trim() ?? "",
      subtitle: parts[1]?.trim() ?? "",
    };
  }, []);

  return (
    <section className={cn("w-full lg:w-3/4")}>
      <h1 className="text-[#333] mb-2 text-xl md:text-2xl font-semibold">
        Sign in Securely with {APP_INFO.NAME}
      </h1>

      <p className="mb-6 md:mb-10 text-black/50 text-sm md:text-base">
        {title && <span>{title}:</span>}
        <br />
        {subtitle && <span>{subtitle}</span>}
      </p>

      <div className="mb-6 md:mb-10">
        <p className="text-black/50 text-sm md:text-base">Login request from</p>
        <p className="text-red-600 font-medium text-lg">
          Ugov Portal: {loginTimestamp}
        </p>
      </div>

      <div>
        <div className="relative flex items-center justify-center">
          <LoadingSvg />
          <p className="text-5xl font-normal absolute">
            {challengeNumber}
          </p>
        </div>

        <div className="flex gap-6 my-8 items-center">
          <p className="text-[#D65D2F] flex gap-2 items-center">
            <Hourglass className="w-4 h-4" />
            Waiting for your confirmation
          </p>

          <p className="text-black flex gap-2 items-center">
            <Clock className="w-4 h-4" />
            Time Remaining:{" "}
            <span className="font-semibold">
              {remainingTime}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
