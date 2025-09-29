'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { getInitials, getRandomColor } from '@/lib/utils'

const avatarVariants = cva(
  'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-20 w-20',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  fallback?: string
  showOnlineStatus?: boolean
  onlineStatus?: 'online' | 'offline' | 'away' | 'busy'
  src?: string
  alt?: string
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, fallback, showOnlineStatus, onlineStatus, src, alt, ...props }, ref) => {
  const [imageError, setImageError] = React.useState(false)
  
  const handleImageError = () => {
    setImageError(true)
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online':
        return 'bg-success-500'
      case 'away':
        return 'bg-warning-500'
      case 'busy':
        return 'bg-accent-500'
      case 'offline':
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    >
      <AvatarPrimitive.Image
        className="aspect-square h-full w-full object-cover"
        onError={handleImageError}
        src={src}
        alt={alt}
      />
      <AvatarPrimitive.Fallback
        className={cn(
          'flex h-full w-full items-center justify-center bg-gray-100 text-sm font-medium text-gray-600',
          !imageError && src && 'hidden'
        )}
      >
        {fallback || '?'}
      </AvatarPrimitive.Fallback>
      
      {showOnlineStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
            getStatusColor(onlineStatus)
          )}
        />
      )}
    </AvatarPrimitive.Root>
  )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center bg-gray-100 text-sm font-medium text-gray-600',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Avatar Group Component
export interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max, size = 'md', className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray
    const remainingCount = max ? childrenArray.length - max : 0

    return (
      <div
        ref={ref}
        className={cn('flex -space-x-2', className)}
        {...props}
      >
        {visibleChildren}
        {remainingCount > 0 && (
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 border-2 border-white',
              size === 'sm' && 'h-8 w-8 text-xs',
              size === 'lg' && 'h-12 w-12 text-base',
              size === 'xl' && 'h-16 w-16 text-lg',
              size === '2xl' && 'h-20 w-20 text-xl'
            )}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants }
