import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { MRIUpload } from '@/components/MRIUpload';
import { MemoryQuiz } from '@/components/MemoryQuiz';
import { ResultDisplay } from '@/components/ResultDisplay';
import { Dashboard } from '@/components/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Upload, MessageCircle, ArrowRight, Shield, Clock, Users } from "lucide-react";

interface AssessmentResult {
  result: 'low-risk' | 'high-risk';
  type: 'mri' | 'quiz';
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<'mri' | 'quiz' | 'dashboard' | 'home'>('home');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const handleMRIAnalysisComplete = (result: 'low-risk' | 'high-risk') => {
    setAssessmentResult({ result, type: 'mri' });
    setActiveSection('dashboard');
  };

  const handleQuizComplete = (result: 'low-risk' | 'high-risk') => {
    setAssessmentResult({ result, type: 'quiz' });
    setActiveSection('dashboard');
  };

  const handleReset = () => {
    setAssessmentResult(null);
    setActiveSection('home');
  };

  if (activeSection !== 'home') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation activeSection={activeSection as 'mri' | 'quiz' | 'dashboard'} onSectionChange={setActiveSection} />
        
        <main className="container mx-auto px-6 py-8">
          {assessmentResult ? (
            <ResultDisplay
              result={assessmentResult.result}
              assessmentType={assessmentResult.type}
              onReset={handleReset}
            />
          ) : (
            <>
              {activeSection === 'mri' && (
                <MRIUpload onAnalysisComplete={handleMRIAnalysisComplete} />
              )}
              
              {activeSection === 'quiz' && (
                <MemoryQuiz onQuizComplete={handleQuizComplete} />
              )}
              
              {activeSection === 'dashboard' && (
                <Dashboard />
              )}
            </>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-background to-medical-accent/5" />
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Logo & Brand */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-medical-primary to-medical-accent bg-clip-text text-transparent">
                  NeuraView
                </h1>
                <p className="text-xl text-muted-foreground">
                  Alzheimer's Early Detection & Care Assistant
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Early Detection Through Advanced AI
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Utilize cutting-edge artificial intelligence to analyze MRI scans and cognitive assessments for early Alzheimer's detection and personalized care recommendations.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button
                onClick={() => setActiveSection('mri')}
                size="lg"
                className="medical-gradient text-white hover:opacity-90 h-14 px-8 text-lg font-medium medical-transition group"
              >
                <Upload className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Upload MRI Scan
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => setActiveSection('quiz')}
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg font-medium border-medical-accent text-medical-accent hover:bg-medical-accent hover:text-white group"
              >
                <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Take Memory Test
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-success" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-medical-primary" />
                <span>5-Min Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-medical-accent" />
                <span>Healthcare Professional Grade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Comprehensive Assessment Tools</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from multiple assessment methods designed by medical professionals and powered by artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* MRI Analysis Card */}
            <Card 
              className="medical-card cursor-pointer hover:shadow-medical medical-transition group"
              onClick={() => setActiveSection('mri')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-medical-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-medical-primary" />
                </div>
                <CardTitle className="text-2xl">MRI Scan Analysis</CardTitle>
                <CardDescription className="text-base">
                  Upload brain MRI scans for AI-powered pattern recognition and early detection analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm">Advanced CNN neural network analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm">Hippocampal volume assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm">Cortical thickness evaluation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm">Detailed diagnostic report</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full group-hover:bg-medical-primary group-hover:text-white">
                  Start MRI Analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Memory Quiz Card */}
            <Card 
              className="medical-card cursor-pointer hover:shadow-medical medical-transition group"
              onClick={() => setActiveSection('quiz')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-medical-accent/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-medical-accent" />
                </div>
                <CardTitle className="text-2xl">Cognitive Assessment</CardTitle>
                <CardDescription className="text-base">
                  Complete a comprehensive 7-question memory and cognitive function evaluation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-medical-accent rounded-full" />
                    <span className="text-sm">Scientifically validated questions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-medical-accent rounded-full" />
                    <span className="text-sm">Memory function assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-medical-accent rounded-full" />
                    <span className="text-sm">Cognitive processing evaluation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-medical-accent rounded-full" />
                    <span className="text-sm">Personalized recommendations</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full group-hover:bg-medical-accent group-hover:text-white">
                  Take Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg">NeuraView</span>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Empowering early detection and intervention through advanced AI technology and compassionate care.
            </p>
            <div className="text-xs text-muted-foreground">
              © 2024 NeuraVia Research Inc. | For educational and research purposes. Always consult healthcare professionals.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;