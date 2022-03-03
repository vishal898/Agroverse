import './App.css';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Plot from './pages/Plot/Plot';
 import Home from './pages/Home/Home';
// import Anki from './pages/Crop/Crop';
// import Glogin from './pages/Glogin/Glogin'


const App=()=> {
  return (
    <>
    
    <Routes>
    {/* <Route exact path="/">
      <Glogin/>
      </Route>   */}
     <Route path='/home' element={<Home/>} /> 
    

    {/* <Route exact path="/crop">
      <Anki />
    </Route> */}
<Route  path='/plot' element={<Plot/>}/>
      

    {/* <Route exact path="/plot">
      <Create/>
    </Route> */}
    
  </Routes>
  </>
  );
}



export default App;