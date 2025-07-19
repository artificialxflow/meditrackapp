import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaUsers, 
  FaPills, 
  FaCalendarAlt, 
  FaCalendarCheck, 
  FaHeartbeat, 
  FaFileAlt, 
  FaBell, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaChevronRight
} from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'داشبورد',
      icon: FaHome,
      href: '/dashboard',
      color: 'primary'
    },
    {
      id: 'patients',
      label: 'بیماران',
      icon: FaUsers,
      href: '/patients',
      color: 'success'
    },
    {
      id: 'medicines',
      label: 'داروها',
      icon: FaPills,
      href: '/medicines',
      color: 'warning'
    },
    {
      id: 'schedules',
      label: 'برنامه‌ها',
      icon: FaCalendarAlt,
      href: '/schedules',
      color: 'info'
    },
    {
      id: 'appointments',
      label: 'قرار ملاقات',
      icon: FaCalendarCheck,
      href: '/appointments',
      color: 'danger'
    },
    {
      id: 'vitals',
      label: 'علائم حیاتی',
      icon: FaHeartbeat,
      href: '/vitals',
      color: 'purple'
    },
    {
      id: 'documents',
      label: 'اسناد',
      icon: FaFileAlt,
      href: '/documents',
      color: 'secondary'
    },
    {
      id: 'notifications',
      label: 'اعلان‌ها',
      icon: FaBell,
      href: '/notifications',
      color: 'orange'
    },
    {
      id: 'profile',
      label: 'پروفایل',
      icon: FaUser,
      href: '/profile',
      color: 'dark'
    }
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-info',
      danger: 'text-danger',
      secondary: 'text-secondary',
      purple: 'text-purple',
      orange: 'text-orange',
      dark: 'text-dark'
    };
    return colorMap[color] || 'text-primary';
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay d-lg-none" 
          onClick={onToggle}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1040
          }}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="mb-0 text-white">
              <FaPills className="me-2" />
              دارویار
            </h5>
            <button 
              className="btn btn-link text-white p-0 d-lg-none"
              onClick={onToggle}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="sidebar-body">
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`sidebar-nav-item ${active ? 'active' : ''}`}
                  onClick={() => {
                    // Close sidebar on mobile after clicking
                    if (window.innerWidth < 992) {
                      onToggle();
                    }
                  }}
                >
                  <div className="d-flex align-items-center">
                    <IconComponent className={`me-3 ${getColorClass(item.color)}`} />
                    <span className="flex-grow-1">{item.label}</span>
                    {active && <FaChevronRight className="text-muted" />}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="text-center text-white-50">
            <small>نسخه 1.0.0</small>
          </div>
        </div>
      </div>
    </>
  );
} 