import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRive, Layout, Fit } from '@rive-app/react-webgl2';
import { ANIMALS, EQUIPMENT_CATEGORIES, ARTBOARD_BINDINGS } from '@/data/manifest';
import { Button } from '@/components/ui/button';
import { Download, Loader2, CheckCircle, Play } from 'lucide-react';
import JSZip from 'jszip';

const CANVAS_SIZE = 256;
const OUTPUT_SIZE = 128;

interface ItemToExport {
  category: string;
  itemId: string;
  fileName: string;
  label: string;
}

function buildAllItems(): ItemToExport[] {
  const items: ItemToExport[] = [];

  for (const cat of EQUIPMENT_CATEGORIES) {
    for (const item of cat.items) {
      items.push({
        category: cat.key,
        itemId: item.id,
        fileName: `${cat.key}_${item.id}`,
        label: `${cat.labelEn} / ${item.i18n.en}`,
      });
    }
  }

  for (const animal of ANIMALS) {
    items.push({
      category: 'animal',
      itemId: animal.id,
      fileName: `animal_${animal.id}`,
      label: `Animal / ${animal.i18n.en}`,
    });
  }

  return items;
}

function filterItems(all: ItemToExport[], names: string[]): ItemToExport[] {
  const set = new Set(names.map((n) => n.trim()).filter(Boolean));
  return all.filter((item) => set.has(item.fileName));
}

