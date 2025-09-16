# CivicTrack - Track Every Issue

A simple mobile + web app to report and track civic issues like potholes, garbage, and streetlights.

## The Problem

People face issues daily: potholes, garbage, streetlights. Complaints often get lost or ignored. No easy way to track progress of complaints.

## Our Solution – CivicTrack

A simple mobile + web app to:

- Click a photo, auto-capture location, add short text/voice note
- Submit instantly → complaint goes to the right department
- Citizens get live updates: Submitted → Acknowledged → Resolved
- Govt. staff get a dashboard to view, assign & resolve issues

## Features

### For Citizens
- **Photo Capture**: Click a photo of the issue with automatic location detection
- **Voice Notes**: Add voice descriptions for better issue documentation
- **Auto Location**: GPS automatically captures your exact location
- **Live Updates**: Get real-time status: Submitted → Acknowledged → Resolved
- **Issue Categories**: Report potholes, garbage, streetlights, water issues, and more

### For Government Staff
- **Dashboard**: View all reported issues in one place
- **Assignment**: Assign issues to relevant departments
- **Status Management**: Update issue status from pending to resolved
- **Search & Filter**: Find issues by category, status, or location
- **Issue Details**: View photos, descriptions, and reporter information

## Technology Stack

- **Frontend**: React.js with Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons & Lucide React
- **Routing**: React Router DOM
- **Voice Recording**: Web Audio API
- **Location**: Geolocation API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd civictrack
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── About/           # About page component
│   ├── Contact/         # Contact page component
│   ├── Dashboard/       # Government staff dashboard
│   ├── Hero/           # Hero section component
│   ├── Login/          # Login page component
│   ├── ReportIssue/    # Issue reporting form
│   ├── Signup/         # Signup page component
│   ├── TrackMyReport/  # Issue tracking component
│   ├── TrendingIssue/  # Trending issues component
│   ├── Carousel.jsx    # Image carousel
│   ├── Footer.jsx      # Footer component
│   ├── Home.jsx        # Home page component
│   ├── Logo.jsx        # Logo component
│   └── nav.jsx         # Navigation component
├── context/
│   └── AuthContext.jsx # Authentication context
├── App.jsx             # Main app component
├── index.js            # App entry point
└── index.css           # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact us at [contact@civictrack.com](mailto:contact@civictrack.com)