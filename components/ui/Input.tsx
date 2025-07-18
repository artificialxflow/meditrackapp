import React from 'react'
import { IconType } from 'react-icons'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: IconType
  iconPosition?: 'start' | 'end'
  error?: string
  helperText?: string
  fullWidth?: boolean
  variant?: 'default' | 'success' | 'error' | 'warning'
}

export default function Input({
  label,
  icon: Icon,
  iconPosition = 'start',
  error,
  helperText,
  fullWidth = false,
  variant = 'default',
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

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

  const inputClasses = [
    'form-control',
    getVariantClasses(),
    fullWidth ? 'w-100' : '',
    className
  ].filter(Boolean).join(' ')

  const inputGroupClasses = [
    'input-group',
    fullWidth ? 'w-100' : ''
  ].filter(Boolean).join(' ')

  const renderInput = () => {
    if (Icon) {
      return (
        <div className={inputGroupClasses}>
          {iconPosition === 'start' && (
            <span className="input-group-text">
              <Icon />
            </span>
          )}
          <input
            id={inputId}
            className={inputClasses}
            {...props}
          />
          {iconPosition === 'end' && (
            <span className="input-group-text">
              <Icon />
            </span>
          )}
        </div>
      )
    }

    return (
      <input
        id={inputId}
        className={inputClasses}
        {...props}
      />
    )
  }

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      
      {renderInput()}
      
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