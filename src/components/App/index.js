import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from '../Header';
import Landing from '../Landing';
import '../../App.css';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';
import { IconContext } from 'react-icons'

function App() {
  return (
    <Router>
      <IconContext.Provider value={{style: {verticalAlign: 'middle'}}}>
      
      
        <Header />

        <Routes>
          <Route exact path='/' Component={Landing} />
          <Route path='/welcome' Component={Welcome} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={Signup} />
          <Route path='/forgetpassword' Component={ForgetPassword}/>
          <Route path="*" Component={ErrorPage} />
        </Routes>
        
        

        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
