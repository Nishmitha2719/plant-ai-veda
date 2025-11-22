import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Info, Leaf, Pill } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export interface PlantResult {
  commonName: string;
  scientificName: string;
  confidence: number;
  medicinalProperties: string[];
  usage: string;
  warnings?: string;
  description: string;
}

interface ResultsDisplayProps {
  result: PlantResult;
}

export const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  return (
    <section className="container px-4 py-16 mx-auto animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-accent">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-accent-foreground">
              Plant Identified
            </span>
          </div>
          <h2 className="mb-2 text-4xl font-bold text-foreground">
            {result.commonName}
          </h2>
          <p className="text-lg italic text-muted-foreground">
            {result.scientificName}
          </p>
        </div>

        <Card className="p-8 mb-6 shadow-custom-lg">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-muted-foreground">
                Confidence Score
              </span>
              <span className="text-2xl font-bold text-primary">
                {result.confidence}%
              </span>
            </div>
            <div className="w-full h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full transition-all duration-1000 bg-gradient-hero"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Description</h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {result.description}
            </p>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">
                Medicinal Properties
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.medicinalProperties.map((property, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {property}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Pill className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Usage</h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {result.usage}
            </p>
          </div>

          {result.warnings && (
            <>
              <Separator className="my-6" />
              <div className="p-4 rounded-lg bg-destructive/10">
                <h3 className="mb-2 text-lg font-semibold text-destructive">
                  ⚠️ Important Warnings
                </h3>
                <p className="text-sm text-destructive/90">{result.warnings}</p>
              </div>
            </>
          )}
        </Card>
      </div>
    </section>
  );
};
