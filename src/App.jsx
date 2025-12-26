
import { Route, Routes} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import DetailEvent from './components/DetailEvent.jsx';
import TicketSearch from './components/TicketSearch.jsx';
import Login from './components/BackOffice/Login.jsx';
import Checkaccount from './components/BackOffice/Checkaccount.jsx';
import Dashboard from './components/BackOffice/Dashboard.jsx';
import EditEvent from './components/BackOffice/EditEvent.jsx';
import CreateEvent from './components/BackOffice/CreateEvent.jsx';
import StatisticPages from './components/BackOffice/StatisticPages.jsx';
import ForgotPassword from './components/BackOffice/ForgotPassword.jsx';
import SetPassword from './components/BackOffice/SetPassword.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';




function App() {


  return (
    <>
      <Toaster position="bottom-right" />
     <Header />
     <Routes>
<Route path="/" element={<Home />} />          
        <Route path="/event/:eventId" element={<DetailEvent />} />
        <Route path="/tickets" element={<TicketSearch />} />
        <Route path="/login" element={<Login />} />
        
        {/* Routes protégées */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/statistics/:eventId" element={
          <ProtectedRoute>
            <StatisticPages />
          </ProtectedRoute>
        } />
        <Route path="/edit-event/:id" element={
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        } />
        <Route path="/create-event" element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        } />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-password" element={<SetPassword />} />
          <Route path="/Checkaccount" element={<Checkaccount />} />

      
     </Routes>
         <Footer />

   
     
    </>
  )
}

export default App
