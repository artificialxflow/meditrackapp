'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { AuthService, AuthResponse, RegisterData, LoginData } from '@/lib/auth/auth-service'
import { onAuthStateChange } from '@/lib/auth/auth-service'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  })

  // Memoize the auth state update function
  const updateAuthState = useCallback((updates: Partial<AuthState>) => {
    setAuthState(prev => ({ ...prev, ...updates }))
  }, [])

  // Memoize the auth state reset function
  const resetAuthState = useCallback(() => {
    setAuthState({
      user: null,
      session: null,
      loading: false,
      error: null
    })
  }, [])

  useEffect(() => {
    let isMounted = true
    let subscription: any = null

    const checkAuth = async () => {
      try {
        const user = await AuthService.getCurrentUser()
        const session = await AuthService.getCurrentSession()
        
        if (isMounted) {
          updateAuthState({
            user,
            session,
            loading: false,
            error: null
          })
        }
      } catch (error) {
        if (isMounted) {
          updateAuthState({
            user: null,
            session: null,
            loading: false,
            error: 'خطا در بررسی وضعیت احراز هویت'
          })
        }
      }
    }

    checkAuth()

    // Set up auth state change listener
    try {
      const { data: { subscription: authSubscription } } = onAuthStateChange((event, session) => {
        if (!isMounted) return

        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
          updateAuthState({
            user: session?.user ?? null,
            session,
            loading: false,
            error: null
          })
        }
      })

      subscription = authSubscription
    } catch (error) {
      console.error('Error setting up auth state change listener:', error)
    }

    return () => {
      isMounted = false
      if (subscription) {
        try {
          subscription.unsubscribe()
        } catch (error) {
          console.error('Error unsubscribing from auth state change:', error)
        }
      }
    }
  }, [updateAuthState])

  const login = useCallback(async (data: LoginData): Promise<AuthResponse> => {
    updateAuthState({ loading: true, error: null })
    
    const result = await AuthService.login(data)
    
    if (!result.success) {
      updateAuthState({ loading: false, error: result.error || null })
    }
    
    return result
  }, [updateAuthState])

  const register = useCallback(async (data: RegisterData): Promise<AuthResponse> => {
    updateAuthState({ loading: true, error: null })
    
    const result = await AuthService.register(data)
    
    if (!result.success) {
      updateAuthState({ loading: false, error: result.error || null })
    }
    
    return result
  }, [updateAuthState])

  const logout = useCallback(async (): Promise<AuthResponse> => {
    updateAuthState({ loading: true, error: null })
    
    const result = await AuthService.logout()
    
    if (result.success) {
      resetAuthState()
    } else {
      updateAuthState({ loading: false, error: result.error || null })
    }
    
    return result
  }, [updateAuthState, resetAuthState])

  const forgotPassword = useCallback(async (email: string): Promise<AuthResponse> => {
    updateAuthState({ loading: true, error: null })
    
    const result = await AuthService.forgotPassword(email)
    
    updateAuthState({ loading: false, error: result.error || null })
    
    return result
  }, [updateAuthState])

  const resetPassword = useCallback(async (newPassword: string): Promise<AuthResponse> => {
    updateAuthState({ loading: true, error: null })
    
    const result = await AuthService.resetPassword(newPassword)
    
    updateAuthState({ loading: false, error: result.error || null })
    
    return result
  }, [updateAuthState])

  const signInWithGoogle = useCallback(async (): Promise<AuthResponse> => {
    updateAuthState({ loading: true, error: null })
    
    const result = await AuthService.signInWithGoogle()
    
    if (!result.success) {
      updateAuthState({ loading: false, error: result.error || null })
    }
    
    return result
  }, [updateAuthState])

  const signInWithGithub = useCallback(async (): Promise<AuthResponse> => {
    updateAuthState({ loading: true, error: null })
    
    const result = await AuthService.signInWithGithub()
    
    if (!result.success) {
      updateAuthState({ loading: false, error: result.error || null })
    }
    
    return result
  }, [updateAuthState])

  const clearError = useCallback(() => {
    updateAuthState({ error: null })
  }, [updateAuthState])

  // Memoize the return value to prevent unnecessary re-renders
  const authValue = useMemo(() => ({
    ...authState,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    signInWithGoogle,
    signInWithGithub,
    clearError
  }), [
    authState,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    signInWithGoogle,
    signInWithGithub,
    clearError
  ])

  return authValue
} 