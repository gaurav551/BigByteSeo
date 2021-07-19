import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { Routes } from './Routes';
import Home from '../pages/Home'
import { BrowserRouter as Router } from 'react-router-dom';
import Privacy from '../pages/Privacy'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import  NotFound  from '../pages/NotFound'
import  Contact  from '../pages/Contact'

import  TOS  from '../pages/TOS'
import About from '../pages/About';
import Dictionary from '../components/Dictionary/Dictionary';
import TextInput from '../components/WordCount/WordCount';
import FindImageSource from '../components/FindImageSource/FindImageSource';
import CheckGuestPostForm from '../components/GuesPostChecker/CheckGuestPostForm';
import { ImageSearch } from '../components/ImageSearch/ImageSearch';


const Main = () => {
  const collapseRef = useRef(null);

  const hideBars = () => {
    collapseRef.current.setAttribute("class", "navbar-collapse collapse");
  };
  return (
   
    <React.Fragment>
       <Router>
        <header className="site-header">
          <div id="header-wrap">
            <div className="container">
              <div className="row">
                <div className="col">
                  <nav className="navbar navbar-expand-lg navbar-light">
                    <NavLink className="navbar-brand logo text-primary mb-0 font-w-7" to="/">
                      BIGBYTE<span className="text-dark font-w-4">SEO</span>
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav"  ref={collapseRef} >
                      <ul className="navbar-nav mx-auto">
                      <div className="d-sm-flex align-items-center justify-content-end"> <NavLink to="/" className="btn btn-primary btn-sm ms-3 d-sm-inline-block d-none" >Home</NavLink>  </div>

                      
                        <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="sub" data-bs-toggle="dropdown">Tools</a>
                          <ul className="dropdown-menu">
                            <li><NavLink  onClick={hideBars} className="dropdown-item" to='site-monitor'>Site monitor</NavLink>
                            </li>
                            <li><NavLink  onClick={hideBars} className="dropdown-item" to='check-guest-post'>Check guest posting</NavLink>
                            </li>
                            <li><NavLink  onClick={hideBars} className="dropdown-item" to='dictionary'>Word Dictionary</NavLink>
                            </li>
                            <li><NavLink  onClick={hideBars} className="dropdown-item" to='word-count'>Word Count</NavLink>
                            </li>
                            <li><NavLink  onClick={hideBars} className="dropdown-item" to='find-image-source'>Find image source</NavLink>
                            </li>
                            <li><NavLink  onClick={hideBars} className="dropdown-item" to='search-image'>Search Image</NavLink>
                            </li>
                           
                           
                            
                          </ul>
                        </li>
                        <li className="nav-item"> <NavLink  onClick={hideBars} className="nav-link " to='/about'>About</NavLink>
                        </li>
                        <li className="nav-item"> <NavLink  onClick={hideBars} className="nav-link" to='/contact'>Contact</NavLink>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="hero-banner position-relative custom-py-1 hero-shape1">
        <div className="container">
          <div className="row align-items-center">
           
            <div className="col-12 col-lg-12 col-xl-12">
            <div className="p-3 p-lg-5 shadow white-bg rounded">
             
            <Switch>
        <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/check-guest-post" exact>
            <CheckGuestPostForm />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/tos">
            <TOS />
            </Route>
            <Route path="/about">
            <About />
            </Route>
            <Route path="/dictionary">
            <Dictionary />
            </Route>
            <Route path="/word-count">
            <TextInput />
            </Route>
            <Route path="/find-image-source">
            <FindImageSource />
            </Route>
            <Route path="/search-image">
            <ImageSearch />
            </Route>
           
           
          <Route path='*'>
          <NotFound />
          </Route>
          
         
        </Switch>
       
        </div>
        </div>
        </div>
        </div>
        </section>
        <footer className='footer'>
          <div className="container">
            <div className="row align-items-center mb-5">
              <div className="col-md-6">Copyright {Date()} All rights reserved  <i className="lar la-heart text-primary heartBeat2"></i>
              </div>
              <div className="col-md-6 text-md-end mt-3 mt-md-0">
                <ul className="list-inline mb-0">
                  <li className="me-3 list-inline-item"> <NavLink className="list-group-item-action" to='/tos'>
                    Term Of Service
                  </NavLink>
                  </li>
                  <li className="me-3 list-inline-item"> <NavLink className="list-group-item-action" to='/privacy'>
                    Privacy Policy
                  </NavLink>
                  </li>
                  <li className="list-inline-item"> <NavLink className="list-group-item-action" to='/support'>
                    Support
                  </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        </Router>
    </React.Fragment>
  )
}
export default Main;
