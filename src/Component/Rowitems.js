import React from 'react'
import AuthContext from "../context/auths/AuthContext";
import { useContext } from "react";

export default function Rowitems(props) {
  const context = useContext(AuthContext);
  const {deleteuser,Data} = context;
  const role= localStorage.getItem('role')
  return (
    <>
    { role ==="admin"?
      <tr>
         
          <td>{props.data.firstname}</td>
          <td>{props.data.lastname}</td>
          <td>{props.data.email}</td>
          <td>{props.data.address}</td>
          <td style={props.data.role==="teacher"?{"color" : "red"}:[]}>{props.data.role}</td>
          <td>{props.data.date}</td>
          <td><i className="fa-solid fa-trash mx-2"  onClick={()=>{deleteuser(props.data._id)}}></i>
        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>props.update(props.data)}></i></td>
        </tr>:
        <tr>
         
        <td>{props.data.firstname}</td>
        <td>{props.data.lastname}</td>
        <td>{props.data.email}</td>
        <td>{props.data.address}</td>
        <td style={props.data.role==="teacher"?{"color" : "red"}:[]}>{props.data.role}</td>
        <td>{props.data.date}</td>
        {props.data.role==="student"?<td><i className="fa-solid fa-trash mx-2"  onClick={()=>{deleteuser(props.data._id)}}></i>
        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>props.update(props.data)}></i></td>:<td></td>}
      </tr>}
      </>
  )
}
