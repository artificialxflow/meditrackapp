import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MediTrack',
  description: 'Your personal medication and health tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
