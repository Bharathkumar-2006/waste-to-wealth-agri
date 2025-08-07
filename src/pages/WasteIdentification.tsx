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
      // Deep clean any remaining JSON or markdown artifacts
      if (analysis) {
        // Clean recycling methods
        if (analysis.recyclingMethods && Array.isArray(analysis.recyclingMethods)) {
          analysis.recyclingMethods = analysis.recyclingMethods.map((method: any) => {
            if (typeof method === 'string') {
              // Remove any JSON artifacts or markdown
              return method.replace(/```json|```|\{|\}/g, '').trim();
            }
            return method;
          }).filter((method: string) => method && method.length > 10); // Filter out artifacts
        }
        
        // Clean industries
        if (analysis.interestedIndustries && Array.isArray(analysis.interestedIndustries)) {
          analysis.interestedIndustries = analysis.interestedIndustries.filter((industry: string) => 
            typeof industry === 'string' && industry.length > 2 && !industry.includes('{')
          );
        }
        
        // Clean environmental impact
        if (analysis.environmentalImpact && typeof analysis.environmentalImpact === 'string') {
          // If it's a string containing JSON, try to parse it
          if (analysis.environmentalImpact.includes('{')) {
            try {
              const cleanStr = analysis.environmentalImpact.replace(/```json|```/g, '').trim();
              const parsed = JSON.parse(cleanStr);
              if (parsed.environmentalImpact) {
                analysis.environmentalImpact = parsed.environmentalImpact;
              }
            } catch (e) {
              // Keep as string if parsing fails
            }
          }
        }
        
        // Clean waste type
        if (analysis.wasteType && typeof analysis.wasteType === 'string') {
          analysis.wasteType = analysis.wasteType.replace(/```json|```|\{|\}/g, '').trim();
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
                    <Button onClick={startCamera} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="lg">
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
                        <Button onClick={capturePhoto} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" size="lg">
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
                <Card className="shadow-lg border-emerald-300 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-800">
                  <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Recycle className="h-7 w-7" />
                      AI Waste Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8 p-6">

                    {/* Waste Type */}
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-emerald-500">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">♻</span>
                        </div>
                        <h3 className="font-bold text-lg text-emerald-800 dark:text-emerald-200">Waste Type</h3>
                      </div>
                      <p className="text-gray-900 dark:text-gray-100 text-lg font-semibold ml-10">
                        {analysisResult.wasteType || "Unknown"}
                      </p>
                    </div>

                    {/* Recycling Methods */}
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <RefreshCcw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-bold text-lg text-blue-800 dark:text-blue-200">Recycling Methods</h3>
                      </div>
                      <div className="ml-10 space-y-2">
                        {Array.isArray(analysisResult.recyclingMethods) && analysisResult.recyclingMethods.length > 0 ? (
                          analysisResult.recyclingMethods.map((method: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Badge variant="secondary" className="mt-0.5">{idx + 1}</Badge>
                              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{method}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">No specific methods identified</p>
                        )}
                      </div>
                    </div>

                    {/* Market Value */}
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <h3 className="font-bold text-lg text-yellow-800 dark:text-yellow-200">Market Value</h3>
                      </div>
                      <div className="ml-10">
                        {analysisResult.marketValue && typeof analysisResult.marketValue === "object" ? (
                          <div className="space-y-2">
                            {analysisResult.marketValue.note && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-600 p-2 rounded">
                                {analysisResult.marketValue.note}
                              </p>
                            )}
                            <div className="grid gap-2">
                              {Object.entries(analysisResult.marketValue)
                                .filter(([key]) => key !== "note")
                                .map(([key, value]) => (
                                  <div key={key} className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                                    <span className="font-medium capitalize text-gray-700 dark:text-gray-200">
                                      {key.replace(/_/g, " ").replace(":", "")}
                                    </span>
                                    <span className="text-yellow-700 dark:text-yellow-300 font-semibold">{value as string}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">Market value assessment pending</p>
                        )}
                      </div>
                    </div>

                    {/* Interested Industries */}
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <Building className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200">Target Industries</h3>
                      </div>
                      <div className="ml-10 flex flex-wrap gap-2">
                        {Array.isArray(analysisResult.interestedIndustries) && analysisResult.interestedIndustries.length > 0 ? (
                          analysisResult.interestedIndustries.map((industry: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                              {industry}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">Industry analysis in progress</p>
                        )}
                      </div>
                    </div>

                    {/* Environmental Impact */}
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-bold text-lg text-green-800 dark:text-green-200">Environmental Benefits</h3>
                      </div>
                      <div className="ml-10">
                        {analysisResult.environmentalImpact && typeof analysisResult.environmentalImpact === "object" ? (
                          <div className="space-y-3">
                            {Object.entries(analysisResult.environmentalImpact).map(([key, value]) => (
                              <div key={key} className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-700">
                                <h4 className="font-semibold text-green-800 dark:text-green-200 capitalize mb-1">{key}</h4>
                                <p className="text-green-700 dark:text-green-300 leading-relaxed">{value as string}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">Environmental impact analysis in progress</p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200" 
                        size="lg"
                        asChild
                      >
                        <a href="/marketplace" className="flex items-center justify-center gap-2">
                          <Building className="h-5 w-5" />
                          Find Buyers in Marketplace
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={resetAnalysis} 
                        className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        size="lg"
                      >
                        <RefreshCcw className="h-5 w-5 mr-2" />
                        Analyze Another Waste
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