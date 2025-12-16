import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-gold tracking-wide">
            RADD AI Twin Studio
          </h1>
          <p className="font-cursive text-lg md:text-xl text-muted-foreground">
            Create Your AI Aesthetic Glow-Up
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <Sparkles className="w-4 h-4 text-gold animate-shimmer" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
