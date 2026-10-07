import React, { useEffect, useRef, useState } from 'react';
import { 
  Eye, 
  Activity, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  AlertTriangle, 
  Maximize2,
  Split,
  Info,
  Video,
  Play,
  Pause
} from 'lucide-react';
import { DocumentAnalysisResult, BoundingBox } from '../types';
import { computeFFTSpectrum, computeELA, computePRNUNoise } from '../utils/forensics';

interface ForensicViewerProps {
  document: DocumentAnalysisResult;
}

type LayerMode = 'RGB' | 'FFT' | 'ELA' | 'PRNU' | 'SPLIT';

export const ForensicViewer: React.FC<ForensicViewerProps> = ({ document }) => {
  const [activeLayer, setActiveLayer] = useState<LayerMode>('RGB');
  const [secondaryLayer, setSecondaryLayer] = useState<'FFT' | 'ELA' | 'PRNU'>('FFT');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [elaMultiplier, setElaMultiplier] = useState(24);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredBox, setHoveredBox] = useState<BoundingBox | null>(null);
  const [isProcessingCanvas, setIsProcessingCanvas] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  // Canvas refs
  const sourceImgRef = useRef<HTMLImageElement>(null);
  const fftCanvasRef = useRef<HTMLCanvasElement>(null);
  const elaCanvasRef = useRef<HTMLCanvasElement>(null);
  const prnuCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoElemRef = useRef<HTMLVideoElement>(null);

  // Recompute forensic layers whenever document or parameters change
  useEffect(() => {
    const img = sourceImgRef.current;
    if (!img) return;

    const runForensics = async () => {
      setIsProcessingCanvas(true);
      try {
        // Compute 2D FFT
        if (fftCanvasRef.current) {
          // Offscreen scratch for source
          const offCanvas = window.document.createElement('canvas');
          offCanvas.width = img.naturalWidth || 500;
          offCanvas.height = img.naturalHeight || 350;
          const ctx = offCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, offCanvas.width, offCanvas.height);
            const isSynthetic = document.authenticityScore < 50 && document.category === 'id_card';
            computeFFTSpectrum(offCanvas, fftCanvasRef.current, isSynthetic);
          }
        }

        // Compute ELA
        if (elaCanvasRef.current) {
          await computeELA(img, elaCanvasRef.current, elaMultiplier, 0.82);
        }

        // Compute PRNU
        if (prnuCanvasRef.current) {
          computePRNUNoise(img, prnuCanvasRef.current);
        }
      } catch (err) {
        console.error('Forensic calculation error:', err);
      } finally {
        setIsProcessingCanvas(false);
      }
    };

    if (img.complete) {
      runForensics();
    } else {
      img.onload = runForensics;
    }
  }, [document, elaMultiplier]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(2.5, prev + 0.25));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(0.75, prev - 0.25));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#0F1118] border border-[#202332] shadow-xl overflow-hidden">
      
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-[#202332] bg-[#141620]/80 backdrop-blur-sm gap-2">
        
        {/* Layer Mode Switcher */}
        <div className="flex items-center space-x-1 p-0.5 rounded-xl bg-[#090A0E] border border-[#202332]">
          <button
            onClick={() => setActiveLayer('RGB')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeLayer === 'RGB'
                ? 'bg-[#CCFF00] text-black shadow-sm'
                : 'text-[#8E92A4] hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Optical</span>
          </button>

          <button
            onClick={() => setActiveLayer('FFT')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeLayer === 'FFT'
                ? 'bg-[#CCFF00] text-black shadow-sm'
                : 'text-[#8E92A4] hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>2D FFT</span>
          </button>

          <button
            onClick={() => setActiveLayer('ELA')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeLayer === 'ELA'
                ? 'bg-[#CCFF00] text-black shadow-sm'
                : 'text-[#8E92A4] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ELA</span>
          </button>

          <button
            onClick={() => setActiveLayer('PRNU')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeLayer === 'PRNU'
                ? 'bg-[#CCFF00] text-black shadow-sm'
                : 'text-[#8E92A4] hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>PRNU</span>
          </button>

          <button
            onClick={() => setActiveLayer('SPLIT')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeLayer === 'SPLIT'
                ? 'bg-[#CCFF00] text-black shadow-sm'
                : 'text-[#8E92A4] hover:text-white'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Split</span>
          </button>
        </div>

        {/* Viewport & Filter Controls */}
        <div className="flex items-center space-x-2">
          
          {/* ELA Multiplier Slider when in ELA mode */}
          {(activeLayer === 'ELA' || (activeLayer === 'SPLIT' && secondaryLayer === 'ELA')) && (
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-[#05030D] border border-[#423C5C]/40 text-xs text-[#BABBCB]">
              <span>ELA Gain:</span>
              <input
                type="range"
                min="10"
                max="45"
                value={elaMultiplier}
                onChange={(e) => setElaMultiplier(Number(e.target.value))}
                className="w-16 accent-[#EF4444] cursor-pointer"
              />
              <span className="font-mono text-white text-[11px]">{elaMultiplier}x</span>
            </div>
          )}

          {/* Secondary Layer Select in Split mode */}
          {activeLayer === 'SPLIT' && (
            <select
              value={secondaryLayer}
              onChange={(e) => setSecondaryLayer(e.target.value as 'FFT' | 'ELA' | 'PRNU')}
              className="px-2 py-1 text-xs rounded-lg bg-[#05030D] border border-[#423C5C]/50 text-white font-medium cursor-pointer"
            >
              <option value="FFT">Secondary: 2D FFT</option>
              <option value="ELA">Secondary: ELA Heatmap</option>
              <option value="PRNU">Secondary: PRNU Noise</option>
            </select>
          )}

          {/* Toggle Bounding Boxes */}
          <button
            onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              showBoundingBoxes
                ? 'bg-[#08C386]/20 border-[#08C386]/40 text-[#08C386]'
                : 'bg-[#05030D] border-[#423C5C]/40 text-[#BABBCB]'
            }`}
            title="Toggle Spliced / Tampered Anomaly Overlays"
          >
            Anomalies ({document.tamperBoundingBoxes.length})
          </button>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 p-0.5 rounded-lg bg-[#05030D] border border-[#423C5C]/50">
            <button
              onClick={handleZoomOut}
              className="p-1 rounded text-[#BABBCB] hover:text-white hover:bg-[#423C5C]/40 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono text-white">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 rounded text-[#BABBCB] hover:text-white hover:bg-[#423C5C]/40 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 rounded text-[#BABBCB] hover:text-white hover:bg-[#423C5C]/40 transition-colors cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Main Canvas Viewport Area */}
      <div className="relative flex-1 bg-[#05030D] bg-grid-pattern overflow-hidden flex items-center justify-center p-4 min-h-[420px]">
        
        {/* Hidden Source Image for canvas processing */}
        <img
          ref={sourceImgRef}
          src={document.imageDataUrl}
          alt={document.title}
          className="hidden"
          crossOrigin="anonymous"
        />

        {/* Viewport Container with Zoom */}
        <div 
          className="relative max-w-full max-h-full transition-transform duration-200 ease-out select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          
          {/* 1. SINGLE VIEW MODE: RGB */}
          {activeLayer === 'RGB' && (
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#423C5C]/40">
              {document.mediaType === 'video' && document.videoUrl && !document.videoUrl.startsWith('data:image/svg') ? (
                <video
                  ref={videoElemRef}
                  src={document.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="max-h-[500px] w-auto object-contain block"
                />
              ) : (
                <img
                  src={document.imageDataUrl}
                  alt={document.title}
                  className="max-h-[500px] w-auto object-contain block"
                />
              )}

              {/* Video Liveness HUD overlay if mediaType is video */}
              {document.mediaType === 'video' && (
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-[#05030D]/80 border border-[#EF4444]/60 text-[10px] font-mono font-bold text-[#EF4444] backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
                    <span>KYC VIDEO LIVENESS INSPECTION • PRESENTATION ATTACK MONITOR</span>
                  </div>

                  <button
                    onClick={() => {
                      setIsPlayingVideo(!isPlayingVideo);
                      if (videoElemRef.current) {
                        if (isPlayingVideo) videoElemRef.current.pause();
                        else videoElemRef.current.play();
                      }
                    }}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#05030D]/80 border border-[#423C5C] text-xs text-white hover:border-[#08C386] transition-colors cursor-pointer backdrop-blur-sm"
                  >
                    {isPlayingVideo ? <Pause className="w-3 h-3 text-[#08C386]" /> : <Play className="w-3 h-3 text-[#08C386]" />}
                    <span className="text-[10px] font-mono">{isPlayingVideo ? 'PAUSE' : 'PLAY'}</span>
                  </button>
                </div>
              )}

              {/* Glowing Quantexa Tamper Bounding Boxes */}
              {showBoundingBoxes && document.tamperBoundingBoxes.map((box, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredBox(box)}
                  onMouseLeave={() => setHoveredBox(null)}
                  className={`absolute transition-all cursor-pointer group ${
                    box.type === 'ai_hallucination'
                      ? 'border-2 border-[#8E5BD6] bg-[#8E5BD6]/15 hover:bg-[#8E5BD6]/30 shadow-[0_0_15px_rgba(142,91,214,0.5)]'
                      : box.type === 'face_swap'
                      ? 'border-2 border-[#F59E0B] bg-[#F59E0B]/15 hover:bg-[#F59E0B]/30 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                      : 'border-2 border-[#EF4444] bg-[#EF4444]/15 hover:bg-[#EF4444]/30 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  }`}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                  }}
                >
                  <div className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap bg-[#05030D]/90 border border-current text-white shadow-md flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
                    <span>{box.label}</span>
                    {box.confidence && (
                      <span className="text-[#08C386]">({Math.round(box.confidence * 100)}%)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. SINGLE VIEW MODE: 2D FFT Spectrum */}
          {activeLayer === 'FFT' && (
            <div className="relative flex flex-col items-center p-6 rounded-2xl bg-[#0E0C1B] border border-[#8E5BD6]/40 shadow-2xl">
              <canvas
                ref={fftCanvasRef}
                className="rounded-xl shadow-[0_0_30px_rgba(142,91,214,0.3)] w-72 h-72 block"
              />
              <div className="mt-4 text-center max-w-sm">
                <span className="text-xs font-mono font-bold text-[#8E5BD6] flex items-center justify-center gap-1.5">
                  <Activity className="w-4 h-4" /> 2D Discrete Spatial Frequency Spectrum
                </span>
                <p className="text-[11px] text-[#BABBCB] mt-1">
                  {document.forensicMetrics.fft.energyDistribution}
                </p>
                {document.forensicMetrics.fft.highFreqRingDetected && (
                  <div className="mt-2 px-2.5 py-1 rounded bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-[10px] font-mono font-bold">
                    ⚠️ HARMONIC RING SPIKE: DIFFUSION LATENT UPSCALER ARTIFACT
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. SINGLE VIEW MODE: ELA Compression */}
          {activeLayer === 'ELA' && (
            <div className="relative flex flex-col items-center rounded-xl overflow-hidden shadow-2xl border border-[#EF4444]/40 bg-[#05030D]">
              <canvas
                ref={elaCanvasRef}
                className="max-h-[500px] w-auto block"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-[#05030D]/85 border border-[#423C5C]/50 text-xs font-mono text-[#BABBCB] backdrop-blur-sm">
                <span>Max Compression Delta: <strong className="text-[#EF4444]">{document.forensicMetrics.ela.maxDiscrepancy}%</strong></span>
              </div>
            </div>
          )}

          {/* 4. SINGLE VIEW MODE: PRNU Sensor Noise */}
          {activeLayer === 'PRNU' && (
            <div className="relative flex flex-col items-center rounded-xl overflow-hidden shadow-2xl border border-[#3B82F6]/40 bg-[#05030D]">
              <canvas
                ref={prnuCanvasRef}
                className="max-h-[500px] w-auto block"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-[#05030D]/85 border border-[#423C5C]/50 text-xs font-mono text-[#BABBCB] backdrop-blur-sm">
                <span>PRNU Uniformity: <strong className="text-[#3B82F6]">{document.forensicMetrics.prnu.uniformityScore}%</strong></span>
              </div>
            </div>
          )}

          {/* 5. SPLIT VIEW MODE: RGB vs Secondary Canvas */}
          {activeLayer === 'SPLIT' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              
              {/* Left Column: RGB */}
              <div className="relative rounded-xl overflow-hidden border border-[#423C5C]/40 bg-[#0E0C1B]">
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-[#05030D]/80 text-[10px] font-mono text-white border border-[#423C5C]">
                  RGB Optical Original
                </div>
                <img
                  src={document.imageDataUrl}
                  alt={document.title}
                  className="w-full h-auto object-contain block"
                />
              </div>

              {/* Right Column: Selected Forensic Layer */}
              <div className="relative rounded-xl overflow-hidden border border-[#8E5BD6]/40 bg-[#0E0C1B] flex items-center justify-center p-2">
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-[#05030D]/80 text-[10px] font-mono text-[#08C386] border border-[#423C5C]">
                  Forensic Layer: {secondaryLayer}
                </div>
                {secondaryLayer === 'FFT' && (
                  <canvas ref={fftCanvasRef} className="w-64 h-64 rounded-lg block shadow-lg" />
                )}
                {secondaryLayer === 'ELA' && (
                  <canvas ref={elaCanvasRef} className="w-full h-auto block rounded-lg" />
                )}
                {secondaryLayer === 'PRNU' && (
                  <canvas ref={prnuCanvasRef} className="w-full h-auto block rounded-lg" />
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Bottom Forensic Legend & Status Bar */}
      <div className="px-4 py-2.5 bg-[#161329]/80 border-t border-[#423C5C]/40 flex flex-wrap items-center justify-between text-xs text-[#BABBCB] gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#08C386]" /> Authentic Baseline
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8E5BD6]" /> Diffusion / AI Artifact
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> Copy-Move / Splicing
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <span className="text-white">Resolution: 700 × 480</span>
          <span className="text-[#BABBCB]/60">•</span>
          <span className="text-[#08C386]">Memory Buffer: Ephemeral RAM</span>
          <span className="text-[#BABBCB]/60">•</span>
          <span className="text-[#BABBCB]">Hash: {document.sha256Hash.slice(0, 10)}...</span>
        </div>
      </div>

    </div>
  );
};
