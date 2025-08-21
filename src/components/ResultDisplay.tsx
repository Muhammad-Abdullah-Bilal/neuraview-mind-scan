import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Download, Share, Calendar, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ResultDisplayProps {
  result: 'low-risk' | 'high-risk';
  assessmentType: 'mri' | 'quiz';
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, assessmentType, onReset }) => {
  const { toast } = useToast();
  const isLowRisk = result === 'low-risk';

  const handleShareResult = () => {
    toast({
      title: "Share functionality",
      description: "Results can be shared with your healthcare provider.",
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Download initiated",
      description: "Your detailed report is being prepared.",
    });
  };

  const handleScheduleConsultation = () => {
    toast({
      title: "Consultation booking",
      description: "Redirecting to healthcare provider booking system.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className={`medical-card ${isLowRisk ? 'result-success' : 'result-warning'} border-2`}>
        <CardHeader className="text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isLowRisk ? 'bg-success' : 'bg-warning'
          }`}>
            {isLowRisk ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-white" />
            )}
          </div>
          
          <CardTitle className="text-3xl font-bold">
            {isLowRisk ? 'Low Risk' : 'Possible Early Alzheimer\'s'}
          </CardTitle>
          
          <CardDescription className={`text-lg font-medium ${
            isLowRisk ? 'text-green-700' : 'text-orange-700'
          }`}>
            {isLowRisk 
              ? 'Your assessment indicates normal cognitive function'
              : 'Consult a healthcare professional for further evaluation'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="outline" className="text-sm">
              {assessmentType === 'mri' ? 'MRI Analysis' : 'Memory Quiz'}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {new Date().toLocaleDateString()}
            </Badge>
          </div>

          {/* Detailed Results */}
          <div className="bg-card/50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-lg">Assessment Details</h4>
            
            {assessmentType === 'mri' ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Brain Pattern Analysis</span>
                  <span className="font-medium">{isLowRisk ? 'Normal' : 'Irregular patterns detected'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hippocampal Volume</span>
                  <span className="font-medium">{isLowRisk ? 'Within normal range' : 'Below average'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cortical Thickness</span>
                  <span className="font-medium">{isLowRisk ? 'Normal' : 'Reduced in key areas'}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Memory Function</span>
                  <span className="font-medium">{isLowRisk ? 'Good' : 'Concerning patterns'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cognitive Processing</span>
                  <span className="font-medium">{isLowRisk ? 'Normal speed' : 'Slower than average'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Overall Score</span>
                  <span className="font-medium">{isLowRisk ? '8.5/10' : '4.2/10'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="bg-card/50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-lg">Recommendations</h4>
            
            {isLowRisk ? (
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Continue regular mental exercises and healthy lifestyle</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Schedule routine check-ups as recommended by your doctor</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Maintain social connections and physical activity</span>
                </li>
              </ul>
            ) : (
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Schedule an appointment with a neurologist or geriatrician</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Consider comprehensive neuropsychological testing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>Discuss family history and symptoms with your healthcare provider</span>
                </li>
              </ul>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={handleDownloadReport}
              className="flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShareResult}
              className="flex items-center justify-center space-x-2"
            >
              <Share className="w-4 h-4" />
              <span>Share with Doctor</span>
            </Button>
            
            {!isLowRisk && (
              <Button
                onClick={handleScheduleConsultation}
                className="flex items-center justify-center space-x-2 bg-medical-primary hover:bg-medical-primary/90"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={onReset}
            className="w-full mt-6 text-muted-foreground hover:text-foreground"
          >
            Take Another Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};