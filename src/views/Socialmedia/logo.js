import React from "react";
import { BackendApi } from "config/config";
//notification
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify, warning, ErrorNotis} from "components/Toast/ToastNotify";
const LogoUpload = () => {
  document.title = "Setting";

  // const [logofile, setLogo] = React.useState();
  const [preview, setPreview] = React.useState();
  const [newLogo, setNewLogo] = React.useState();
  const toggleClass = () => {
    document.getElementById("logo").classList.toggle("d-none");
  }

  const fileHandler = (event) => {
    // setLogo(event.target.files[0]);
    console.log(event.target.files[0].type);
    if (event.target.files[0].size < 1000000) {
      if(event.target.files[0].type == "image/png"){
      setNewLogo(event.target.files[0]);
      } else {
        warning("It's only allow image type is png!");
      }
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      setPreview(objectUrl);
      toggleClass();
    } else {
      warning("It's only allow maximum size 1mb image!");
    }
  }

  // const logoHandler = (event) => {
  //   const type = "logo";
  //   event.preventDefault();
  //     const formData = new FormData();
  // document.getElementById("file").value = "";
  //     formData.append('logoImage', logofile);
  //     formData.append('type', type);
  //     const url = `${BackendApi}/uploadlogo`;
  //     fetch(url,{
  //       method: "post",
  //        headers: {
        //     authorization: `Bearer ${localStorage.getItem('token')}`
        // },
  //       body: formData
  //     }).then((result) => {
  //       notify("Logo Successfully added!");
  //       return result;
  //     }).catch((error) => {
  //       ErrorNotis("Somthing wrong!");
  //       return error;
  //     })
  // }
  
  // api call for fetch the data for banner list
  const url = `${BackendApi}/setting/logo`;
  const [logoData, setlogodata] = React.useState([]);
  const getdata = async () => {
    const response = await fetch(url);
    const logo = await response.json();
    setlogodata(logo.data[0]);
    return true;
  }
  React.useEffect(() => {
    getdata();
  }, [url]);
  const UpdateHandler = (event, id) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('logoImage', newLogo);
    // formData.append('id', id);
    const url = `${BackendApi}/logoupdate/${id}`;
    fetch(url, {
      method: "post",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
      body: formData
    }).then((result) => {
      notify("Logo is successfully updated!");
      getdata();
      toggleClass();
      return result;
    }).catch((error) => {
      ErrorNotis("Unauthorized!");
      return error;
    })
  }
  return (
    <>
      <div className="d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
        <div className="col-12 col-sm-12 col-md-5 col-xl-5 card-dash banner-card m-1">
          <div className="card-body">
            <h6 className="">Add Logo</h6>
            <form className="m-3" onSubmit={e => UpdateHandler(e, logoData._id)}>
              <label>
                Upload Logo
              </label>
              <input type="file" className="form-control mb-2 form-input" id="file" onChange={fileHandler} accept=".png" required/>
              <button className="btn btn-info button-sm">Upload</button> <img src={preview} id="logo" className="Logo-Preview d-none" />
            </form>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-7 col-xl-7 mx-1 p-0 card-dash banner-card m-1">
          <div className="card-body">
            <h6>Logos</h6>
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                </tr>
              </thead>
              <tbody>
                <tr key={1}>
                  <th scope="row">{1}</th>
                  <td><img src={logoData?logoData.image : null} className="Logo-Preview" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default LogoUpload;