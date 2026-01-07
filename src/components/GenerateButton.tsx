import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const GenerateButton = ({ onClick, disabled, isLoading }: GenerateButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="font-serif text-xl md:text-2xl text-foreground text-center">
        Step 3 — Generate
      </h2>
      
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        size="lg"
        className={cn(
          "relative px-8 py-6 text-lg font-medium rounded-xl transition-all duration-300",
          "bg-gold hover:bg-gold-dark text-primary-foreground",
          "shadow-soft hover:shadow-glow",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          !disabled && !isLoading && "animate-float"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Creating Your AI Twins...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Create My AI Twin
          </>
        )}
      </Button>
      
      <a
        href="https://lovable.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 border border-gold/40 text-gold hover:border-gold hover:bg-gold/5"
      >
        Build Your AI Twin Studio with Lovable
      </a>
      
      {disabled && !isLoading && (
        <p className="text-sm text-muted-foreground text-center">
          Please upload a photo and select an aesthetic to continue
        </p>
      )}
    </div>
  );
};

export default GenerateButton;
