
import AuthContext from "./AuthContext";

import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Alert from "../../Component/Alert";
import Spinner from "../../Component/Spinner";

export default function AuthState(props) {
  
  const [progress, setprogress] = useState(0);
  const setloading=(progress)=>{
    setprogress(progress);
  }
  const loading = progress
    const initial =[]
    const [Data, setData]=useState(initial)
    const [allusers, setallusers]=useState([])
    const host ="http://localhost:5000"
    const[alert, setalert]=useState(null);
  
    const showalert=(msg,type)=>{
      setalert({
        message : msg,
        type : type
      })
      setTimeout(()=>{
        setalert(null);
      },1500);
    }

    //Create User
    const createUser =async(firstname, lastname, role, address, email, password)=>{
      //TODO API Call
      try {
      setloading(30)
      const response = await fetch(`${host}/api/auth/createUser`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"firstname" :firstname,"lastname" :lastname,"role" :role,"address" :address, "email" :email, "password" : password}) 
      });
      setloading(70)
      const json = await response.json();
      setData(json)

    } catch (error) {

      console.error(error.message);
    }
    setloading(110)
 }


     //Login User
     const loginUser =async( email, password)=>{
      //TODO API Call
      try {
      setloading(30)
      const response = await fetch(`${host}/api/auth/loginUser`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"email" :email, "password" : password}) 
      });
      setloading(70)
      const json = await response.json();
      setData(json)
  
      setloading(110)

    } catch (error) {
      
      console.error(error.message);
    }
    }


     //get all data
     const getalldata =async()=>{
      try {
      setloading(30)
      const response = await fetch(`${host}/api/auth/getalldata`, {
        method: 'GET', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem('token')
        },
      });
      setloading(70)
      const json = await response.json();
      setallusers(json)
      console.log(allusers)
      setloading(110)
    }
    catch (error) {
      showalert("failed to fetch data","danger" )
      console.error(error.message);
    }
     }

        //delete user
    const deleteuser =async(id)=>{
      setloading(30)
          const response = await fetch(`${host}/api/auth/deleteuser/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              "auth-token" : localStorage.getItem('token')
            },
          });
          console.log("deleting user with id "+ id);
          const json= await response.json(); // parses JSON response into native JavaScript objects
          // setNotes(json.notes)
          //return all those whose id is not equals to the passed id (in short deleteing the selected array)
          const newallusers = allusers.filter((user)=>{return user._id!==id}) 
          setallusers(newallusers)
          setloading(110)
        
        }
    
    
    
        //Edit Node
        const edituser =async (id,firstname, lastname, role, address, email)=>{
          setloading(30)
            const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
              method: 'PUT', 
              mode: 'cors', 
              headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token')
              },
              body: JSON.stringify({"firstname" :firstname,"lastname" :lastname,"role" :role,"address" :address, "email" :email}) 
            });
            setloading(70)
            const json = await response.json(); 
    
            let newUser = JSON.parse(JSON.stringify(allusers))
          
    
          for(let index=0;index<allusers.length;index++){
            const element = newUser[index];
            if(element._id===id){
              allusers[index].firstname=firstname;
              allusers[index].lastname=lastname;
              allusers[index].role=role;
              allusers[index].address=address;
              allusers[index].email=email;
            } 
        }
        setloading(110)
    
      }


  return (
    <AuthContext.Provider value={{createUser, Data, loginUser, showalert, alert,getalldata,allusers,deleteuser,edituser,progress }}>
      <LoadingBar color={"rgb(0, 255, 226)"} progress={progress} height={3}
    onLoaderFinished={() => setloading(0)} />
        {props.children}
    </AuthContext.Provider>

  )
}
