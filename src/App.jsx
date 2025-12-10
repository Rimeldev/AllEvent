
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import DetailEvent from './components/DetailEvent.jsx'
import { Route, Routes} from 'react-router-dom'

function App() {


  return (
    <>
     <Header />
     <Routes>

 <Route path="/" element={<Home />} />          
  <Route path="/event/:id" element={<DetailEvent />} />
      
     </Routes>
         <Footer />

   
     
    </>
  )
}

export default App
