import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Share2, FileText, ArrowLeft, User, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

const ShareResults = () => {
  const [formData, setFormData] = useState({
    doctorEmail: '',
    doctorName: '',
    message: '',
    selectedResults: [] as string[]
  });
  const { toast } = useToast();

  const availableResults = [
    {
      id: 'mri-2024-08-20',
      type: 'MRI Analysis',
      date: '2024-08-20',
      score: '8.5/10',
      risk: 'Low Risk'
    },
    {
      id: 'quiz-2024-08-18',
      type: 'Memory Quiz',
      date: '2024-08-18',
      score: '7.8/10',
      risk: 'Low Risk'
    },
    {
      id: 'mri-2024-08-15',
      type: 'MRI Analysis',
      date: '2024-08-15',
      score: '4.2/10',
      risk: 'Requires Follow-up'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedResults.length === 0) {
      toast({
        title: "No Results Selected",
        description: "Please select at least one result to share.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Results Shared Successfully",
      description: `Your selected results have been securely sent to ${formData.doctorName || formData.doctorEmail}.`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleResultSelection = (resultId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedResults: checked 
        ? [...prev.selectedResults, resultId]
        : prev.selectedResults.filter(id => id !== resultId)
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-background to-medical-accent/5" />
      
      <div className="relative z-10 container mx-auto max-w-2xl">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-medical-primary hover:text-medical-accent medical-transition mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Share Results with Doctor</h1>
          <p className="text-muted-foreground">
            Securely share your assessment results with your healthcare provider
          </p>
        </div>

        <div className="space-y-6">
          {/* Doctor Information */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-medical-primary" />
                <span>Healthcare Provider Information</span>
              </CardTitle>
              <CardDescription>
                Enter your doctor's contact information
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctorName">Doctor's Name</Label>
                  <Input
                    id="doctorName"
                    name="doctorName"
                    placeholder="Dr. John Smith"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctorEmail">Doctor's Email</Label>
                  <Input
                    id="doctorEmail"
                    name="doctorEmail"
                    type="email"
                    placeholder="doctor@clinic.com"
                    value={formData.doctorEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Add a personal message for your doctor..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results Selection */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-medical-accent" />
                <span>Select Results to Share</span>
              </CardTitle>
              <CardDescription>
                Choose which assessment results you want to share
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {availableResults.map((result) => (
                  <div key={result.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-xl">
                    <Checkbox
                      id={result.id}
                      checked={formData.selectedResults.includes(result.id)}
                      onCheckedChange={(checked) => handleResultSelection(result.id, checked as boolean)}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{result.type}</h4>
                        <Badge variant={result.risk === 'Low Risk' ? 'default' : 'destructive'}>
                          {result.risk}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{result.date}</span>
                        </div>
                        <span>Score: {result.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="medical-card border-medical-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-medical-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-4 h-4 text-medical-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-medical-primary mb-2">Security & Privacy</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All data is encrypted during transmission</li>
                    <li>• Only authorized healthcare providers can access shared results</li>
                    <li>• Sharing logs are maintained for your security</li>
                    <li>• You can revoke access at any time</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleSubmit}
              className="medical-gradient text-white flex-1"
              disabled={formData.selectedResults.length === 0 || !formData.doctorEmail}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Selected Results
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareResults;