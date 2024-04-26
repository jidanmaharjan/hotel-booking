
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen />} />
        <Route path='/register' element={<Registerscreen />} />
        <Route path='/login' element={<Loginscreen />} />
        <Route path='/Profile' element={<Profilescreen/>} />
        <Route path='/Dashboard' element={<Adminscreen />} />
        
        
      </Routes>
      </BrowserRouter>
      
      
      
    </div>
  );
}

export default App;
