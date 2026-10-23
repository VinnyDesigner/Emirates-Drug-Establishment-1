'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  EmployeeProfile,
  LeaveRequest,
  LeaveBalance,
  LeaveType,
  Payslip,
  CertificateRequest,
  EmployeeDocument,
  AirTicketRequest,
  MedicalPolicy,
  MedicalClaim,
  AttendanceRecord,
  ServiceTicket,
  EscalationRecord,
  StaffingRequisition,
  SlaMetric,
  AuditLogEntry,
  NotificationItem,
  Candidate,
  Deployment,
  EmployeeTransfer,
  SupplierEntity,
  AnnexBComplianceItem,
} from './types';
import {
  DEMO_USERS,
  MOCK_EMPLOYEES,
  INITIAL_LEAVE_BALANCE,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_PAYSLIPS,
  INITIAL_CERTIFICATES,
  INITIAL_DOCUMENTS,
  INITIAL_AIR_TICKETS,
  INITIAL_MEDICAL_POLICY,
  INITIAL_MEDICAL_CLAIMS,
  INITIAL_ATTENDANCE,
  INITIAL_TICKETS,
  INITIAL_ESCALATIONS,
  INITIAL_STAFFING_REQUISITIONS,
  INITIAL_SLA_METRICS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CANDIDATES,
  INITIAL_DEPLOYMENTS,
  INITIAL_TRANSFERS,
  INITIAL_SUPPLIERS,
  INITIAL_ANNEX_B_ITEMS,
} from './mock-data';

interface AttendanceSyncState {
  lastSync: string;
  recordsProcessed: number;
  failedRecords: number;
  duplicatesSkipped: number;
  status: 'idle' | 'syncing' | 'success' | 'error';
  sourceSystem: string;
}

