# Quiz Application

A modern, interactive quiz application built with React frontend and Node.js backend, featuring Apple-style design and comprehensive UX/Design questions.

## Features

- **Interactive Quiz System**: Multiple quiz types with timed sessions
- **Apple-Style Design**: Clean, modern UI with Inter font and glass morphism effects
- **Comprehensive Questions**: 20 advanced UX design questions with detailed explanations
- **Real-time Timer**: Visual countdown with progress bar
- **Score Tracking**: Real-time score display and final summary
- **Responsive Design**: Optimized for desktop and mobile devices
- **Detailed Feedback**: Inline answer explanations and expandable question details

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **CSS3** - Custom styling with Apple design principles
- **Inter Font** - Typography optimization

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logging

## Project Structure

```
dequiz/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── LandingPage.js
│   │   │   ├── QuizPage.js
│   │   │   └── SummaryPage.js
│   │   ├── App.js          # Main app component
│   │   └── index.css       # Global styles
│   └── package.json
├── backend/                 # Node.js backend server
│   ├── server.js           # Express server
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dequiz
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to start using the application

## Quiz Features

### Quiz Types
- **Design Quiz**: 20 advanced UX/Design questions covering:
  - Cognitive biases and user psychology
  - Information architecture and research methods
  - Usability testing and metrics
  - A/B testing and analytics
  - Accessibility and inclusive design
  - Service design and experience mapping
  - And more...

- **Color Quiz**: Basic color theory questions

### Time Options
- 1 minute (quick quiz)
- 5 minutes
- 10 minutes
- 15 minutes
- 20 minutes
- 30 minutes

### Quiz Flow
1. **Landing Page**: Select quiz type and time limit
2. **Quiz Page**: Answer questions with real-time timer and score
3. **Summary Page**: View results with detailed breakdown and explanations

## Design System

### Color Palette
- **Primary**: #007aff (Apple Blue)
- **Success**: #34c759 (Apple Green)
- **Error**: #ff3b30 (Apple Red)
- **Background**: #ffffff (White)
- **Surface**: #f5f5f7 (Light Gray)
- **Text Primary**: #1d1d1f (Dark Gray)
- **Text Secondary**: #86868b (Medium Gray)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Design**: Apple-style typography with proper spacing

### Components
- **Cards**: Rounded corners with subtle borders
- **Buttons**: Apple-style with hover effects
- **Timer**: Progress bar with color-coded warnings
- **Choices**: Interactive grid layout with feedback states

## API Endpoints

### Backend Routes
- `GET /api/questions/:type` - Get questions by quiz type
- `POST /api/submit` - Submit quiz results
- `GET /api/stats` - Get quiz statistics

## Development

### Code Quality
- ESLint configuration for React
- Consistent code formatting
- Error boundaries and loading states
- Responsive design patterns

### Performance
- Optimized React components
- Efficient state management
- Minimal bundle size
- Fast loading times

## Deployment

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend Deployment
The backend can be deployed to any Node.js hosting platform (Heroku, Vercel, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository. 