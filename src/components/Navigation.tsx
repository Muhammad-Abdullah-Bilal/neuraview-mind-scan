import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Upload, MessageCircle, BarChart3, Settings, User } from "lucide-react";

interface NavigationProps {
  activeSection: 'mri' | 'quiz' | 'dashboard';
  onSectionChange: (section: 'mri' | 'quiz' | 'dashboard') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    {
      id: 'mri' as const,
      label: 'MRI Analysis',
      icon: Upload,
      description: 'Upload & analyze MRI scans'
    },
    {
      id: 'quiz' as const,
      label: 'Memory Test',
      icon: MessageCircle,
      description: 'Take cognitive assessment'
    },
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: BarChart3,
      description: 'View results & history'
    }
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">NeuraView</h1>
              <p className="text-sm text-muted-foreground">Early Detection Assistant</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 h-auto py-2 px-4 ${
                    isActive ? 'medical-gradient text-white' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {item.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4">
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 ${
                    isActive ? 'medical-gradient text-white' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};