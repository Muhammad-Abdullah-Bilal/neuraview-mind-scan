import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  FileText, 
  Heart, 
  Brain, 
  Activity,
  Clock,
  Users,
  Target
} from "lucide-react";

export const Dashboard: React.FC = () => {
  const recentResults = [
    {
      id: 1,
      date: '2024-08-20',
      type: 'MRI Analysis',
      result: 'Low Risk',
      score: '8.5/10',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-08-18',
      type: 'Memory Quiz',
      result: 'Low Risk',
      score: '7.8/10',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-08-15',
      type: 'MRI Analysis',
      result: 'Requires Follow-up',
      score: '4.2/10',
      status: 'requires_attention'
    }
  ];

  const personalizedTasks = [
    {
      title: 'Daily Memory Exercise',
      description: 'Complete word association game',
      progress: 75,
      dueToday: true
    },
    {
      title: 'Physical Activity',
      description: '30 minutes of walking',
      progress: 60,
      dueToday: true
    },
    {
      title: 'Social Connection',
      description: 'Call a friend or family member',
      progress: 0,
      dueToday: true
    },
    {
      title: 'Cognitive Training',
      description: 'Complete puzzle or brain teaser',
      progress: 100,
      dueToday: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Your Health Dashboard</h2>
        <p className="text-lg text-muted-foreground">
          Track your cognitive health and follow personalized recommendations
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Health Score</p>
                <p className="text-3xl font-bold text-success">8.2/10</p>
                <p className="text-xs text-muted-foreground mt-1">↗ +0.3 from last month</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assessments Completed</p>
                <p className="text-3xl font-bold">12</p>
                <p className="text-xs text-muted-foreground mt-1">3 this month</p>
              </div>
              <div className="w-12 h-12 bg-medical-primary/10 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-medical-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Days Streak</p>
                <p className="text-3xl font-bold">28</p>
                <p className="text-xs text-muted-foreground mt-1">Daily exercises completed</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent Assessment Results</span>
          </CardTitle>
          <CardDescription>
            Your latest cognitive assessments and health screenings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentResults.map((result) => (
            <div key={result.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-medical-accent rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{result.type}</p>
                  <p className="text-sm text-muted-foreground">{result.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{result.score}</p>
                  <Badge variant={result.status === 'completed' ? 'default' : 'destructive'} className="text-xs">
                    {result.result}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            View Full History
          </Button>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-medical-primary" />
              <span>Daily Tasks</span>
            </CardTitle>
            <CardDescription>
              Personalized activities to maintain cognitive health
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {personalizedTasks.map((task, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${task.dueToday ? 'bg-medical-primary' : 'bg-success'}`} />
                    <div>
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <Badge variant={task.progress === 100 ? 'default' : 'outline'} className="text-xs">
                    {task.progress}%
                  </Badge>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-medical-accent" />
              <span>Connect & Share</span>
            </CardTitle>
            <CardDescription>
              Stay connected with your healthcare team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Next Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Share Results with Doctor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Add Family Member Access
              </Button>
            </div>

            <div className="mt-6 p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Next Reminder</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Daily memory exercise in 2 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};