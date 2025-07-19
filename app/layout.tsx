import './globals.css'
import { Vazirmatn } from 'next/font/google'
import { AuthProvider } from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'
import Script from 'next/script'

const vazir = Vazirmatn({ 
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazir'
})

export const metadata = {
  title: 'دارویار - مدیریت هوشمند داروها',
  description: 'اپلیکیشن مدیریت دارو و سلامتی برای افراد، خانواده‌ها و مراکز درمانی',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable} font-vazir d-flex flex-column min-vh-100`}>
        <AuthProvider>
          <ThemeProvider>
            <Layout>
              {children}
            </Layout>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
