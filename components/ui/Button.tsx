import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark'
  size?: 'sm' | 'md' | 'lg'
  icon?: IconType
  iconPosition?: 'start' | 'end'
  loading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'start',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  }

  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    sizeClasses[size],
    fullWidth ? 'w-100' : '',
    className
  ].filter(Boolean).join(' ')

  const isDisabled = disabled || loading

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
          <span className="visually-hidden">در حال بارگذاری...</span>
        </span>
      )}
      
      {!loading && Icon && iconPosition === 'start' && (
        <Icon className="me-2" />
      )}
      
      {children}
      
      {!loading && Icon && iconPosition === 'end' && (
        <Icon className="ms-2" />
      )}
    </button>
  )
} 