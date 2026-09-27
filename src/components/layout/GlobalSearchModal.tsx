import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../services/store';
import { Search, FileText, Database, Shield, Wrench, X, ArrowRight } from 'lucide-react';
import { INITIAL_KNOWLEDGE_CHUNKS } from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const store = useAppStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // open modal if closed
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDocs = store.documents.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.summary?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredChunks = INITIAL_KNOWLEDGE_CHUNKS.filter(c =>
    c.content.toLowerCase().includes(query.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const quickPicks = [
    { label: 'Pump P-204 Inspection Report', type: 'doc', action: () => { store.setCurrentPage('documents'); onClose(); } },
    { label: 'Plant Safety SOP-204 Section 3.2', type: 'sop', action: () => { store.setCurrentPage('knowledge'); onClose(); } },
    { label: 'Python Vibration Severity Sandbox', type: 'tool', action: () => { store.setCurrentPage('tools'); onClose(); } },
    { label: 'Evidence Graph: Pump P-204', type: 'graph', action: () => { store.setCurrentPage('evidence'); onClose(); } },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-xl bg-[#0c1017] border border-slate-700/80 shadow-2xl overflow-hidden font-mono">
        {/* Search input header */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-[#07090e]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search confidential SOPs, assets, telemetry or tools..."
            className="w-full bg-transparent px-3 py-3.5 text-sm text-white placeholder-slate-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded ml-2">ESC</span>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {!query && (
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider px-2 mb-2 font-semibold">
                Quick Navigation
              </p>
              <div className="space-y-1">
                {quickPicks.map((pick, i) => (
                  <button
                    key={i}
                    onClick={pick.action}
                    className="w-full flex items-center justify-between p-2 rounded hover:bg-slate-800/80 text-left text-xs text-slate-200 group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                      <span>{pick.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">{pick.type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && (
            <>
              {/* Document matches */}
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider px-2 mb-1.5 font-semibold">
                  Confidential Documents ({filteredDocs.length})
                </p>
                {filteredDocs.length === 0 ? (
                  <p className="text-xs text-slate-400 px-2 py-1">No document matches found.</p>
                ) : (
                  <div className="space-y-1">
                    {filteredDocs.slice(0, 3).map(doc => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          store.setDocumentForViewer(doc);
                          store.setCurrentPage('documents');
                          onClose();
                        }}
                        className="w-full flex items-start gap-2.5 p-2 rounded hover:bg-slate-800/80 text-left transition-colors"
                      >
                        <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-white font-medium">{doc.name}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{doc.summary}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Vector Knowledge Chunks */}
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider px-2 mb-1.5 font-semibold">
                  Knowledge Base & SOP Chunks ({filteredChunks.length})
                </p>
                {filteredChunks.length === 0 ? (
                  <p className="text-xs text-slate-400 px-2 py-1">No SOP or chunk matches found.</p>
                ) : (
                  <div className="space-y-1">
                    {filteredChunks.slice(0, 3).map(chunk => (
                      <button
                        key={chunk.id}
                        onClick={() => {
                          store.setCurrentPage('knowledge');
                          onClose();
                        }}
                        className="w-full flex items-start gap-2.5 p-2 rounded hover:bg-slate-800/80 text-left transition-colors"
                      >
                        <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white font-medium">{chunk.docTitle}</span>
                            <span className="text-[9px] text-cyan-400 bg-cyan-950/60 px-1 rounded">Score: {Math.round((chunk.relevanceScore || 0.9) * 100)}%</span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{chunk.content}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#07090e] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search scope: Local on-premise embeddings only</span>
          <span>Zero cloud telemetry</span>
        </div>
      </div>
    </div>
  );
};
