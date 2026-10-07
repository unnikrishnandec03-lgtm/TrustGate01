import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  FileCheck, 
  Lock, 
  Hash, 
  Calendar, 
  CheckCircle2 
} from 'lucide-react';
import { DocumentAnalysisResult } from '../types';

interface ComplianceReportModalProps {
  document: DocumentAnalysisResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ComplianceReportModal: React.FC<ComplianceReportModalProps> = ({
  document,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !document) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(document, null, 2)
    )}`;
    const downloadAnchor = window.document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `TrustGate_Audit_${document.id}.json`);
    downloadAnchor.click();
  };

  const isPass = document.status === 'PASS';
  const isReview = document.status === 'REVIEW';
  const statusColor = isPass ? '#08C386' : isReview ? '#F59E0B' : '#EF4444';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 print:p-0 print:bg-white">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0E0C1B] border border-[#423C5C] shadow-2xl p-6 sm:p-8 text-white print:border-none print:bg-white print:text-black print:max-h-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Actions (hidden on print) */}
        <div className="flex items-center justify-between pb-4 border-b border-[#423C5C]/40 print:hidden">
          <span className="text-xs font-mono uppercase tracking-wider text-[#08C386] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Official Bank Forensics Dossier
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadJson}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#161329] border border-[#423C5C]/60 hover:bg-[#423C5C]/40 text-xs text-[#BABBCB] hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#08C386] hover:bg-[#09d996] text-[#05030D] text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#BABBCB] hover:text-white hover:bg-[#423C5C]/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="mt-6 space-y-6">
          
          {/* Certificate Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-[#161329] border border-[#423C5C]/60 print:bg-gray-100 print:border-gray-300">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black italic tracking-tight uppercase">TRUST<span className="text-[#CCFF00] print:text-green-700">GATE</span></span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#423C5C]/50 text-[#BABBCB]">
                  VERIFICATION DOSSIER
                </span>
              </div>
              <p className="text-xs text-[#BABBCB] print:text-gray-600 mt-1">
                Banking Fraud & Document Optical Authentication Certificate
              </p>
            </div>

            <div className="mt-4 sm:mt-0 sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#BABBCB]/70 block">
                Decision Status
              </span>
              <span 
                className="text-lg font-black tracking-wider uppercase inline-block font-mono"
                style={{ color: statusColor }}
              >
                {document.status} ({document.authenticityScore}%)
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#05030D] border border-[#423C5C]/40 text-xs font-mono print:bg-gray-50 print:border-gray-200">
            <div>
              <span className="text-[#BABBCB]/70 print:text-gray-500 block text-[10px]">DOCUMENT</span>
              <span className="font-bold text-white print:text-black">{document.title}</span>
            </div>
            <div>
              <span className="text-[#BABBCB]/70 print:text-gray-500 block text-[10px]">CATEGORY</span>
              <span className="font-bold text-white print:text-black capitalize">{document.category.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-[#BABBCB]/70 print:text-gray-500 block text-[10px]">TIMESTAMP</span>
              <span className="text-white print:text-black">{new Date(document.timestamp).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[#BABBCB]/70 print:text-gray-500 block text-[10px]">LATENCY</span>
              <span className="text-white print:text-black">{document.processingTimeMs} ms</span>
            </div>
          </div>

          {/* Cryptographic Proof */}
          <div className="p-3 rounded-lg bg-[#05030D] border border-[#423C5C]/40 text-xs font-mono space-y-1 print:bg-gray-50 print:border-gray-200">
            <span className="text-[10px] text-[#08C386] print:text-green-700 block font-bold">
              CRYPTOGRAPHIC IN-MEMORY SHA-256 HASH
            </span>
            <div className="text-white print:text-black break-all text-[11px] select-all">
              {document.sha256Hash}
            </div>
          </div>

          {/* Four Pillars Score Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#BABBCB] print:text-gray-700">
              Forensic Pillar Breakdown
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-lg bg-[#161329] border border-[#423C5C]/40 text-center print:bg-gray-100 print:border-gray-300">
                <span className="text-[10px] text-[#BABBCB] print:text-gray-600 block">Structure & Typography</span>
                <span className="text-base font-bold text-white print:text-black font-mono">
                  {document.pillars.structureTypographyScore}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#161329] border border-[#423C5C]/40 text-center print:bg-gray-100 print:border-gray-300">
                <span className="text-[10px] text-[#BABBCB] print:text-gray-600 block">Anti-Deepfake / AI</span>
                <span className="text-base font-bold text-white print:text-black font-mono">
                  {document.pillars.aiDeepfakeScore}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#161329] border border-[#423C5C]/40 text-center print:bg-gray-100 print:border-gray-300">
                <span className="text-[10px] text-[#BABBCB] print:text-gray-600 block">Copy-Move / Splicing</span>
                <span className="text-base font-bold text-white print:text-black font-mono">
                  {document.pillars.tamperCopyMoveScore}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#161329] border border-[#423C5C]/40 text-center print:bg-gray-100 print:border-gray-300">
                <span className="text-[10px] text-[#BABBCB] print:text-gray-600 block">Ledger Math Consistency</span>
                <span className="text-base font-bold text-white print:text-black font-mono">
                  {document.pillars.ledgerSemanticScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Executive Summary & Recommendation */}
          <div className="p-4 rounded-xl bg-[#161329] border border-[#423C5C]/40 text-xs space-y-2 print:bg-gray-100 print:border-gray-300">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E5BD6] print:text-purple-700 block">
                Compliance Officer Summary
              </span>
              <p className="text-white print:text-black mt-1 leading-relaxed">
                {document.executiveSummary}
              </p>
            </div>
            <div className="pt-2 border-t border-[#423C5C]/40 print:border-gray-300">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#08C386] print:text-green-700 block">
                Prescribed Routing Action
              </span>
              <p className="text-[#08C386] print:text-green-800 font-semibold mt-0.5">
                {document.recommendation}
              </p>
            </div>
          </div>

          {/* Zero-Retention Compliance Statement */}
          <div className="p-3.5 rounded-lg border border-[#08C386]/30 bg-[#08C386]/10 text-[11px] text-[#BABBCB] print:bg-gray-50 print:border-gray-300 print:text-gray-600">
            <div className="flex items-center gap-1.5 text-white print:text-black font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#08C386] print:text-green-700" />
              <span>GDPR Article 17 & Banking Zero-Retention Guarantee</span>
            </div>
            <p className="leading-relaxed">
              This document was parsed and evaluated exclusively in volatile RAM. 
              Zero persistent disk writes occurred. The image buffer was released and recycled immediately post-scoring.
            </p>
          </div>

          {/* Sign-off line for printable dossier */}
          <div className="pt-6 border-t border-[#423C5C]/40 flex justify-between text-xs print:border-gray-300">
            <div>
              <span className="text-[10px] text-[#BABBCB]/60 print:text-gray-500 block">EXAMINER IDENTIFIER</span>
              <span className="font-mono text-white print:text-black">TrustGate Micro-WASM v2.4</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#BABBCB]/60 print:text-gray-500 block">COMPLIANCE SIGN-OFF</span>
              <span className="font-mono text-white print:text-black">CRYPTOGRAPHICALLY ATTESTED</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
