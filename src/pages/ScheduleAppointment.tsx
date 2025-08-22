import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

const ScheduleAppointment = () => {
  const [formData, setFormData] = useState({
    doctorType: '',
    preferredDate: '',
    preferredTime: '',
    reason: '',
    urgency: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appointment Requested",
      description: "We'll contact you within 24 hours to confirm your appointment.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-background to-medical-accent/5" />
      
      <div className="relative z-10 container mx-auto max-w-2xl">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-medical-primary hover:text-medical-accent medical-transition mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Schedule Appointment</h1>
          <p className="text-muted-foreground">
            Book a consultation with a healthcare professional
          </p>
        </div>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-medical-primary" />
              <span>Appointment Details</span>
            </CardTitle>
            <CardDescription>
              Please provide your preferred appointment details and we'll match you with the right specialist
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="doctorType">Type of Specialist</Label>
                <Select onValueChange={handleSelectChange('doctorType')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialist type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neurologist">Neurologist</SelectItem>
                    <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                    <SelectItem value="geriatrician">Geriatrician</SelectItem>
                    <SelectItem value="primary-care">Primary Care Physician</SelectItem>
                    <SelectItem value="memory-specialist">Memory Care Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Select onValueChange={handleSelectChange('preferredTime')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
                      <SelectItem value="evening">Evening (5:00 PM - 8:00 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select onValueChange={handleSelectChange('urgency')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine (Within 2-4 weeks)</SelectItem>
                    <SelectItem value="urgent">Urgent (Within 1 week)</SelectItem>
                    <SelectItem value="emergency">Emergency (ASAP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  placeholder="Please describe the reason for your appointment..."
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any additional information you'd like to share..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="medical-gradient text-white flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Request Appointment
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="medical-card mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-medical-accent" />
              <span>What to Expect</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-medical-primary rounded-full mt-2" />
              <div>
                <p className="font-medium">Confirmation Call</p>
                <p className="text-sm text-muted-foreground">We'll contact you within 24 hours to confirm your appointment</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-medical-primary rounded-full mt-2" />
              <div>
                <p className="font-medium">Preparation</p>
                <p className="text-sm text-muted-foreground">Bring your medical history and recent test results</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-medical-primary rounded-full mt-2" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">Initial consultations typically last 45-60 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleAppointment;