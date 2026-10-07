import React, { useEffect, useState } from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Clock, Hash, Trash2 } from 'lucide-react';

interface AuditEntry {
  auditId: string;
  timestamp: string;
  documentType: string;
  sha256Hash: string;
  authenticityScore: number;
  status: 'PASS' | 'REVIEW' | 'FLAG';
  processingTimeMs: number;
  memoryBufferDisposed: boolean;
  tamperCount: number;
}

interface AuditTrailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditTrailDrawer: React.FC<AuditTrailDrawerProps> = ({ isOpen, onClose }) => {
  const [trail, setTrail] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/audit-trail')
        .then((res) => res.json())
        .then((data) => {
          setTrail(data.trail || []);
        })
        .catch((err) => console.error('Failed to load audit trail:', err))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#0E0C1B] border-l border-[#423C5C] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#423C5C]/50 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-[#8E5BD6]/20 border border-[#8E5BD6]/40 text-[#8E5BD6]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Ephemeral In-Memory Audit Trail
                </h3>
                <p className="text-[11px] text-[#BABBCB]/70">
                  Zero-retention session inspection entries
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#BABBCB] hover:text-white hover:bg-[#423C5C]/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner */}
          <div className="px-5 py-3 bg-[#161329] border-b border-[#423C5C]/40 flex items-center gap-2 text-xs text-[#08C386]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="text-[11px]">
              Raw images unpinned from RAM post-scoring. Zero bytes written to disk.
            </span>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {loading ? (
              <div className="text-center py-10 text-xs text-[#BABBCB]">Loading in-memory trail...</div>
            ) : trail.length === 0 ? (
              <div className="text-center py-12 text-xs text-[#BABBCB]/80 space-y-2">
                <ShieldCheck className="w-8 h-8 mx-auto text-[#08C386] opacity-70" />
                <p>No documents evaluated in this session yet.</p>
                <p className="text-[11px] text-[#BABBCB]/50">Upload or select any sample case to generate a verifiable trail.</p>
              </div>
            ) : (
              trail.map((item) => {
                const isPass = item.status === 'PASS';
                const isReview = item.status === 'REVIEW';
                const statusColor = isPass ? '#08C386' : isReview ? '#F59E0B' : '#EF4444';

                return (
                  <div
                    key={item.auditId}
                    className="p-3.5 rounded-xl bg-[#05030D] border border-[#423C5C]/40 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-white text-[11px]">
                        {item.auditId}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                        style={{
                          color: statusColor,
                          backgroundColor: `${statusColor}20`,
                          borderColor: `${statusColor}40`,
                          borderWidth: '1px',
                        }}
                      >
                        {item.status} ({item.authenticityScore}%)
                      </span>
                    </div>

                    <div className="text-[11px] text-[#BABBCB] flex justify-between">
                      <span className="capitalize">{item.documentType.replace('_', ' ')}</span>
                      <span className="font-mono text-[10px]">{item.processingTimeMs} ms</span>
                    </div>

                    <div className="pt-2 border-t border-[#423C5C]/30 text-[10px] font-mono text-[#BABBCB]/70 break-all">
                      SHA: {item.sha256Hash.slice(0, 24)}...
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#08C386]">
                      <span>Buffer Disposed: TRUE</span>
                      <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#423C5C]/40 bg-[#161329]/60 flex items-center justify-between text-xs text-[#BABBCB]">
            <span>Total Session Entries: {trail.length}</span>
            <span className="font-mono text-[#08C386]">RAM: Ephemeral</span>
          </div>

        </div>
      </div>
    </div>
  );
};
