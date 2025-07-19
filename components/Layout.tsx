'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // صفحه اصلی سایدبار نداشته باشد
  const isHomePage = pathname === '/';
  
  // اگر کاربر لاگین نباشد یا صفحه اصلی باشد، فقط محتوا را نمایش بده
  if (!user || isHomePage) {
    return <>{children}</>;
  }

  return (
    <div className="layout-wrapper">
      <Navbar onSidebarToggle={toggleSidebar} />
      
      <div className="layout-content">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        
        <main className="main-content with-sidebar">
          {children}
        </main>
      </div>
    </div>
  );
} 