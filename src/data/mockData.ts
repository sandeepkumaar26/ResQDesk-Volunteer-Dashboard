export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  skill: string;
  assignedJob: string;
  location: string;
  status: 'completed' | 'in-progress' | 'pending' | 'urgent';
  assignedDate: string;
}

export interface DistressCallData {
  date: string;
  registrations: number;
  volunteersAttending: number;
}

export interface HeatMapZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  intensity: 'low' | 'medium' | 'high' | 'critical';
  callCount: number;
}

export const volunteers: Volunteer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    skill: 'First Aid & Medical',
    assignedJob: 'Medical assistance at Sector 12 flood relief camp',
    location: 'Sector 12, Chennai',
    status: 'completed',
    assignedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91 87654 32109',
    skill: 'Search & Rescue',
    assignedJob: 'Building collapse rescue operation - Tower B',
    location: 'Koramangala, Bangalore',
    status: 'in-progress',
    assignedDate: '2024-01-16',
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    phone: '+91 76543 21098',
    skill: 'Logistics & Supply',
    assignedJob: 'Food and water distribution - Relief Center 3',
    location: 'Malappuram, Kerala',
    status: 'urgent',
    assignedDate: '2024-01-16',
  },
  {
    id: '4',
    name: 'Anita Desai',
    phone: '+91 65432 10987',
    skill: 'Counseling',
    assignedJob: 'Trauma counseling for affected families',
    location: 'Wayanad, Kerala',
    status: 'in-progress',
    assignedDate: '2024-01-14',
  },
  {
    id: '5',
    name: 'Suresh Menon',
    phone: '+91 54321 09876',
    skill: 'Communication',
    assignedJob: 'Emergency hotline management',
    location: 'Control Room, Kochi',
    status: 'completed',
    assignedDate: '2024-01-13',
  },
  {
    id: '6',
    name: 'Lakshmi Nair',
    phone: '+91 43210 98765',
    skill: 'Medical',
    assignedJob: 'Pending assignment - awaiting deployment',
    location: 'Thrissur, Kerala',
    status: 'pending',
    assignedDate: '2024-01-16',
  },
  {
    id: '7',
    name: 'Vikram Singh',
    phone: '+91 32109 87654',
    skill: 'Heavy Equipment',
    assignedJob: 'Debris clearing at highway NH-66',
    location: 'Mangalore, Karnataka',
    status: 'in-progress',
    assignedDate: '2024-01-15',
  },
  {
    id: '8',
    name: 'Fatima Begum',
    phone: '+91 21098 76543',
    skill: 'Child Care',
    assignedJob: 'Child care at temporary shelter',
    location: 'Ernakulam, Kerala',
    status: 'completed',
    assignedDate: '2024-01-12',
  },
];

export const distressCallData: DistressCallData[] = [
  { date: 'Jan 10', registrations: 45, volunteersAttending: 38 },
  { date: 'Jan 11', registrations: 67, volunteersAttending: 52 },
  { date: 'Jan 12', registrations: 120, volunteersAttending: 89 },
  { date: 'Jan 13', registrations: 156, volunteersAttending: 134 },
  { date: 'Jan 14', registrations: 189, volunteersAttending: 165 },
  { date: 'Jan 15', registrations: 142, volunteersAttending: 128 },
  { date: 'Jan 16', registrations: 98, volunteersAttending: 87 },
];

export const heatMapZones: HeatMapZone[] = [
  { id: '1', name: 'Wayanad District', lat: 11.6854, lng: 76.1320, intensity: 'critical', callCount: 234 },
  { id: '2', name: 'Malappuram', lat: 11.0510, lng: 76.0711, intensity: 'high', callCount: 156 },
  { id: '3', name: 'Kozhikode', lat: 11.2588, lng: 75.7804, intensity: 'high', callCount: 142 },
  { id: '4', name: 'Ernakulam', lat: 9.9816, lng: 76.2999, intensity: 'medium', callCount: 78 },
  { id: '5', name: 'Thrissur', lat: 10.5276, lng: 76.2144, intensity: 'medium', callCount: 65 },
  { id: '6', name: 'Kannur', lat: 11.8745, lng: 75.3704, intensity: 'low', callCount: 34 },
  { id: '7', name: 'Idukki', lat: 9.9189, lng: 77.1025, intensity: 'medium', callCount: 89 },
  { id: '8', name: 'Palakkad', lat: 10.7867, lng: 76.6548, intensity: 'low', callCount: 28 },
];

export const stats = {
  totalVolunteers: 1247,
  activeAssignments: 892,
  completedTasks: 3456,
  pendingDistressCalls: 156,
};
