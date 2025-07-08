'use client';
import { cn } from '@/lib/utils';

export const AuroraBackground = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full -z-10 transition-bg',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{ top: '10%', left: '10%' }}
          className={cn(
            "absolute h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_40%)] opacity-50 dark:opacity-20 blur-3xl animate-aurora-1"
          )}
        />
        <div
          style={{ top: '50%', left: '60%' }}
          className={cn(
            "absolute h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent))_0%,transparent_50%)] opacity-50 dark:opacity-20 blur-3xl animate-aurora-2"
          )}
        />
          <div
          style={{ top: '60%', left: '5%' }}
          className={cn(
            "absolute h-[35rem] w-[35rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--chart-2))_0%,transparent_50%)] opacity-35 dark:opacity-15 blur-3xl animate-aurora-2 animation-delay-4000"
          )}
        />
        <div
          style={{ top: '15%', left: '70%' }}
          className={cn(
            "absolute h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--chart-4))_0%,transparent_60%)] opacity-35 dark:opacity-15 blur-3xl animate-aurora-1 animation-delay-2000"
          )}
        />
      </div>
    </div>
  );
};

export default AuroraBackground;
