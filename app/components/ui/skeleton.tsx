'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const skeletonVariants = cva(
  'animate-pulse rounded-md bg-gray-200',
  {
    variants: {
      variant: {
        default: 'bg-gray-200',
        light: 'bg-gray-100',
        dark: 'bg-gray-300',
        shimmer: 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]',
      },
      size: {
        sm: 'h-4',
        md: 'h-5',
        lg: 'h-6',
        xl: 'h-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
  circle?: boolean
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, width, height, circle, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant, size }),
          circle && 'rounded-full',
          className
        )}
        style={{
          width: width || (circle ? height : undefined),
          height: height || (circle ? width : undefined),
        }}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

// Predefined skeleton components for common use cases
const SkeletonText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    lines?: number
    className?: string
  }
>(({ className, lines = 3, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'w-full',
            i === lines - 1 && 'w-3/4' // Last line is shorter
          )}
        />
      ))}
    </div>
  )
})
SkeletonText.displayName = 'SkeletonText'

const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('rounded-lg border border-gray-200 p-4 space-y-3', className)}
      {...props}
    >
      <div className="flex items-center space-x-3">
        <Skeleton circle className="h-10 w-10" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonText lines={2} />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
})
SkeletonCard.displayName = 'SkeletonCard'

const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }
>(({ className, size = 'md', ...props }, ref) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return (
    <Skeleton
      ref={ref}
      circle
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  )
})
SkeletonAvatar.displayName = 'SkeletonAvatar'

const SkeletonButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
  }
>(({ className, size = 'md', fullWidth = false, ...props }, ref) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  }

  return (
    <Skeleton
      ref={ref}
      className={cn(
        sizeClasses[size],
        fullWidth ? 'w-full' : 'w-24',
        'rounded-md',
        className
      )}
      {...props}
    />
  )
})
SkeletonButton.displayName = 'SkeletonButton'

const SkeletonTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    rows?: number
    columns?: number
  }
>(({ className, rows = 5, columns = 4, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('space-y-3', className)} {...props}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className={cn(
                'flex-1',
                colIndex === 0 && 'w-1/4', // First column is narrower
                colIndex === columns - 1 && 'w-1/6' // Last column is narrower
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
})
SkeletonTable.displayName = 'SkeletonTable'

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonTable,
  skeletonVariants,
}
