'use client'

import * as React from 'react'
import { Input } from './input'
import { cn } from '@/lib/utils'

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
  error?: string
  className?: string
}

const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  ({ value, onChange, length = 4, disabled, error, className }, ref) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null)

    // Initialize input refs array
    React.useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length)
    }, [length])

    // Handle input change
    const handleChange = (index: number, inputValue: string) => {
      // Only allow single digit
      if (inputValue.length > 1) {
        inputValue = inputValue.slice(-1)
      }

      // Only allow numbers
      if (!/^\d*$/.test(inputValue)) {
        return
      }

      const newValue = value.split('')
      newValue[index] = inputValue
      const newValueString = newValue.join('').slice(0, length)
      
      onChange(newValueString)

      // Auto-focus next input
      if (inputValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    // Handle key down
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (!value[index] && index > 0) {
          // If current input is empty, focus previous input
          inputRefs.current[index - 1]?.focus()
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
      
      if (pastedData.length > 0) {
        onChange(pastedData)
        
        // Focus the next empty input or the last input
        const nextIndex = Math.min(pastedData.length, length - 1)
        inputRefs.current[nextIndex]?.focus()
      }
    }

    // Handle focus
    const handleFocus = (index: number) => {
      setFocusedIndex(index)
    }

    // Handle blur
    const handleBlur = () => {
      setFocusedIndex(null)
    }

    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        <div className="flex gap-2 justify-center">
          {Array.from({ length }, (_, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={value[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              disabled={disabled}
              className={cn(
                'w-12 h-12 text-center text-2xl font-bold border-2 transition-all duration-200',
                error
                  ? 'border-accent-500 focus:border-accent-500 focus:ring-accent-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
                focusedIndex === index && 'ring-2 ring-primary-200',
                value[index] && 'border-primary-500 bg-primary-50'
              )}
              aria-label={`Kod ${index + 1}. hanesi`}
            />
          ))}
        </div>
        
        {error && (
          <p className="text-sm text-accent-600 text-center" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
OTPInput.displayName = 'OTPInput'

export { OTPInput }
