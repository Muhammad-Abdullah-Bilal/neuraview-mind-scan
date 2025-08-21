import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  riskWeight: number[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "How often do you forget recent conversations?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    riskWeight: [0, 1, 2, 4, 5]
  },
  {
    id: 2,
    question: "Do you have trouble finding words during conversations?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    riskWeight: [0, 1, 2, 4, 5]
  },
  {
    id: 3,
    question: "How often do you misplace items?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    riskWeight: [0, 1, 2, 3, 4]
  },
  {
    id: 4,
    question: "Do you have difficulty following recipes or instructions?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    riskWeight: [0, 1, 2, 4, 5]
  },
  {
    id: 5,
    question: "How often do you repeat questions or stories?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    riskWeight: [0, 1, 3, 4, 5]
  },
  {
    id: 6,
    question: "Do you have trouble recognizing familiar faces or places?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    riskWeight: [0, 2, 3, 4, 5]
  },
  {
    id: 7,
    question: "How is your sense of time and date orientation?",
    options: ["Excellent", "Good", "Fair", "Poor", "Very Poor"],
    riskWeight: [0, 1, 2, 4, 5]
  }
];

interface MemoryQuizProps {
  onQuizComplete: (result: 'low-risk' | 'high-risk') => void;
}

export const MemoryQuiz: React.FC<MemoryQuizProps> = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isCompleting, setIsCompleting] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (value: string) => {
    const answerIndex = parseInt(value);
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateRisk = () => {
    let totalScore = 0;
    let maxScore = 0;
    
    questions.forEach(question => {
      const answerIndex = answers[question.id] || 0;
      totalScore += question.riskWeight[answerIndex];
      maxScore += Math.max(...question.riskWeight);
    });
    
    const riskPercentage = (totalScore / maxScore) * 100;
    return riskPercentage > 40 ? 'high-risk' : 'low-risk';
  };

  const completeQuiz = async () => {
    setIsCompleting(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = calculateRisk();
    setIsCompleting(false);
    
    toast({
      title: "Quiz completed!",
      description: "Your memory assessment has been analyzed.",
    });
    
    onQuizComplete(result);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[questions[currentQuestion].id] !== undefined;
  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <Card className="medical-card medical-shadow">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-medical-accent rounded-xl flex items-center justify-center mb-4">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl">Memory Assessment Quiz</CardTitle>
        <CardDescription className="text-lg">
          Complete this 7-question assessment to evaluate memory function
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold leading-relaxed">
            {questions[currentQuestion].question}
          </h3>
          
          <RadioGroup
            value={answers[questions[currentQuestion].id]?.toString() || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 medical-transition">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-base cursor-pointer flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>
          
          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={nextQuestion}
              disabled={!isAnswered}
              className="flex items-center space-x-2 bg-medical-accent hover:bg-medical-accent/90"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={completeQuiz}
              disabled={!allAnswered || isCompleting}
              className="flex items-center space-x-2 bg-medical-primary hover:bg-medical-primary/90"
            >
              {isCompleting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Complete Assessment</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};