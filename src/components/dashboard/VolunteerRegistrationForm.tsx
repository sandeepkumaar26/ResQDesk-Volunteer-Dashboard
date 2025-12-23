import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, CheckCircle } from 'lucide-react';

/* ---------------- TYPES ---------------- */

export type Volunteer = {
  name: string;
  phone: string;
  email: string;
  skill: string;
  location: string;
  availability: string;
  experience: string;
};

type Props = {
  onRegister: (volunteer: Volunteer) => void;
};

/* ---------------- DATA ---------------- */

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

/* ---------------- COMPONENT ---------------- */

export function VolunteerRegistrationForm({ onRegister }: Props) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Volunteer>({
    name: '',
    phone: '',
    email: '',
    skill: '',
    location: '',
    availability: '',
    experience: '',
  });

  const handleChange = (field: keyof Volunteer, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🔥 Send data to parent (VolunteerPage)
    onRegister(formData);

    toast({
      title: 'Registration Successful!',
      description: 'Thank you for volunteering. Our team will contact you shortly.',
    });

    // Reset form
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

  return (
    <Card className="border shadow-md bg-gradient-to-br from-card to-muted/20">
      <CardHeader className="border-b bg-secondary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              Volunteer Registration
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Join our emergency response team — on-the-spot registration
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
              />
            </div>

            {/* Skill */}
            <div className="space-y-2">
              <Label>Primary Skill *</Label>
              <Select
                value={formData.skill}
                onValueChange={value => handleChange('skill', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map(skill => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Location *</Label>
              <Input
                value={formData.location}
                onChange={e => handleChange('location', e.target.value)}
                required
              />
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label>Availability *</Label>
              <Select
                value={formData.availability}
                onValueChange={value => handleChange('availability', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Immediate">Immediate</SelectItem>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="Weekend">Weekend</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label>Previous Experience</Label>
            <Textarea
              rows={3}
              value={formData.experience}
              onChange={e => handleChange('experience', e.target.value)}
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? 'Registering...' : 'Register as Volunteer'}
            </Button>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="inline h-3 w-3 mr-1 text-success" />
              Information used only for emergency coordination
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}