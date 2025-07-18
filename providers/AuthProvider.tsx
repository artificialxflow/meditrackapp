'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface AuthContextType {
  user: any
  session: any
  loading: boolean
  error: string | null
  login: (data: any) => Promise<any>
  register: (data: any) => Promise<any>
  logout: () => Promise<any>
  forgotPassword: (email: string) => Promise<any>
  resetPassword: (newPassword: string) => Promise<any>
  signInWithGoogle: () => Promise<any>
  signInWithGithub: () => Promise<any>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
} 