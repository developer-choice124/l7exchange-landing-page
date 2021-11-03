import React, { useEffect } from "react";
import { Button } from "reactstrap";
import { BackendApi } from "config/config";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckIcon from '@material-ui/icons/Check';
//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify, ErrorNotis} from "components/Toast/ToastNotify";

export default function TableList() {

  document.title = "User Enquiry";
  const url = `${BackendApi}/userdata`;
  const [userdata, setUserdata] = React.useState([]);
  const getdata = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setUserdata(data.data);
  }
  useEffect(() => {
    getdata();
  }, [url]);

  const remarkHander = async (event, Id) => {
    event.preventDefault();
    const url = `${BackendApi}/useredit`;
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
      body: JSON.stringify({ status, id: Id })
    }).then(result => { 
      getdata();
      notify("Remark Successfully added!");
      return result; 
    })
      .catch(error => { 
        ErrorNotis("Somthing wrong!");
        return error; 
      })
  }
  const deleteHander = (event, id) => {
    event.preventDefault();
    const r = confirm("you want delete this record?");
    if (r == true) {
      //delete function
      fetchdata(id);
    } else {
      getdata();
    }
  }
  //delete function
  const fetchdata = async (id) => {
    const url = `${BackendApi}/userdelete`;
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
      body: JSON.stringify({ id })
    }).then(result => {
      notify("User Data Successfully Deleted!");
      getdata();
      return result;
    }).catch(error => {
      ErrorNotis("Unauthorized!");
      return error;
    })
  }
  const [status, setRemark] = React.useState();
  const inputHandler = (event) => {
    setRemark(event.target.value);
  }
  return (
    <>
      <div className="card-dash p-3">
        <h1 className="banner-title">User Enquiry</h1>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>First</th>
              <th>Mobile no.</th>
              <th>Message</th>
              <th>Remark</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userdata.length > 0 && userdata.map((user, index) => (
              <tr key={index}>
                <td scope="row">{++index}</td>
                <td>{user.username}</td>
                <td>{user.mobileno}</td>
                <td>{user.message ? user.message : "No Message"}</td>
                {user.status ? <td>{user.status}</td> 
                 : <td><input type="text" className="Enquiry_input" onChange={inputHandler} /><Button className="banner-delete btn-outline-success btn-sm" onClick={(e) => remarkHander(e, user._id)}><CheckIcon /></Button></td>
                }
                
                <td><Button className="banner-delete btn-outline-danger btn-sm" onClick={(e) => deleteHander(e, user._id)}><DeleteForeverIcon /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </>
  );
}
