import { Download, Share2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ResultsGridProps {
  images: string[];
  isLoading: boolean;
}

const ResultsGrid = ({ images, isLoading }: ResultsGridProps) => {
  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-twin-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const handleShare = async (imageUrl: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My AI Twin",
          text: "Check out my AI aesthetic glow-up!",
          url: imageUrl,
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);
        toast.success("Image link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share image");
    }
  };

  if (images.length === 0 && !isLoading) return null;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="font-serif text-xl md:text-2xl text-foreground mb-6 text-center">
        Your AI Twin Variations
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[9/16] rounded-xl bg-card border border-border overflow-hidden flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin text-gold" />
                  <span className="text-sm">Generating {index + 1}/6</span>
                </div>
              </div>
            ))
          : images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[9/16] rounded-xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-glow transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={`AI Twin variation ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownload(image, index)}
                    className="flex-1 bg-background/90 hover:bg-background text-foreground"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleShare(image)}
                    className="bg-background/90 hover:bg-background text-foreground"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ResultsGrid;
