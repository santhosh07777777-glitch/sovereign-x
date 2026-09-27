import React, { useState } from 'react';
import { EvidenceGraphNode, EvidenceGraphLink } from '../../types';
import { INITIAL_EVIDENCE_GRAPH } from '../../data/mockData';
import { 
  GitMerge, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  Info,
  ShieldCheck,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const InteractiveEvidenceGraph: React.FC = () => {
  const [nodes, setNodes] = useState<EvidenceGraphNode[]>(INITIAL_EVIDENCE_GRAPH.nodes);
  const [links] = useState<EvidenceGraphLink[]>(INITIAL_EVIDENCE_GRAPH.links);
  const [selectedNode, setSelectedNode] = useState<EvidenceGraphNode | null>(nodes[3]); // Default to extracted fact
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'User Task', 'Document', 'Extracted Fact', 'SOP', 'Agent', 'Verification', 'Final Result'];

  const filteredNodes = selectedCategory === 'ALL' 
    ? nodes 
    : nodes.filter(n => n.category === selectedCategory);

  const getNodeColor = (cat: string) => {
    switch (cat) {
      case 'User Task': return 'border-cyan-500/50 bg-[#091522] text-cyan-300';
      case 'Document': return 'border-blue-500/50 bg-[#0a1224] text-blue-300';
      case 'Extracted Fact': return 'border-rose-500/50 bg-[#1c0e14] text-rose-300';
      case 'SOP': return 'border-purple-500/50 bg-[#180e24] text-purple-300';
      case 'Agent': return 'border-amber-500/50 bg-[#1c160c] text-amber-300';
      case 'Verification': return 'border-emerald-500/50 bg-[#0c1a14] text-emerald-300';
      case 'Final Result': return 'border-teal-500/50 bg-[#0c181a] text-teal-300';
      default: return 'border-slate-800 bg-[#0c1017] text-slate-300';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#07090e] font-mono text-xs overflow-hidden select-none">
      {/* Header & Category Filters */}
      <div className="p-4 border-b border-slate-800 bg-[#0a0d14] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white tracking-wide">
              BIDIRECTIONAL EVIDENCE & PROVENANCE GRAPH
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
              CRYPTOGRAPHICALLY ANCHORED
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Interactive causality chain: User Input → Raw Coordinates → Ground-Truth Rules → Formally Verified Output
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 bg-[#07090e] p-1 rounded border border-slate-800">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Visualization Area + Detail Drawer */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Visual Graph Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-[#06080d] p-6 relative overflow-auto flex flex-col justify-between tech-grid">
          {/* Legend Banner */}
          <div className="flex items-center gap-4 text-[10px] text-slate-400 bg-[#0c1017]/80 backdrop-blur-md p-2 rounded border border-slate-800 max-w-fit mb-4">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Input</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Document</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400"></span> Extracted Fact</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400"></span> SOP Rule</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Verified Result</span>
          </div>

          {/* Connected Flow Node Pipeline representation */}
          <div className="space-y-6 my-auto max-w-2xl mx-auto w-full">
            {/* Stage 1: User Task */}
            <div className="flex justify-center">
              {nodes.filter(n => n.id === 'task-root').map(node => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer shadow-xl max-w-md w-full text-center ${getNodeColor(node.category)} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-cyan-400 scale-105' : 'hover:scale-[1.02]'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">{node.category}</span>
                  <span className="text-xs font-bold text-white block">{node.label}</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">{node.details}</span>
                </div>
              ))}
            </div>

            {/* Vertical connector arrow */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                <span className="w-0.5 h-6 bg-cyan-500/40 block"></span>
              </div>
            </div>

            {/* Stage 2: Ingested Documents & Rules (Parallel) */}
            <div className="grid grid-cols-2 gap-4">
              {nodes.filter(n => n.id === 'doc-inspect' || n.id === 'doc-sop').map(node => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer shadow-lg ${getNodeColor(node.category)} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-cyan-400 scale-105' : 'hover:scale-[1.02]'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold block mb-0.5 opacity-80">{node.category}</span>
                  <span className="text-xs font-bold text-white block">{node.label}</span>
                  <span className="text-[10px] text-slate-300 mt-1 block">{node.details}</span>
                </div>
              ))}
            </div>

            {/* Stage 3: Extracted Facts & Calculations */}
            <div className="grid grid-cols-3 gap-3">
              {nodes.filter(n => n.id === 'fact-vib' || n.id === 'fact-temp' || n.id === 'agent-calc').map(node => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer shadow-lg ${getNodeColor(node.category)} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-cyan-400 scale-105' : 'hover:scale-[1.02]'
                  }`}
                >
                  <span className="text-[9px] uppercase font-bold block mb-0.5 opacity-80">{node.category}</span>
                  <span className="text-xs font-bold text-white block truncate">{node.label}</span>
                  <span className="text-[10px] text-slate-300 mt-1 block line-clamp-1">{node.details}</span>
                </div>
              ))}
            </div>

            {/* Vertical connector arrow */}
            <div className="flex justify-center">
              <span className="w-0.5 h-6 bg-emerald-500/40 block"></span>
            </div>

            {/* Stage 4: Verification Agent Validation */}
            <div className="flex justify-center">
              {nodes.filter(n => n.id === 'agent-verifier').map(node => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer shadow-xl max-w-md w-full text-center ${getNodeColor(node.category)} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-emerald-400 scale-105' : 'hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold mb-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{node.category}: {node.label}</span>
                  </div>
                  <span className="text-xs text-white block">{node.details}</span>
                </div>
              ))}
            </div>

            {/* Vertical connector arrow */}
            <div className="flex justify-center">
              <span className="w-0.5 h-6 bg-teal-500/40 block"></span>
            </div>

            {/* Stage 5: Final Result */}
            <div className="flex justify-center">
              {nodes.filter(n => n.id === 'result-finding').map(node => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl border-2 border-teal-500/70 bg-[#0d1c1c] text-teal-200 transition-all cursor-pointer shadow-glow-emerald max-w-lg w-full text-center ${
                    selectedNode?.id === node.id ? 'ring-2 ring-teal-300 scale-105' : 'hover:scale-[1.02]'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-teal-400 block mb-0.5">
                    VERIFIED ENGINEERING DIRECTIVE
                  </span>
                  <span className="text-sm font-bold text-white block">{node.label}</span>
                  <span className="text-xs text-teal-300 mt-1 block">{node.details}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center mt-4">
            Click any node above to inspect exact mathematical proof & cryptographic provenance ledger
          </div>
        </div>

        {/* Right Detail Inspector (4 cols) */}
        <div className="lg:col-span-4 bg-[#0a0d14] border-l border-slate-800 p-5 flex flex-col justify-between overflow-y-auto">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                  Node Inspector
                </span>
                <h3 className="text-base font-bold text-white">{selectedNode.label}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge status={selectedNode.category} size="sm" />
                  <span className="text-[10px] text-emerald-400 font-bold">PROVENANCE: VERIFIED</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Functional Description</span>
                  <p className="text-xs text-slate-200 leading-relaxed">{selectedNode.details}</p>
                </div>

                <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800 space-y-1.5 text-[11px]">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Verification Ledger</span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Node ID:</span>
                    <span className="text-cyan-300 font-bold">{selectedNode.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Integrity Hash:</span>
                    <span className="text-slate-300 truncate max-w-[140px]">0x4e712a819b120c</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Isolation Layer:</span>
                    <span className="text-emerald-400 font-bold">Level 4 Sandbox</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deterministic Confidence:</span>
                    <span className="text-emerald-400 font-bold">98.4%</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-cyan-300 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    Why This Matters
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    In high-consequence refinery environments, black-box AI recommendations cannot be approved. SOVEREIGN-X provides mathematical provenance linking the physical sensor tag directly to the plant standard.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              Select any graph node to inspect provenance verification.
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400">
            Graph Topology: Directed Acyclic Graph (DAG) • Zero External API Calls
          </div>
        </div>
      </div>
    </div>
  );
};
