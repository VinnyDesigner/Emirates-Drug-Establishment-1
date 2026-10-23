'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import {
  Menu,
  Home,
  Calendar,
  FileText,
  Award,
  User,
  Folder,
  Gift,
  ShieldCheck,
  Clock,
  Headphones,
  Bell,
  HelpCircle,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { language } = useI18n();
  const { isSidebarCollapsed, toggleSidebarCollapse } = useAppStore();

  const isAr = language === 'ar';

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // On mobile screens (< 1024px), close the drawer
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      if (onClose) onClose();
      return;
    }
    // On desktop, collapse or expand sidebar
    toggleSidebarCollapse();
  };

  // EXACT 10 Main Navigation Items
  const mainItems: NavItem[] = [
    {
      label: isAr ? 'لوحة التحكم' : 'Dashboard',
      href: '/employee/dashboard',
      icon: <Home className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'الإجازات' : 'Leave',
      href: '/employee/leave',
      icon: <Calendar className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'قسائم الرواتب' : 'Payslips',
      href: '/employee/payslips',
      icon: <FileText className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'الشهادات' : 'Certificates',
      href: '/employee/certificates',
      icon: <Award className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'ملفي الشخصي' : 'My Profile',
      href: '/employee/profile',
      icon: <User className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'الوثائق' : 'Documents',
      href: '/employee/documents',
      icon: <Folder className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'المستحقات' : 'Entitlements',
      href: '/employee/benefits',
      icon: <Gift className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'التأمين الصحي' : 'Medical Insurance',
      href: '/employee/medical-insurance',
      icon: <ShieldCheck className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'الحضور والانصراف' : 'Attendance',
      href: '/employee/attendance',
      icon: <Clock className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'طلبات الخدمة' : 'Service Requests',
      href: '/employee/service-requests',
      icon: <Headphones className="w-[18px] h-[18px] shrink-0" />,
    },
  ];

  // EXACT 2 Bottom Items below Divider
  const bottomItems: NavItem[] = [
    {
      label: isAr ? 'الإشعارات' : 'Notifications',
      href: '/employee/notifications',
      icon: <Bell className="w-[18px] h-[18px] shrink-0" />,
    },
    {
      label: isAr ? 'المساعدة والدعم' : 'Help & Support',
      href: '/employee/help',
      icon: <HelpCircle className="w-[18px] h-[18px] shrink-0" />,
    },
  ];

  const renderNavLink = (item: NavItem) => {
    const isActive =
      pathname === item.href ||
      (item.href !== '/employee/dashboard' && pathname.startsWith(item.href));

    if (isSidebarCollapsed) {
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          title={item.label}
          className={`group relative flex items-center justify-center w-11 h-11 mx-auto my-1 rounded-xl transition-all duration-200 ${
            isActive
              ? 'bg-gradient-to-tr from-[#1D68E2] to-[#2563EB] text-white shadow-md shadow-blue-600/30'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
          }`}
        >
          {isActive && (
            <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-[#00B3AA]" />
          )}
          <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'}>
            {item.icon}
          </span>
          <span className="sr-only">{item.label}</span>
        </Link>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 mx-3 rounded-xl text-[13px] transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-[#1D68E2] to-[#2563EB] text-white font-semibold shadow-md shadow-blue-600/25 pl-4 rtl:pl-3.5 rtl:pr-4'
            : 'text-slate-300 hover:text-white hover:bg-white/[0.07] font-medium'
        }`}
      >
        {isActive && (
          <span className="absolute left-1.5 rtl:left-auto rtl:right-1.5 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-[#00B3AA]" />
        )}
        <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'}>
          {item.icon}
        </span>
        <span className="truncate">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 z-30 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 z-40 bg-gradient-to-b from-[#0B1E38] via-[#09172B] to-[#0D2444] text-white flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${
          language === 'ar' ? 'lg:right-0 lg:left-auto border-l' : 'lg:left-0 lg:right-auto border-r'
        } border-[#16335C] shadow-2xl select-none`}
      >
        {/* Top Logo & Collapse Toggle */}
        <div
          className={`border-b border-[#16335C]/80 transition-all ${
            isSidebarCollapsed
              ? 'py-4 px-2 flex flex-col items-center justify-center'
              : 'min-h-[64px] px-3.5 py-3 flex items-center justify-between gap-2'
          }`}
        >
          <Link
            href="/"
            className="flex items-center group shrink min-w-0"
            title="Emirates Drug Establishment / مؤسسة الإمارات للدواء"
          >
            {isSidebarCollapsed ? (
              <Image
                src="/ede-mark-white.png"
                alt="EDE"
                width={48}
                height={20}
                className="h-6 w-auto object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
                priority
              />
            ) : (
              <div className="flex items-center pl-0.5 rtl:pl-0 rtl:pr-0.5">
                <Image
                  src="/ede-official-logo.png"
                  alt="Emirates Drug Establishment"
                  width={180}
                  height={36}
                  className="h-8 sm:h-[33px] w-auto max-w-[178px] object-contain drop-shadow-sm group-hover:opacity-90 transition-opacity"
                  priority
                />
              </div>
            )}
          </Link>

          <button
            onClick={handleMenuClick}
            className={`p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-hidden cursor-pointer shrink-0 border border-transparent hover:border-white/10 ${
              isSidebarCollapsed ? 'mt-2' : ''
            }`}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* 10 Navigation Items */}
        <nav className="flex-1 py-2 space-y-1 overflow-y-auto">
          {!isSidebarCollapsed && (
            <div className="px-4 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400/80">
              {isAr ? 'الخدمات الأساسية' : 'Core Services'}
            </div>
          )}
          {mainItems.map(renderNavLink)}

          {/* Divider line before Notifications and Help */}
          <div
            className={`border-t border-[#1C3E6E]/60 my-2.5 ${
              isSidebarCollapsed ? 'mx-3' : 'mx-4'
            }`}
          />

          {!isSidebarCollapsed && (
            <div className="px-4 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400/80">
              {isAr ? 'الدعم والنظام' : 'Support & System'}
            </div>
          )}
          {bottomItems.map(renderNavLink)}
        </nav>

        {/* UAE Federal Network Status Card */}
        {!isSidebarCollapsed && (
          <div className="p-3 mx-3 mb-3 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] flex items-center justify-between backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium">
                {isAr ? 'شبكة الحكومة الاتحادية' : 'Federal Network'}
              </span>
            </div>
            <span className="text-[#00B3AA] font-bold text-[10px]">Active</span>
          </div>
        )}
      </aside>
    </>
  );
}
