import './App.css';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Plot from './pages/Plot/Plot';
import Demand from './pages/Demand/Demand';
import Home from './pages/Home/Home';
import Crop from './pages/Crop/Crop';
import User from './pages/User/User';
import Glogin from './pages/Glogin/Glogin'


const App=()=> {
  return (
    <>
    
    <Routes>
     <Route path='/home' element={<Home/>} /> 
     <Route path='/' element={<Glogin/>} /> 
     <Route path='/crop' element={<Crop/>} /> 
     <Route path='/user' element={<User/>} /> 
     <Route  path='/plot' element={<Plot/>}/>
     <Route  path='/demand' element={<Demand/>}/>
      

    
    
  </Routes>
  </>
  );
}



export default App;