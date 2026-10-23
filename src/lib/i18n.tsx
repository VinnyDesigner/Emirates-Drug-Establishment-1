'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface I18nContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    'app.title': 'Emirates Drug Establishment',
    'app.subTitle': 'Employee Services & Outsourcing Management',
    'app.tagline': 'Federal Regulatory Authority for Pharmaceuticals & Medical Products',
    'portal.employee': 'Employee Self Service',
    'portal.manager': 'Line Manager Portal',
    'portal.supplier': 'Supplier Operations Portal',
    'portal.establishment': 'Establishment Governance Portal',
    
    // Auth
    'auth.login': 'Sign In',
    'auth.logout': 'Sign Out',
    'auth.emailOrId': 'Employee ID or Work Email',
    'auth.password': 'Password',
    'auth.rememberMe': 'Remember this workstation',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.otpTitle': 'Two-Factor Authentication',
    'auth.otpSubtitle': 'A 6-digit verification code has been dispatched to your registered UAE mobile/email.',
    'auth.verifyOtp': 'Verify & Access Portal',
    'auth.resendOtp': 'Resend Code',
    'auth.demoRole': 'Prototype Quick Role Switcher',
    'auth.demoModeDesc': 'Select any enterprise persona to inspect corresponding role-gated permissions and workflows:',
    'auth.invalidOtp': 'Invalid verification code. Use 123456 for demo.',

    // Common Nav
    'nav.dashboard': 'Dashboard',
    'nav.leave': 'Leave Management',
    'nav.payroll': 'Payroll & Payslips',
    'nav.certificates': 'Official Certificates',
    'nav.profile': 'My Profile & Banking',
    'nav.documents': 'Document Vault',
    'nav.airTickets': 'Air Tickets & Travel',
    'nav.benefits': 'Benefits & End of Service',
    'nav.insurance': 'Medical Insurance & Claims',
    'nav.attendance': 'Attendance Records',
    'nav.requests': 'Service Requests & Inquiries',
    'nav.notifications': 'Notification Center',
    'nav.settings': 'Security & Preferences',
    'nav.approvals': 'Approvals Inbox',
    'nav.team': 'Team Overview',
    'nav.leaveCalendar': 'Team Leave Calendar',
    'nav.workforce': 'Outsourced Workforce',
    'nav.departments': 'Department Distribution',
    'nav.costs': 'Outsourcing Costs & Invoices',
    'nav.vacancies': 'Vacancies & Replacements',
    'nav.performance': 'RFP SLA Compliance',
    'nav.auditTrail': 'Electronic Audit Trail',
    'nav.reports': 'Reporting & Analytics',
    'nav.escalations': 'Account Escalations',
    'nav.traceability': 'RFP Compliance Matrix',

    // Statuses
    'status.active': 'Active',
    'status.submitted': 'Submitted',
    'status.under_review': 'Under Review',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    'status.processing': 'Processing',
    'status.issued': 'Issued',
    'status.verified': 'Verified',
    'status.pending_verification': 'Pending Verification',
    'status.renewal_in_progress': 'Renewal In Progress',
    'status.expired': 'Expired',
    'status.returned_for_clarification': 'Returned for Clarification',
    'status.on_track': 'On Track',
    'status.breached': 'SLA Breached',
    'status.compliant': 'Compliant',

    // Common Actions
    'action.apply': 'Apply',
    'action.submit': 'Submit Request',
    'action.approve': 'Approve',
    'action.reject': 'Reject',
    'action.return': 'Return for Clarification',
    'action.download': 'Download',
    'action.preview': 'Preview',
    'action.upload': 'Upload Document',
    'action.search': 'Search...',
    'action.filter': 'Filter',
    'action.exportExcel': 'Export Excel',
    'action.exportPdf': 'Export PDF',
    'action.cancel': 'Cancel',
    'action.save': 'Save Changes',
    'action.view': 'View Details',
    'action.refresh': 'Refresh',

    // Roles
    'role.outsourced_employee': 'Outsourced Employee',
    'role.line_manager': 'Establishment Line Manager',
    'role.ede_hr_admin': 'EDE HR & Support Services Admin',
    'role.supplier_esm': 'Supplier Employee Services Lead',
    'role.supplier_am': 'Supplier Account Director',
    'role.supplier_ops_admin': 'Supplier Operations Administrator',
    'role.establishment_admin': 'Establishment Administrator',

    // Metrics & Badges
    'metric.annualLeaveBalance': 'Annual Leave Balance',
    'metric.pendingRequests': 'Pending Requests',
    'metric.attendanceRate': 'Attendance Rate',
    'metric.expiringDocs': 'Documents Expiring Soon',
    'metric.totalWorkforce': 'Total Outsourced Personnel',
    'metric.slaCompliance': 'Overall SLA Compliance',
    'metric.openVacancies': 'Open Staffing Orders',
    'metric.daysRemaining': 'days remaining',

    // Currency
    'currency.aed': 'AED',
  },
  ar: {
    // Brand & Header
    'app.title': 'مؤسسة الإمارات للدواء',
    'app.subTitle': 'خدمات الموظفين وإدارة القوى العاملة المؤجرة',
    'app.tagline': 'الهيئة الاتحادية المعنية بتنظيم الأدوية والمستلزمات الطبية والرعاية الصحية',
    'portal.employee': 'بوابة الخدمة الذاتية للموظف',
    'portal.manager': 'بوابة المدير المباشر',
    'portal.supplier': 'بوابة عمليات المزوّد',
    'portal.establishment': 'بوابة حوكمة المؤسسة',

    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'auth.emailOrId': 'الرقم الوظيفي أو البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.rememberMe': 'تذكر بيانات تسجيل الدخول',
    'auth.forgotPassword': 'هل نسيت كلمة المرور؟',
    'auth.otpTitle': 'التحقق الثنائي (2FA)',
    'auth.otpSubtitle': 'تم إرسال رمز تحقق مكون من 6 أرقام إلى رقم هاتفك المسجل أو بريدك.',
    'auth.verifyOtp': 'تأكيد الرمز والدخول',
    'auth.resendOtp': 'إعادة إرسال الرمز',
    'auth.demoRole': 'مبدل الأدوار السريع للعرض التجريبي',
    'auth.demoModeDesc': 'اختر أي حساب لاختبار الصلاحيات والمسارات المعتمدة وفق كراسة الشروط:',
    'auth.invalidOtp': 'رمز التحقق غير صحيح. استخدم 123456 للنسخة التجريبية.',

    // Common Nav
    'nav.dashboard': 'لوحة المؤشرات',
    'nav.leave': 'إدارة الإجازات',
    'nav.payroll': 'الرواتب والمسيرات',
    'nav.certificates': 'الشهادات الرسمية',
    'nav.profile': 'ملفي الشخصي والحساب المصرفي',
    'nav.documents': 'مستودع الوثائق الثبوتية',
    'nav.airTickets': 'تذاكر السفر السنوية',
    'nav.benefits': 'المزايا ومكافأة نهاية الخدمة',
    'nav.insurance': 'التأمين الصحي والمطالبات',
    'nav.attendance': 'سجل الحضور والانصراف',
    'nav.requests': 'الطلبات والاستفسارات والشكاوى',
    'nav.notifications': 'مركز الإشعارات',
    'nav.settings': 'الأمان والتفضيلات',
    'nav.approvals': 'صندوق الاعتمادات والموافقات',
    'nav.team': 'نظرة عامة على الفريق',
    'nav.leaveCalendar': 'تقويم إجازات الفريق',
    'nav.workforce': 'القوى العاملة المؤجرة',
    'nav.departments': 'توزيع الإدارات والأقسام',
    'nav.costs': 'تكاليف التعاقد والفواتير',
    'nav.vacancies': 'الشواغر والإحلال الوظيفي',
    'nav.performance': 'مؤشرات مستوى الخدمة (SLA)',
    'nav.auditTrail': 'سجل التدقيق والمتابعة الإلكتروني',
    'nav.reports': 'التقارير والتحليلات',
    'nav.escalations': 'التصعيدات والمتابعة التشغيلية',
    'nav.traceability': 'مصفوفة مطابقة كراسة الشروط',

    // Statuses
    'status.active': 'نشط',
    'status.submitted': 'مُقدَّم',
    'status.under_review': 'قيد المراجعة',
    'status.approved': 'معتمد',
    'status.rejected': 'مرفوض',
    'status.processing': 'قيد المعالجة',
    'status.issued': 'تم الإصدار',
    'status.verified': 'تم التحقق',
    'status.pending_verification': 'بانتظار التحقق',
    'status.renewal_in_progress': 'التجديد جارٍ',
    'status.expired': 'منتهي الصلاحية',
    'status.returned_for_clarification': 'مُعاد للاستيضاح',
    'status.on_track': 'وفق المستهدف',
    'status.breached': 'تجاوز المهلة',
    'status.compliant': 'مطابق',

    // Common Actions
    'action.apply': 'تقديم طلب',
    'action.submit': 'إرسال الطلب',
    'action.approve': 'اعتماد وموافقة',
    'action.reject': 'رفض الطلب',
    'action.return': 'إعادة للاستيضاح',
    'action.download': 'تحميل',
    'action.preview': 'معاينة',
    'action.upload': 'رفع وثيقة',
    'action.search': 'بحث...',
    'action.filter': 'تصفية',
    'action.exportExcel': 'تصدير إكسل',
    'action.exportPdf': 'تصدير PDF',
    'action.cancel': 'إلغاء',
    'action.save': 'حفظ التعديلات',
    'action.view': 'عرض التفاصيل',
    'action.refresh': 'تحديث',

    // Roles
    'role.outsourced_employee': 'موظف خارجي (معار)',
    'role.line_manager': 'المدير المباشر بالمؤسسة',
    'role.ede_hr_admin': 'مسؤول الموارد البشرية والخدمات المساندة بالمؤسسة',
    'role.supplier_esm': 'مسؤول خدمات الموظفين بالمزوّد',
    'role.supplier_am': 'مدير الحساب التشغيلي بالمزوّد',
    'role.supplier_ops_admin': 'مسؤول العمليات والتوظيف بالمزوّد',
    'role.establishment_admin': 'مسؤول حوكمة المؤسسة',

    // Metrics & Badges
    'metric.annualLeaveBalance': 'رصيد الإجازة السنوية',
    'metric.pendingRequests': 'الطلبات قيد المتابعة',
    'metric.attendanceRate': 'نسبة الالتزام بالحضور',
    'metric.expiringDocs': 'وثائق تشارف على الانتهاء',
    'metric.totalWorkforce': 'إجمالي الكوادر المؤجرة',
    'metric.slaCompliance': 'نسبة الالتزام بمستوى الخدمة',
    'metric.openVacancies': 'طلبات التوظيف النشطة',
    'metric.daysRemaining': 'يوم متبقٍ',

    // Currency
    'currency.aed': 'درهم إماراتي',
  },
};

const commonPhraseMap: Record<string, string> = {
  // Navigation & General
  'Portal': 'البوابة',
  'Home': 'الرئيسية',
  'Dashboard': 'لوحة المؤشرات',
  'Employee Dashboard': 'لوحة تحكم الموظف',
  'Line Manager Portal': 'بوابة المدير المباشر',
  'Supplier Operations Portal': 'بوابة عمليات المزوّد',
  'Establishment Governance Portal': 'بوابة حوكمة المؤسسة',
  'Payroll & Payslips': 'الرواتب وقسائم الدفع',
  'Payroll & Electronic Payslips': 'الرواتب وقسائم الدفع الإلكترونية',
  'Monthly Salary Statements': 'كشوف الرواتب الشهرية',
  'Payslip Archive': 'أرشيف قسائم الرواتب',
  'Filter Year:': 'تصفية السنة:',
  'Filter:': 'تصفية:',
  'Request Salary Certificate': 'طلب شهادة راتب',
  'Official Certificates': 'الشهادات الرسمية',
  'Leave Management': 'إدارة الإجازات',
  'Leave': 'الإجازات',
  'My Profile': 'ملفي الشخصي',
  'My Profile & Banking': 'ملفي الشخصي والحساب المصرفي',
  'Documents': 'مستودع الوثائق',
  'Document Vault': 'مستودع الوثائق الثبوتية',
  'Entitlements': 'المستحقات والمزايا',
  'Benefits & End of Service': 'المزايا ومكافأة نهاية الخدمة',
  'Medical Insurance': 'التأمين الصحي',
  'Medical Insurance & Claims': 'التأمين الصحي والمطالبات',
  'Attendance': 'الحضور والانصراف',
  'Attendance Records': 'سجلات الحضور والانصراف',
  'Service Requests': 'طلبات الخدمة',
  'Service Requests & Inquiries': 'الطلبات والاستفسارات',
  'Notifications': 'مركز الإشعارات',
  'Notification Center': 'مركز الإشعارات',
  'Help & Support': 'المساعدة والدعم',
  'Security & Preferences': 'الأمان والتفضيلات',
  'Approvals Inbox': 'صندوق الاعتمادات والموافقات',
  'Team Overview': 'نظرة عامة على الفريق',
  'Team Leave Calendar': 'تقويم إجازات الفريق',
  'Outsourced Workforce': 'القوى العاملة المؤجرة',
  'Department Distribution': 'توزيع الإدارات والأقسام',
  'Outsourcing Costs & Invoices': 'تكاليف التعاقد والفواتير',
  'Vacancies & Replacements': 'الشواغر والإحلال الوظيفي',
  'RFP SLA Compliance': 'مؤشرات مستوى الخدمة (SLA)',
  'Electronic Audit Trail': 'سجل التدقيق الإلكتروني',
  'Reporting & Analytics': 'التقارير والتحليلات',
  'Account Escalations': 'التصعيدات التشغيلية',
  'RFP Compliance Matrix': 'مصفوفة مطابقة كراسة الشروط',

  // Table Columns
  'Pay Period': 'فترة الصرف',
  'Basic Salary': 'الراتب الأساسي',
  'Allowances': 'البدلات',
  'Gross Salary': 'إجمالي الراتب',
  'Deductions': 'الاستقطاعات',
  'Net Transferred': 'صافي المحول',
  'Payment Date': 'تاريخ الصرف',
  'Status': 'الحالة',
  'Actions': 'الإجراءات',
  'Request ID': 'رقم الطلب',
  'Request Ref': 'رقم الطلب',
  'Employee Name': 'اسم الموظف',
  'Employee': 'الموظف',
  'Employee ID': 'الرقم الوظيفي',
  'Job Designation': 'المسمى الوظيفي',
  'Designation': 'المسمى الوظيفي',
  'Department': 'الإدارة / القسم',
  'Contractor': 'شركة التزويد',
  'Supplier Contractor': 'شركة التزويد المتعاقدة',
  'Nationality': 'الجنسية',
  'Joining Date': 'تاريخ الالتحاق',
  'Dates': 'التواريخ',
  'Duration': 'المدة',
  'Reason': 'السبب',
  'Reviewer': 'المسؤول المراجع',
  'Decision': 'القرار',
  'Decision Maker': 'صاحب الاعتماد',
  'Submitted On': 'تاريخ التقديم',
  'Submission Date': 'تاريخ التقديم',
  'Type': 'النوع',
  'Leave Type': 'نوع الإجازة',
  'Start Date': 'تاريخ البدء',
  'End Date': 'تاريخ الانتهاء',
  'Days': 'الأيام',

  // Actions & Buttons
  'Apply for Leave': 'تقديم طلب إجازة',
  'Support Inquiry': 'استفسار ودعم',
  'Preview / Print PDF': 'معاينة / طباعة PDF',
  'View All': 'عرض الكل',
  'Inspect Document': 'فحص الوثيقة',
  'Sign In': 'تسجيل الدخول',
  'Sign In via 2FA': 'تسجيل الدخول بالتحقق الثنائي',
  'Sign Out': 'تسجيل الخروج',
  'Launch Employee Portal': 'فتح بوابة الموظف',
  'Search...': 'بحث...',
  'Paid': 'تم الصرف',
  'Approved': 'معتمد',
  'Under Review': 'قيد المراجعة',
  'Pending': 'معلق',
  'Rejected': 'مرفوض',
  'Active': 'نشط',

  // Sections & Headers
  'Quick Actions': 'إجراءات سريعة',
  'Recent Service & Leave Requests': 'أحدث طلبات الخدمة والإجازات',
  'Profile Summary': 'ملخص الملف التعريفي',
  'Attendance This Month': 'نسبة الحضور هذا الشهر',
  'Federal Network': 'شبكة الحكومة الاتحادية',
  'Core Services': 'الخدمات الأساسية',
  'Support & System': 'الدعم والنظام',

  // Leave Management Pages
  'Leave Entitlements & Overview': 'استحقاقات الإجازات ونظرة عامة',
  'Track accrued entitlements, pending approvals, and upcoming approved absence.': 'متابعة الأرصدة المستحقة والموافقات المعلقة والإجازات المعتمدة.',
  'Track accrued entitlements, pending approvals, and upcoming approved absence': 'متابعة الأرصدة المستحقة والموافقات المعلقة والإجازات المعتمدة',
  'Annual Balance Remaining': 'رصيد الإجازة السنوية المتبقي',
  'ANNUAL BALANCE REMAINING': 'رصيد الإجازة السنوية المتبقي',
  'Current usable calendar balance': 'الرصيد الفعلي القابل للاستخدام',
  'Annual Entitlement': 'الاستحقاق السنوي الكامل',
  'ANNUAL ENTITLEMENT': 'الاستحقاق السنوي الكامل',
  'Full-year statutory allocation': 'المخصص السنوي النظامي الكامل',
  'Used This Year': 'المستنفد هذا العام',
  'USED THIS YEAR': 'المستنفد هذا العام',
  'Completed and deducted leaves': 'إجازات تم استنفادها واحتسابها',
  'Pending Manager Review': 'بانتظار موافقة المدير المباشر',
  'PENDING MANAGER REVIEW': 'بانتظار موافقة المدير المباشر',
  'Currently locked in approval queue': 'قيد المعالجة في قائمة الاعتمادات',
  'Entitlement Pools by Leave Category': 'أرصدة الإجازات حسب الفئة النظامية',
  'View Detailed Rules': 'عرض اللائحة والشروط التفصيلية',
  'Annual Vacation Leave': 'إجازة اعتيادية سنوية',
  'Certified Sick Leave': 'إجازة مرضية معتمدة',
  'Emergency & Compassionate': 'إجازة طارئة وظروف خاصة',
  'Accrues 2.5 days per completed service month': 'تستحق بواقع 2.5 يوم عن كل شهر خدمة منجز',
  'Full pay entitlement with approved DHA/EHS medical report': 'راتب كامل بتقرير طبي معتمد من مؤسسة الإمارات للخدمات الصحية',
  'Bereavement and immediate family emergency clause': 'حالات الوفاة والظروف الأسرية الطارئة المعتمدة',
  'Submitted Leave Requests': 'طلبات الإجازات المقدمة',
  'New Application': 'تقديم طلب جديد',
  'Request History': 'سجل الطلبات السابقة',
  'Reviewed By': 'المسؤول المراجع',
  'Reviewed by': 'المسؤول المراجع',
  'Dates / Scope': 'التواريخ / النطاق',
  'Action': 'الإجراء',
  'Details →': 'التفاصيل ←',
  'Details &rarr;': 'التفاصيل ←',

  // Employee Dashboard
  'Good Morning,': 'صباح الخير،',
  'Welcome to your authorized Employee Self Service portal. Review live leave balances, payroll statements, and official service requests.': 'مرحباً بك في بوابة الخدمة الذاتية المعتمدة للموظف. تابع رصيد الإجازات، قسائم الرواتب، والطلبات الرسمية.',
  'Download Payslip': 'تحميل كشف الراتب',
  'Request Certificate': 'طلب شهادة رسمية',
  'Submit Service Request': 'طلب خدمة أو استفسار',
  'View Medical Insurance': 'بطاقة التأمين الصحي',
  'Request Air Ticket': 'حجز تذكرة سفر سنوية',
  'RFP Compliance Target: Document Renewal Action Required (Within 30 Days)': 'متطلب كراسة الشروط: إجراء تجديد الوثيقة مطلوب (خلال 30 يوماً)',
  'QUICK ACTIONS': 'إجراءات سريعة',
  'Live transaction lifecycle and status tracking': 'متابعة دورة حياة المعاملات وحالات الاعتماد المباشرة',
  'Outsourced Profile Summary': 'ملخص الملف التعريفي للكوادر المؤجرة',
  'Assigned Supplier': 'شركة التزويد المتعاقدة',
  'Employment Status': 'حالة التعيين',
  'Manage Full Profile & Banking →': 'إدارة الملف الشخصي والحساب المصرفي ←',
  'Manage Full Profile & Banking &rarr;': 'إدارة الملف الشخصي والحساب المصرفي ←',
  'Awaiting Line Manager Approval': 'بانتظار موافقة المدير المباشر',
  'Current SLA Track': 'مسار مستوى الخدمة الحالي',
  'Logged via Biometrics': 'مسجل عبر البصمة البيومترية',
  '30 Days Total': '30 يوماً إجمالي',
  'Urgent Action': 'إجراء عاجل',
  '100% Valid': 'ساري بنسبة 100%',
  'Residency Renewal Target': 'مستهدف تجديد الإقامة',
  'All Documents Compliant': 'جميع الوثائق سارية ومطابقة',

  // Manager Portal
  'Line Manager Dashboard': 'لوحة تحكم المدير المباشر',
  'Supervise outsourced personnel, review pending leave applications, and inspect team attendance schedules.': 'الإشراف على الكوادر الخارجية، مراجعة طلبات الإجازات المعلقة، ومتابعة سجلات الحضور والانصراف للفريق.',
  'Review Approvals': 'مراجعة الاعتمادات',
  'Department Team Headcount': 'إجمالي كادر القسم',
  'Pending Approvals': 'الموافقات المعلقة',
  'Personnel Currently on Leave': 'الكوادر في إجازة حالياً',
  'Biometric Attendance Today': 'نسبة الحضور البيومتري اليوم',
  'Pending Team Leave Approvals': 'طلبات إجازات الفريق المعلقة',
  'Requires line manager authorized decision': 'يتطلب اعتماد وقرار المدير المباشر',
  'Full Approvals Inbox': 'صندوق الاعتمادات الكامل',
  'Review & Decide': 'مراجعة واتخاذ القرار',
  'No pending approvals in queue. All leave requests up to date!': 'لا توجد موافقات معلقة في القائمة. جميع طلبات الإجازات محدثة!',
  'All Roster Assigned': 'جميع النوبات معتمدة',
  'SLA Clock Active': 'عداد مستوى الخدمة نشط',
  'Full Coverage': 'تغطية تشغيلية كاملة',
  'No Shift Gaps': 'لا توجد شواغر في المناوبات',
  'On Target': 'ضمن المستهدف',
  'Gov Office Hours': 'ساعات العمل الحكومية الرسمية',

  // Supplier & Governance Portal
  'Supplier Operations & Account Portal': 'بوابة عمليات وإدارة حساب المزوّد',
  'Supplier Dashboard': 'لوحة تحكم المزوّد',
  'Establishment Governance & Oversight Portal': 'بوابة حوكمة ورقابة المؤسسة',
  'Establishment Dashboard': 'لوحة حوكمة المؤسسة',
  'Operations & Employee Services Hub': 'مركز العمليات وخدمات الموظفين',
  'Account Management & SLA Dashboard': 'لوحة إدارة الحساب ومؤشرات الخدمة',
  'Employee Services Lead': 'مسؤول خدمات الموظفين',
  'Account Director View': 'عرض مدير الحساب',
  'Assigned Workforce': 'القوى العاملة المسندة',
  'Open Support Inquiries': 'استفسارات الدعم المفتوحة',
  'Pending Certificate Requests': 'طلبات الشهادات المعلقة',
  'Open Staffing Orders': 'طلبات التوظيف النشطة',
  'Active Staffing Orders': 'طلبات التعيين والإحلال النشطة',
  'RFP Staffing Lifecycle': 'دورة التوظيف وفق كراسة الشروط',
  '100% Deployed': 'موزع بنسبة 100%',
  'All Positions Active': 'جميع الشواغر مفعلة',
  'SLA Clock Running': 'عداد مستوى الخدمة يعمل',
  'Gov Audit Ready': 'جاهز للتدقيق الحكومي',
  'Order ID': 'رقم الطلب',
  'Role Title': 'المسمى المطلوب',
  'Candidate': 'المرشح',
  'Target Deadline': 'الموعد النهائي المستهدف',
  'SLA Window': 'المهلة النظامية',
  'Manage': 'إدارة',
  'Fulfill Certificates': 'إصدار الشهادات',
  'Process Banking': 'تحديث الحساب المصرفي',
  'New Candidate Nomination': 'ترشيح كادر جديد',
  'Post Replacement': 'طلب إحلال وظيفي',
  'Audit Trail': 'سجل التدقيق',
  'Overall SLA Compliance': 'الامتثال العام لمستوى الخدمة',
  'Total Outsourced Personnel': 'إجمالي القوى العاملة المؤجرة',
  'Active Contracts': 'العقود النشطة',
  'Total Monthly Invoiced': 'إجمالي الفواتير الشهرية',
  'Pending Invoices': 'فواتير قيد التدقيق',
  '24h SLA response target active': 'مستهدف الرد خلال 24 ساعة نشط',
  '2 working day SLA commitment': 'الالتزام بالإصدار خلال يومي عمل',
  'Specialists': 'أخصائيين',

  // Auth, Reset & Forgot Password
  'UAE Federal Government • Access Authorization': 'حكومة دولة الإمارات • تفويض الدخول الرسمي',
  'UAE Federal Government • Identity Recovery': 'حكومة دولة الإمارات • استعادة الهوية الرقمية',
  'UAE Federal Gateway': 'البوابة الاتحادية لدولة الإمارات',
  'Federal Government Security Standard': 'معيار الأمان الحكومي الاتحادي',
  'Reset Your Password': 'إعادة تعيين كلمة المرور',
  'Reset Password': 'إعادة تعيين كلمة المرور',
  'Enter a secure new password for your EDE Portal account.': 'أدخل كلمة مرور جديدة وآمنة لحسابك في بوابة مؤسسة الإمارات للدواء.',
  'Enter your registered EDE workforce email or Employee ID to receive a secure recovery link.': 'أدخل بريدك الإلكتروني المسجل أو رقمك الوظيفي لاستلام رابط استعادة مشفر.',
  'New Password': 'كلمة المرور الجديدة',
  'Confirm New Password': 'تأكيد كلمة المرور الجديدة',
  'Must be at least 8 characters': 'يجب ألا تقل عن 8 أحرف',
  'Update Password': 'تحديث كلمة المرور',
  'Password Reset Successful': 'تم تحديث كلمة المرور بنجاح',
  'Your password has been securely updated. You can now log in with your new credentials.': 'تم تحديث كلمة المرور الخاصة بك بأمان. يمكنك الآن تسجيل الدخول ببياناتك الجديدة.',
  'Proceed to Sign In': 'الانتقال إلى تسجيل الدخول',
  'Back to Sign In': 'العودة إلى تسجيل الدخول',
  'Return to Sign In': 'العودة إلى تسجيل الدخول',
  'Send Security Reset Link': 'إرسال رابط إعادة التعيين الآمن',
  'Work Email or Employee ID': 'البريد الإلكتروني للعمل أو الرقم الوظيفي',
  'Password Reset Link Dispatched': 'تم إرسال رابط إعادة التعيين',
  'Secured by EDE IAM & UAE Pass Gateway': 'محمي بواسطة نظام الهوية الرقمية EDE IAM وبوابة UAE Pass',
  'Two-Factor Authentication': 'التحقق الثنائي (2FA)',
  'Verify & Access Portal': 'تأكيد الرمز والدخول',
  'Resend Code': 'إعادة إرسال الرمز',
  'For rapid evaluation, default OTP is': 'للتقييم السريع، رمز التحقق الافتراضي هو',
  'Password must be at least 8 characters long.': 'يجب ألا تقل كلمة المرور عن 8 أحرف.',
  'Passwords do not match.': 'كلمتا المرور غير متطابقتين.',
  'Verifying Token...': 'جارٍ التحقق من الرمز...',
  'Resend code in': 'إعادة إرسال الرمز خلال',
  'Target:': 'الهدف:',
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ede_portal_lang') as Language;
      if (saved === 'ar' || saved === 'en') {
        setLanguageState(saved);
        if (typeof document !== 'undefined') {
          document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = saved;
        }
      }
    } catch (e) {
      // Local storage unavailable
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('ede_portal_lang', lang);
    } catch (e) {}
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      if (lang === 'ar') {
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.classList.remove('rtl');
      }
    }
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'ar' : 'en';
    setLanguage(next);
  };

  const t = (key: string, fallback?: string): string => {
    if (!key) return fallback || '';
    const table = translations[language] || translations.en;
    if (table[key]) return table[key];

    if (language === 'ar') {
      // 1. Exact match in phrase map
      if (commonPhraseMap[key]) return commonPhraseMap[key];

      // 2. Case-insensitive & trimmed match
      const trimmed = key.trim();
      const lower = trimmed.toLowerCase();
      for (const [k, v] of Object.entries(commonPhraseMap)) {
        if (k.toLowerCase() === lower) return v;
      }

      // 3. Dynamic patterns for metric values like "14 Days", "30 Days Total", "98.2%", etc.
      const daysMatch = trimmed.match(/^(\d+)\s+Days?$/i);
      if (daysMatch) return `${daysMatch[1]} يوم`;

      const daysTotalMatch = trimmed.match(/^(\d+)\s+Days\s+Total$/i);
      if (daysTotalMatch) return `${daysTotalMatch[1]} يوماً إجمالي`;

      const hoursMatch = trimmed.match(/^(\d+)\s+Hours?$/i);
      if (hoursMatch) return `${hoursMatch[1]} ساعة`;

      const specialistsMatch = trimmed.match(/^(\d+)\s+Specialists?$/i);
      if (specialistsMatch) return `${specialistsMatch[1]} أخصائيين`;

      const requestsMatch = trimmed.match(/^(\d+)\s+Requests?$/i);
      if (requestsMatch) return `${requestsMatch[1]} طلبات`;

      const usedPendingMatch = trimmed.match(/^(\d+)\s+used\s*\/\s*(\d+)\s+pending$/i);
      if (usedPendingMatch) return `${usedPendingMatch[1]} مستخدم / ${usedPendingMatch[2]} قيد المراجعة`;

      const attendanceMatch = trimmed.match(/^(\d+)\s+Present\s*\/\s*(\d+)\s+Absent\s*\/\s*(\d+)\s+Late$/i);
      if (attendanceMatch) return `${attendanceMatch[1]} حضور / ${attendanceMatch[2]} غياب / ${attendanceMatch[3]} متأخر`;
    }

    return fallback || key;
  };

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      <div key={language} dir={direction} className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
