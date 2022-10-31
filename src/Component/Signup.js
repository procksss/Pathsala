import React from 'react'
import { useContext,useState, useRef } from 'react';
import AuthContext from "../context/auths/AuthContext";
import swal from 'sweetalert';

import { useNavigate } from "react-router-dom";

export default function Signup() {
 
  let navigate = useNavigate();
  const refclose = useRef(null);
  const context = useContext(AuthContext);
  const { createUser, Data} = context;
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
  const onchange =(e)=>{
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>

      <div className="display-6 text-center my-1"><strong>Path</strong>sala SignUp</div>
      <form className="container row g-3 needs-validation my-5" onSubmit={handleclick} style={{ "border-radius": "30px", "backgroundColor" : "#DDDD"}}  >
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
  <option defaultValue >Select your role</option>
  <option value="student">student</option>
  <option value="teacher">teacher</option>
  </select>
  </div>
  <div className="col-12">
    <button className="btn btn-primary my-2" type="submit">Sign Up</button>
  </div>
  
</form>

   
   


    </>
  )
}
