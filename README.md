# WeatherSphere ☀️

A modern and beautiful weather application built with React, TypeScript, and Express that provides real-time weather information with a stunning user interface.

## Features 🌟

- Real-time weather data from OpenWeather API
- Beautiful modern UI with glassmorphism effects
- Responsive design for all screen sizes
- Dynamic weather icons with animations
- Detailed weather information including:
  - Temperature
  - Feels like temperature
  - Humidity
  - Wind speed
  - Pressure

## Tech Stack 💻

### Frontend
- React with TypeScript
- TailwindCSS for styling
- React Query for state management
- Axios for API requests

### Backend
- Express with TypeScript
- Axios for external API requests
- dotenv for environment variables

## Getting Started 🚀

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```bash
# In backend/.env
OPENWEATHER_API_KEY=your_api_key_here
PORT=5173
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend development server
cd frontend
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure 📁

```
weather-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── .env
└── README.md
```

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](issues-link).

## License 📝

This project is [MIT](license-link) licensed.
