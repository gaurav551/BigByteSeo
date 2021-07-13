import Admin from "./pages/Admin";
import  Main  from "./layout/Main";
import React, {useState,useEffect} from 'react';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";




function App() {
  const [isLoading, setLoading] = useState(true);
  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 1));
  }

  
  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loaderelement");
      if (el) {
        el.remove();
        setLoading(!isLoading);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <React.Fragment>
      {/* <div className='container'>
      <Main/>
      </div> */}
    
            <Main />
        
    </React.Fragment>
     
  );
}

export default App;
