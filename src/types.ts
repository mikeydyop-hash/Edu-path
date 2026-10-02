export interface PsychometricLayer {
  personality: string; // RIASEC or personality summary
  passions: string;     // Passion, interest statement
  softSkills: string[]; // List of soft skills
}

export interface AcademicLayer {
  curriculum: string;
  favoriteSubjects?: string[];       // Used for Subject Selector
  grades?: Record<string, string>;   // Subject -> Grade mapping for University Matcher
  certifications?: string[];         // Additional achievements/certifications
}

export interface GeographicLayer {
  country: string;
  targetRegions: string[];
}

export interface UserProfile {
  task: "subject-selector" | "university-matcher";
  psychometric: PsychometricLayer;
  academic: AcademicLayer;
  geographic: GeographicLayer;
}

// Interfaces for response types from API

export interface SubjectCombination {
  subject: string;
  reason: string;
}

export interface SubjectSelectorResponse {
  recommendedPathway: string;
  optimalSubjectCombinations: SubjectCombination[];
  justification: string;
  geographicAnalysis: string;
}

export interface UniversityMatch {
  university: string;
  country: string;
  program: string;
  entryRequirementsMet: string;
  matchScore: number;
  description: string;
}

export interface UniversityMatcherResponse {
  academicTierAnalysis: string;
  universityMatches: UniversityMatch[];
  actionableNextSteps: string[];
  academicGaps: string[];
}
