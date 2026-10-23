'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { UserRole } from '@/lib/types';
import {
  Bell,
  Globe,
  Search,
  LogOut,
  ChevronDown,
  ChevronRight,
  Building2,
  CheckCircle,
  Clock,
  Menu,
  UserCheck,
  User,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onMenuClick?: () => void;
  pageTitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Header({ onToggleSidebar, onMenuClick, pageTitle, breadcrumbs }: HeaderProps) {
  const { currentUser, notifications, markNotificationRead, logout, switchUserRole } = useAppStore();
  const { language, toggleLanguage, t } = useI18n();
  const router = useRouter();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const toggleHandler = onToggleSidebar || onMenuClick;

  const demoRoles: { role: UserRole; nameEn: string; nameAr: string; title: string; route: string }[] = [
    { role: 'outsourced_employee', nameEn: 'Ahmed Al Mansoori', nameAr: 'أحمد المنصوري', title: 'Outsourced Employee', route: '/employee/dashboard' },
    { role: 'line_manager', nameEn: 'Dr. Mariam Al Suwaidi', nameAr: 'د. مريم السويدي', title: 'EDE Line Manager', route: '/manager/dashboard' },
    { role: 'ede_hr_admin', nameEn: 'Sultan Al Nuaimi', nameAr: 'سلطان النعيمي', title: 'EDE HR Administrator', route: '/ede/dashboard' },
    { role: 'supplier_esm', nameEn: 'Tariq Al Hashimi', nameAr: 'طارق الهاشمي', title: 'Supplier ESM', route: '/supplier/dashboard' },
    { role: 'supplier_am', nameEn: 'Layla Mahmoud', nameAr: 'ليلى محمود', title: 'Supplier Account Director', route: '/supplier/dashboard' },
    { role: 'supplier_ops_admin', nameEn: 'Fatima Al Zaabi', nameAr: 'فاطمة الزعابي', title: 'Supplier Operations Admin', route: '/supplier/dashboard' },
  ];

  const handleRoleSwitch = (role: UserRole, route: string) => {
    switchUserRole(role);
    setShowUserMenu(false);
    router.push(route);
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.03)] transition-all">
      <div className="w-full max-w-7xl flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Toggle + Breadcrumbs & Context */}
        <div className="flex items-center gap-3 min-w-0">
          {toggleHandler && (
            <button
              onClick={toggleHandler}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden shrink-0 border border-slate-200/80 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 rtl:rotate-180 shrink-0" />}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[#1D68E2] transition-colors truncate max-w-[110px] sm:max-w-[140px] lg:max-w-[180px]"
                    >
                      {t(crumb.label)}
                    </Link>
                  ) : (
                    <span className="text-slate-900 font-bold truncate max-w-[130px] sm:max-w-[180px] lg:max-w-[240px]">
                      {t(crumb.label)}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          ) : pageTitle ? (
            <h1 className="text-sm font-bold text-slate-900 truncate">{t(pageTitle)}</h1>
          ) : null}
        </div>

        {/* Right Side: Global Search + Language Selection + Notifications + Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Global Search */}
          <div className="relative hidden md:block w-48 lg:w-64 group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#1D68E2] rtl:left-auto rtl:right-3 pointer-events-none transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'ar'
                  ? 'بحث سريع...'
                  : 'Search...'
              }
              className="w-full bg-slate-100/70 hover:bg-slate-100 focus:bg-white border border-slate-200/90 rounded-xl pl-9 pr-8 rtl:pl-8 rtl:pr-9 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#1D68E2] focus:ring-4 focus:ring-[#1D68E2]/10 transition-all shadow-2xs font-medium"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 rtl:right-auto rtl:left-2.5 hidden lg:flex items-center pointer-events-none">
              <kbd className="px-1 py-0.2 text-[9px] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-3xs">
                /
              </kbd>
            </div>
          </div>
          {/* 2. Language Selection */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#1D68E2] hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all shadow-2xs"
            title="Switch Language / تبديل اللغة"
          >
            <Globe className="w-4 h-4 text-[#00B3AA]" />
            <span className="font-bold">{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* 3. Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all shadow-2xs"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 zoom-in-95">
                <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">
                    {t('nav.notifications')} ({unreadCount} unread)
                  </span>
                  <span className="text-[10px] font-bold text-[#008F88] bg-[#008F88]/10 px-2 py-0.5 rounded-full border border-[#008F88]/20">
                    UAE EDE Live
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-xs text-slate-400 text-center">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3.5 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                          !n.isRead ? 'bg-sky-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {!n.isRead ? (
                            <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 space-y-1">
                            <p className="font-bold text-slate-900 leading-snug">
                              {language === 'ar' ? n.titleAr : n.titleEn}
                            </p>
                            <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                              {language === 'ar' ? n.messageAr : n.messageEn}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="px-4 py-2 border-t border-slate-100 text-center bg-slate-50/50">
                  <Link
                    href="/employee/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-[#1D68E2] hover:underline font-bold"
                  >
                    View All Notifications &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 4. Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all text-left shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0F2342] to-[#1D68E2] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs ring-2 ring-white">
                {currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="hidden sm:block text-xs">
                <p className="font-bold text-slate-900 leading-tight group-hover:text-[#1D68E2] transition-colors">
                  {language === 'ar' ? currentUser.nameAr || currentUser.name : currentUser.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium leading-tight">
                  {t(`role.${currentUser.role}`)}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in-50 zoom-in-95">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 space-y-1">
                  <p className="font-bold text-slate-900 text-sm">{currentUser.name}</p>
                  <p className="text-slate-500 text-[11px] font-mono">{currentUser.employeeId}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#008F88] font-semibold mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate">{currentUser.supplier}</span>
                  </div>
                </div>

                {/* Navigation links */}
                <div className="py-1 border-b border-slate-100">
                  <Link
                    href="/employee/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-[#1D68E2] font-medium"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t('nav.profile')}</span>
                  </Link>
                  <Link
                    href="/employee/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-[#1D68E2] font-medium"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t('nav.settings')}</span>
                  </Link>
                </div>

                {/* Role Switcher (Nested cleanly in profile) */}
                <div className="py-2 border-b border-slate-100 bg-slate-50/30">
                  <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'ar' ? 'تبديل الحساب التجريبي' : 'Switch Active Persona (Demo)'}
                  </div>
                  {demoRoles.map((dr) => (
                    <button
                      key={dr.role}
                      onClick={() => handleRoleSwitch(dr.role, dr.route)}
                      className={`w-full text-left rtl:text-right px-4 py-1.5 flex items-center justify-between text-[11px] transition-colors ${
                        currentUser.role === dr.role
                          ? 'bg-[#1D68E2]/10 text-[#1D68E2] font-bold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{language === 'ar' ? dr.nameAr : dr.nameEn}</span>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                        {dr.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Logout */}
                <div className="pt-1 px-1">
                  <button
                    onClick={() => {
                      logout();
                      window.location.href = '/login';
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('auth.logout')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
