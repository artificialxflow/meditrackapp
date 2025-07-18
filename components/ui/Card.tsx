import React from 'react'
import { IconType } from 'react-icons'

interface CardProps {
  title?: string
  subtitle?: string
  icon?: IconType
  iconColor?: string
  children: React.ReactNode
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footer?: React.ReactNode
  footerClassName?: string
  hover?: boolean
  shadow?: 'sm' | 'md' | 'lg' | 'xl'
  border?: boolean
}

export default function Card({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'primary',
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  footerClassName = '',
  hover = false,
  shadow = 'sm',
  border = true
}: CardProps) {
  const cardClasses = [
    'card',
    border ? 'border' : 'border-0',
    `shadow-${shadow}`,
    hover ? 'hover-shadow-lg' : '',
    className
  ].filter(Boolean).join(' ')

  const headerClasses = [
    'card-header',
    headerClassName
  ].filter(Boolean).join(' ')

  const bodyClasses = [
    'card-body',
    bodyClassName
  ].filter(Boolean).join(' ')

  const footerClasses = [
    'card-footer',
    footerClassName
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClasses}>
      {(title || subtitle || Icon) && (
        <div className={headerClasses}>
          <div className="d-flex align-items-center">
            {Icon && (
              <div className={`w-12 h-12 bg-${iconColor} bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center me-3`}>
                <Icon className={`text-${iconColor} fs-4`} />
              </div>
            )}
            <div>
              {title && <h5 className="card-title mb-1">{title}</h5>}
              {subtitle && <p className="card-subtitle text-muted mb-0">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      
      <div className={bodyClasses}>
        {children}
      </div>
      
      {footer && (
        <div className={footerClasses}>
          {footer}
        </div>
      )}
    </div>
  )
} 