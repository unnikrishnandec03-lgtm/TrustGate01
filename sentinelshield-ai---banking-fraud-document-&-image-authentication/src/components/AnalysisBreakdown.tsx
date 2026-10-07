import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  FileCheck, 
  Video, 
  Calculator,
  Activity,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { DocumentAnalysisResult } from '../types';

interface AnalysisBreakdownProps {
  document: DocumentAnalysisResult;
  onOpenReport: () => void;
  onToggleGraph?: () => void;
}

export const AnalysisBreakdown: React.FC<AnalysisBreakdownProps> = ({ 
  document, 
  onOpenReport,
  onToggleGraph
}) => {
  const { 
    authenticityScore, 
    status, 
    pillars, 
    detectedAnomalies, 
    ledgerCheck, 
    videoLivenessMetrics, 
    executiveSummary, 
    recommendation 
  } = document;

  const riskScore = document.riskScore ?? Math.max(0, 100 - authenticityScore);
  const isHighRisk = riskScore >= 50;
  const isPass = status === 'PASS';

  // Neon palette inspired by reference image
  const primaryAccent = isHighRisk ? '#FF3B30' : '#CCFF00';
  const badgeBg = isHighRisk ? 'bg-[#FF3B30]/15 text-[#FF3B30] border-[#FF3B30]/30' : 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/30';

  return (
    <div className="flex flex-col space-y-3.5">
      
      {/* 1. Master Metric Card (Inspired by "Live Activity - 142 BPM" in reference image) */}
      <div className="p-5 rounded-2xl bg-[#0F1118] border border-[#202332] shadow-xl relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div 
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: primaryAccent }}
        />

        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold"
              style={{ backgroundColor: `${primaryAccent}20`, color: primaryAccent }}
            >
              {isHighRisk ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-white">
              TrustGate Evaluation
            </span>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-black tracking-wider uppercase border ${badgeBg}`}>
            {isHighRisk ? 'FLAGGED FORGERY' : 'VERIFIED GENUINE'}
          </span>
        </div>

        {/* Giant Number & Soundwave Graphic (Reference Image Match) */}
        <div className="flex items-end justify-between my-2">
          <div>
            <div className="flex items-baseline space-x-2">
              <span 
                className="text-5xl font-black font-mono tracking-tighter"
                style={{ color: primaryAccent }}
              >
                {riskScore}%
              </span>
              <span className="text-xs font-mono font-bold uppercase text-[#8E92A4]">
                FRAUD RISK
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#8E92A4] mt-0.5">
              Authenticity: <strong className="text-white">{authenticityScore}/100</strong> • FAR &lt; 0.1%
            </p>
          </div>

          {/* Minimal Frequency/Activity Bars Graphic (Directly mimicking reference image) */}
          <div className="flex items-end gap-1 h-12 pb-1">
            {[40, 75, 50, 95, 30, 85, 60, 100, 70, 45, 90, 35].map((h, i) => (
              <div 
                key={i}
                className="w-1.5 rounded-full transition-all duration-500"
                style={{ 
                  height: `${isHighRisk ? (h * 0.95) : (h * 0.45)}%`,
                  backgroundColor: primaryAccent,
                  opacity: i % 2 === 0 ? 0.9 : 0.5
                }}
              />
            ))}
          </div>
        </div>

        {/* Context Strip */}
        <div className={`mt-3.5 pt-3 border-t border-[#202332] text-xs leading-relaxed flex items-center gap-2`}>
          <span className="text-[#8E92A4] text-[11px]">
            {isHighRisk ? (
              <span className="text-[#FF3B30] font-semibold">
                ⚠️ Greater Risk Rate: Diffusion or forgery signatures detected.
              </span>
            ) : (
              <span className="text-[#CCFF00] font-semibold">
                ✓ Low Risk Rate: Real optical camera capture confirmed.
              </span>
            )}
          </span>
        </div>

      </div>

      {/* 2. Verification Pillars (Clean Minimal Ranked Tile like reference leaderboard) */}
      <div className="p-4 rounded-2xl bg-[#0F1118] border border-[#202332] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E92A4]">
            Forensic Pillars
          </span>
          <span className="text-[10px] font-mono text-[#8E92A4]">Zero-Retention (RAM)</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Pillar 1 */}
          <div className="p-2.5 rounded-xl bg-[#141620] border border-[#202332] flex flex-col justify-between">
            <span className="text-[10px] text-[#8E92A4] font-medium truncate">AI & Deepfake</span>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className={`text-base font-black font-mono ${pillars.aiDeepfakeScore < 50 ? 'text-[#FF3B30]' : 'text-white'}`}>
                {pillars.aiDeepfakeScore}%
              </span>
              <span className="text-[9px] font-mono text-[#8E92A4]">
                {pillars.aiDeepfakeScore < 50 ? 'AI FLAGGED' : 'CLEAR'}
              </span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-2.5 rounded-xl bg-[#141620] border border-[#202332] flex flex-col justify-between">
            <span className="text-[10px] text-[#8E92A4] font-medium truncate">Tamper / Splice</span>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className={`text-base font-black font-mono ${pillars.tamperCopyMoveScore < 50 ? 'text-[#FF3B30]' : 'text-white'}`}>
                {pillars.tamperCopyMoveScore}%
              </span>
              <span className="text-[9px] font-mono text-[#8E92A4]">
                {pillars.tamperCopyMoveScore < 50 ? 'SPLICED' : 'INTACT'}
              </span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-2.5 rounded-xl bg-[#141620] border border-[#202332] flex flex-col justify-between">
            <span className="text-[10px] text-[#8E92A4] font-medium truncate">Structure / Fonts</span>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className={`text-base font-black font-mono ${pillars.structureTypographyScore < 50 ? 'text-[#FF3B30]' : 'text-white'}`}>
                {pillars.structureTypographyScore}%
              </span>
              <span className="text-[9px] font-mono text-[#8E92A4]">
                {pillars.structureTypographyScore < 50 ? 'ANOMALY' : 'VALID'}
              </span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-2.5 rounded-xl bg-[#141620] border border-[#202332] flex flex-col justify-between">
            <span className="text-[10px] text-[#8E92A4] font-medium truncate">Ledger / Semantic</span>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className={`text-base font-black font-mono ${pillars.ledgerSemanticScore < 50 ? 'text-[#FF3B30]' : 'text-white'}`}>
                {pillars.ledgerSemanticScore}%
              </span>
              <span className="text-[9px] font-mono text-[#8E92A4]">
                {pillars.ledgerSemanticScore < 50 ? 'MISMATCH' : 'BALANCED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2b. Biometric Video Liveness Notice (If video) */}
      {videoLivenessMetrics && (
        <div className={`p-3.5 rounded-xl border text-xs ${
          !videoLivenessMetrics.screenReplayDetected && videoLivenessMetrics.livenessScore >= 70
            ? 'bg-[#CCFF00]/10 border-[#CCFF00]/30 text-[#CCFF00]' 
            : 'bg-[#FF3B30]/10 border-[#FF3B30]/30 text-[#FF3B30]'
        }`}>
          <div className="flex items-center justify-between font-bold mb-1">
            <span className="flex items-center gap-1.5 text-white">
              <Video className="w-3.5 h-3.5" /> Video Liveness Verification
            </span>
            <span className="font-mono text-[10px]">
              {videoLivenessMetrics.screenReplayDetected ? 'REPLAY ATTACK' : 'LIVENESS PASS'}
            </span>
          </div>
          <p className="text-[11px] text-[#8E92A4]">
            Liveness Score: <strong className="text-white">{videoLivenessMetrics.livenessScore}%</strong> • Screen Replay: <strong className="text-white">{videoLivenessMetrics.screenReplayDetected ? 'DETECTED' : 'NONE'}</strong>
          </p>
        </div>
      )}

      {/* 2c. Banking Ledger Discrepancy Notice (If financial doc) */}
      {ledgerCheck && (
        <div className={`p-3.5 rounded-xl border text-xs ${
          ledgerCheck.isMatched 
            ? 'bg-[#CCFF00]/10 border-[#CCFF00]/30 text-[#CCFF00]' 
            : 'bg-[#FF3B30]/10 border-[#FF3B30]/30 text-[#FF3B30]'
        }`}>
          <div className="flex items-center justify-between font-bold mb-1">
            <span className="flex items-center gap-1.5 text-white">
              <Calculator className="w-3.5 h-3.5" /> Ledger Reconciliation
            </span>
            <span className="font-mono text-[10px]">
              {ledgerCheck.isMatched ? 'RECONCILED' : 'DISCREPANCY'}
            </span>
          </div>
          <p className="text-[11px] text-[#8E92A4]">
            Stated Closing: <strong className="text-white">{ledgerCheck.closingBalance}</strong> • Audited: <strong className="text-white">{ledgerCheck.calculatedClosing}</strong>
          </p>
        </div>
      )}

      {/* 3. Concise Findings (Minimal 2-Bullet Brief, No Dense Wall of Text) */}
      <div className="p-4 rounded-2xl bg-[#0F1118] border border-[#202332] space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E92A4] block">
          Key Findings & Action
        </span>

        <p className="text-xs text-white leading-relaxed line-clamp-2">
          {executiveSummary}
        </p>

        <div className="pt-2 border-t border-[#202332] flex items-center justify-between">
          <span className="text-[11px] font-mono font-semibold" style={{ color: primaryAccent }}>
            {recommendation}
          </span>
        </div>
      </div>

      {/* 4. Sleek Action Bar */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onOpenReport}
          className="flex-1 flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-[#d8ff33] text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)] active:scale-95 cursor-pointer"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Audit Report</span>
        </button>

        {onToggleGraph && (
          <button
            onClick={onToggleGraph}
            className="flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl bg-[#141620] border border-[#232634] hover:border-[#8E92A4] text-white font-bold text-xs transition-all cursor-pointer"
            title="Inspect Entity Resolution Graph"
          >
            <span>Entity Graph</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
};
