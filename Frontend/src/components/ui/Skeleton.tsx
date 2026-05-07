import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'circular' ? height : '100%'),
    height: height || (variant === 'text' ? '1em' : '100%'),
  };

  return (
    <div
      className={`
        animate-pulse bg-zinc-700 ${variantClasses[variant]} ${className}
      `}
      style={{ ...style, ...props.style } as React.CSSProperties}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
      <Skeleton height={160} variant="rectangular" className="mb-4" />
      <Skeleton width="60%" height={20} className="mb-2" />
      <Skeleton width="80%" height={16} />
      <div className="flex gap-2 mt-4">
        <Skeleton width={60} height={32} />
        <Skeleton width={60} height={32} />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-4 p-4 bg-zinc-800 rounded-lg">
        <Skeleton width={100} height={20} />
        <Skeleton width={150} height={20} />
        <Skeleton width={80} height={20} />
        <Skeleton width={100} height={20} />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 bg-zinc-800/50 rounded-lg">
          <Skeleton width={100} height={16} />
          <Skeleton width={150} height={16} />
          <Skeleton width={80} height={16} />
          <Skeleton width={100} height={16} />
        </div>
      ))}
    </div>
  );
}

export function SkeletonInput({ label = true }: { label?: boolean }) {
  return (
    <div className="space-y-1.5">
      {label && <Skeleton width={80} height={16} />}
      <Skeleton height={42} variant="rectangular" />
    </div>
  );
}