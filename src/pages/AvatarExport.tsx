import { useState, useRef, useCallback, useMemo, Component, type ReactNode } from 'react';
import { useRive, Layout, Fit } from '@rive-app/react-webgl2';
import { ANIMALS, EQUIPMENT_CATEGORIES } from '@/data/manifest';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

// Error boundary to prevent one bad Rive instance from crashing the whole page
class CellErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#999' }}>err</div>;
    }
    return this.props.children;
  }
}

const EXPORT_SIZE = 1024;
const OUTFITS_LIST = EQUIPMENT_CATEGORIES.find(c => c.key === 'outfit')?.items ?? [];
const OUTFIT_IDS = OUTFITS_LIST.map(o => o.id);

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// --- Avatar Cell ---

const AvatarCell = ({
  animal,
  outfit,
  hat,
  size = 200,
}: {
  animal: string;
  outfit: string;
  hat: string;
  size?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { rive, RiveComponent } = useRive({
    src: '/wuzu_full.riv',
    artboard: animal,
    stateMachines: 'idle',
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Contain }),
  }, {
    shouldResizeCanvasToContainer: false,
    useOffscreenRenderer: true,
  });

  const canvasReady = useRef(false);
  if (rive && containerRef.current && !canvasReady.current) {
    const canvas = containerRef.current.querySelector('canvas');
    if (canvas) {
      canvas.width = EXPORT_SIZE * 2;
      canvas.height = EXPORT_SIZE * 2;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      rive.resizeToCanvas();
      canvasReady.current = true;
    }
  }

  if (rive) {
    const vmi = rive.viewModelInstance;
    if (vmi) {
      const bindings: [string, string][] = [
        ['clothes_back', 'clothes_back'], ['clothes_front', 'clothes_front'],
        ['hat_front', 'hat_front'], ['hat_back', 'hat_back'],
        ['inner', 'inner'], ['facial', 'facial'], ['blush', 'blush'],
        ['background', 'background'], ['foreground', 'foreground'],
      ];
      for (const [propName, prefix] of bindings) {
        const prop = vmi.artboard(propName);
        if (!prop) continue;
        const ab = rive.getBindableArtboard(`${prefix}_${outfit}`);
        if (ab) { prop.value = ab; }
        else if (outfit !== 'default') {
          const def = rive.getBindableArtboard(`${prefix}_default`) ?? rive.getBindableArtboard('inner_default');
          if (def) prop.value = def;
        }
      }
      if (hat !== outfit && hat !== 'default') {
        const hatAb = rive.getBindableArtboard(`hat_front_${hat}`);
        const hatProp = vmi.artboard('hat_front');
        if (hatProp && hatAb) hatProp.value = hatAb;
      }
    }
  }

  return (
    <div ref={containerRef} style={{ width: size, height: size, overflow: 'hidden', flexShrink: 0 }}>
      <RiveComponent />
    </div>
  );
};

// --- Helpers ---

const downloadPng = (canvas: HTMLCanvasElement, name: string) => {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
};

// --- Slider control ---

const Slider = ({ label, value, onChange, min, max, step = 1, unit = 'px' }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; unit?: string;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-sm w-28 shrink-0">{label}: {value}{unit}</span>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))} className="w-40" />
  </div>
);

// --- Main ---

type Mode = 'group' | 'animals' | 'outfits';
type GroupMode = 'all-random' | 'one-all-outfits' | 'all-same-outfit';

