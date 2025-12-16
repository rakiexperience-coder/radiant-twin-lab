import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import PhotoUploader from "@/components/PhotoUploader";
import AestheticSelector from "@/components/AestheticSelector";
import GenerateButton from "@/components/GenerateButton";
import ResultsGrid from "@/components/ResultsGrid";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [selectedAesthetic, setSelectedAesthetic] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoSelect = (file: File | null, preview: string | null) => {
    setPhotoFile(file);
    setSelectedPhoto(preview);
    setGeneratedImages([]);
  };

  const handleAestheticSelect = (aesthetic: string) => {
    setSelectedAesthetic(aesthetic);
    setGeneratedImages([]);
  };

  const handleGenerate = async () => {
    if (!selectedPhoto || !selectedAesthetic) {
      toast.error("Please upload a photo and select an aesthetic");
      return;
    }

    setIsLoading(true);
    setGeneratedImages([]);

    try {
      const { data, error } = await supabase.functions.invoke("generate-twins", {
        body: {
          imageBase64: selectedPhoto,
          aesthetic: selectedAesthetic,
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        toast.error("Failed to generate images. Please try again.");
        return;
      }

      if (data.error) {
        toast.error(data.error);
        if (data.images && data.images.length > 0) {
          setGeneratedImages(data.images);
        }
        return;
      }

      if (data.images && data.images.length > 0) {
        setGeneratedImages(data.images);
        toast.success(`Generated ${data.images.length} AI twin variations!`);
      } else {
        toast.error("No images were generated. Please try again.");
      }
    } catch (error) {
      console.error("Error generating images:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const canGenerate = selectedPhoto && selectedAesthetic;

  return (
    <div className="min-h-screen" style={{ background: 'var(--orchid-gradient)' }}>
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 pt-32 pb-8">
        <div className="flex flex-col gap-12 md:gap-16">
          {/* Step 1: Upload Photo */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PhotoUploader
              onPhotoSelect={handlePhotoSelect}
              selectedPhoto={selectedPhoto}
            />
          </section>

          {/* Step 2: Choose Aesthetic */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <AestheticSelector
              selectedAesthetic={selectedAesthetic}
              onSelect={handleAestheticSelect}
            />
          </section>

          {/* Step 3: Generate */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <GenerateButton
              onClick={handleGenerate}
              disabled={!canGenerate}
              isLoading={isLoading}
            />
          </section>

          {/* Results */}
          {(generatedImages.length > 0 || isLoading) && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ResultsGrid images={generatedImages} isLoading={isLoading} />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
