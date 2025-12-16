import { cn } from "@/lib/utils";

const aesthetics = [
  { id: "editorial-muse", name: "Editorial Muse", description: "High fashion editorial essence" },
  { id: "soft-luxury", name: "Soft Luxury", description: "Understated elegance" },
  { id: "modern-minimal", name: "Modern Minimal", description: "Clean contemporary lines" },
  { id: "elevated-street", name: "Elevated Street", description: "Refined urban sophistication" },
  { id: "high-gloss-glam", name: "High-Gloss Glam", description: "Polished red-carpet ready" },
  { id: "quiet-rich", name: "Quiet Rich", description: "Subtle wealth aesthetics" },
  { id: "digital-authority", name: "Digital Authority", description: "Tech-forward confidence" },
  { id: "creative-director", name: "Creative Director", description: "Artistic vision leader" },
];

interface AestheticSelectorProps {
  selectedAesthetic: string | null;
  onSelect: (aesthetic: string) => void;
}

const AestheticSelector = ({ selectedAesthetic, onSelect }: AestheticSelectorProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="font-serif text-xl md:text-2xl text-foreground mb-6 text-center">
        Step 2 — Choose Your Aesthetic
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {aesthetics.map((aesthetic) => (
          <button
            key={aesthetic.id}
            onClick={() => onSelect(aesthetic.id)}
            className={cn(
              "group relative p-4 md:p-5 rounded-xl border-2 transition-all duration-300 text-left",
              "hover:shadow-glow hover:border-gold",
              selectedAesthetic === aesthetic.id
                ? "bg-accent border-gold shadow-glow"
                : "bg-card border-border hover:bg-accent/50"
            )}
          >
            <h3 className={cn(
              "font-medium text-sm md:text-base mb-1 transition-colors",
              selectedAesthetic === aesthetic.id ? "text-gold" : "text-foreground group-hover:text-gold"
            )}>
              {aesthetic.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {aesthetic.description}
            </p>
            {selectedAesthetic === aesthetic.id && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AestheticSelector;
