import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Upload,
  Loader2,
  Recycle,
  DollarSign,
  Building,
  Leaf,
  RefreshCcw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";

const WasteIdentification = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setIsCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) => {
            console.error("Video playback failed:", err);
            toast({
              title: "Playback Error",
              description: "Couldn't start the camera. Please refresh or try again.",
              variant: "destructive",
            });
          });
        }
      }, 100);
    } catch (error) {
      console.error("Camera error:", error);
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to take photos of waste.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg", 0.8);
        setSelectedImage(imageData);
        stopCamera();
        analyzeWaste(imageData);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setSelectedImage(imageData);
        analyzeWaste(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWaste = async (imageData: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("waste-identification", {
        body: { image: imageData },
      });

      if (error) throw error;

      let analysis = data.analysis;
      if (typeof analysis === "string") {
        try {
          analysis = JSON.parse(analysis);
        } catch {}
      }

      if (analysis) {
        if (typeof analysis.recyclingMethods === "string") {
          try {
            analysis.recyclingMethods = JSON.parse(analysis.recyclingMethods);
          } catch {}
        }
        if (typeof analysis.interestedIndustries === "string") {
          try {
            analysis.interestedIndustries = JSON.parse(analysis.interestedIndustries);
          } catch {}
        }
        if (typeof analysis.environmentalImpact === "string") {
          try {
            analysis.environmentalImpact = JSON.parse(analysis.environmentalImpact);
          } catch {}
        }
        if (typeof analysis.marketValue === "string") {
          try {
            analysis.marketValue = JSON.parse(analysis.marketValue);
          } catch {}
        }
      }

      if (data.success) {
        setAnalysisResult(analysis);
        toast({
          title: "Analysis Complete",
          description: "Your waste has been successfully analyzed!",
        });
      } else {
        throw new Error(data.error || "Analysis failed");
      }
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze the waste. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-tr from-emerald-100 to-white dark:from-gray-900 dark:to-gray-800 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <Recycle className="h-16 w-16 text-emerald-600 mb-2" />
            <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-1 text-center">
              Waste Identification
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 text-center">
              Upload or capture a photo of your agricultural waste to get instant AI-powered recycling insights.
            </p>
          </div>

          {!selectedImage && (
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              {/* Camera Card */}
              <Card className="flex-1 border-emerald-200 shadow-md">
                <CardHeader className="text-center">
                  <Camera className="h-8 w-8 text-emerald-500 mx-auto mb-1" />
                  <CardTitle className="text-lg">Self View Camera</CardTitle>
                </CardHeader>
                <CardContent>
                  {!isCameraActive ? (
                    <Button onClick={startCamera} className="w-full" size="lg" variant="emerald">
                      <Camera className="h-5 w-5 mr-2" />
                      Start Camera
                    </Button>
                  ) : (
                    <div>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg border border-emerald-200 bg-muted mb-3"
                        style={{ maxHeight: "250px", transform: "scaleX(-1)" }}
                      />
                      <div className="flex gap-2">
                        <Button onClick={capturePhoto} className="flex-1" size="lg" variant="emerald">
                          <Camera className="h-5 w-5 mr-2" />
                          Capture & Analyze
                        </Button>
                        <Button onClick={stopCamera} variant="outline" size="lg" className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upload Card */}
              <Card className="flex-1 border-emerald-200 shadow-md">
                <CardHeader className="text-center">
                  <Upload className="h-8 w-8 text-emerald-500 mx-auto mb-1" />
                  <CardTitle className="text-lg">Upload Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                    size="lg"
                    variant="outline"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Hidden canvas */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Result and Preview Section */}
          {selectedImage && (
            <div className="mt-6 space-y-6">
              <Card className="shadow-md border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-lg text-emerald-700 dark:text-emerald-300">
                    Captured Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="mx-auto rounded-md max-h-64 object-contain border"
                  />
                </CardContent>
              </Card>

              {isAnalyzing && (
                <div className="text-center">
                  <Loader2 className="animate-spin h-6 w-6 text-emerald-500 mx-auto" />
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Analyzing waste...</p>
                </div>
              )}

              {analysisResult && (
                <Card className="shadow-lg border-emerald-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-emerald-700 flex items-center gap-2">
                      <Recycle className="h-6 w-6" />
                      Waste Analysis Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">

                    {/* Waste Type */}
                    <div>
                      <h3 className="font-bold text-lg mb-2">♻ Waste Type:</h3>
                      <p className="text-emerald-900 dark:text-emerald-100 text-base font-semibold">
                        {analysisResult.wasteType || "Unknown"}
                      </p>
                    </div>

                    {/* Recycling Methods */}
                    <div>
                      <h3 className="font-bold text-lg mb-2">Recommended Recycling Methods:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {Array.isArray(analysisResult.recyclingMethods) && analysisResult.recyclingMethods.length > 0 ? (
                          analysisResult.recyclingMethods.map((method: string, idx: number) => (
                            <li key={idx} className="text-gray-700 dark:text-gray-200">{method}</li>
                          ))
                        ) : (
                          <li className="text-gray-500">No recommendations available.</li>
                        )}
                      </ul>
                    </div>

                    {/* Market Value */}
                    <div>
                      <h3 className="font-bold text-lg mb-2">💰 Market Value Estimates:</h3>
                      {analysisResult.marketValue && typeof analysisResult.marketValue === "object" ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {analysisResult.marketValue.note && (
                            <li className="mb-1 text-muted-foreground">{analysisResult.marketValue.note}</li>
                          )}
                          {Object.entries(analysisResult.marketValue)
                            .filter(([key]) => key !== "note")
                            .map(([key, value]) => (
                              <li key={key} className="text-gray-700 dark:text-gray-200">
                                <span className="font-medium capitalize">{key.replace(/_/g, " ")}:</span> {value as string}
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">No data available.</span>
                      )}
                    </div>

                    {/* Interested Industries */}
                    <div>
                      <h3 className="font-bold text-lg mb-2">🏭 Interested Industries:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {Array.isArray(analysisResult.interestedIndustries) && analysisResult.interestedIndustries.length > 0 ? (
                          analysisResult.interestedIndustries.map((industry: string, idx: number) => (
                            <li key={idx} className="text-gray-700 dark:text-gray-200">{industry}</li>
                          ))
                        ) : (
                          <li className="text-gray-500">No data available.</li>
                        )}
                      </ul>
                    </div>

                    {/* Environmental Impact */}
                    <div>
                      <h3 className="font-bold text-lg mb-2">🌱 Environmental Impact:</h3>
                      {analysisResult.environmentalImpact && typeof analysisResult.environmentalImpact === "object" ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {Object.entries(analysisResult.environmentalImpact).map(([key, value]) => (
                            <li key={key} className="text-green-800 dark:text-green-200">
                              <span className="font-medium capitalize">{key}:</span> {value as string}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">No data available.</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                        <a href="/marketplace">Find Buyers</a>
                      </Button>
                      <Button variant="outline" onClick={resetAnalysis} className="flex-1">
                        <RefreshCcw className="h-5 w-5 mr-2" />
                        Analyze Another
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WasteIdentification;
