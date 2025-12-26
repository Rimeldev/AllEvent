
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
  <Route path="/Checkaccount" element={<Checkaccount />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/statistics/:eventId" element={<StatisticPages />} />
  <Route path="/edit-event/:id" element={<EditEvent />} />
  <Route path="/create-event" element={<CreateEvent />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/set-password" element={<SetPassword />} />

      
     </Routes>
         <Footer />

   
     
    </>
  )
}

export default App
