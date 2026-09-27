import React, { useState, useRef } from 'react';
import { useAppStore } from '../../services/store';
import { 
  Play, 
  UploadCloud, 
  FileText, 
  Trash2, 
  Lock, 
  RotateCcw,
  Sparkles,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

export const TaskInputPanel: React.FC = () => {
  const store = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>({
    name: 'Pump_P204_Inspection_Report.pdf',
    size: '4.2 MB',
    type: 'PDF'
  });

  const [question, setQuestion] = useState(
    'Identify abnormal readings, relevant SOP references, and recommended actions.'
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      setUploadedFile({
        name: file.name,
        size: `${sizeMb} MB`,
        type: ext
      });
      store.addToast('info', 'Document Attached', `${file.name} ready for local analysis.`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      setUploadedFile({
        name: file.name,
        size: `${sizeMb} MB`,
        type: ext
      });
      store.addToast('info', 'Document Attached', `${file.name} staged for local analysis.`);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLoadDemo = () => {
    setUploadedFile({
      name: 'Pump_P204_Inspection_Report.pdf',
      size: '4.2 MB',
      type: 'PDF'
    });
    setQuestion('Identify abnormal readings, relevant SOP references, and recommended actions.');
    store.addToast('info', 'Sample Document Loaded', 'Pump P-204 Inspection Report loaded.');
  };

  const handleAnalyze = () => {
    if (!uploadedFile) {
      store.addToast('warning', 'No Document Attached', 'Please select or upload a document to analyze.');
      return;
    }
    store.runAgentWorkflow(question);
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0d14] border-r border-slate-800/80 p-5 font-mono select-none overflow-y-auto justify-between">
      <div className="space-y-5">
        {/* Title and Subtitle */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white tracking-wide">
              Analyze Industrial Document
            </h2>
            <button
              onClick={handleLoadDemo}
              className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
              title="Reset to default Pump P-204 demo"
            >
              <RotateCcw className="w-2.5 h-2.5" /> Demo Sample
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Upload a confidential document and ask SOVEREIGN-X to analyze it.
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.png,.jpg,.jpeg,.docx,.xlsx"
          className="hidden"
        />

        {/* Upload Area / File Card */}
        <div>
          {!uploadedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="p-6 rounded-xl border border-dashed border-slate-700 hover:border-cyan-500/70 bg-[#07090e] text-center cursor-pointer transition-all group"
            >
              <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 mx-auto mb-2 transition-colors" />
              <p className="text-xs font-bold text-slate-200 group-hover:text-white">
                Upload Document
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Supports PDF, PNG, JPG, DOCX, XLSX
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-[#0c1017] border border-cyan-500/30 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-400 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {uploadedFile.type} • {uploadedFile.size}
                  </p>
                </div>
              </div>

              <button
                onClick={handleRemoveFile}
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded hover:bg-slate-800 transition-colors ml-2 shrink-0"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Question Area */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            What should the AI find?
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            placeholder="Type your question or query about the document..."
            className="w-full bg-[#07090e] border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-400 outline-none focus:border-cyan-500 transition-colors font-mono leading-relaxed resize-none"
          />
        </div>

        {/* Primary Action Button */}
        <div>
          <button
            onClick={handleAnalyze}
            disabled={store.isExecutingWorkflow}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs tracking-wider shadow-glow-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 fill-white ${store.isExecutingWorkflow ? 'animate-spin' : ''}`} />
            <span>{store.isExecutingWorkflow ? 'Analyzing Document...' : 'Analyze Document'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Security Note */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
        <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Processed locally • External network access blocked</span>
      </div>
    </div>
  );
};
