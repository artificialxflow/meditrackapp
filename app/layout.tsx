import type { Metadata } from "next";
import Script from "next/script";
import { Vazirmatn } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import "./globals.css";
import { AuthProvider } from '@/providers/AuthProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const vazir = Vazirmatn({
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-vazir',
});

export const metadata: Metadata = {
  title: "دارویار - مدیریت دارو",
  description: "اپلیکیشن مدیریت دارو و یادآوری مصرف",
  keywords: "دارو، مدیریت، یادآوری، سلامت، پزشکی",
  authors: [{ name: "MediTrack Team" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable} data-scroll-behavior="smooth">
      <body className="font-vazir">
        <ErrorBoundary>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ErrorBoundary>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
