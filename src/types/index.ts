export type TaskType = 
  | 'Document Analysis'
  | 'Inspection Report Analysis'
  | 'Engineering Drawing Analysis'
  | 'Knowledge Search'
  | 'Data Analysis'
  | 'Report Generation'
  | 'Risk Assessment';

export type NodeStatus = 'Waiting' | 'Running' | 'Completed' | 'Warning' | 'Failed';

export interface WorkflowNode {
  id: string;
  name: string;
  role: string;
  status: NodeStatus;
  durationMs?: number;
  actionDescription: string;
  details?: string[];
  outputSnippet?: string;
  confidence?: number;
  model?: string;
  timestamp?: string;
}

export interface EvidenceReference {
  id: string;
  title: string;
  sourceDoc: string;
  sourcePage: string;
  citationType: 'SOP' | 'Inspection Log' | 'Drawing' | 'Telemetry' | 'Manual';
  excerpt: string;
  confidence: number;
  coordinates?: { x: number; y: number; width: number; height: number };
}

export interface Finding {
  id: string;
  title: string;
  equipmentId: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'Requires Inspection' | 'Operational' | 'Warning' | 'Exceeded Interval';
  description: string;
  evidence: EvidenceReference[];
  confidence: number;
  verified: boolean;
  recommendedActions: string[];
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'PDF' | 'PNG' | 'XLSX' | 'DOCX';
  category: 'Inspection Report' | 'SOP' | 'Manual' | 'Engineering Drawing' | 'Maintenance Log';
  size: string;
  uploadedDate: string;
  status: 'Parsed & Indexed' | 'Processing' | 'Pending OCR' | 'Archived';
  securityClass: 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET - LOCAL ONLY';
  verificationStatus: 'Verified' | 'Needs Review' | 'Unverified';
  summary?: string;
  pageCount?: number;
  extractedEntities?: string[];
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: 'ONLINE' | 'ACTIVE' | 'STANDBY' | 'BUSY';
  currentTask?: string;
  model: string;
  permissions: string[];
  lastActivity: string;
  successRate: number;
  latencyAvg: string;
  tokensProcessed: number;
  iconName: string;
}

export interface EvidenceGraphNode {
  id: string;
  label: string;
  category: 'User Task' | 'Document' | 'Extracted Fact' | 'SOP' | 'Agent' | 'Verification' | 'Final Result';
  details: string;
  metadata?: Record<string, string>;
  status?: 'verified' | 'active' | 'referenced';
}

export interface EvidenceGraphLink {
  source: string;
  target: string;
  label: string;
}

export interface VerificationItem {
  id: string;
  claim: string;
  sourceDoc: string;
  sourcePage: string;
  generatingAgent: string;
  confidence: number;
  status: 'Verified' | 'Needs Review' | 'Rejected';
  timestamp: string;
  groundTruthExcerpt: string;
  independentCheck: string;
  reviewerNotes?: string;
}

export interface SecureTool {
  id: string;
  name: string;
  category: 'Computation' | 'Parsing' | 'Analysis' | 'Verification';
  description: string;
  status: 'ACTIVE' | 'ISOLATED' | 'STANDBY';
  permissions: 'SANDBOX ONLY' | 'READ LOCAL DISK' | 'AIR-GAPPED';
  lastExecution: string;
  executionCount: number;
  codeSnippet?: string;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  threatType: string;
  action: 'BLOCKED' | 'QUARANTINED' | 'ALERT' | 'SANITIZED';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  sourceProcess: string;
  details: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  agent: string;
  eventType: 'Task Execution' | 'Security Scan' | 'Knowledge Retrieval' | 'Verification' | 'Deliverable Generated' | 'Tool Execution';
  status: 'SUCCESS' | 'BLOCKED' | 'FLAGGED';
  model: string;
  hash: string;
  details: string;
}

export interface KnowledgeChunk {
  id: string;
  docId: string;
  docTitle: string;
  category: string;
  chunkIndex: number;
  content: string;
  relevanceScore?: number;
  similarity?: number;
  tags: string[];
}
