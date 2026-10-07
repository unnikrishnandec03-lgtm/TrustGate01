import React from 'react';
import { Shield, HardDrive, FileText, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenBudget: () => void;
  onOpenAudit: () => void;
  onRunDeepAi: () => void;
  isAiAnalyzing: boolean;
  totalFootprintMb: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBudget,
  onOpenAudit,
  onRunDeepAi,
  isAiAnalyzing,
  totalFootprintMb,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#232634] bg-[#090A0E]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Identity: Bold Italic Typography like VELOCITY reference */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#CCFF00] flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            <Shield className="w-5 h-5 fill-black stroke-black" />
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">
              TRUST<span className="text-[#CCFF00]">GATE</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase text-[#8E92A4] font-semibold border-l border-[#232634] pl-2">
              FRAUD DECISION ENGINE
            </span>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center space-x-2.5">
          
          {/* Storage Budget Pill (<25 MB constraint) */}
          <button
            onClick={onOpenBudget}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#14161F] border border-[#232634] hover:border-[#CCFF00]/50 transition-all text-xs text-[#8E92A4] hover:text-white cursor-pointer"
            title="Inspect Ephemeral Storage (<25 MB budget)"
          >
            <HardDrive className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span className="font-mono text-[11px]">RAM: <strong className="text-white">{totalFootprintMb} MB</strong> / 25 MB</span>
          </button>

          {/* Ephemeral Audit Trail */}
          <button
            onClick={onOpenAudit}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#14161F] border border-[#232634] hover:border-[#8E92A4] transition-all text-xs text-[#8E92A4] hover:text-white cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-medium">Audit Trail</span>
          </button>

          {/* High-Impact Neon Lime CTA matching reference image button */}
          <button
            onClick={onRunDeepAi}
            disabled={isAiAnalyzing}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-[#CCFF00] hover:bg-[#d8ff33] text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(204,255,0,0.25)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isAiAnalyzing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep AI Scan</span>
              </>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
