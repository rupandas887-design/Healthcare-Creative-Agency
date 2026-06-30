/**
 * Types & Interfaces for Sunil Sulegai - Surgical Practice Growth Partner
 */

export interface BookingFormInput {
  name: string;
  hospitalName: string;
  specialty: string;
  city: string;
  mobileNumber: string;
  email: string;
  currentMonthlyProcedures: string;
  biggestGrowthChallenge: string;
}

export interface DiagnosticResult {
  leakageAnalysis: {
    stage: string;
    description: string;
    severity: "High" | "Medium" | "Low";
    leakageRateEst: string;
  }[];
  operationalBenchmarks: {
    metric: string;
    averagepractice: string;
    targetperformance: string;
    impact: string;
  }[];
  actionableRoadmap: {
    pillar: string;
    actionItems: string[];
    expectedOutcome: string;
    timeline: string;
  }[];
  estimatedOpportunity: {
    currentAnnualprocedures: number;
    potentialAnnualprocedures: number;
    estimatedRevenueLift: string;
  };
}

export interface TrackingEventLog {
  id: string;
  timestamp: string;
  action: string;
  category: string;
  label: string;
}
