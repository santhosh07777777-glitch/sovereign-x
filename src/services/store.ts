import { useState, useEffect } from 'react';
import { 
  DocumentItem, 
  WorkflowNode, 
  Finding, 
  VerificationItem, 
  SecurityEvent, 
  AuditEntry,
  AgentInfo
} from '../types';
import { 
  INITIAL_DOCUMENTS, 
  INITIAL_AGENTS, 
  WORKFLOW_NODES_TEMPLATE, 
  SAMPLE_FINDINGS_P204, 
  INITIAL_VERIFICATION_QUEUE, 
  INITIAL_SECURITY_EVENTS, 
  INITIAL_AUDIT_LOG 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
}

// Global in-memory reactive state
class AppStore {
  private listeners: Set<() => void> = new Set();

  documents: DocumentItem[] = [...INITIAL_DOCUMENTS];
  agents: AgentInfo[] = [...INITIAL_AGENTS];
  workflowNodes: WorkflowNode[] = JSON.parse(JSON.stringify(WORKFLOW_NODES_TEMPLATE));
  findings: Finding[] = [...SAMPLE_FINDINGS_P204];
  verificationQueue: VerificationItem[] = [...INITIAL_VERIFICATION_QUEUE];
  securityEvents: SecurityEvent[] = [...INITIAL_SECURITY_EVENTS];
  auditLogs: AuditEntry[] = [...INITIAL_AUDIT_LOG];
  toasts: ToastMessage[] = [];
  
  isExecutingWorkflow: boolean = false;
  activeNodeIndex: number = -1;
  activeTaskId: string = 'task-p204-001';
  hasExecutedDemo: boolean = true;
  currentPage: string = 'workbench';
  isAuthenticated: boolean = true;
  selectedDocumentForViewer: DocumentItem | null = null;
  deliverableModalOpen: boolean = false;

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  setCurrentPage(page: string) {
    this.currentPage = page;
    this.notify();
  }

  addToast(type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) {
    const id = 'toast-' + Date.now();
    this.toasts = [...this.toasts, { id, type, title, message }];
    this.notify();

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
      this.notify();
    }, 4500);
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }

  setDocumentForViewer(doc: DocumentItem | null) {
    this.selectedDocumentForViewer = doc;
    this.notify();
  }

  setDeliverableModalOpen(open: boolean) {
    this.deliverableModalOpen = open;
    this.notify();
  }

  // Verification actions
  approveVerificationItem(id: string) {
    const item = this.verificationQueue.find(i => i.id === id);
    if (!item) return;

    item.status = 'Verified';
    this.verificationQueue = [...this.verificationQueue];

    // Log to audit
    const newAudit: AuditEntry = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      user: 'Dr. A. Verma (Lead Chief Engineer)',
      agent: 'VERIFICATION AGENT',
      eventType: 'Verification',
      status: 'SUCCESS',
      model: 'Human-in-the-Loop Signoff',
      hash: '0x' + Math.random().toString(16).substring(2, 10),
      details: `Formally APPROVED claim: "${item.claim.slice(0, 60)}..." based on ground-truth audit.`
    };
    this.auditLogs = [newAudit, ...this.auditLogs];

    this.addToast('success', 'Claim Verified & Signed', 'Finding has been recorded in the sovereign ledger with cryptographic integrity.');
    this.notify();
  }

  rejectVerificationItem(id: string) {
    const item = this.verificationQueue.find(i => i.id === id);
    if (!item) return;

    item.status = 'Rejected';
    this.verificationQueue = [...this.verificationQueue];

    const newAudit: AuditEntry = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      user: 'Dr. A. Verma (Lead Chief Engineer)',
      agent: 'VERIFICATION AGENT',
      eventType: 'Verification',
      status: 'FLAGGED',
      model: 'Human-in-the-Loop Signoff',
      hash: '0x' + Math.random().toString(16).substring(2, 10),
      details: `REJECTED hallucinated claim: "${item.claim.slice(0, 60)}...". Feedback stored for prompt refinement.`
    };
    this.auditLogs = [newAudit, ...this.auditLogs];

    this.addToast('warning', 'Claim Rejected', 'Marked as unverified discrepancy. System notified to exclude from executive note.');
    this.notify();
  }

  requestReverification(id: string) {
    const item = this.verificationQueue.find(i => i.id === id);
    if (!item) return;

    item.status = 'Needs Review';
    this.verificationQueue = [...this.verificationQueue];

    this.addToast('info', 'Reverification Queued', 'Secondary verification agent re-running vector cross-correlation with 0.01 tolerance.');
    this.notify();
  }

  // Add document simulation
  addDocument(newDoc: Partial<DocumentItem>) {
    const doc: DocumentItem = {
      id: `doc-${Date.now().toString().slice(-3)}`,
      name: newDoc.name || 'Uploaded_Engineering_Doc.pdf',
      type: newDoc.type || 'PDF',
      category: newDoc.category || 'Inspection Report',
      size: newDoc.size || '3.4 MB',
      uploadedDate: 'Just now',
      status: 'Parsed & Indexed',
      securityClass: newDoc.securityClass || 'RESTRICTED',
      verificationStatus: 'Verified',
      pageCount: 8,
      summary: 'Securely parsed on-premise without external telemetry.',
      extractedEntities: ['Asset: Verified', 'Confidential: Cleared', 'OCR: 100%']
    };
    this.documents = [doc, ...this.documents];
    this.addToast('success', 'Document Ingested Locally', `${doc.name} indexed into local vector storage.`);
    this.notify();
  }

  // Run the full agentic workflow simulation
  async runAgentWorkflow(taskPrompt?: string, onComplete?: () => void) {
    if (this.isExecutingWorkflow) return;
    this.isExecutingWorkflow = true;
    this.hasExecutedDemo = true;
    
    // Reset nodes to waiting
    this.workflowNodes = WORKFLOW_NODES_TEMPLATE.map(node => ({
      ...node,
      status: node.id === 'node-input' ? 'Completed' : 'Waiting'
    }));
    this.notify();

    // Step through nodes with realistic timing
    const stepDelays = [200, 600, 700, 500, 900, 600, 800, 500, 400];

    for (let i = 1; i < this.workflowNodes.length; i++) {
      this.activeNodeIndex = i;
      this.workflowNodes[i].status = 'Running';
      this.notify();

      // Simulate execution time
      await new Promise(res => setTimeout(res, stepDelays[i]));

      this.workflowNodes[i].status = 'Completed';
      this.notify();
    }

    this.isExecutingWorkflow = false;
    this.activeNodeIndex = -1;
    this.findings = [...SAMPLE_FINDINGS_P204];

    // Log to audit
    const newAudit: AuditEntry = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      user: 'Dr. A. Verma (Lead Chief Engineer)',
      agent: 'MASTER AGENT',
      eventType: 'Task Execution',
      status: 'SUCCESS',
      model: 'gpt-oss-20B + Qwen3-VL-8B',
      hash: '0x' + Math.random().toString(16).substring(2, 10),
      details: `Completed Sovereign Agentic Pipeline for: "${taskPrompt || 'Analyze Pump P-204 Inspection Report'}". 3 Findings, 100% Verified.`
    };
    this.auditLogs = [newAudit, ...this.auditLogs];

    this.addToast('success', 'Sovereign Pipeline Execution Completed', 'Verified diagnosis, evidence graph, and deliverable compiled with 94.2% confidence.');
    if (onComplete) onComplete();
    this.notify();
  }
}

export const appStore = new AppStore();

// React hook to subscribe to store changes
export function useAppStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    return appStore.subscribe(() => setTick(t => t + 1));
  }, []);

  return appStore;
}
