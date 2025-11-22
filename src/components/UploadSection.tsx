import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadSectionProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export const UploadSection = ({ onImageSelect, isAnalyzing }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="container px-4 py-16 mx-auto" id="upload">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl text-foreground">
            Upload Leaf Sample
          </h2>
          <p className="text-lg text-muted-foreground">
            Take a clear photo or upload an existing image of the leaf
          </p>
        </div>

        <Card className="p-8 shadow-custom-lg">
          {!preview ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                isDragging
                  ? "border-primary bg-accent"
                  : "border-border hover:border-primary hover:bg-accent/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />

              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-accent">
                  <Upload className="w-8 h-8 text-primary" />
                </div>

                <div>
                  <p className="mb-2 text-lg font-semibold text-foreground">
                    Drop your image here, or browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports: JPG, PNG, WEBP
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="default"
                    size="lg"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <Button variant="outline" size="lg">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Uploaded leaf"
                className="w-full h-auto rounded-lg max-h-96 object-contain"
              />
              {!isAnalyzing && (
                <Button
                  onClick={clearImage}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              {isAnalyzing && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                    <p className="text-lg font-semibold text-foreground">
                      Analyzing leaf sample...
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
