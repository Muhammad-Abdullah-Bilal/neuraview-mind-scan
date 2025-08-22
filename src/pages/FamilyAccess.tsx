import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, ArrowLeft, Mail, Trash2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

const FamilyAccess = () => {
  const [formData, setFormData] = useState({
    memberEmail: '',
    memberName: '',
    relationship: '',
    accessLevel: ''
  });
  
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      relationship: 'Daughter',
      accessLevel: 'Full Access',
      status: 'Active',
      dateAdded: '2024-08-15'
    },
    {
      id: 2,
      name: 'Michael Johnson',
      email: 'mike.johnson@email.com',
      relationship: 'Son',
      accessLevel: 'View Only',
      status: 'Pending',
      dateAdded: '2024-08-18'
    }
  ]);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate adding family member
    const newMember = {
      id: familyMembers.length + 1,
      name: formData.memberName,
      email: formData.memberEmail,
      relationship: formData.relationship,
      accessLevel: formData.accessLevel,
      status: 'Pending',
      dateAdded: new Date().toISOString().split('T')[0]
    };
    
    setFamilyMembers([...familyMembers, newMember]);
    
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${formData.memberName} at ${formData.memberEmail}.`,
    });
    
    // Reset form
    setFormData({
      memberEmail: '',
      memberName: '',
      relationship: '',
      accessLevel: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const removeFamilyMember = (id: number) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
    toast({
      title: "Access Removed",
      description: "Family member access has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-background to-medical-accent/5" />
      
      <div className="relative z-10 container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-medical-primary hover:text-medical-accent medical-transition mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Family Member Access</h1>
          <p className="text-muted-foreground">
            Grant family members access to view your health information and receive updates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add New Family Member */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-medical-primary" />
                <span>Add Family Member</span>
              </CardTitle>
              <CardDescription>
                Invite a family member to access your health information
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="memberName">Full Name</Label>
                  <Input
                    id="memberName"
                    name="memberName"
                    placeholder="Enter full name"
                    value={formData.memberName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memberEmail">Email Address</Label>
                  <Input
                    id="memberEmail"
                    name="memberEmail"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.memberEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select onValueChange={handleSelectChange('relationship')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="caregiver">Caregiver</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessLevel">Access Level</Label>
                  <Select onValueChange={handleSelectChange('accessLevel')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view-only">View Only</SelectItem>
                      <SelectItem value="limited">Limited Access</SelectItem>
                      <SelectItem value="full">Full Access</SelectItem>
                      <SelectItem value="emergency">Emergency Contact Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full medical-gradient text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Access Levels Information */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-medical-accent" />
                <span>Access Levels</span>
              </CardTitle>
              <CardDescription>
                Understanding different access permissions
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">View Only</h4>
                  <p className="text-xs text-muted-foreground">Can view test results and reports</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Limited Access</h4>
                  <p className="text-xs text-muted-foreground">View results + receive important notifications</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Full Access</h4>
                  <p className="text-xs text-muted-foreground">Complete access including appointment scheduling</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Emergency Contact</h4>
                  <p className="text-xs text-muted-foreground">Only contacted in medical emergencies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Family Members */}
        <Card className="medical-card mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-medical-primary" />
              <span>Current Family Members</span>
            </CardTitle>
            <CardDescription>
              Manage existing family member access
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-medical-accent rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {member.relationship}
                        </Badge>
                        <Badge variant={member.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium">{member.accessLevel}</p>
                      <p className="text-xs text-muted-foreground">Added {member.dateAdded}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeFamilyMember(member.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {familyMembers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No family members added yet</p>
                  <p className="text-sm">Add family members to share your health information</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyAccess;