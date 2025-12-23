import { Volunteer } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, MapPin, Briefcase, Calendar } from 'lucide-react';

const statusConfig: Record<Volunteer['status'], { label: string; variant: 'success' | 'warning' | 'pending' | 'urgent' }> = {
  completed: { label: 'Completed', variant: 'success' },
  'in-progress': { label: 'In Progress', variant: 'warning' },
  pending: { label: 'Pending', variant: 'pending' },
  urgent: { label: 'Urgent', variant: 'urgent' },
};

type Props = {
  volunteers: Volunteer[];
};

export function VolunteerTable({ volunteers }: Props) {
  return (
    <Card className="border shadow-md">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Volunteer Assignments</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Real-time tracking of volunteer tasks and completion status</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground">Volunteer</TableHead>
                <TableHead className="font-semibold text-foreground">Skill</TableHead>
                <TableHead className="font-semibold text-foreground min-w-[300px]">Assigned Job</TableHead>
                <TableHead className="font-semibold text-foreground">Location</TableHead>
                <TableHead className="font-semibold text-foreground">Date</TableHead>
                <TableHead className="font-semibold text-foreground text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Users className="h-8 w-8" />
                      <p className="text-sm">No volunteers registered yet</p>
                      <p className="text-xs">New registrations will appear here automatically</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                volunteers.map((volunteer, index) => (
                  <TableRow 
                    key={volunteer.id}
                    className="animate-fade-in hover:bg-muted/30 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                          {volunteer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{volunteer.name}</p>
                          <p className="text-xs text-muted-foreground">{volunteer.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{volunteer.skill}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground leading-relaxed">{volunteer.assignedJob}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{volunteer.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{volunteer.assignedDate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={statusConfig[volunteer.status].variant}>
                        {statusConfig[volunteer.status].label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
