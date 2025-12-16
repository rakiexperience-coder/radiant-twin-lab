import { useCallback, useState } from "react";
import { Upload, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploaderProps {
  onPhotoSelect: (file: File | null, preview: string | null) => void;
  selectedPhoto: string | null;
}

const PhotoUploader = ({ onPhotoSelect, selectedPhoto }: PhotoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onPhotoSelect(file, e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onPhotoSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const clearPhoto = useCallback(() => {
    onPhotoSelect(null, null);
  }, [onPhotoSelect]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="font-serif text-xl md:text-2xl text-foreground mb-4 text-center">
        Step 1 — Upload Your Photo
      </h2>
      
      {selectedPhoto ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-gold bg-card shadow-soft">
          <img
            src={selectedPhoto}
            alt="Selected photo"
            className="w-full aspect-[3/4] object-cover"
          />
          <button
            onClick={clearPhoto}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/90 hover:bg-background text-foreground transition-colors shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300",
            "bg-card hover:bg-accent/50",
            isDragging
              ? "border-gold bg-accent/50 shadow-glow"
              : "border-gold/50 hover:border-gold"
          )}
        >
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            {isDragging ? (
              <Upload className="w-10 h-10 text-gold animate-float" />
            ) : (
              <User className="w-10 h-10 text-gold" />
            )}
          </div>
          <div className="text-center">
            <p className="text-foreground font-medium mb-1">
              Upload a clear photo of yourself
            </p>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to browse
            </p>
          </div>
          <Upload className="w-6 h-6 text-gold" />
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default PhotoUploader;
