'use client'

import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/providers/SidebarProvider';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const { user } = useAuth();
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // صفحه اصلی سایدبار نداشته باشد
  const isHomePage = pathname === '/';
  
  // اگر کاربر لاگین نباشد، فقط محتوا را نمایش بده
  if (!user) {
    return <>{children}</>;
  }

  // اگر صفحه اصلی باشد، فقط محتوا را نمایش بده (بدون سایدبار)
  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <div className="layout-wrapper">
      <Navbar />
      
      <div className="layout-content">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        
        <main className="main-content with-sidebar">
          {children}
        </main>
      </div>
    </div>
  );
} 