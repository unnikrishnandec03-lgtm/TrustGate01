import React, { useState } from 'react';
import { 
  Network, 
  User, 
  FileText, 
  CreditCard, 
  Smartphone, 
  AlertOctagon, 
  ShieldCheck, 
  Info,
  Maximize2
} from 'lucide-react';
import { DecisionGraphData, GraphNode } from '../types';

interface DecisionEntityGraphProps {
  graphData: DecisionGraphData;
}

export const DecisionEntityGraph: React.FC<DecisionEntityGraphProps> = ({ graphData }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode>(
    graphData.nodes[0] || null
  );

  // Simple layout positions for a 500x300 viewport
  const nodePositions: Record<string, { x: number; y: number }> = {
    app: { x: 250, y: 150 },     // Center applicant
    doc: { x: 100, y: 90 },      // Top-left document
    acc: { x: 400, y: 90 },      // Top-right bank account
    dev: { x: 100, y: 220 },     // Bottom-left device
    ring: { x: 400, y: 220 },    // Bottom-right fraud ring
  };

  const getNodeIcon = (type: GraphNode['type'], status: GraphNode['status']) => {
    switch (type) {
      case 'applicant':
        return <User className="w-4 h-4 text-white" />;
      case 'document':
        return <FileText className="w-4 h-4 text-[#08C386]" />;
      case 'bank_account':
        return <CreditCard className="w-4 h-4 text-[#8E5BD6]" />;
      case 'device':
        return <Smartphone className="w-4 h-4 text-[#3B82F6]" />;
      case 'fraud_ring':
        return <AlertOctagon className="w-4 h-4 text-[#EF4444]" />;
      default:
        return <Network className="w-4 h-4 text-[#BABBCB]" />;
    }
  };

  return (
    <div className="rounded-2xl bg-[#0E0C1B] border border-[#423C5C]/50 shadow-xl p-5 flex flex-col space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-[#8E5BD6]/20 border border-[#8E5BD6]/40 text-[#8E5BD6]">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Decision Intelligence Entity Resolution Graph
            </h3>
            <p className="text-[11px] text-[#BABBCB]/70">
              Correlating applicant identity, document provenance, device fingerprint, and syndicate rings
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#423C5C]/30 text-[#08C386] border border-[#423C5C]/50">
          Quantexa Graph Engine
        </span>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="relative w-full h-72 rounded-xl bg-[#05030D] border border-[#423C5C]/40 bg-grid-pattern overflow-hidden flex items-center justify-center">
        
        <svg className="w-full h-full" viewBox="0 0 500 300">
          <defs>
            {/* Glowing lines filter */}
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#08C386" floodOpacity="0.6"/>
            </filter>
            <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#EF4444" floodOpacity="0.8"/>
            </filter>
            <filter id="glowViolet" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#8E5BD6" floodOpacity="0.6"/>
            </filter>
          </defs>

          {/* Render Links */}
          {graphData.links.map((link, idx) => {
            const sourcePos = nodePositions[link.source] || { x: 200, y: 150 };
            const targetPos = nodePositions[link.target] || { x: 300, y: 150 };

            return (
              <g key={idx}>
                <line
                  x1={sourcePos.x}
                  y1={sourcePos.y}
                  x2={targetPos.x}
                  y2={targetPos.y}
                  stroke={link.isSuspicious ? '#EF4444' : '#08C386'}
                  strokeWidth={link.isSuspicious ? '2' : '1.5'}
                  strokeDasharray={link.isSuspicious ? '4 3' : 'none'}
                  strokeOpacity={link.isSuspicious ? '0.9' : '0.6'}
                />

                {/* Midpoint link label */}
                <rect
                  x={(sourcePos.x + targetPos.x) / 2 - 35}
                  y={(sourcePos.y + targetPos.y) / 2 - 8}
                  width="70"
                  height="16"
                  rx="4"
                  fill="#05030D"
                  stroke={link.isSuspicious ? '#EF4444' : '#423C5C'}
                  strokeWidth="0.8"
                />
                <text
                  x={(sourcePos.x + targetPos.x) / 2}
                  y={(sourcePos.y + targetPos.y) / 2 + 3}
                  textAnchor="middle"
                  fill={link.isSuspicious ? '#EF4444' : '#BABBCB'}
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {link.label}
                </text>
              </g>
            );
          })}

          {/* Render Nodes */}
          {graphData.nodes.map((node) => {
            const pos = nodePositions[node.id] || { x: 250, y: 150 };
            const isSelected = selectedNode?.id === node.id;
            const isDanger = node.status === 'danger';
            const isWarning = node.status === 'warning';
            const isSafe = node.status === 'safe';

            const strokeColor = isDanger ? '#EF4444' : isWarning ? '#F59E0B' : '#08C386';
            const bgColor = isDanger ? '#2c0b0e' : isWarning ? '#261b07' : '#0a2318';

            return (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer transition-transform hover:scale-105"
                transform={`translate(${pos.x}, ${pos.y})`}
              >
                {/* Outer halo if selected */}
                {isSelected && (
                  <circle
                    r="28"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                    className="animate-spin"
                  />
                )}

                {/* Node circle */}
                <circle
                  r="20"
                  fill={bgColor}
                  stroke={strokeColor}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                />

                {/* Inner status dot */}
                <circle
                  cx="12"
                  cy="-12"
                  r="4"
                  fill={strokeColor}
                />

                {/* Node Label Text */}
                <text
                  y="34"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute top-2 right-2 px-2.5 py-1.5 rounded-lg bg-[#0E0C1B]/90 border border-[#423C5C]/40 text-[10px] space-y-1 font-mono">
          <div className="flex items-center gap-1.5 text-[#08C386]">
            <span className="w-2 h-2 rounded-full bg-[#08C386]" /> Verified Authentic
          </div>
          <div className="flex items-center gap-1.5 text-[#EF4444]">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" /> Spliced / Syndicate Link
          </div>
        </div>

      </div>

      {/* Selected Entity Context Panel */}
      {selectedNode && (
        <div className="p-3.5 rounded-xl bg-[#161329] border border-[#423C5C]/50 flex items-start justify-between text-xs">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-sm">
                {selectedNode.label}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                selectedNode.status === 'danger'
                  ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40'
                  : selectedNode.status === 'warning'
                  ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                  : 'bg-[#08C386]/20 text-[#08C386] border border-[#08C386]/40'
              }`}>
                {selectedNode.status}
              </span>
            </div>
            <p className="text-[#BABBCB] text-[11px] leading-relaxed">
              {selectedNode.details}
            </p>
          </div>

          <div className="text-right text-[11px] font-mono text-[#BABBCB]/70 shrink-0">
            <span>Entity Type: <strong className="text-white capitalize">{selectedNode.type.replace('_', ' ')}</strong></span>
          </div>
        </div>
      )}

    </div>
  );
};
