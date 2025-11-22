import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { UploadSection } from "@/components/UploadSection";
import { ResultsDisplay, PlantResult } from "@/components/ResultsDisplay";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PlantResult | null>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      // TODO: Connect to Lovable AI for actual plant identification
      // For now, using mock data
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockResult: PlantResult = {
        commonName: "Tulsi (Holy Basil)",
        scientificName: "Ocimum sanctum",
        confidence: 96,
        medicinalProperties: [
          "Anti-inflammatory",
          "Antibacterial",
          "Antioxidant",
          "Immune booster",
          "Stress reliever",
        ],
        usage:
          "Tulsi leaves can be consumed fresh, dried, or as tea. It's commonly used to treat respiratory disorders, fever, and digestive issues. Take 2-3 fresh leaves daily or brew tea with 5-7 leaves.",
        warnings:
          "Pregnant women and those on blood-thinning medication should consult a physician before use.",
        description:
          "Tulsi, also known as Holy Basil, is one of the most sacred plants in Hinduism and a cornerstone of Ayurvedic medicine. This aromatic herb has been used for thousands of years to promote holistic health and spiritual well-being.",
      };

      setResult(mockResult);
      toast({
        title: "Analysis Complete",
        description: "Plant successfully identified!",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again with a clearer image",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Hero onGetStarted={scrollToUpload} />
      <div ref={uploadRef}>
        <UploadSection
          onImageSelect={handleImageSelect}
          isAnalyzing={isAnalyzing}
        />
      </div>
      {result && <ResultsDisplay result={result} />}
    </div>
  );
};

export default Index;
