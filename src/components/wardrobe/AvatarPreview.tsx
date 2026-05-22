import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AvatarPreviewProps {
  RiveComponent: React.ComponentType;
  loading: boolean;
  error: string | null;
  onTap: () => void;
  animal: string;
}

const AvatarPreview = ({ RiveComponent, loading, error, onTap, animal }: AvatarPreviewProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 rounded-3xl" />

        {/* Always render Rive canvas so the hook can initialize */}
        <motion.div
          key={animal}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: loading ? 0 : 1, scale: loading ? 0.95 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full cursor-pointer"
          onClick={onTap}
        >
          <RiveComponent />
        </motion.div>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-destructive text-sm px-4 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarPreview;
