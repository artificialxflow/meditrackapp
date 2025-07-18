'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="text-center p-4">
            <div className="mb-4">
              <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
            </div>
            <h2 className="text-danger mb-3">خطایی رخ داده است</h2>
            <p className="text-muted mb-4">
              متأسفانه مشکلی پیش آمده است. لطفاً صفحه را مجدداً بارگذاری کنید.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({ hasError: false, error: undefined })
                window.location.reload()
              }}
            >
              بارگذاری مجدد
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 