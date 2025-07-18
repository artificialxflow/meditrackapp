import React from 'react'
import { IconType } from 'react-icons'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  icon?: IconType
  iconPosition?: 'start' | 'end'
  error?: string
  helperText?: string
  fullWidth?: boolean
  variant?: 'default' | 'success' | 'error' | 'warning'
  options: SelectOption[]
  placeholder?: string
}

export default function Select({
  label,
  icon: Icon,
  iconPosition = 'start',
  error,
  helperText,
  fullWidth = false,
  variant = 'default',
  className = '',
  id,
  options,
  placeholder,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'is-valid'
      case 'error':
        return 'is-invalid'
      case 'warning':
        return 'is-warning'
      default:
        return ''
    }
  }

  const selectClasses = [
    'form-select',
    getVariantClasses(),
    fullWidth ? 'w-100' : '',
    className
  ].filter(Boolean).join(' ')

  const inputGroupClasses = [
    'input-group',
    fullWidth ? 'w-100' : ''
  ].filter(Boolean).join(' ')

  const renderSelect = () => {
    if (Icon) {
      return (
        <div className={inputGroupClasses}>
          {iconPosition === 'start' && (
            <span className="input-group-text">
              <Icon />
            </span>
          )}
          <select
            id={selectId}
            className={selectClasses}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          {iconPosition === 'end' && (
            <span className="input-group-text">
              <Icon />
            </span>
          )}
        </div>
      )
    }

    return (
      <select
        id={selectId}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
        </label>
      )}
      
      {renderSelect()}
      
      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div className="form-text">
          {helperText}
        </div>
      )}
    </div>
  )
} 