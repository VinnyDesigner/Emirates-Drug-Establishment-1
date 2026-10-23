'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n';

export default function EmployeePayrollIndexPage() {
  const router = useRouter();
  const { language } = useI18n();

  useEffect(() => {
    router.replace('/employee/payroll/payslips');
  }, [router]);

  return (
    <div className="p-8 text-center text-xs text-slate-400">
      {language === 'ar' ? 'جارٍ التحويل إلى مسيرات الرواتب...' : 'Redirecting to payslips...'}
    </div>
  );
}
