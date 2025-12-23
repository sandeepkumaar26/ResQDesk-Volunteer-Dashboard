# ResQDesk - Volunteer Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</div>

<div align="center">
  <h3>A Modern Emergency Response Coordination System</h3>
  <p>Real-time volunteer management dashboard for emergency response operations</p>
</div>

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Components](#components)
- [UI/UX](#uiux)
- [Data Visualization](#data-visualization)
- [Development](#development)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality
- **Real-time Dashboard** - Live updates on volunteer activities and emergency responses
- **Volunteer Management** - Complete volunteer registration and assignment system
- **Interactive Heat Map** - Geographic visualization of emergency incidents
- **Analytics & Charts** - Comprehensive data visualization with trend analysis
- **Distress Call Tracking** - Real-time monitoring of emergency calls and responses
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Advanced Features
- **Live Status Updates** - Real-time synchronization with emergency services
- **Modern UI Components** - Built with shadcn/ui for consistent design
- **Interactive Charts** - Powered by Recharts for dynamic data visualization
- **Leaflet Integration** - Interactive maps with heat map overlays
- **Theme Support** - Dark/light mode compatibility
- **Mobile-First** - Responsive design for all screen sizes

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sandeepkumaar26/ResQDesk-Volunteer-Dashboard.git
   cd ResQDesk-Volunteer-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.8.3** - Type-safe development experience
- **Vite 5.4.19** - Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful & consistent icon library

### Data & State Management
- **TanStack Query** - Powerful data synchronization
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Maps & Visualization
- **React Leaflet** - Interactive maps for React
- **Leaflet.heat** - Heat map visualization
- **Recharts** - Composable charting library

## Components

### Dashboard Components
- **[StatsCard](src/components/dashboard/StatsCard.tsx)** - Key metrics display with trend indicators
- **[VolunteerTable](src/components/dashboard/VolunteerTable.tsx)** - Comprehensive volunteer management interface
- **[DistressCallChart](src/components/dashboard/DistressCallChart.tsx)** - Real-time emergency call analytics
- **[HeatMap](src/components/dashboard/HeatMap.tsx)** - Geographic incident visualization
- **[VolunteerRegistrationForm](src/components/dashboard/VolunteerRegistrationForm.tsx)** - New volunteer onboarding

### UI Components
40+ shadcn/ui components including:
- **[Button](src/components/ui/button.tsx)** - Interactive button component
- **[Card](src/components/ui/card.tsx)** - Container component for content
- **[Table](src/components/ui/table.tsx)** - Data table component
- **[Form](src/components/ui/form.tsx)** - Form handling components
- **[Dialog](src/components/ui/dialog.tsx)** - Modal dialog component
- **[Input](src/components/ui/input.tsx)** - Text input component
- **[Select](src/components/ui/select.tsx)** - Dropdown selection component
- **[Chart](src/components/ui/chart.tsx)** - Chart visualization component
- **[Badge](src/components/ui/badge.tsx)** - Status badge component
- **[Alert](src/components/ui/alert.tsx)** - Alert notification component
- And many more...

## UI/UX

### Design System
- **Consistent Color Palette** - Carefully crafted color scheme for emergency services
- **Mobile-First Approach** - Responsive design that works on all devices
- **Accessibility** - WCAG compliant components with proper ARIA labels
- **Performance** - Optimized for fast loading and smooth interactions

### Visual Features
- **Smooth Animations** - CSS animations for enhanced user experience
- **Interactive Charts** - Hover effects and real-time data updates
- **Status Indicators** - Clear visual feedback for system status
- **Theme Support** - Ready for dark/light mode implementation

## Data Visualization

### Charts & Analytics
- **Line Charts** - Trend analysis for distress calls over time
- **Heat Maps** - Geographic distribution of emergency incidents
- **Bar Charts** - Volunteer activity and assignment statistics
- **KPI Cards** - Key performance indicators with trend arrows

### Real-time Features
- **Live Updates** - WebSocket-ready architecture for real-time data
- **Auto Refresh** - Automatic data synchronization
- **Push Notifications** - Ready for emergency alert integration

## Development

### Project Structure
```
src/
├── components/
│   ├── dashboard/     # Dashboard-specific components
│   └── ui/           # Reusable UI components
├── data/             # Mock data and API utilities
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── pages/            # Page components
```

### Code Quality
- **ESLint** - Code linting with React best practices
- **Prettier** - Code formatting (ready to configure)
- **TypeScript** - Full type safety across the application
- **Testing Ready** - Structure prepared for unit and integration tests

## Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Key Highlights

### Performance
- **Vite** for lightning-fast development and builds
- **Code Splitting** - Optimized bundle sizes
- **Mobile Optimized** - Fast loading on all devices

### Security & Reliability
- **TypeScript** - Compile-time error catching
- **Form Validation** - Robust input validation with Zod
- **Type Safety** - End-to-end type safety

### Developer Experience
- **Hot Reload** - Instant feedback during development
- **Modern Tooling** - Latest React and TypeScript features
- **Component Library** - Consistent, reusable components

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with care for emergency response teams</p>
  <p>
    <a href="https://github.com/sandeepkumaar26/ResQDesk-Volunteer-Dashboard/issues">Report Bug</a> •
    <a href="https://github.com/sandeepkumaar26/ResQDesk-Volunteer-Dashboard/issues">Request Feature</a>
  </p>
</div>