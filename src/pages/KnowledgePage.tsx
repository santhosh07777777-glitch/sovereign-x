import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { INITIAL_KNOWLEDGE_CHUNKS } from '../data/mockData';
import { KnowledgeChunk } from '../types';
import { 
  Database, 
  Search, 
  BookOpen, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';

export const KnowledgePage: React.FC = () => {
  const store = useAppStore();
  const [searchQuery, setSearchQuery] = useState('Recommended maintenance procedure for pump vibration?');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    { name: 'SOPs', count: 42, icon: BookOpen, desc: 'Plant operating and safety protocols' },
    { name: 'Manuals', count: 28, icon: FileText, desc: 'OEM equipment specifications' },
    { name: 'Inspection Reports', count: 35, icon: Layers, desc: 'NDT, thermography, and vibration surveys' },
    { name: 'Engineering Drawings', count: 22, icon: Sparkles, desc: 'P&ID diagrams and piping schematics' },
    { name: 'Maintenance Records', count: 18, icon: TrendingUp, desc: 'Historical work orders and lube logs' },
    { name: 'Safety Documents', count: 15, icon: ShieldCheck, desc: 'OSHA & PSU refinery safety directives' },
  ];

  const suggestedQueries = [
    'Recommended maintenance procedure for pump vibration?',
    'What is the maximum bearing temperature for API 610 pumps?',
    'ISO 10816-3 Zone D shutdown deadlines',
    'Isolation procedure for suction valve V-204A'
  ];

  const filteredChunks = INITIAL_KNOWLEDGE_CHUNKS.filter(chunk => {
    const matchesQuery = searchQuery === '' || 
      chunk.content.toLowerCase().includes(searchQuery.toLowerCase().split(' ')[0]) ||
      chunk.docTitle.toLowerCase().includes(searchQuery.toLowerCase().split(' ')[0]) ||
      chunk.tags.some(t => t.toLowerCase().includes('vibration') || t.toLowerCase().includes('sop'));
    const matchesCat = activeCategory === 'ALL' || chunk.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="p-6 space-y-6 font-mono overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-white tracking-wider">
              LOCAL RAG VECTOR KNOWLEDGE BASE
            </h1>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
              AIR-GAPPED VECTOR STORE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic semantic retrieval over plant engineering manuals, SOPs, and telemetry logs.
          </p>
        </div>
      </div>

      {/* RAG Health KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <MetricCard
          label="Total Docs"
          value="148"
          subValue="Air-gapped"
          icon={FileText}
          color="cyan"
        />
        <MetricCard
          label="Indexed Chunks"
          value="14,820"
          subValue="768-dim dense"
          icon={Layers}
          color="blue"
        />
        <MetricCard
          label="Embedding Model"
          value="BGE-Large"
          subValue="Local on-prem"
          icon={Cpu}
          color="emerald"
        />
        <MetricCard
          label="Last Sync"
          value="2m ago"
          subValue="Auto-indexed"
          icon={TrendingUp}
          color="cyan"
        />
        <MetricCard
          label="Retrieval Acc"
          value="99.1%"
          subValue="MRR @ 5"
          icon={CheckCircle2}
          color="emerald"
        />
        <MetricCard
          label="Storage Status"
          value="100% Local"
          subValue="Qdrant Enclave"
          icon={ShieldCheck}
          color="amber"
        />
      </div>

      {/* Document Categories Grid */}
      <div>
        <h3 className="text-xs uppercase tracking-wider font-bold text-slate-300 mb-3">
          Knowledge Base Repositories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(isSelected ? 'ALL' : cat.name)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-glow-cyan'
                    : 'bg-[#0c1017] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] text-slate-400 font-bold">{cat.count} docs</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-2">{cat.name}</h4>
                <p className="text-[9px] text-slate-400 mt-1 line-clamp-1">{cat.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Semantic Search Interface */}
      <div className="bg-[#0c1017] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              Local Semantic Vector Query Engine
            </h3>
            <span className="text-[10px] text-cyan-400">Cosine Distance & Reciprocal Rank Fusion</span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask an industrial question or search engineering procedures..."
              className="w-full bg-[#07090e] border border-slate-700 rounded-lg pl-4 pr-24 py-3 text-xs text-white placeholder-slate-400 outline-none focus:border-cyan-400 transition-colors"
            />
            <button 
              onClick={() => {}}
              className="absolute right-2 top-2 px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold transition-colors"
            >
              Search
            </button>
          </div>

          {/* Quick Query Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px]">
            <span className="text-slate-400">Try queries:</span>
            {suggestedQueries.map((q, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(q)}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Semantic Search Results List */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Retrieved Chunks ({filteredChunks.length} high-confidence matches)</span>
            <span>Vector Latency: 18ms</span>
          </div>

          <div className="space-y-3">
            {filteredChunks.map((chunk) => (
              <div
                key={chunk.id}
                className="p-4 rounded-lg bg-[#07090e] border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {chunk.docTitle}
                    </span>
                    <span className="text-[10px] text-slate-400">Chunk #{chunk.chunkIndex}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Relevance: {Math.round((chunk.relevanceScore || 0.9) * 100)}%
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-[#0c1017] p-3 rounded border border-slate-800/80">
                  {chunk.content}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] pt-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Tag className="w-3 h-3 text-cyan-400" />
                    {chunk.tags.map(t => (
                      <span key={t} className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const doc = store.documents.find(d => d.name === chunk.docTitle);
                      if (doc) store.setDocumentForViewer(doc);
                    }}
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Open Source Document <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
