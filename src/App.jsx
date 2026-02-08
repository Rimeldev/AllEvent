import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages publiques
import Home from "./components/Home";
import DetailEvent from "./components/DetailEvent";
import TicketSearch from "./components/TicketSearch";
import Login from "./components/BackOffice/Login";
import ForgotPassword from "./components/BackOffice/ForgotPassword";
import SetPassword from "./components/BackOffice/SetPassword";
import Checkaccount from "./components/BackOffice/Checkaccount";

// Pages admin
import Dashboard from "./components/BackOffice/Dashboard";
import StatisticPages from "./components/BackOffice/StatisticPages";
import EditEvent from "./components/BackOffice/EditEvent";
import CreateEvent from "./components/BackOffice/CreateEvent";
import AdminAccount from "./components/BackOffice/AdminAccount";
import QRScanner from './components/BackOffice/QRScanner';

function App() {
  return (
    <>
      <Toaster position="bottom-right" />

      <Routes>

        {/* 🌍 ROUTES PUBLIQUES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event/:eventId" element={<DetailEvent />} />
          <Route path="/tickets" element={<TicketSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/checkaccount" element={<Checkaccount />} />
        </Route>

        {/* 🔐 ROUTES ADMIN (protégées) */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/statistics/:eventId" element={<StatisticPages />} />
          <Route path="/edit-event/:eventId" element={<EditEvent />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/admin/account" element={<AdminAccount />} />
          <Route path="/qr-scanner" element={<QRScanner />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
