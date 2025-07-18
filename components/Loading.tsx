import { FaSpinner } from 'react-icons/fa'

interface LoadingProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export default function Loading({ 
  text = 'در حال بارگذاری...', 
  size = 'md',
  fullScreen = false 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'fs-6',
    md: 'fs-5',
    lg: 'fs-4'
  }

  const spinnerSizes = {
    sm: '1rem',
    md: '2rem',
    lg: '3rem'
  }

  const content = (
    <div className="text-center">
      <div 
        className="spinner-border text-primary mb-3" 
        style={{width: spinnerSizes[size], height: spinnerSizes[size]}} 
        role="status"
      >
        <span className="visually-hidden">{text}</span>
      </div>
      <p className={`text-muted mb-0 ${sizeClasses[size]}`}>{text}</p>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-vh-100 bg-gradient-to-br d-flex align-items-center justify-content-center">
        {content}
      </div>
    )
  }

  return content
} 