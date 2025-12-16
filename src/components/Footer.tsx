import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-16 bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-gold fill-gold" />
        </div>
        <p className="font-cursive text-lg text-muted-foreground">
          Created by RAKI AI Digital Den
        </p>
      </div>
    </footer>
  );
};

export default Footer;
