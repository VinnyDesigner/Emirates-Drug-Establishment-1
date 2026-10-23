export type UserRole =
  | 'outsourced_employee'
  | 'line_manager'
  | 'ede_hr_admin'
  | 'supplier_esm'
  | 'supplier_am'
  | 'supplier_ops_admin'
  | 'establishment_admin';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  nameAr: string;
  email: string;
  role: UserRole;
  department: string;
  departmentAr: string;
  jobTitle: string;
  jobTitleAr: string;
  supplier: string;
  supplierAr: string;
  avatarUrl?: string;
  mobile: string;
  nationality: string;
  twoFactorEnabled: boolean;
}

export interface EmployeeProfile {
  id: string;
  employeeId: string;
  fullNameEn: string;
  fullNameAr: string;
  jobTitleEn: string;
  jobTitleAr: string;
  departmentEn: string;
  departmentAr: string;
  supplierEn: string;
  supplierAr: string;
  email: string;
  mobile: string;
  residentialAddress: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  nationality: string;
  dateOfBirth: string;
  joiningDate: string;
  employmentStatus: 'Active' | 'On Leave' | 'Notice Period' | 'Probation';
  bankDetails: {
    bankName: string;
    accountHolder: string;
    maskedIban: string;
    fullIbanForSupplierView: string;
  };
  pendingBankChange?: {
    requestId: string;
    requestedAt: string;
    proposedBank: string;
    proposedIban: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    remarks?: string;
  };
}

export type LeaveType =
  | 'annual'
  | 'sick'
  | 'emergency'
  | 'study'
  | 'maternity_paternity'
  | 'hajj';

export interface LeaveBalance {
  annualTotal: number;
  annualUsed: number;
  annualPending: number;
  annualRemaining: number;
  sickRemaining: number;
  emergencyRemaining: number;
  studyRemaining: number;
}

export interface LeaveRequest {
  id: string;
  requestId: string;
  employeeId: string;
  employeeName: string;
  employeeNameAr?: string;
  department: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  attachmentName?: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'returned_for_clarification';
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  managerRemarks?: string;
  clarificationRemarks?: string;
}

export interface Payslip {
  id: string;
  employeeId: string;
  month: string; // e.g. "March"
  monthAr: string;
  year: number;
  basicSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  otherAllowances: number;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  currency: string;
  paymentDate: string;
  status: 'Paid' | 'Processing';
  bankName: string;
  accountMasked: string;
}

export interface CertificateRequest {
  id: string;
  requestId: string;
  employeeId: string;
  employeeName: string;
  certificateType: 'salary' | 'employment';
  language: 'en' | 'ar' | 'both';
  purpose: string;
  addressedTo: string;
  status: 'submitted' | 'processing' | 'issued' | 'rejected';
  submittedAt: string;
  issuedAt?: string;
  slaTargetHours: number; // 48 hrs = 2 working days
  slaStatus: 'on_track' | 'met' | 'breached';
  downloadUrl?: string;
  rejectionReason?: string;
}

export type DocumentCategory =
  | 'passport'
  | 'emirates_id'
  | 'residence_visa'
  | 'labor_contract'
  | 'health_insurance'
  | 'degree_cert'
  | 'good_conduct';

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  employeeName: string;
  category: DocumentCategory;
  categoryLabelEn: string;
  categoryLabelAr: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  daysUntilExpiry: number;
  verificationStatus: 'verified' | 'pending_verification' | 'renewal_in_progress' | 'expired';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  renewalUrgent?: boolean; // <= 30 days
}

export interface AirTicketRequest {
  id: string;
  requestId: string;
  employeeId: string;
  employeeName: string;
  benefitType: 'Annual Home Leave' | 'Family Vacation' | 'Relocation Flight';
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengersCount: number;
  employeeRemarks?: string;
  status: 'submitted' | 'under_review' | 'approved' | 'ticket_issued' | 'rejected';
  submittedAt: string;
  pnrCode?: string;
  airline?: string;
  ticketCostAed?: number;
}

export interface MedicalPolicy {
  provider: string;
  planName: string;
  policyNumber: string;
  memberNumber: string;
  networkTier: string;
  effectiveDate: string;
  expiryDate: string;
  daysToRenewal: number;
  annualCoverageLimitAed: number;
  coPayOutpatient: string;
  status: 'Active' | 'Renewal Pending';
}

export interface MedicalClaim {
  id: string;
  claimId: string;
  employeeId: string;
  employeeName: string;
  treatmentDate: string;
  claimCategory: 'Consultation & Lab' | 'Pharmacy' | 'Dental' | 'Optical' | 'Emergency Inpatient';
  claimedAmountAed: number;
  approvedAmountAed?: number;
  providerClinic: string;
  status: 'submitted' | 'supplier_verification' | 'insurer_processing' | 'approved' | 'rejected' | 'settled';
  submittedAt: string;
  invoiceNumber: string;
  remarks?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: number;
  status: 'present' | 'absent' | 'late' | 'on_leave';
  sourceSystem: 'EDE_BIOMETRIC_ADAPTER' | 'SMART_GATE_ACCESS' | 'MANUAL_IMPORT';
}

export interface ServiceTicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: string;
  isInternal?: boolean;
}

