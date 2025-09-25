'use client'

import * as React from 'react'
import { ChevronDown, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export interface ComboboxItemProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export interface ComboboxContentProps {
  children: React.ReactNode
  className?: string
}

export interface ComboboxTriggerProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export interface ComboboxInputProps {
  placeholder?: string
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ComboboxContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  searchValue: string
  setSearchValue: (value: string) => void
}>({
  open: false,
  setOpen: () => {},
  searchValue: '',
  setSearchValue: () => {},
})

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  ({ value, onValueChange, placeholder, disabled, className, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')

    return (
      <ComboboxContext.Provider value={{ value, onValueChange, open, setOpen, searchValue, setSearchValue }}>
        <div ref={ref} className={cn('relative', className)} {...props}>
          {children}
        </div>
      </ComboboxContext.Provider>
    )
  }
)
Combobox.displayName = 'Combobox'

const ComboboxTrigger = React.forwardRef<HTMLDivElement, ComboboxTriggerProps>(
  ({ children, className, disabled, ...props }, ref) => {
    const { open, setOpen } = React.useContext(ComboboxContext)

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-10 w-full items-center rounded-md border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        onClick={() => !disabled && setOpen(!open)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ComboboxTrigger.displayName = 'ComboboxTrigger'

const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  ({ placeholder, className, value, onChange, ...props }, ref) => {
    const { searchValue, setSearchValue } = React.useContext(ComboboxContext)

    return (
      <input
        ref={ref}
        type="text"
        className={cn(
          'flex-1 border-0 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0',
          className
        )}
        placeholder={placeholder}
        value={value || searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
          onChange?.(e)
        }}
        {...props}
      />
    )
  }
)
ComboboxInput.displayName = 'ComboboxInput'

const ComboboxButton = React.forwardRef<HTMLButtonElement, { className?: string }>(
  ({ className, ...props }, ref) => {
    const { open, setOpen } = React.useContext(ComboboxContext)

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'flex items-center justify-center px-2 text-gray-500 hover:text-gray-700',
          className
        )}
        onClick={() => setOpen(!open)}
        {...props}
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    )
  }
)
ComboboxButton.displayName = 'ComboboxButton'

const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open, setOpen } = React.useContext(ComboboxContext)

    if (!open) return null

    return (
      <>
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
        <div
          ref={ref}
              className={cn(
            'absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg',
            className
          )}
          {...props}
        >
          {children}
                </div>
      </>
    )
  }
)
ComboboxContent.displayName = 'ComboboxContent'

const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  ({ value, children, disabled, className, ...props }, ref) => {
    const { value: selectedValue, onValueChange, setOpen, searchValue } = React.useContext(ComboboxContext)

    const handleClick = () => {
      if (!disabled && onValueChange) {
        onValueChange(value)
        setOpen(false)
      }
    }

    // Filter items based on search value
    if (searchValue && !children?.toString().toLowerCase().includes(searchValue.toLowerCase())) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          disabled && 'pointer-events-none opacity-50',
          selectedValue === value && 'bg-blue-50 text-blue-900',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        {selectedValue === value && (
          <Check className="ml-auto h-4 w-4" />
        )}
      </div>
    )
  }
)
ComboboxItem.displayName = 'ComboboxItem'

export { Combobox, ComboboxTrigger, ComboboxInput, ComboboxButton, ComboboxContent, ComboboxItem }