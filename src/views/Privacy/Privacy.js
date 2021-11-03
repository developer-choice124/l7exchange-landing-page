import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BackendApi } from "config/config";
//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify, ErrorNotis} from "components/Toast/ToastNotify";
const Privacy = () => {
  document.title = "Privacy Policy";

  const [polcisypolicy, setData] = React.useState();
  const editorHandler = (evt) => {
    setData(evt);
  }

  const formHandler = async (evt)=> {
    evt.preventDefault();
    const type = "privacy-policy";
    const url = `${BackendApi}/privacypolicy`;
    await fetch(url,{
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
      body: JSON.stringify({polcisypolicy,type})
    }).then(result=> {
      notify("Privacy Policy is updated!");
      return result;
    })
    .catch(error=> {
      ErrorNotis("Unauthorized!");
      return error;
    })
  }
  
  const url = `${BackendApi}/policydata`;
  const [ppData, setPpData] = React.useState([]);
  const getdata = async () => {
      const response = await fetch(url);
      const Pp = await response.json();
      setPpData(Pp.data);
  }
  React.useEffect(() => {
      getdata();
  }, [url]);
  
  const creatHtml = () => {
      ppData.map(pp => {
          const privacypolicy = document.getElementById("privacy-policy");
          let newDiv = document.createElement("div");
          newDiv.innerHTML = pp.polcisypolicy;
          privacypolicy.appendChild(newDiv);
          console.log(pp.polcisypolicy);
      })
  }
  creatHtml();
  return(
    <>
      <div className="card-dash banner-card p-3">
        <h6 className="banner-title">Privacy Policy</h6>
        <form onSubmit={formHandler}>
          <Editor
              onEditorChange={editorHandler}
          />
          <button className="btn btn-sm btn-success m-2">Save</button>
        </form>
      </div>
      <ToastContainer />
      <div className="card-dash banner-card mt-1 p-2">
      <h1 className="text-center">Privacy Policy</h1>
      <div id="privacy-policy"></div>
      </div>
    </>
  )
}

export default Privacy;