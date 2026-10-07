export type DocumentStatus = 'PASS' | 'REVIEW' | 'FLAG';

export type MediaType = 'image' | 'document' | 'video';

export type DocumentCategory = 
  | 'passport' 
  | 'id_card' 
  | 'bank_statement' 
  | 'payslip' 
  | 'corporate_check'
  | 'kyc_video_selfie'
  | 'hologram_tilt_video';

export interface VideoLivenessMetrics {
  livenessScore: number;
  temporalCoherenceScore: number;
  screenReplayDetected: boolean;
  lipSyncValid: boolean;
  blinkRatePerMinute?: number;
  moirePatternPresent?: boolean;
}

export interface AnomalyItem {
  category: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  location: string;
}

export interface BoundingBox {
  label: string;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  width: number; // 0-100 percentage
  height: number; // 0-100 percentage
  confidence?: number;
  type?: 'tamper' | 'ai_hallucination' | 'spliced_digit' | 'face_swap' | 'guilloche_break';
}

export interface LedgerCheck {
  isMatched: boolean;
  openingBalance?: string;
  totalCredits?: string;
  totalDebits?: string;
  closingBalance?: string;
  calculatedClosing?: string;
  variance?: string;
  mathExplanation?: string;
}

export interface ForensicMetrics {
  fft: {
    syntheticLikelihood: number;
    highFreqRingDetected: boolean;
    spectralPeaks: number;
    energyDistribution: string;
  };
  ela: {
    maxDiscrepancy: number;
    avgDiscrepancy: number;
    suspiciousPatchesCount: number;
    recompressionQuality: number;
  };
  prnu: {
    sensorNoiseVariance: number;
    uniformityScore: number;
    zeroNoiseHolesDetected: boolean;
  };
  exif: {
    hasExif: boolean;
    software?: string;
    cameraMake?: string;
    modifyDate?: string;
    compressionTableAltered: boolean;
  };
}

export interface DocumentAnalysisResult {
  id: string;
  title: string;
  category: DocumentCategory;
  mediaType?: MediaType;
  fileName: string;
  fileSizeKb: number;
  imageDataUrl: string;
  videoUrl?: string;
  authenticityScore: number; // 0 to 100
  riskScore?: number; // 0 to 100 risk rate (high for AI, low for real)
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: DocumentStatus;
  executiveSummary: string;
  recommendation: string;
  farConfidence: string;
  processingTimeMs: number;
  sha256Hash: string;
  timestamp: string;
  pillars: {
    structureTypographyScore: number;
    aiDeepfakeScore: number;
    tamperCopyMoveScore: number;
    ledgerSemanticScore: number;
  };
  detectedAnomalies: AnomalyItem[];
  tamperBoundingBoxes: BoundingBox[];
  ledgerCheck?: LedgerCheck;
  videoLivenessMetrics?: VideoLivenessMetrics;
  forensicMetrics: ForensicMetrics;
  networkEntities: DecisionGraphData;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'applicant' | 'document' | 'bank_account' | 'device' | 'fraud_ring' | 'flagged_attribute';
  status: 'safe' | 'warning' | 'danger';
  details: string;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
  isSuspicious?: boolean;
}

export interface DecisionGraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface StorageBudgetInfo {
  ceilingMb: number;
  totalFootprintMb: number;
  breakdown: Array<{
    component: string;
    allocatedMb: number;
    currentMb: number;
    status: string;
  }>;
  diskRetentionPolicy: string;
  gdprCompliant: boolean;
  ephemeralMemory?: {
    rssMb: number;
    heapUsedMb: number;
    heapTotalMb: number;
    diskFilesSaved: number;
    zeroRetentionEnforced: boolean;
  };
}
