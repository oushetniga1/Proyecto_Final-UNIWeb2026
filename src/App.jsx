import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/common/Navbar";

import Dashboard from "./pages/Dashboard";
import ReportIncident from "./pages/ReportIncident";
import MyIncidents from "./pages/MyIncidents";
import Statistics from "./pages/Statistics";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

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

        <Route
          path="/admin"
          element={<AdminPanel />}
        />

      </Routes>

    </Router>
  );
}

export default App;