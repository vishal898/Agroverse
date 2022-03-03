import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
// import Create from './pages/Plot/Plot';
 import Home from './pages/Home/Home';
// import Anki from './pages/Crop/Crop';
// import Glogin from './pages/Glogin/Glogin'


const App=()=> {
  return (
    <>
    
    <Switch>
    {/* <Route exact path="/">
      <Glogin/>
      </Route>   */}
      
    <Route exact path="/home">
      <Home />
    </Route>

    {/* <Route exact path="/crop">
      <Anki />
    </Route> */}


    {/* <Route exact path="/plot">
      <Create/>
    </Route> */}
    
  </Switch>
  </>
  );
}



export default App;