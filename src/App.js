import React, { useState } from 'react'
import './App.css';
import Navbar from './Component/Navbar.js';
import About from './Component/About';
import Home from './Component/Home';
import Alert from './Component/Alert';
import Login from './Component/Login';
import Signup from './Component/Signup';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import AuthState from './context/auths/AuthState';
import Footer from './Component/Footer';



function App() {
  const [progress, setprogress] = useState(0);
  const setloading=(progress)=>{
    setprogress(progress);
  }


  return (
    <>
    
    <AuthState>
     <Router>
      <Navbar setprogress={setprogress}/>
      <Alert/>
      {/* <LoadingBar color={"rgb(0, 255, 226)"} progress={progress} onLoaderFinished={() => setloading(0)} height={3}/> */}
      <div className="container">
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/about" element={<About progress={setloading} onLoaderFinished={() => setloading(0)}/>} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup/>} />
      </Routes>
      </div>
      <Footer></Footer>
    </Router>
    </AuthState>

    </>
  );
}

export default App;
