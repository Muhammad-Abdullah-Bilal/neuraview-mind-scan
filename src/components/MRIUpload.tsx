import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileImage, X, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MRIUploadProps {
  onAnalysisComplete: (result: 'low-risk' | 'high-risk') => void;
}

export const MRIUpload: React.FC<MRIUploadProps> = ({ onAnalysisComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        toast({
          title: "File uploaded successfully",
          description: "MRI scan is ready for analysis",
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      toast({
        title: "File uploaded successfully",
        description: "MRI scan is ready for analysis",
      });
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate AI analysis process
    const intervals = [
      { progress: 25, message: "Processing image..." },
      { progress: 50, message: "Running AI analysis..." },
      { progress: 75, message: "Evaluating brain patterns..." },
      { progress: 100, message: "Analysis complete!" }
    ];
    
    for (const interval of intervals) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(interval.progress);
      toast({
        title: interval.message,
        description: `Progress: ${interval.progress}%`,
      });
    }
    
    // Simulate random result for demo
    const result = Math.random() > 0.3 ? 'low-risk' : 'high-risk';
    setIsAnalyzing(false);
    onAnalysisComplete(result);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="medical-card medical-shadow">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-medical-primary rounded-xl flex items-center justify-center mb-4">
          <FileImage className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl">MRI Scan Analysis</CardTitle>
        <CardDescription className="text-lg">
          Upload your MRI scan for AI-powered early Alzheimer's detection
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!uploadedFile ? (
          <div
            className="upload-area"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <Upload className="mx-auto w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Upload MRI Scan</p>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your MRI scan here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPEG, PNG, DICOM formats • Max 10MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {isAnalyzing && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Analyzing MRI scan...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full medical-gradient text-white hover:opacity-90 h-12 text-lg font-medium medical-transition"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Start AI Analysis
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};