import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Import Pages
import Home from './pages/Home/Home';
import FormalEvents from './pages/FormalEvents/FormalEvents';
import InformalEvents from './pages/InformalEvents/InformalEvents';
import Locations from './pages/Locations/Locations';
import HallDetails from './pages/HallDetails/HallDetails';
import Booking from './pages/Booking/Booking';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import NotFound from './pages/NotFound/NotFound';

// Mock/Initial Data
import { HALLS } from './data';
import { Hall, User } from './types';

export default function App() {
  const navigate = useNavigate();

  // Dark Mode Persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('eventease_dark_mode') === 'true';
  });

  // DB Connection status
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setDbConnected(data.database === 'MongoDB Connected');
      })
      .catch((err) => {
        console.error('Error checking DB status:', err);
        setDbConnected(false);
      });
  }, []);

  // Active Authenticated User (initially mock, later from AuthContext/Node backend)
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('eventease_user');
    return savedUser ? JSON.parse(savedUser) : {
      id: 'usr-100',
      name: 'Aditya Rao',
      email: 'aditya@example.com',
      role: 'customer'
    }; // Default logged-in mock user for seamless preview
  });

  // Listener for custom auth-change events
  useEffect(() => {
    const handleAuthChange = () => {
      const savedUser = localStorage.getItem('eventease_user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  // Global Venue List
  const [halls, setHalls] = useState<Hall[]>(HALLS);

  // Sync Dark Mode Classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('eventease_dark_mode', String(darkMode));
  }, [darkMode]);

  // Auth logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('eventease_user');
    navigate('/');
  };

  // Hero Search redirecting to customized flow
  const handleHeroSearch = (categoryId: string, cityId: string, date: string) => {
    console.log('Search params:', { categoryId, cityId, date });
    // Navigate to booking page with selected parameters as state
    navigate('/booking', { state: { categoryId, cityId, date } });
  };

  // Selection actions from Home page listings
  const handleSelectHallForDetails = (hall: Hall) => {
    navigate('/hall-details', { state: { hallId: hall.id } });
  };

  const handleBookHallDirectly = (hall: Hall) => {
    navigate('/booking', { state: { hallId: hall.id, cityId: hall.cityId } });
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
      darkMode ? 'dark bg-slate-950 text-slate-150' : 'bg-slate-50/50 text-slate-800'
    }`}>
      {/* Universal Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        onLogout={handleLogout}
        dbConnected={dbConnected}
      />

      {/* Main Multi-page Router Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Landing / Core Home Page */}
          <Route
            path="/"
            element={
              <Home
                halls={halls}
                onHeroSearch={handleHeroSearch}
                onSelectHall={handleSelectHallForDetails}
                onBookHall={handleBookHallDirectly}
              />
            }
          />

          {/* Sub Pages */}
          <Route path="/formal-events" element={<FormalEvents />} />
          <Route path="/informal-events" element={<InformalEvents />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/hall-details" element={<HallDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Page */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Error Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
