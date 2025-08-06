import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Loader2, AlertCircle, Recycle, DollarSign, Building, Leaf } from "lucide-react";
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
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
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
      stream.getTracks().forEach(track => track.stop());
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
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
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
      const { data, error } = await supabase.functions.invoke('waste-identification', {
        body: { image: imageData }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        setAnalysisResult(data.analysis);
        toast({
          title: "Analysis Complete",
          description: "Your waste has been successfully analyzed!",
        });
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error: any) {
      console.error('Analysis error:', error);
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
      fileInputRef.current.value = '';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              AI Waste Identification
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload an image or take a photo of your agricultural waste to get instant analysis and recycling suggestions.
            </p>
          </div>

          {!selectedImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <CardHeader className="text-center">
                  <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Take Photo</CardTitle>
                  <CardDescription>
                    Use your camera to capture waste images
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isCameraActive ? (
                    <Button onClick={startCamera} className="w-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Start Camera
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full rounded-lg bg-muted"
                          style={{ maxHeight: '400px' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-64 h-64 border-2 border-primary/50 rounded-lg"></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={capturePhoto} className="flex-1" size="lg">
                          <Camera className="h-5 w-5 mr-2" />
                          Capture Photo
                        </Button>
                        <Button onClick={stopCamera} variant="outline" size="lg">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="text-center">
                  <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Upload Image</CardTitle>
                  <CardDescription>
                    Select an image file from your device
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                    variant="outline"
                  >
                    <Upload className="h-4 w-4 mr-2" />
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

          {selectedImage && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Selected Image
                  <Button onClick={resetAnalysis} variant="outline" size="sm">
                    Try Another
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={selectedImage}
                  alt="Selected waste"
                  className="w-full max-w-md mx-auto rounded-lg"
                />
              </CardContent>
            </Card>
          )}

          {isAnalyzing && (
            <Card className="mb-8">
              <CardContent className="p-8 text-center">
                <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold mb-2">Analyzing Waste...</h3>
                <p className="text-muted-foreground">
                  Our AI is identifying your waste and finding the best recycling options.
                </p>
              </CardContent>
            </Card>
          )}

          {analysisResult && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Recycle className="h-5 w-5 text-primary mr-2" />
                    Waste Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Waste Type:</h4>
                    <Badge variant="secondary" className="text-sm">
                      {analysisResult.wasteType}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Market Value:
                    </h4>
                    <p className="text-lg font-semibold text-primary">
                      {analysisResult.marketValue}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Recycling Methods:</h4>
                    <div className="space-y-2">
                      {analysisResult.recyclingMethods?.map((method: string, index: number) => (
                        <div key={index} className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{method}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      Interested Industries:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.interestedIndustries?.map((industry: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Leaf className="h-4 w-4 mr-1" />
                      Environmental Impact:
                    </h4>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-800 dark:text-green-200">
                        {analysisResult.environmentalImpact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button className="flex-1" asChild>
                  <a href="/marketplace">Find Buyers</a>
                </Button>
                <Button variant="outline" onClick={resetAnalysis}>
                  Analyze Another
                </Button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </Layout>
  );
};

export default WasteIdentification;