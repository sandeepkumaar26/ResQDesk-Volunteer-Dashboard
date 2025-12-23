import { useState } from 'react';
import { stats, Volunteer } from '@/data/mockData';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { VolunteerTable } from '@/components/dashboard/VolunteerTable';
import { DistressCallChart } from '@/components/dashboard/DistressCallChart';
import { HeatMap } from '@/components/dashboard/HeatMap';
import { VolunteerRegistrationForm, Volunteer as RegistrationVolunteer } from '@/components/dashboard/VolunteerRegistrationForm';
import { Users, ClipboardCheck, AlertTriangle, CheckCircle2, Shield } from 'lucide-react';

const Index = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  const handleVolunteerRegistration = (newVolunteer: RegistrationVolunteer) => {
    // Create a new volunteer entry with additional fields required by the table
    const volunteerEntry: Volunteer = {
      id: Date.now().toString(), // Simple ID generation
      name: newVolunteer.name,
      phone: newVolunteer.phone,
      skill: newVolunteer.skill,
      assignedJob: 'Pending assignment - awaiting deployment',
      location: newVolunteer.location,
      status: 'pending',
      assignedDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    };

    // Add the new volunteer to the list
    setVolunteers(prev => [...prev, volunteerEntry]);
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Emergency Response Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-secondary-foreground/80">Live Updates</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <section className="animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Volunteers"
              value={volunteers.length}
              icon={Users}
              variant="primary"
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Active Assignments"
              value={stats.activeAssignments}
              icon={ClipboardCheck}
              variant="warning"
            />
            <StatsCard
              title="Completed Tasks"
              value={stats.completedTasks}
              icon={CheckCircle2}
              variant="success"
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Pending Distress Calls"
              value={stats.pendingDistressCalls}
              icon={AlertTriangle}
              variant="urgent"
            />
          </div>
        </section>

        {/* Volunteer Table */}
        <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <VolunteerTable volunteers={volunteers} />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <DistressCallChart />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <HeatMap />
          </div>
        </section>

        {/* Registration Form */}
        <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <VolunteerRegistrationForm onRegister={handleVolunteerRegistration} />
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Emergency Response Coordination System • Public Transparency Dashboard
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Data updated in real-time • Last sync: {new Date().toLocaleString()}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
