'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'shrink-0 bg-gray-200',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = 'Separator'

export { Separator }
