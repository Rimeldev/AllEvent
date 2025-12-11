
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import DetailEvent from './components/DetailEvent.jsx'
import TicketSearch from './components/TicketSearch.jsx'
import Login from './components/BackOffice/Login.jsx'
import Checkaccount from './components/BackOffice/Checkaccount.jsx'
import { Route, Routes} from 'react-router-dom'


function App() {


  return (
    <>
     <Header />
     <Routes>

 <Route path="/" element={<Home />} />          
  <Route path="/event/:id" element={<DetailEvent />} />
  <Route path="/tickets" element={<TicketSearch />} />
  <Route path="/login" element={<Login />} />
  <Route path="/Checkaccount" element={<Checkaccount />} />

      
     </Routes>
         <Footer />

   
     
    </>
  )
}

export default App
