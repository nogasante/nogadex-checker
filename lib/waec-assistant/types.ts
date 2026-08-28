export type WaecExamType =
  | "WASSCE"
  | "NOVDEC"
  | "BECE_SCHOOL"
  | "BECE_PRIVATE"
  | "GBCE"
  | "ABCE";

export interface WaecCandidateDetails {
  requestId: string;
  fullName: string;
  indexNumber: string;
  dateOfBirth: string; // YYYY-MM-DD
  examType: string;
  examYear: string;
}

export interface WaecPortalFieldMapping {
  portalUrl: string;
  indexNumberSelector?: string;
  examTypeSelector?: string;
  examYearSelector?: string;
  dobSelector?: string;
}

export const WAEC_GHANA_PORTAL_URL = "https://ghana.waecdirect.org/";