const AvatarExport = () => {
  const [mode, setMode] = useState<Mode>('group');
  const [selectedAnimal, setSelectedAnimal] = useState('dog');
  const [selectedOutfit, setSelectedOutfit] = useState('witch');
  const [groupMode, setGroupMode] = useState<GroupMode>('all-random');
  const [exporting, setExporting] = useState(false);

  // Layout controls — gaps are percentages of cellSize
  const [cellSize, setCellSize] = useState(284);
  const [gapXPct, setGapXPct] = useState(-53);
  const [gapYPct, setGapYPct] = useState(-80);
  const [cols, setCols] = useState(6);
  const [rowOffsetPct, setRowOffsetPct] = useState(24);

  const [shuffleSeed, setShuffleSeed] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  // Shuffle array with seed
  function shuffleArray<T>(arr: T[], seed: number): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(seed + i) * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  const groupItems = useMemo(() => {
    let items;
    if (groupMode === 'all-random') {
      items = ANIMALS.map((a, i) => {
        const idx = Math.floor(seededRandom(i + 42 + shuffleSeed) * OUTFIT_IDS.length);
        return { animal: a.id, outfit: OUTFIT_IDS[idx], hat: OUTFIT_IDS[idx] };
      });
    } else if (groupMode === 'one-all-outfits') {
      items = OUTFIT_IDS.map(o => ({ animal: selectedAnimal, outfit: o, hat: o }));
    } else {
      items = ANIMALS.map(a => ({ animal: a.id, outfit: selectedOutfit, hat: selectedOutfit }));
    }
    return shuffleSeed > 0 ? shuffleArray(items, shuffleSeed) : items;
  }, [groupMode, selectedAnimal, selectedOutfit, shuffleSeed]);

  // Split items into rows
  const rows = useMemo(() => {
    const result: typeof groupItems[] = [];
    for (let i = 0; i < groupItems.length; i += cols) {
      result.push(groupItems.slice(i, i + cols));
    }
    return result;
  }, [groupItems, cols]);

  const handleGroupExport = useCallback(() => {
    if (!gridRef.current) return;
    setExporting(true);

    setTimeout(() => {
      // Collect all canvases with their positions
      const allCanvases = gridRef.current!.querySelectorAll('[data-cell]');
      if (allCanvases.length === 0) { setExporting(false); return; }

      // Calculate bounding box
      const parentRect = gridRef.current!.getBoundingClientRect();
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

      allCanvases.forEach((el) => {
        const rect = el.getBoundingClientRect();
        minX = Math.min(minX, rect.left - parentRect.left);
        minY = Math.min(minY, rect.top - parentRect.top);
        maxX = Math.max(maxX, rect.right - parentRect.left);
        maxY = Math.max(maxY, rect.bottom - parentRect.top);
      });

      const w = maxX - minX;
      const h = maxY - minY;
      const scale = 2;

      const output = document.createElement('canvas');
      output.width = w * scale;
      output.height = h * scale;
      const ctx = output.getContext('2d');
      if (!ctx) { setExporting(false); return; }

      allCanvases.forEach((el) => {
        const canvas = el.querySelector('canvas');
        if (!canvas) return;
        const rect = el.getBoundingClientRect();
        const x = (rect.left - parentRect.left - minX) * scale;
        const y = (rect.top - parentRect.top - minY) * scale;
        const sz = cellSize * scale;
        ctx.drawImage(canvas, x, y, sz, sz);
      });

      const name = groupMode === 'all-random' ? 'group_all_random'
        : groupMode === 'one-all-outfits' ? `group_${selectedAnimal}_outfits`
        : `group_all_${selectedOutfit}`;
      downloadPng(output, name);
      setExporting(false);
    }, 4000);
  }, [groupMode, selectedAnimal, selectedOutfit, cellSize]);

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-8">
      <h1 className="text-2xl font-bold mb-4">Avatar PNG Export</h1>

      <div className="flex gap-2 mb-6">
        <Button variant={mode === 'group' ? 'default' : 'outline'} onClick={() => setMode('group')}>Group Photo</Button>
        <Button variant={mode === 'animals' ? 'default' : 'outline'} onClick={() => setMode('animals')}>All Animals</Button>
        <Button variant={mode === 'outfits' ? 'default' : 'outline'} onClick={() => setMode('outfits')}>Outfits</Button>
      </div>

      {/* === GROUP MODE === */}
      {mode === 'group' && (
        <>
          {/* Group mode selector */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <Button size="sm" variant={groupMode === 'all-random' ? 'default' : 'outline'} onClick={() => setGroupMode('all-random')}>
              All Animals + Random Outfit
            </Button>
            <Button size="sm" variant={groupMode === 'one-all-outfits' ? 'default' : 'outline'} onClick={() => setGroupMode('one-all-outfits')}>
              One Animal + All Outfits
            </Button>
            <Button size="sm" variant={groupMode === 'all-same-outfit' ? 'default' : 'outline'} onClick={() => setGroupMode('all-same-outfit')}>
              All Animals + Same Outfit
            </Button>
          </div>

          {/* Selectors */}
          {groupMode === 'one-all-outfits' && (
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="text-sm font-medium self-center mr-2">Animal:</span>
              {ANIMALS.map(a => (
                <Button key={a.id} size="sm" variant={selectedAnimal === a.id ? 'default' : 'outline'} onClick={() => setSelectedAnimal(a.id)}>
                  {a.id}
                </Button>
              ))}
            </div>
          )}
          {groupMode === 'all-same-outfit' && (
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="text-sm font-medium self-center mr-2">Outfit:</span>
              {OUTFIT_IDS.map(o => (
                <Button key={o} size="sm" variant={selectedOutfit === o ? 'default' : 'outline'} onClick={() => setSelectedOutfit(o)}>
                  {o}
                </Button>
              ))}
            </div>
          )}

          {/* Layout controls */}
          <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
            <Slider label="Size" value={cellSize} onChange={setCellSize} min={60} max={300} unit="px" />
            <Slider label="Gap X" value={gapXPct} onChange={setGapXPct} min={-120} max={120} unit="%" />
            <Slider label="Gap Y" value={gapYPct} onChange={setGapYPct} min={-120} max={120} unit="%" />
            <Slider label="Columns" value={cols} onChange={setCols} min={2} max={10} unit="" />
            <Slider label="Row Offset" value={rowOffsetPct} onChange={setRowOffsetPct} min={-120} max={120} unit="%" />
            <Button variant="outline" onClick={() => setShuffleSeed(s => s + 1)}>
              Shuffle
            </Button>
            <Button onClick={handleGroupExport} disabled={exporting}>
              {exporting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
              Export Group PNG
            </Button>
          </div>

          {/* Grid - graduation photo layout using margin for negative spacing */}
          <div ref={gridRef} className="inline-block" style={{ position: 'relative' }}>
            {rows.map((row, rowIdx) => {
              const gapYPx = Math.round(cellSize * gapYPct / 100);
              const gapXPx = Math.round(cellSize * gapXPct / 100);
              const offsetPx = Math.round(cellSize * rowOffsetPct / 100);

              return (
                <div
                  key={rowIdx}
                  style={{
                    display: 'flex',
                    marginTop: rowIdx === 0 ? 0 : gapYPx,
                    marginLeft: rowIdx % 2 === 1 ? offsetPx : 0,
                  }}
                >
                  {row.map((item, i) => (
                    <div
                      key={`${item.animal}_${item.outfit}_${rowIdx}_${i}`}
                      data-cell
                      style={{ marginLeft: i === 0 ? 0 : gapXPx }}
                    >
                      <CellErrorBoundary><AvatarCell animal={item.animal} outfit={item.outfit} hat={item.hat} size={cellSize} /></CellErrorBoundary>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* === ANIMALS MODE === */}
      {mode === 'animals' && (
        <div className="flex flex-wrap gap-4">
          {ANIMALS.map(a => (
            <div key={a.id} className="inline-flex flex-col items-center gap-2">
              <AvatarCell animal={a.id} outfit="default" hat="default" />
              <span className="text-xs">{a.id}</span>
            </div>
          ))}
        </div>
      )}

      {/* === OUTFITS MODE === */}
      {mode === 'outfits' && (
        <>
          <div className="flex gap-2 mb-4 flex-wrap">
            {ANIMALS.map(a => (
              <Button key={a.id} size="sm" variant={selectedAnimal === a.id ? 'default' : 'outline'} onClick={() => setSelectedAnimal(a.id)}>
                {a.id}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {OUTFITS_LIST.map(o => (
              <div key={`${selectedAnimal}_${o.id}`} className="inline-flex flex-col items-center gap-2">
                <AvatarCell animal={selectedAnimal} outfit={o.id} hat={o.id} />
                <span className="text-xs">{o.id}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarExport;
