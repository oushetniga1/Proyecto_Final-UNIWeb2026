import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Navbar from "./components/common/Navbar.jsx";

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportIncident from './pages/ReportIncident';
import MyIncidents from './pages/MyIncidents';
import Statistics from './pages/Statistics';
import AdminPanel from './pages/AdminPanel';
import MapIncidents from './pages/MapIncidents';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {

  return (

    <AuthProvider>

      <Router>

        <div className="app-container">

          <Navbar />

          <Routes>

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* RUTAS PROTEGIDAS */}

            <Route element={<ProtectedRoute />}>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/report"
                element={<ReportIncident />}
              />

              <Route
                path="/my-incidents"
                element={<MyIncidents />}
              />

              <Route
                path="/statistics"
                element={<Statistics />}
              />

              {/* MUEVELO AQUI */}
              <Route
                path="/map"
                element={<MapIncidents />}
              />

            </Route>


            {/* ADMIN */}

            <Route
              element={
                <ProtectedRoute adminOnly />
              }
            >

              <Route
                path="/admin"
                element={<AdminPanel />}
              />

            </Route>

          </Routes>

        </div>

      </Router>

    </AuthProvider >
  );
}

export default App;