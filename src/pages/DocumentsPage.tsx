import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { DocumentItem } from '../types';
import { 
  Files, 
  UploadCloud, 
  Search, 
  Filter, 
  FileText, 
  Image as ImageIcon, 
  Table, 
  Eye, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Plus
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const DocumentsPage: React.FC = () => {
  const store = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Inspection Report', 'SOP', 'Manual', 'Engineering Drawing', 'Maintenance Log'];

  const filteredDocs = store.documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.extractedEntities?.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'ALL' || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSimulatedUpload = () => {
    store.addDocument({
      name: `CDU2_Turbine_Inspection_${Math.floor(Math.random() * 800 + 100)}.pdf`,
      category: 'Inspection Report',
      type: 'PDF',
      size: '5.1 MB',
      securityClass: 'RESTRICTED'
    });
  };

  const getDocIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-4 h-4 text-rose-400" />;
      case 'PNG': return <ImageIcon className="w-4 h-4 text-purple-400" />;
      case 'XLSX': return <Table className="w-4 h-4 text-emerald-400" />;
      default: return <FileText className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6 font-mono overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Files className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-white tracking-wider">
              CONFIDENTIAL DOCUMENT VAULT
            </h1>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
              LOCAL ENCLAVE ONLY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Secure on-premise storage and multimodal indexing for engineering drawings, NDT reports, and plant SOPs.
          </p>
        </div>

        <button
          onClick={handleSimulatedUpload}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-glow-cyan transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Confidential Document</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div 
        onClick={handleSimulatedUpload}
        className="p-6 rounded-xl border border-dashed border-slate-700 hover:border-cyan-500/60 bg-[#090d14]/80 text-center cursor-pointer transition-all group"
      >
        <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 mx-auto mb-2 transition-colors" />
        <h3 className="text-xs font-bold text-slate-200">
          Drag and drop engineering reports, P&ID drawings, or sensor logs
        </h3>
        <p className="text-[11px] text-slate-400 mt-1">
          Supports PDF, TIFF, DXF, PNG, XLSX • Automatic local OCR & vector indexing with zero internet egress
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c1017] p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2 w-72">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by name, entity, tag..."
            className="w-full bg-transparent text-xs text-white placeholder-slate-400 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-[#0c1017] border border-slate-800 rounded-xl overflow-hidden shadow-xl text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-[#07090e] text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Uploaded</th>
                <th className="py-3 px-4">Security Class</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredDocs.map((doc) => (
                <tr 
                  key={doc.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => store.setDocumentForViewer(doc)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                        {getDocIcon(doc.type)}
                      </div>
                      <div>
                        <span className="font-bold text-white group-hover:text-cyan-300 transition-colors block">
                          {doc.name}
                        </span>
                        <span className="text-[10px] text-slate-400 line-clamp-1">
                          {doc.summary}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{doc.category}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{doc.size}</td>
                  <td className="py-3 px-4 text-slate-400">{doc.uploadedDate}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={doc.securityClass} size="sm" />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={doc.verificationStatus} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => store.setDocumentForViewer(doc)}
                      className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-[10px] font-bold hover:bg-cyan-900 transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      View Split Screen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