export interface ServiceTicket {
  id: string;
  ticketNumber: string;
  employeeId: string;
  employeeName: string;
  department: string;
  supplier: string;
  category:
    | 'General HR Inquiry'
    | 'Payroll Inquiry'
    | 'Benefits Inquiry'
    | 'Document Request'
    | 'Insurance Support'
    | 'Attendance Inquiry'
    | 'Formal Complaint'
    | 'Other';
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'submitted' | 'under_review' | 'awaiting_info' | 'in_progress' | 'resolved' | 'closed';
  submittedAt: string;
  resolvedAt?: string;
  slaTargetHours: number; // 24 hrs
  slaDeadline: string;
  slaStatus: 'on_track' | 'met' | 'breached';
  assignedTo?: string;
  assignedOfficerName?: string;
  messages: ServiceTicketMessage[];
}

export interface EscalationRecord {
  id: string;
  escalationNumber: string;
  ticketId: string;
  employeeName: string;
  department: string;
  issueSummary: string;
  priority: 'High' | 'Critical';
  escalatedAt: string;
  slaTargetHours: number; // 4 hours for AM response
  slaStatus: 'on_track' | 'met' | 'breached';
  responsibleOfficer: string;
  status: 'Open' | 'Investigating' | 'Resolution Proposed' | 'Closed';
  supplierRemarks?: string;
}

export interface CandidateNomination {
  id: string;
  name: string;
  nationality: string;
  qualification: string;
  yearsOfExperience: number;
  nominatedDate: string;
  interviewDate?: string;
  status: 'nominated' | 'interview_scheduled' | 'approved' | 'rejected' | 'deployed';
  cvFileName: string;
}

export interface StaffingRequisition {
  id: string;
  requisitionId: string;
  positionTitle: string;
  department: string;
  requestedDate: string;
  targetDeploymentDate: string;
  assignedSupplier: string;
  requiredQualifications: string;
  headcount: number;
  type: 'New Vacancy' | 'Emergency Replacement';
  slaDaysAllowed: number; // 15 days for new vacancy nomination, 10 days for replacement
  status: 'open' | 'shortlisting' | 'candidates_submitted' | 'interviewing' | 'completed' | 'cancelled';
  nominatedCandidates: CandidateNomination[];
}

export interface SlaMetric {
  id: string;
  code: string;
  indicatorEn: string;
  indicatorAr: string;
  targetDescriptionEn: string;
  targetDescriptionAr: string;
  rfpSection: string;
  targetValue: number;
  targetUnit: string;
  actualValue: number;
  complianceRate: number; // percentage, e.g. 98.4
  status: 'compliant' | 'warning' | 'breached';
  breachedTransactionsCount: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  module: string;
  recordIdentifier: string;
  previousStatus?: string;
  newStatus?: string;
  details: string;
  ipAddress: string;
}

export interface NotificationItem {
  id: string;
  recipientRole?: UserRole;
  recipientEmployeeId?: string;
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  timestamp: string;
  type: 'leave' | 'certificate' | 'document' | 'ticket' | 'approval' | 'system';
  isRead: boolean;
  actionUrl?: string;
}

export interface Candidate {
  id: string;
  candidateNumber: string;
  fullName: string;
  nationality: string;
  positionApplied: string;
  yearsOfExperience: number;
  education: string;
  supplier: string;
  screeningStatus: 'Sourced' | 'Screened' | 'Nominated to EDE' | 'Interview Scheduled' | 'EDE Approved' | 'EDE Rejected' | 'Offer Accepted';
  cvUrl?: string;
  matchScore: number;
  submissionDate: string;
  interviewDate?: string;
}

export interface Deployment {
  id: string;
  deploymentNumber: string;
  employeeName: string;
  position: string;
  department: string;
  supplier: string;
  nominationApprovedDate: string;
  visaStatus: 'Pending Submission' | 'Entry Permit Issued' | 'Medical Passed' | 'Emirates ID Biometrics Done' | 'Visa Stamped';
  insuranceStatus: 'Enrolled' | 'Card Active' | 'Pending';
  targetStartDate: string;
  actualStartDate?: string;
  status: 'In Onboarding' | 'Deployed' | 'Delayed';
}

export interface EmployeeTransfer {
  id: string;
  transferNumber: string;
  employeeId: string;
  employeeName: string;
  department: string;
  currentSupplier: string;
  targetSupplier: string;
  requestDate: string;
  reason: string;
  edeApprovalStatus: 'Pending EDE Approval' | 'Approved by EDE' | 'Rejected by EDE';
  effectiveDate: string;
  handoverChecklistCompleted: boolean;
}

export interface SupplierEntity {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  contractNumber: string;
  headcountQuota: number;
  activeHeadcount: number;
  contactPerson: string;
  email: string;
  phone: string;
  contractStartDate: string;
  contractEndDate: string;
  monthlyBillingEstimated: number;
  complianceRate: number;
  status: 'Active' | 'Under Review';
}

export interface AnnexBComplianceItem {
  number: number;
  requirementTitleEn: string;
  requirementTitleAr: string;
  rfpReference: string;
  relatedScreenNames: string[];
  relatedScreenRoutes: string[];
  demonstratedStatus: 'Frontend Demonstrated' | 'Backend Implemented' | 'Integration Pending' | 'Requires Development' | 'Externally Verified' | 'Not Implemented';
  availability: 'Available' | 'Requires Development';
  estimatedDevDays: number;
  evidenceNotesEn: string;
  supplierRemarksEn: string;
}