// Renders a single item and captures the canvas as a PNG blob
const ItemRenderer = ({
  category,
  itemId,
  onCaptured,
}: {
  category: string;
  itemId: string;
  onCaptured: (blob: Blob) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const captured = useRef(false);
  const bound = useRef(false);

  const artboardName = category === 'animal' ? itemId : 'dog';
  const riveSrc = category === 'animal' ? '/wuzu_animal.riv' : '/wuzu.riv';

  const { rive, RiveComponent } = useRive(
    {
      src: riveSrc,
      artboard: artboardName,
      stateMachines: 'idle',
      autoplay: true,
      autoBind: true,
      layout: new Layout({ fit: Fit.Contain }),
    },
    {
      shouldResizeCanvasToContainer: false,
      useOffscreenRenderer: true,
    },
  );

  useEffect(() => {
    if (!rive || !containerRef.current) return;
    const canvas = containerRef.current.querySelector('canvas');
    if (!canvas) return;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    rive.resizeToCanvas();
  }, [rive]);

  useEffect(() => {
    if (!rive || category === 'animal' || bound.current) return;
    const vmi = rive.viewModelInstance;
    if (!vmi) return;

    for (const [catKey, propNames] of Object.entries(ARTBOARD_BINDINGS)) {
      for (const propName of propNames) {
        const prop = vmi.artboard(propName);
        if (!prop) continue;
        const variant = catKey === category ? itemId : 'default';
        const ab = rive.getBindableArtboard(`${propName}_${variant}`);
        if (ab) prop.value = ab;
      }
    }
    bound.current = true;
  }, [rive, category, itemId]);

  useEffect(() => {
    if (!rive || captured.current) return;

    const timer = setTimeout(() => {
      if (captured.current) return;
      captured.current = true;

      const srcCanvas = containerRef.current?.querySelector('canvas');
      if (!srcCanvas) {
        onCaptured(new Blob());
        return;
      }

      const oc = new OffscreenCanvas(OUTPUT_SIZE, OUTPUT_SIZE);
      const ctx = oc.getContext('2d');
      if (!ctx) {
        onCaptured(new Blob());
        return;
      }
      ctx.drawImage(srcCanvas, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
      oc.convertToBlob({ type: 'image/png' }).then(
        (blob) => onCaptured(blob),
        () => onCaptured(new Blob()),
      );
    }, 2500);

    return () => clearTimeout(timer);
  }, [rive, onCaptured]);

  return (
    <div
      ref={containerRef}
      style={{ width: 200, height: 200, overflow: 'hidden' }}
    >
      <RiveComponent />
    </div>
  );
};

const ItemBatchExport = () => {
  const allItems = useMemo(() => buildAllItems(), []);
  const animalItems = useMemo(
    () => allItems.filter((i) => i.category === 'animal'),
    [allItems],
  );

  const [filterText, setFilterText] = useState('');
  const filteredItems = useMemo(() => {
    const names = filterText.split(/[,\n\s]+/).filter(Boolean);
    if (names.length === 0) return [];
    return filterItems(allItems, names);
  }, [allItems, filterText]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [completed, setCompleted] = useState<Map<string, Blob>>(new Map());
  const [downloading, setDownloading] = useState(false);

  // The active queue for the current run
  const queueRef = useRef<ItemToExport[]>([]);
  const currentIndexRef = useRef(-1);

  const currentItem =
    isRunning && currentIndex >= 0 && currentIndex < queueRef.current.length
      ? queueRef.current[currentIndex]
      : null;

  const queueLen = queueRef.current.length;
  const isDone = !isRunning && completed.size > 0;

  const startRun = (items: ItemToExport[]) => {
    queueRef.current = items;
    // Keep existing captures from other categories
    setCompleted((prev) => {
      const next = new Map(prev);
      // Remove entries that will be re-captured
      for (const item of items) {
        next.delete(item.fileName);
      }
      return next;
    });
    currentIndexRef.current = 0;
    setCurrentIndex(0);
    setIsRunning(true);
  };

  const handleCaptured = useCallback((blob: Blob) => {
    const queue = queueRef.current;
    const idx = currentIndexRef.current;
    const item = queue[idx];
    if (item && blob.size > 0) {
      setCompleted((prev) => {
        const next = new Map(prev);
        next.set(item.fileName, blob);
        return next;
      });
    }

    const nextIdx = idx + 1;
    currentIndexRef.current = nextIdx;

    if (nextIdx >= queue.length) {
      setIsRunning(false);
      setCurrentIndex(nextIdx);
    } else {
      setCurrentIndex(nextIdx);
    }
  }, []);

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      for (const [name, blob] of completed.entries()) {
        zip.file(`${name}.png`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'item_previews.zip';
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-8">
      <h1 className="text-2xl font-bold mb-2">Item Preview Batch Export</h1>
      <p className="text-sm text-gray-500 mb-6">
        {CANVAS_SIZE}px canvas → {OUTPUT_SIZE}px PNG → ZIP
      </p>

      <div className="mb-4">
        <textarea
          className="w-full max-w-xl rounded-lg border border-gray-300 p-3 text-sm font-mono bg-white"
          rows={3}
          placeholder="Paste item names to export specific items (comma/space/newline separated), e.g.: outfit_summer, hat_frog, facial_angel"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          disabled={isRunning}
        />
      </div>

      <div className="flex gap-3 items-center mb-6 flex-wrap">
        {filteredItems.length > 0 && (
          <Button
            onClick={() => startRun(filteredItems)}
            disabled={isRunning}
          >
            {isRunning && queueLen === filteredItems.length ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {currentIndex + 1}/{queueLen}
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Selected ({filteredItems.length})
              </>
            )}
          </Button>
        )}

        <Button
          variant="outline"
          onClick={() => startRun(allItems)}
          disabled={isRunning}
        >
          {isRunning && queueLen === allItems.length ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {currentIndex + 1}/{queueLen}
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              All ({allItems.length})
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={() => startRun(animalItems)}
          disabled={isRunning}
        >
          {isRunning && queueLen === animalItems.length ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {currentIndex + 1}/{queueLen}
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Animals Only ({animalItems.length})
            </>
          )}
        </Button>

        {isDone && (
          <Button onClick={handleDownloadZip} disabled={downloading}>
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Download ZIP ({completed.size})
          </Button>
        )}

        {completed.size > 0 && (
          <span className="text-sm text-gray-500">
            <CheckCircle className="h-4 w-4 inline mr-1 text-green-500" />
            {completed.size} captured
          </span>
        )}
      </div>

      {currentItem && (
        <div className="bg-white rounded-xl p-4 mb-6 inline-block">
          <p className="text-sm mb-2 text-gray-600">
            Rendering: <strong>{currentItem.label}</strong> (
            {currentItem.fileName})
          </p>
          <div className="checkered-bg rounded-lg inline-block">
            <ItemRenderer
              key={`${currentItem.category}_${currentItem.itemId}_${currentIndex}`}
              category={currentItem.category}
              itemId={currentItem.itemId}
              onCaptured={handleCaptured}
            />
          </div>
        </div>
      )}

      {completed.size > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Captured ({completed.size})
          </h2>
          <div className="flex flex-wrap gap-3">
            {Array.from(completed.entries()).map(([name, blob]) => {
              const url = URL.createObjectURL(blob);
              return (
                <div
                  key={name}
                  className="flex flex-col items-center bg-white rounded-lg p-2"
                >
                  <div
                    className="checkered-bg rounded"
                    style={{ width: 80, height: 80 }}
                  >
                    <img
                      src={url}
                      alt={name}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 max-w-20 truncate">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .checkered-bg {
          background-image:
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%);
          background-size: 16px 16px;
          background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
        }
      `}</style>
    </div>
  );
};

export default ItemBatchExport;
