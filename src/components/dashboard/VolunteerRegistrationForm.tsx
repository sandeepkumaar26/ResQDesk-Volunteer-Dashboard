import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Send, CheckCircle } from 'lucide-react';

const skills = [
  'First Aid & Medical',
  'Search & Rescue',
  'Logistics & Supply',
  'Communication',
  'Counseling',
  'Heavy Equipment Operation',
  'Child Care',
  'Cooking & Food Service',
  'Transportation',
  'Other',
];

export function VolunteerRegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    skill: '',
    location: '',
    availability: '',
    experience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Registration Successful!",
      description: "Thank you for volunteering. Our team will contact you shortly.",
    });

    setFormData({
      name: '',
      phone: '',
      email: '',
      skill: '',
      location: '',
      availability: '',
      experience: '',
    });
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border shadow-md bg-gradient-to-br from-card to-muted/20">
      <CardHeader className="border-b bg-secondary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Volunteer Registration</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Join our emergency response team - On-the-spot registration</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name <span className="text-urgent">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number <span className="text-urgent">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Skill */}
            <div className="space-y-2">
              <Label htmlFor="skill" className="text-sm font-medium">
                Primary Skill <span className="text-urgent">*</span>
              </Label>
              <Select value={formData.skill} onValueChange={(value) => handleChange('skill', value)} required>
                <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select your skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Current Location <span className="text-urgent">*</span>
              </Label>
              <Input
                id="location"
                placeholder="City, District"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label htmlFor="availability" className="text-sm font-medium">
                Availability <span className="text-urgent">*</span>
              </Label>
              <Select value={formData.availability} onValueChange={(value) => handleChange('availability', value)} required>
                <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (Within 2 hours)</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="weekend">This Weekend</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-sm font-medium">
              Previous Experience (Optional)
            </Label>
            <Textarea
              id="experience"
              placeholder="Briefly describe any relevant experience in disaster relief, medical services, or volunteer work..."
              value={formData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              rows={3}
              className="transition-all focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button 
              type="submit" 
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                  Registering...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Register as Volunteer
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              <CheckCircle className="h-3 w-3 inline mr-1 text-success" />
              Your information is secure and will only be used for emergency coordination
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