interface AppStoreContextType {
  // Auth & Session
  currentUser: User;
  isAuthenticated: boolean;
  switchUserRole: (role: UserRole) => void;
  login: (emailOrId: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;

  // Workforce Directory
  employees: EmployeeProfile[];
  profile: EmployeeProfile;

  // Leave Management
  leaveBalance: LeaveBalance;
  leaveRequests: LeaveRequest[];
  submitLeaveRequest: (data: {
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    attachmentName?: string;
  }) => void;
  reviewLeaveRequest: (
    requestId: string,
    decision: 'approved' | 'rejected' | 'returned_for_clarification',
    managerRemarks?: string
  ) => void;

  // Payslips & Certificates
  payslips: Payslip[];
  certificates: CertificateRequest[];
  submitCertificateRequest: (data: {
    certificateType: 'salary' | 'employment';
    language: 'en' | 'ar' | 'both';
    purpose: string;
    addressedTo: string;
  }) => void;
  fulfillCertificate: (
    requestId: string,
    status: 'issued' | 'rejected',
    reason?: string
  ) => void;

  // Profile & Banking Updates
  requestBankDetailChange: (data: {
    proposedBank: string;
    proposedIban: string;
    reason: string;
  }) => void;
  reviewBankDetailChange: (
    decision: 'approved' | 'rejected',
    remarks?: string
  ) => void;

  // Document Management & Expiry
  documents: EmployeeDocument[];
  uploadReplacementDocument: (
    docId: string,
    fileName: string,
    newExpiryDate: string
  ) => void;

  // Air Tickets & Travel
  airTickets: AirTicketRequest[];
  submitAirTicketRequest: (data: {
    benefitType: 'Annual Home Leave' | 'Family Vacation' | 'Relocation Flight';
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengersCount: number;
    employeeRemarks?: string;
  }) => void;
  updateAirTicketStatus: (
    requestId: string,
    status: 'approved' | 'ticket_issued' | 'rejected',
    pnrCode?: string,
    airline?: string,
    cost?: number
  ) => void;

  // Medical Insurance & Claims
  medicalPolicy: MedicalPolicy;
  medicalClaims: MedicalClaim[];
  submitMedicalClaim: (data: {
    treatmentDate: string;
    claimCategory: 'Consultation & Lab' | 'Pharmacy' | 'Dental' | 'Optical' | 'Emergency Inpatient';
    claimedAmountAed: number;
    providerClinic: string;
    invoiceNumber: string;
  }) => void;
  reviewMedicalClaim: (
    claimId: string,
    status: 'approved' | 'rejected' | 'settled' | 'insurer_processing',
    approvedAmount?: number
  ) => void;

  // Attendance & Sync Adapter
  attendanceRecords: AttendanceRecord[];
  attendanceSyncState: AttendanceSyncState;
  triggerAttendanceSync: () => Promise<void>;

  // Service Tickets & Complaints
  tickets: ServiceTicket[];
  submitServiceTicket: (data: {
    category: ServiceTicket['category'];
    subject: string;
    description: string;
    priority: ServiceTicket['priority'];
  }) => void;
  addTicketMessage: (
    ticketId: string,
    message: string,
    isInternal?: boolean
  ) => void;
  updateTicketStatus: (
    ticketId: string,
    status: ServiceTicket['status'],
    assignedOfficer?: string
  ) => void;

  // Escalations & Vacancies
  escalations: EscalationRecord[];
  resolveEscalation: (
    escalationId: string,
    status: EscalationRecord['status'],
    remarks: string
  ) => void;
  requisitions: StaffingRequisition[];
  nominateCandidate: (
    requisitionId: string,
    candidate: {
      name: string;
      nationality: string;
      qualification: string;
      yearsOfExperience: number;
      cvFileName: string;
    }
  ) => void;
  updateCandidateStatus: (
    requisitionId: string,
    candidateId: string,
    status: StaffingRequisition['nominatedCandidates'][0]['status']
  ) => void;

  // SLA Performance & Analytics
  slaMetrics: SlaMetric[];

  // Candidates & Recruitment
  candidates: Candidate[];
  addCandidate: (candidate: Omit<Candidate, 'id' | 'candidateNumber' | 'submissionDate'>) => void;
  updateCandidateScreening: (candidateId: string, status: Candidate['screeningStatus'], interviewDate?: string) => void;

  // Deployments & Onboarding
  deployments: Deployment[];
  updateDeployment: (deploymentId: string, status: Deployment['status'], visaStatus?: Deployment['visaStatus'], insuranceStatus?: Deployment['insuranceStatus']) => void;

  // Supplier Transfers
  transfers: EmployeeTransfer[];
  submitTransferRequest: (data: { employeeId: string; employeeName: string; department: string; currentSupplier: string; targetSupplier: string; reason: string; effectiveDate: string }) => void;
  reviewTransferRequest: (transferId: string, decision: 'Approved by EDE' | 'Rejected by EDE') => void;

  // Suppliers Registry
  suppliers: SupplierEntity[];

  // Annex B Compliance Matrix Items
  annexBItems: AnnexBComplianceItem[];
  updateAnnexBDevDays: (itemNumber: number, days: number) => void;
  updateAnnexBStatus: (itemNumber: number, status: AnnexBComplianceItem['demonstratedStatus']) => void;

  // Notifications & Audit Trail
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  auditLogs: AuditLogEntry[];

  // UI & Layout
  isSidebarCollapsed: boolean;
  toggleSidebarCollapse: () => void;

  // Demo Reset
  resetDemoData: () => void;
}

const AppStoreContext = createContext<AppStoreContextType | undefined>(undefined);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  // UI Layout State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isSidebarCollapsed) {
        document.documentElement.classList.add('sidebar-collapsed');
      } else {
        document.documentElement.classList.remove('sidebar-collapsed');
      }
    }
  }, [isSidebarCollapsed]);

  // 1. Session & Auth State
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.employee);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // 2. Core Entities
  const [employees, setEmployees] = useState<EmployeeProfile[]>(MOCK_EMPLOYEES);
  const [profile, setProfile] = useState<EmployeeProfile>(MOCK_EMPLOYEES[2]); // Ahmed Al Mansoori
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalance>(INITIAL_LEAVE_BALANCE);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [payslips] = useState<Payslip[]>(INITIAL_PAYSLIPS);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [deployments, setDeployments] = useState<Deployment[]>(INITIAL_DEPLOYMENTS);
  const [transfers, setTransfers] = useState<EmployeeTransfer[]>(INITIAL_TRANSFERS);
  const [suppliers] = useState<SupplierEntity[]>(INITIAL_SUPPLIERS);
  const [annexBItems, setAnnexBItems] = useState<AnnexBComplianceItem[]>(INITIAL_ANNEX_B_ITEMS);

  const [certificates, setCertificates] = useState<CertificateRequest[]>(INITIAL_CERTIFICATES);
  const [documents, setDocuments] = useState<EmployeeDocument[]>(INITIAL_DOCUMENTS);
  const [airTickets, setAirTickets] = useState<AirTicketRequest[]>(INITIAL_AIR_TICKETS);
  const [medicalPolicy] = useState<MedicalPolicy>(INITIAL_MEDICAL_POLICY);
  const [medicalClaims, setMedicalClaims] = useState<MedicalClaim[]>(INITIAL_MEDICAL_CLAIMS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [attendanceSyncState, setAttendanceSyncState] = useState<AttendanceSyncState>({
    lastSync: '2026-10-22 07:30 GST',
    recordsProcessed: 57,
    failedRecords: 0,
    duplicatesSkipped: 4,
    status: 'idle',
    sourceSystem: 'EDE Central Biometric Gate Access API v2.4',
  });
  const [tickets, setTickets] = useState<ServiceTicket[]>(INITIAL_TICKETS);
  const [escalations, setEscalations] = useState<EscalationRecord[]>(INITIAL_ESCALATIONS);
  const [requisitions, setRequisitions] = useState<StaffingRequisition[]>(INITIAL_STAFFING_REQUISITIONS);
  const [slaMetrics] = useState<SlaMetric[]>(INITIAL_SLA_METRICS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Local Storage Hydration
  useEffect(() => {
    try {
      const savedUserRole = localStorage.getItem('ede_demo_role') as UserRole;
      if (savedUserRole && DEMO_USERS[savedUserRole]) {
        setCurrentUser(DEMO_USERS[savedUserRole]);
      }
    } catch {
      // ignore
    }
  }, []);

  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'actorId' | 'actorName' | 'actorRole' | 'ipAddress'>) => {
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      ipAddress: '194.170.82.14',
      ...entry,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      isRead: false,
      ...item,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Auth Operations
  const switchUserRole = (role: UserRole) => {
    const targetUser = Object.values(DEMO_USERS).find((u) => u.role === role) || DEMO_USERS.employee;
    setCurrentUser(targetUser);
    setIsAuthenticated(true);
    localStorage.setItem('ede_demo_role', role);
    addAuditLog({
      action: 'ROLE_SWITCH_DEMO',
      module: 'Security & Access Control',
      recordIdentifier: targetUser.employeeId,
      details: `Switched demo context to ${targetUser.role} (${targetUser.name})`,
    });
  };

  const login = async (emailOrId: string): Promise<boolean> => {
    // For demo purposes, any match or fallback signs in
    const found = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === emailOrId.toLowerCase() || u.employeeId.toLowerCase() === emailOrId.toLowerCase()
    );
    if (found) {
      setCurrentUser(found);
    }
    return true;
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    if (otp === '123456' || otp.length === 6) {
      setIsAuthenticated(true);
      addAuditLog({
        action: 'TWO_FACTOR_VERIFICATION_SUCCESS',
        module: 'Security & Access Control',
        recordIdentifier: currentUser.employeeId,
        details: 'User completed 6-digit OTP two-factor verification successfully.',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    addAuditLog({
      action: 'USER_LOGOUT',
      module: 'Security & Access Control',
      recordIdentifier: currentUser.employeeId,
      details: 'User initiated session termination.',
    });
  };

  // Leave Workflows
  const submitLeaveRequest = (data: {
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    attachmentName?: string;
  }) => {
    const reqNum = Math.floor(1000 + Math.random() * 9000);
    const newRequest: LeaveRequest = {
      id: `lev-req-${Date.now()}`,
      requestId: `EDE-LV-2026-${reqNum}`,
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name,
      employeeNameAr: currentUser.nameAr,
      department: currentUser.department,
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      days: data.days,
      reason: data.reason,
      attachmentName: data.attachmentName,
      status: 'under_review',
      submittedAt: new Date().toISOString(),
    };

    setLeaveRequests((prev) => [newRequest, ...prev]);

    // Update balances
    if (data.leaveType === 'annual') {
      setLeaveBalance((prev) => ({
        ...prev,
        annualPending: prev.annualPending + data.days,
      }));
    }

    // Add Audit Log
    addAuditLog({
      action: 'LEAVE_REQUEST_SUBMITTED',
      module: 'Leave Management',
      recordIdentifier: newRequest.requestId,
      previousStatus: 'None',
      newStatus: 'under_review',
      details: `Submitted ${data.days} days ${data.leaveType} leave from ${data.startDate} to ${data.endDate}.`,
    });

    // Add Notification
    addNotification({
      recipientRole: 'line_manager',
      titleEn: `New Leave Request: ${currentUser.name}`,
      titleAr: `طلب إجازة جديد: ${currentUser.nameAr || currentUser.name}`,
      messageEn: `${currentUser.name} submitted ${data.days} days ${data.leaveType} leave request awaiting your approval.`,
      messageAr: `قدّم الموظف ${currentUser.nameAr || currentUser.name} طلب إجازة (${data.days} أيام) بانتظار اعتمادك.`,
      type: 'leave',
      actionUrl: '/manager/approvals',
    });
  };

  const reviewLeaveRequest = (
    requestId: string,
    decision: 'approved' | 'rejected' | 'returned_for_clarification',
    managerRemarks?: string
  ) => {
    const target = leaveRequests.find((r) => r.id === requestId || r.requestId === requestId);
    if (!target) return;

    setLeaveRequests((prev) =>
      prev.map((r) =>
        r.id === target.id
          ? {
              ...r,
              status: decision,
              reviewedBy: currentUser.name,
              reviewedAt: new Date().toISOString(),
              managerRemarks: managerRemarks || r.managerRemarks,
            }
          : r
      )
    );

    // Update Balance on approval
    if (decision === 'approved' && target.leaveType === 'annual') {
      setLeaveBalance((prev) => ({
        ...prev,
        annualPending: Math.max(0, prev.annualPending - target.days),
        annualUsed: prev.annualUsed + target.days,
        annualRemaining: Math.max(0, prev.annualRemaining - target.days),
      }));
    } else if (decision === 'rejected' && target.leaveType === 'annual') {
      setLeaveBalance((prev) => ({
        ...prev,
        annualPending: Math.max(0, prev.annualPending - target.days),
      }));
    }

    addAuditLog({
      action: `LEAVE_REQUEST_${decision.toUpperCase()}`,
      module: 'Leave Management',
      recordIdentifier: target.requestId,
      previousStatus: target.status,
      newStatus: decision,
      details: `Manager decision recorded by ${currentUser.name}. Remarks: ${managerRemarks || 'None'}`,
    });

    addNotification({
      recipientEmployeeId: target.employeeId,
      titleEn: `Leave Request ${decision.toUpperCase()}`,
      titleAr: `تم تحديث حالة طلب الإجازة: ${decision === 'approved' ? 'معتمد' : decision === 'rejected' ? 'مرفوض' : 'استيضاح'}`,
      messageEn: `Your leave request ${target.requestId} has been marked as ${decision} by ${currentUser.name}.`,
      messageAr: `تم تحديث حالة طلب الإجازة ${target.requestId} إلى (${decision}) من قبل ${currentUser.name}.`,
      type: 'approval',
      actionUrl: '/employee/leave/history',
    });
  };

  // Certificate Workflows
  const submitCertificateRequest = (data: {
    certificateType: 'salary' | 'employment';
    language: 'en' | 'ar' | 'both';
    purpose: string;
    addressedTo: string;
  }) => {
    const reqNum = Math.floor(100 + Math.random() * 900);
    const newCert: CertificateRequest = {
      id: `cert-${Date.now()}`,
      requestId: `EDE-CERT-2026-${reqNum}`,
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name,
      certificateType: data.certificateType,
      language: data.language,
      purpose: data.purpose,
      addressedTo: data.addressedTo,
      status: 'processing',
      submittedAt: new Date().toISOString(),
      slaTargetHours: 48,
      slaStatus: 'on_track',
    };

    setCertificates((prev) => [newCert, ...prev]);

    addAuditLog({
      action: 'CERTIFICATE_REQUEST_SUBMITTED',
      module: 'Official Certificates',
      recordIdentifier: newCert.requestId,
      newStatus: 'processing',
      details: `Requested ${data.certificateType} certificate for: ${data.purpose}. 2 working day SLA active.`,
    });

    addNotification({
      recipientRole: 'supplier_esm',
      titleEn: `New Certificate Request: ${newCert.requestId}`,
      titleAr: `طلب شهادة رسمية جديد: ${newCert.requestId}`,
      messageEn: `${currentUser.name} requested an official ${data.certificateType} certificate. SLA deadline: 48 working hours.`,
      messageAr: `قدّم الموظف ${currentUser.name} طلب استخراج شهادة رسمية. مستهدف الإنجاز: خلال يومي عمل.`,
      type: 'certificate',
      actionUrl: '/supplier/certificates',
    });
  };

  const fulfillCertificate = (
    requestId: string,
    status: 'issued' | 'rejected',
    reason?: string
  ) => {
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === requestId || c.requestId === requestId
          ? {
              ...c,
              status,
              issuedAt: status === 'issued' ? new Date().toISOString() : undefined,
              rejectionReason: reason,
              slaStatus: 'met',
              downloadUrl: `/sample-certificate-${c.certificateType}.pdf`,
            }
          : c
      )
    );

    addAuditLog({
      action: `CERTIFICATE_${status.toUpperCase()}`,
      module: 'Official Certificates',
      recordIdentifier: requestId,
      newStatus: status,
      details: `Certificate ${requestId} processed by ${currentUser.name}. Outcome: ${status}.`,
    });
  };

  // Profile & Banking Change Workflow
  const requestBankDetailChange = (data: {
    proposedBank: string;
    proposedIban: string;
    reason: string;
  }) => {
    const reqId = `BNK-CHG-${Date.now()}`;
    const changeObj = {
      requestId: reqId,
      requestedAt: new Date().toISOString(),
      proposedBank: data.proposedBank,
      proposedIban: data.proposedIban,
      reason: data.reason,
      status: 'pending' as const,
    };

    setProfile((prev) => ({
      ...prev,
      pendingBankChange: changeObj,
    }));

    addAuditLog({
      action: 'PROFILE_BANKING_CHANGE_REQUESTED',
      module: 'Profile & Banking',
      recordIdentifier: reqId,
      details: `Employee submitted request to update IBAN to ${data.proposedIban} at ${data.proposedBank}. Original record unchanged pending supplier approval.`,
    });

    addNotification({
      recipientRole: 'supplier_esm',
      titleEn: 'Pending Banking Change Approval',
      titleAr: 'طلب تعديل بيانات مصرفية قيد الاعتماد',
      messageEn: `Employee ${currentUser.name} submitted an IBAN change request requiring document verification.`,
      messageAr: `قدّم الموظف ${currentUser.name} طلب تحديث الآيبان المصرفي يتطلب التحقق والاعتماد.`,
      type: 'approval',
      actionUrl: '/supplier/requests',
    });
  };

  const reviewBankDetailChange = (decision: 'approved' | 'rejected', remarks?: string) => {
    if (!profile.pendingBankChange) return;

    if (decision === 'approved') {
      const masked = `${profile.pendingBankChange.proposedIban.slice(0, 7)} **** **** ${profile.pendingBankChange.proposedIban.slice(-4)}`;
      setProfile((prev) => ({
        ...prev,
        bankDetails: {
          bankName: prev.pendingBankChange!.proposedBank,
          accountHolder: prev.fullNameEn,
          maskedIban: masked,
          fullIbanForSupplierView: prev.pendingBankChange!.proposedIban,
        },
        pendingBankChange: undefined,
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        pendingBankChange: undefined,
      }));
    }

    addAuditLog({
      action: `BANKING_CHANGE_${decision.toUpperCase()}`,
      module: 'Profile & Banking',
      recordIdentifier: profile.employeeId,
      newStatus: decision,
      details: `Supplier ${currentUser.name} ${decision} banking change request. Remarks: ${remarks || 'None'}`,
    });

    addNotification({
      recipientEmployeeId: profile.employeeId,
      titleEn: `Bank Detail Change ${decision.toUpperCase()}`,
      titleAr: `تم ${decision === 'approved' ? 'اعتماد' : 'رفض'} طلب تعديل البيانات المصرفية`,
      messageEn: `Your bank detail change request has been ${decision} by the supplier employee services team.`,
      messageAr: `تمت مراجعة و${decision === 'approved' ? 'اعتماد' : 'رفض'} طلب تعديل بيانات الحساب البنكي.`,
      type: 'approval',
      actionUrl: '/employee/profile/banking',
    });
  };

  // Document Management & Expiry
  const uploadReplacementDocument = (
    docId: string,
    fileName: string,
    newExpiryDate: string
  ) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              fileName,
              expiryDate: newExpiryDate,
              daysUntilExpiry: 730, // 2 years
              verificationStatus: 'verified',
              renewalUrgent: false,
              uploadedAt: new Date().toISOString(),
            }
          : doc
      )
    );

    addAuditLog({
      action: 'DOCUMENT_RENEWAL_COMPLETED',
      module: 'Document Vault',
      recordIdentifier: docId,
      details: `Document renewal updated with file ${fileName}. New expiry: ${newExpiryDate}.`,
    });

    addNotification({
      titleEn: 'Document Renewal Verified',
      titleAr: 'تم توثيق تجديد الوثيقة الثبوتية',
      messageEn: `Your document renewal for ${fileName} has been verified and updated in the electronic archive.`,
      messageAr: `تم التحقق من تجديد الوثيقة (${fileName}) وتحديثها في الأرشيف الإلكتروني بنجاح.`,
      type: 'document',
      actionUrl: '/employee/documents',
    });
  };

  // Air Tickets
  const submitAirTicketRequest = (data: {
    benefitType: 'Annual Home Leave' | 'Family Vacation' | 'Relocation Flight';
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengersCount: number;
    employeeRemarks?: string;
  }) => {
    const reqNum = Math.floor(10 + Math.random() * 90);
    const newReq: AirTicketRequest = {
      id: `air-${Date.now()}`,
      requestId: `EDE-AIR-2026-00${reqNum}`,
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name,
      benefitType: data.benefitType,
      origin: data.origin,
      destination: data.destination,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      passengersCount: data.passengersCount,
      employeeRemarks: data.employeeRemarks,
      status: 'under_review',
      submittedAt: new Date().toISOString(),
    };

    setAirTickets((prev) => [newReq, ...prev]);

    addAuditLog({
      action: 'AIR_TICKET_REQUEST_SUBMITTED',
      module: 'Air Tickets & Travel',
      recordIdentifier: newReq.requestId,
      details: `Flight requested: ${data.origin} to ${data.destination} departing ${data.departureDate} for ${data.passengersCount} passenger(s).`,
    });
  };

  const updateAirTicketStatus = (
    requestId: string,
    status: 'approved' | 'ticket_issued' | 'rejected',
    pnrCode?: string,
    airline?: string,
    cost?: number
  ) => {
    setAirTickets((prev) =>
      prev.map((t) =>
        t.id === requestId || t.requestId === requestId
          ? {
              ...t,
              status,
              pnrCode: pnrCode || t.pnrCode,
              airline: airline || t.airline,
              ticketCostAed: cost || t.ticketCostAed,
            }
          : t
      )
    );

    addAuditLog({
      action: `AIR_TICKET_${status.toUpperCase()}`,
      module: 'Air Tickets & Travel',
      recordIdentifier: requestId,
      newStatus: status,
      details: `Air ticket status updated to ${status}. PNR: ${pnrCode || 'N/A'}. Airline: ${airline || 'N/A'}`,
    });
  };

  // Medical Claims
  const submitMedicalClaim = (data: {
    treatmentDate: string;
    claimCategory: 'Consultation & Lab' | 'Pharmacy' | 'Dental' | 'Optical' | 'Emergency Inpatient';
    claimedAmountAed: number;
    providerClinic: string;
    invoiceNumber: string;
  }) => {
    const claimNum = Math.floor(1000 + Math.random() * 9000);
    const newClaim: MedicalClaim = {
      id: `clm-${Date.now()}`,
      claimId: `CLM-2026-${claimNum}`,
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name,
      treatmentDate: data.treatmentDate,
      claimCategory: data.claimCategory,
      claimedAmountAed: data.claimedAmountAed,
      providerClinic: data.providerClinic,
      invoiceNumber: data.invoiceNumber,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };

    setMedicalClaims((prev) => [newClaim, ...prev]);

    addAuditLog({
      action: 'MEDICAL_CLAIM_SUBMITTED',
      module: 'Medical Insurance',
      recordIdentifier: newClaim.claimId,
      details: `Submitted reimbursement claim for AED ${data.claimedAmountAed} at ${data.providerClinic}.`,
    });
  };

  const reviewMedicalClaim = (
    claimId: string,
    status: 'approved' | 'rejected' | 'settled' | 'insurer_processing',
    approvedAmount?: number
  ) => {
    setMedicalClaims((prev) =>
      prev.map((c) =>
        c.id === claimId || c.claimId === claimId
          ? {
              ...c,
              status,
              approvedAmountAed: approvedAmount ?? c.claimedAmountAed,
            }
          : c
      )
    );

    addAuditLog({
      action: `MEDICAL_CLAIM_${status.toUpperCase()}`,
      module: 'Medical Insurance',
      recordIdentifier: claimId,
      newStatus: status,
      details: `Claim reviewed with decision: ${status}. Approved Amount: AED ${approvedAmount || 'N/A'}.`,
    });
  };

  // Attendance Biometric Sync Adapter
  const triggerAttendanceSync = async () => {
    setAttendanceSyncState((prev) => ({ ...prev, status: 'syncing' }));

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const todayStr = '2026-10-22';
    const newLogs: AttendanceRecord[] = [
      {
        id: `att-sync-${Date.now()}-1`,
        employeeId: 'EDE-EMP-1042',
        employeeName: 'Ahmed Al Mansoori',
        department: 'Drug Registration & Licensing',
        date: todayStr,
        checkIn: '08:01',
        checkOut: '16:04',
        workingHours: 8.05,
        status: 'present',
        sourceSystem: 'EDE_BIOMETRIC_ADAPTER',
      },
      {
        id: `att-sync-${Date.now()}-2`,
        employeeId: 'EDE-EMP-1044',
        employeeName: 'Rashid Al Kaabi',
        department: 'Drug Registration & Licensing',
        date: todayStr,
        checkIn: '08:15',
        checkOut: '16:10',
        workingHours: 7.9,
        status: 'present',
        sourceSystem: 'EDE_BIOMETRIC_ADAPTER',
      },
    ];

    setAttendanceRecords((prev) => [...newLogs, ...prev.filter((r) => r.date !== todayStr)]);

    setAttendanceSyncState({
      lastSync: new Date().toLocaleTimeString('en-GB') + ' GST (Just now)',
      recordsProcessed: 57,
      failedRecords: 0,
      duplicatesSkipped: 7,
      status: 'success',
      sourceSystem: 'EDE Central Biometric Gate Access API v2.4 (Live Feed)',
    });

    addAuditLog({
      action: 'ATTENDANCE_BIOMETRIC_SYNC_SUCCESS',
      module: 'Attendance Integration Adapter',
      recordIdentifier: 'BATCH-2026-10-22-LIV',
      details: 'Normalized and ingested 57 workforce biometric punches with 0 dropped transactions.',
    });
  };

  // Service Requests & Complaints
  const submitServiceTicket = (data: {
    category: ServiceTicket['category'];
    subject: string;
    description: string;
    priority: ServiceTicket['priority'];
  }) => {
    const num = Math.floor(100 + Math.random() * 900);
    const newTicket: ServiceTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `EDE-SR-2026-0${num}`,
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name,
      department: currentUser.department,
      supplier: currentUser.supplier,
      category: data.category,
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      slaTargetHours: 24,
      slaDeadline: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      slaStatus: 'on_track',
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: currentUser.role,
          message: data.description,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setTickets((prev) => [newTicket, ...prev]);

    addAuditLog({
      action: 'SERVICE_TICKET_CREATED',
      module: 'Service Requests & Complaints',
      recordIdentifier: newTicket.ticketNumber,
      details: `Created ${data.priority} priority ticket in category "${data.category}". 24h SLA clocked.`,
    });

    addNotification({
      recipientRole: 'supplier_esm',
      titleEn: `New Service Ticket: ${newTicket.ticketNumber}`,
      titleAr: `طلب خدمة جديد: ${newTicket.ticketNumber}`,
      messageEn: `New ${data.priority} priority ticket logged by ${currentUser.name}: ${data.subject}`,
      messageAr: `تم تسجيل طلب خدمة جديد بأولوية (${data.priority}) من ${currentUser.name}: ${data.subject}`,
      type: 'ticket',
      actionUrl: '/supplier/requests',
    });
  };

  const addTicketMessage = (ticketId: string, message: string, isInternal?: boolean) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId || t.ticketNumber === ticketId) {
          return {
            ...t,
            status: t.status === 'submitted' ? 'in_progress' : t.status,
            messages: [
              ...t.messages,
              {
                id: `msg-${Date.now()}`,
                senderId: currentUser.id,
                senderName: currentUser.name,
                senderRole: currentUser.role === 'outsourced_employee' ? 'Outsourced Employee' : 'Supplier Support Officer',
                message,
                timestamp: new Date().toISOString(),
                isInternal,
              },
            ],
          };
        }
        return t;
      })
    );

    addAuditLog({
      action: 'TICKET_MESSAGE_POSTED',
      module: 'Service Requests & Complaints',
      recordIdentifier: ticketId,
      details: `Message added by ${currentUser.name} (${currentUser.role}).`,
    });
  };

  const updateTicketStatus = (
    ticketId: string,
    status: ServiceTicket['status'],
    assignedOfficer?: string
  ) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId || t.ticketNumber === ticketId) {
          return {
            ...t,
            status,
            assignedOfficerName: assignedOfficer || t.assignedOfficerName,
            resolvedAt: status === 'resolved' || status === 'closed' ? new Date().toISOString() : t.resolvedAt,
            slaStatus: status === 'resolved' ? 'met' : t.slaStatus,
          };
        }
        return t;
      })
    );

    addAuditLog({
      action: `TICKET_STATUS_CHANGED_${status.toUpperCase()}`,
      module: 'Service Requests & Complaints',
      recordIdentifier: ticketId,
      newStatus: status,
      details: `Status updated to ${status}. Assigned officer: ${assignedOfficer || 'Unchanged'}.`,
    });
  };

  // Escalations
  const resolveEscalation = (
    escalationId: string,
    status: EscalationRecord['status'],
    remarks: string
  ) => {
    setEscalations((prev) =>
      prev.map((e) =>
        e.id === escalationId || e.escalationNumber === escalationId
          ? {
              ...e,
              status,
              supplierRemarks: remarks,
              slaStatus: 'met',
            }
          : e
      )
    );

    addAuditLog({
      action: `ESCALATION_${status.toUpperCase()}`,
      module: 'Account Escalations',
      recordIdentifier: escalationId,
      newStatus: status,
      details: `Account Manager ${currentUser.name} updated escalation status. Resolution: ${remarks}`,
    });
  };

  // Vacancy & Candidate Nomination
  const nominateCandidate = (
    requisitionId: string,
    candidate: {
      name: string;
      nationality: string;
      qualification: string;
      yearsOfExperience: number;
      cvFileName: string;
    }
  ) => {
    const candidateId = `cnd-${Date.now()}`;
    setRequisitions((prev) =>
      prev.map((req) => {
        if (req.id === requisitionId || req.requisitionId === requisitionId) {
          const newNomination = {
            id: candidateId,
            ...candidate,
            nominatedDate: new Date().toISOString().split('T')[0],
            status: 'nominated' as const,
          };
          return {
            ...req,
            status: 'candidates_submitted',
            nominatedCandidates: [...req.nominatedCandidates, newNomination],
          };
        }
        return req;
      })
    );

    addAuditLog({
      action: 'CANDIDATE_NOMINATED',
      module: 'Vacancies & Replacements',
      recordIdentifier: requisitionId,
      details: `Supplier nominated candidate ${candidate.name} (${candidate.qualification}). 15-day SLA target met.`,
    });
  };

  const updateCandidateStatus = (
    requisitionId: string,
    candidateId: string,
    status: StaffingRequisition['nominatedCandidates'][0]['status']
  ) => {
    setRequisitions((prev) =>
      prev.map((req) => {
        if (req.id === requisitionId || req.requisitionId === requisitionId) {
          return {
            ...req,
            nominatedCandidates: req.nominatedCandidates.map((c) =>
              c.id === candidateId ? { ...c, status } : c
            ),
          };
        }
        return req;
      })
    );

    addAuditLog({
      action: `CANDIDATE_STATUS_${status.toUpperCase()}`,
      module: 'Vacancies & Replacements',
      recordIdentifier: candidateId,
      details: `Candidate status updated to ${status} for requisition ${requisitionId}.`,
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const addCandidate = (candidate: Omit<Candidate, 'id' | 'candidateNumber' | 'submissionDate'>) => {
    const num = Math.floor(100 + Math.random() * 900);
    const newCand: Candidate = {
      id: `cand-${Date.now()}`,
      candidateNumber: `CND-2026-${num}`,
      submissionDate: new Date().toISOString().split('T')[0],
      ...candidate,
    };
    setCandidates((prev) => [newCand, ...prev]);
    addAuditLog({
      action: 'CANDIDATE_SOURCED',
      module: 'Recruitment & Sourcing',
      recordIdentifier: newCand.candidateNumber,
      details: `New candidate ${newCand.fullName} added for position ${newCand.positionApplied}.`,
    });
  };

  const updateCandidateScreening = (
    candidateId: string,
    status: Candidate['screeningStatus'],
    interviewDate?: string
  ) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId || c.candidateNumber === candidateId
          ? { ...c, screeningStatus: status, interviewDate: interviewDate || c.interviewDate }
          : c
      )
    );
    addAuditLog({
      action: `CANDIDATE_${status.toUpperCase().replace(/\s+/g, '_')}`,
      module: 'Recruitment & Sourcing',
      recordIdentifier: candidateId,
      details: `Candidate status updated to ${status}${interviewDate ? ` (Interview: ${interviewDate})` : ''}.`,
    });
  };

  const updateDeployment = (
    deploymentId: string,
    status: Deployment['status'],
    visaStatus?: Deployment['visaStatus'],
    insuranceStatus?: Deployment['insuranceStatus']
  ) => {
    setDeployments((prev) =>
      prev.map((d) =>
        d.id === deploymentId || d.deploymentNumber === deploymentId
          ? {
              ...d,
              status,
              visaStatus: visaStatus || d.visaStatus,
              insuranceStatus: insuranceStatus || d.insuranceStatus,
            }
          : d
      )
    );
    addAuditLog({
      action: `DEPLOYMENT_${status.toUpperCase().replace(/\s+/g, '_')}`,
      module: 'Onboarding & Deployment',
      recordIdentifier: deploymentId,
      details: `Deployment updated to status ${status}.`,
    });
  };

  const submitTransferRequest = (data: {
    employeeId: string;
    employeeName: string;
    department: string;
    currentSupplier: string;
    targetSupplier: string;
    reason: string;
    effectiveDate: string;
  }) => {
    const num = Math.floor(100 + Math.random() * 900);
    const newTransfer: EmployeeTransfer = {
      id: `trf-${Date.now()}`,
      transferNumber: `TRF-2026-${num}`,
      requestDate: new Date().toISOString().split('T')[0],
      edeApprovalStatus: 'Pending EDE Approval',
      handoverChecklistCompleted: false,
      ...data,
    };
    setTransfers((prev) => [newTransfer, ...prev]);
    addAuditLog({
      action: 'SUPPLIER_TRANSFER_REQUESTED',
      module: 'Transition & Reallocation',
      recordIdentifier: newTransfer.transferNumber,
      details: `Transfer requested for employee ${data.employeeName} from ${data.currentSupplier} to ${data.targetSupplier}.`,
    });
    addNotification({
      titleEn: 'Supplier Transfer Request Submitted',
      titleAr: 'تم تقديم طلب نقل موظف بين الموردين',
      messageEn: `Transfer request for ${data.employeeName} submitted for EDE authorization.`,
      messageAr: `تم رفع طلب نقل الموظف ${data.employeeName} لاعتماد إدارة مؤسسة الإمارات للدواء.`,
      type: 'approval',
      actionUrl: '/ede/approvals',
    });
  };

  const reviewTransferRequest = (transferId: string, decision: 'Approved by EDE' | 'Rejected by EDE') => {
    setTransfers((prev) =>
      prev.map((t) => (t.id === transferId || t.transferNumber === transferId ? { ...t, edeApprovalStatus: decision } : t))
    );
    addAuditLog({
      action: `TRANSFER_${decision.toUpperCase().replace(/\s+/g, '_')}`,
      module: 'Transition & Reallocation',
      recordIdentifier: transferId,
      details: `EDE decision recorded as ${decision} for transfer ${transferId}.`,
    });
  };

  const updateAnnexBDevDays = (itemNumber: number, days: number) => {
    setAnnexBItems((prev) =>
      prev.map((item) => (item.number === itemNumber ? { ...item, estimatedDevDays: days } : item))
    );
  };

  const updateAnnexBStatus = (itemNumber: number, status: AnnexBComplianceItem['demonstratedStatus']) => {
    setAnnexBItems((prev) =>
      prev.map((item) => (item.number === itemNumber ? { ...item, demonstratedStatus: status } : item))
    );
  };

  const resetDemoData = () => {
    setEmployees(MOCK_EMPLOYEES);
    setProfile(MOCK_EMPLOYEES[2]);
    setLeaveBalance(INITIAL_LEAVE_BALANCE);
    setLeaveRequests(INITIAL_LEAVE_REQUESTS);
    setCertificates(INITIAL_CERTIFICATES);
    setDocuments(INITIAL_DOCUMENTS);
    setAirTickets(INITIAL_AIR_TICKETS);
    setMedicalClaims(INITIAL_MEDICAL_CLAIMS);
    setAttendanceRecords(INITIAL_ATTENDANCE);
    setTickets(INITIAL_TICKETS);
    setEscalations(INITIAL_ESCALATIONS);
    setRequisitions(INITIAL_STAFFING_REQUISITIONS);
    setCandidates(INITIAL_CANDIDATES);
    setDeployments(INITIAL_DEPLOYMENTS);
    setTransfers(INITIAL_TRANSFERS);
    setAnnexBItems(INITIAL_ANNEX_B_ITEMS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCurrentUser(DEMO_USERS.employee);
    localStorage.removeItem('ede_demo_role');
  };

  return (
    <AppStoreContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        switchUserRole,
        login,
        verifyOtp,
        logout,
        employees,
        profile,
        leaveBalance,
        leaveRequests,
        submitLeaveRequest,
        reviewLeaveRequest,
        payslips,
        certificates,
        submitCertificateRequest,
        fulfillCertificate,
        requestBankDetailChange,
        reviewBankDetailChange,
        documents,
        uploadReplacementDocument,
        airTickets,
        submitAirTicketRequest,
        updateAirTicketStatus,
        medicalPolicy,
        medicalClaims,
        submitMedicalClaim,
        reviewMedicalClaim,
        attendanceRecords,
        attendanceSyncState,
        triggerAttendanceSync,
        tickets,
        submitServiceTicket,
        addTicketMessage,
        updateTicketStatus,
        escalations,
        resolveEscalation,
        requisitions,
        nominateCandidate,
        updateCandidateStatus,
        slaMetrics,
        candidates,
        addCandidate,
        updateCandidateScreening,
        deployments,
        updateDeployment,
        transfers,
        submitTransferRequest,
        reviewTransferRequest,
        suppliers,
        annexBItems,
        updateAnnexBDevDays,
        updateAnnexBStatus,
        notifications,
        markNotificationRead,
        auditLogs,
        resetDemoData,
        isSidebarCollapsed,
        toggleSidebarCollapse,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppStoreProvider');
  }
  return context;
}

