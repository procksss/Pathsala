
import {  Link, useLocation } from "react-router-dom";
import React from 'react';
import Signup from "./Signup";
import { useContext,useState, useRef } from 'react';
import AuthContext from "../context/auths/AuthContext";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
export default function Navbar () {
  let navigate = useNavigate();
  let location = useLocation();
  const refclose = useRef(null);
  const context = useContext(AuthContext);
  const { createUser, Data} = context;
  const initial =[]
  const [Username, setUsername]=useState(initial)
  const [Email, setEmail]=useState(initial)
  const [data, setdata] = useState({firstname : "",lastname :"",role:"",address:"", email:"", password: ""});
  const handleclick =(e)=>{
   e.preventDefault();
    createUser(data.firstname,data.lastname,data.role,data.address,data.email,data.password);
    console.log(Data)
    if(Data.success){
      refclose.current.click();
      navigate('/login')
      swal("Good job!", "You are successfully Signed Up!", "success");
      
      }
      else{
        swal("sorry!", "Email id already exists or role not filled", "error");
      }
    
  };
  const handlelogout =(e)=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  const onchange =(e)=>{
    setdata({ ...data, [e.target.name]: e.target.value });
  };
 
    return (
      <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/">Pathsala</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}` } aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}` } aria-current="page" to="/about">About</Link>
        </li>
      </ul>

      {!localStorage.getItem('token')?<div><Link className="btn btn-info mx-1" to="/login" role="button">Login</Link>
      {/* <Link className="btn btn-info mx-1" to="/signup" role="button" data-bs-toggle="modal">Sign up</Link> */}
     
<button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
  SignUp
</button></div>:<div><button type="button" className="btn btn-info" onClick={handlelogout}>
  logout
</button></div>}


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
      <div className="display-6 text-center my-1"><strong>Path</strong>sala SignUp</div>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refclose}></button>
      </div>
      <div className="modal-body">
      
      <form className="container row g-3 needs-validation" onSubmit={handleclick} >
  <div className="col-md-4">
    <label htmlFor="validationCustom01" className="form-label">First name</label>
    <input type="text" className="form-control" id="validationCustom01" name="firstname" value={data.firstname} onChange={onchange} required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Last name</label>
    <input type="text" className="form-control" id="validationCustom02"  required name="lastname" value={data.lastname} onChange={onchange}/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className=" mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-md-8">
      <input  type="email" className="form-control" id="inputEmail3" name="email"  value={data.email} onChange={onchange} required/>
    </div>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-md-8">
      <input type="password" className="form-control" id="inputPassword3" minLength="5"  name="password" value={data.password} onChange={onchange}required/>
      <div id="inputPassword3" className="form-text">Password must be of 5 character</div>
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom03" className="form-label">Address</label>
    <input type="text" className="form-control" id="validationCustom03"  name="address" value={data.address} onChange={onchange}required/>
    <div className="invalid-feedback">
      Please provide a valid address.
    </div>
  </div>
  <div className="col-md-4">
  <label htmlFor="validationCustom02" className="form-label">Select your role</label>
  <select className="form-select" aria-label="Default select example" name="role" value={data.role} onChange={onchange} required>
  <option selected >Select your role</option>
  <option value="student">student</option>
  <option value="teacher">teacher</option>
  </select>
  </div>
  <div className="col-12">
    <button className="btn btn-primary" type="submit">Sign Up</button>
  </div>
</form>
      </div>
    </div>
  </div>
</div>
     </div>
        </div>
    </nav>
      </>
    )
}

