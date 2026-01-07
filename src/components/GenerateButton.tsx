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
        href="https://lovable.dev/dashboard?autosubmit=true#prompt=APP%20NAME%0A%0AAI%20Twin%20Studio%20%E2%80%94%20Aesthetic%20Glow-Up%20Experience%0A%0AAPP%20PURPOSE%0A%0ABuild%20a%20luxury%20AI%20web%20app%20that%20allows%20users%20to%20upload%20a%20photo%2C%20select%20an%20aesthetic%20style%2C%20and%20generate%20multiple%20AI%20twin%20variations%20with%20different%20outfits%2C%20poses%2C%20and%20visual%20aesthetics%20%E2%80%94%20while%20maintaining%20clear%20character%20consistency.%0A%0AThis%20app%20is%20designed%20to%20feel%20modern%2C%20polished%2C%20and%20editorial%2C%20similar%20to%20high-end%20beauty%20tech%20and%20creative%20AI%20studios.%0A%0ADESIGN%20%26%20STYLE%0A%0AOverall%20Style%3A%0A%0ALuxury%20tech%20%C2%B7%20soft%20glow%20%C2%B7%20editorial%20%C2%B7%20modern%20%C2%B7%20confident%20%C2%B7%20polished%0A%0AColor%20Palette%3A%0A%0AUse%20Lovable%E2%80%99s%20Orchid%20theme%20as%20the%20primary%20color%20palette%0A%0AAvoid%20purple%20entirely.%0A%0AGold%20should%20be%20used%20sparingly%20for%20emphasis%20(lines%2C%20icons%2C%20buttons%2C%20dividers).%0A%0APAGE%20LAYOUT%0A%0AHEADER%20(Fixed)%0A%0ALogo%20text%3A%20AI%20Twin%20Studio%0AStyle%3A%20elegant%20serif%0AColor%3A%20gold%0A%0ASubtitle%3A%20Create%20Your%20AI%20Aesthetic%20Glow-Up%0AStyle%3A%20curvy%20%2F%20flowing%20text%0AColor%3A%20soft%20neutral%20from%20palette%0A%0AAdd%20a%20thin%20gold%20divider%20line%20with%20a%20subtle%20sparkle%20accent%0A(minimal%2C%20refined%20%E2%80%94%20not%20flashy)%0A%0ASTEP%201%20%E2%80%94%20UPLOAD%20YOUR%20PHOTO%0A%0AComponent%3A%20File%20uploader%0A%0ARounded%20upload%20box%0A%0ABackground%20color%20pulled%20from%20the%20neutral%20palette%0A%0AThin%20gold%20outline%0A%0AUpload%20icon%20in%20gold%0A%0AInstruction%20text%3A%0A%E2%80%9CUpload%20a%20clear%20photo%20of%20yourself.%E2%80%9D%0A%0AShow%20image%20preview%20after%20upload%0A%0ASTEP%202%20%E2%80%94%20CHOOSE%20YOUR%20AESTHETIC%0A%0AComponent%3A%20Large%20rounded%20selection%20buttons%20or%20cards%0A%0AUse%20a%20completely%20original%20aesthetic%20list%20(not%20copied)%3A%0A%0AEditorial%20Muse%0ASoft%20Luxury%0AModern%20Minimal%0AElevated%20Street%0AHigh-Gloss%20Glam%0AQuiet%20Rich%0ADigital%20Authority%0ACreative%20Director%0A%0AButton%20Style%3A%0A%0ABackground%3A%20soft%20neutral%20from%20palette%0A%0AOutline%3A%20thin%20gold%20line%0A%0AHover%20state%3A%20subtle%20glow%20(no%20purple)%0A%0ASTEP%203%20%E2%80%94%20GENERATE%20BUTTON%0A%0AButton%20Text%3A%0ACreate%20My%20AI%20Twin%0A%0AButton%20Style%3A%0A%0AGold%20button%0A%0ASoft%20neutral%20glow%20(warm%20ivory%20%2F%20champagne%20tone)%0A%0ANo%20purple%0A%0AAction%3A%0ATrigger%20built-in%20AI%20image%20generation%20using%20Gemini%203.%0A(No%20external%20API%20connection%20required.)%0A%0A%F0%9F%94%B9%20ADDED%20%E2%80%94%20SCREEN%20STRUCTURE%20%26%20NAVIGATION%20(NO%20DESIGN%20CHANGES)%0A%0AThis%20app%20must%20be%20presented%20as%20TWO%20DISTINCT%20SCREENS%2C%20not%20a%20single%20continuous%20scrolling%20page.%0A%0ASCREEN%201%20%E2%80%94%20MAIN%20FLOW%20(PRE-GENERATION)%3A%0A%0AIncludes%3A%0AHeader%0AStep%201%20(Upload%20Your%20Photo)%0AStep%202%20(Choose%20Your%20Aesthetic)%0AStep%203%20(Create%20My%20AI%20Twin%20button)%0AThis%20screen%20ENDS%20immediately%20after%20the%20%E2%80%9CCreate%20My%20AI%20Twin%E2%80%9D%20button.%0ANo%20generated%20images%20appear%20on%20this%20screen.%0AThis%20screen%20represents%20the%20input%20and%20setup%20state%20only.%0A%0ASCREEN%202%20%E2%80%94%20RESULTS%20(POST-GENERATION)%3A%0ADisplays%20ONLY%20the%20generated%20images.%0AShows%20exactly%206%20AI-generated%20image%20cards.%0ALayout%3A%20clean%2C%20balanced%20grid%20(2%20columns%20%C3%97%203%20rows).%0ANo%20upload%20area%2C%20no%20aesthetic%20selection%2C%20and%20no%20generate%20button%20on%20this%20screen.%0A%0AINTERACTION%20RULE%3A%0ATapping%20%E2%80%9CCreate%20My%20AI%20Twin%E2%80%9D%20transitions%20from%20Screen%201%20to%20Screen%202.%0AScreens%20must%20be%20treated%20as%20separate%20frames%2Fviews%2C%20not%20merged%20into%20one%20tall%20layout.%0A%0ARESULTS%20SECTION%0ADisplay%206%20AI-generated%20image%20variations%0AMaintain%20strong%20character%20consistency%3A%20same%20face%2C%20same%20identity%2C%20same%20general%20body%20type.%0AAllow%20variation%20in%20outfit%2C%20pose%2C%20styling%2C%20and%20aesthetic%20mood.%0A%0AFOOTER%0ABackground%3A%20soft%20neutral%20from%20palette.%0AMinimal%20gold%20icons.%0AText%20(cursive%20style)%3A%20Created%20with%20AI%20Twin%20Studio.%0ANo%20platform%20credits.%0ANo%20%E2%80%98Powered%20by%E2%80%99%20text."
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-6 text-lg font-medium rounded-xl transition-all duration-300 bg-gold hover:bg-gold-dark text-primary-foreground shadow-soft hover:shadow-glow"
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
