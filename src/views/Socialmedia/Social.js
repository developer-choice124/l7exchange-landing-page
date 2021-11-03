import React from "react";
import { BackendApi } from "config/config";
//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify, warning, ErrorNotis } from "components/Toast/ToastNotify";
import { Button } from "reactstrap";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import noImg from "../../assets/img/images-min.png";
const Social = () => {

  const [preview, setPreview] = React.useState();
  const [mediaName, setSocialName] = React.useState();
  const [linkWeb, setSocialLink] = React.useState();
  const [Icon, setSocialIcon] = React.useState();

  const toggleClass = () => {
    document.getElementById("icon-social").classList.toggle("d-none")
  }

  const nameInputHandler = (event) => {
    setSocialName(event.target.value);
  }

  const linkInputHandler = (event) => {
    setSocialLink(event.target.value);
  }

  const iconHandler = (event) => {
    if (event.target.files[0].size < 10000) {
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      setPreview(objectUrl);
      toggleClass();
      if (event.target.files[0].type == "image/png") {
        setSocialIcon(event.target.files[0]);
      } else {
        warning("It's only allow image type is png!");
      }
    } else {
      warning("It's only allow maximum size 10kb image!");
    }
  }

  const formHandler = (event) => {
    if (socialData.length === 6) {
      warning("Only 6 midea link is allow!");
    } else {
      event.preventDefault();
      const type = "social-media";
      const formData = new FormData();
      formData.append("mediaName", mediaName);
      formData.append("link", linkWeb);
      formData.append("Icon", Icon);
      formData.append("type", type);
      const url = `${BackendApi}/socialmedia`;
      fetch(url, {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      }).then((result) => {
        notify("Social Media icon links successfully added!");
        clearField();
        getdata();
        return result;
      })
        .catch(err => {
          ErrorNotis("Somthing wrong!");
          return err;
        })
    }
  }

  const url = `${BackendApi}/media`;
  const [socialData, setSocialdata] = React.useState([]);
  document.title = "User Enquiry";
  const getdata = async () => {
    const response = await fetch(url, {
      method: "GET",
      headersData: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const social = await response.json();
    setSocialdata(social.data)
  }
  React.useEffect(() => {
    getdata();
  }, [url]);

  const clearField = () => {
    document.getElementById('file').value = "";
    document.getElementById('text-link').value = "";
    document.getElementById('text-name').value = "";
  }

  const deleteHander = async (e, id) => {
    e.preventDefault();
    // console.log(id)
    const r = confirm("you want delete this record?");
    if (r == true) {
      const url = `${BackendApi}/deletesocial/${id}`;
      await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        // body: JSON.stringify({ id })
      }).then(result => {
        notify("Social Media icon links successfully deleted!");
        getdata();
        return result;
      }).catch(error => {
        return error;
      })
    } else {
      ErrorNotis("Unauthorized!");
      getdata();
    }
  }

  return (
    <>
      <div className="d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
        <div className="col-12 col-sm-12 col-md-5 col-xl-5 card-dash banner-card m-1">
          <div className="card-body">
            <h6>Social Media Links</h6>
            <form className="m-3" onSubmit={formHandler}>
              <label>Name&nbsp;<span className="text-danger">*</span></label>
              <input type="text" className="form-control form-input" id="text-name" onChange={nameInputHandler} required />
              <label>Social Media Link&nbsp;<span className="text-danger">*</span></label>
              <input type="text" className="form-control form-input" id="text-link" onChange={linkInputHandler} required />
              <label>Upload Icon&nbsp;<span className="text-danger">*</span></label> <span className="text-danger">Icon size 25X25 file size 10kb</span>
              <input type="file" className="form-control form-input mb-2" id="file" onChange={iconHandler} accept=".png" required />
              <button className="btn btn-success button-sm">Upload</button> <img src={preview} id="icon-social" className="icon-Preview d-none" />
            </form>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-7 col-xl-7 mx-1 p-0 card-dash banner-card m-1">
          <div className="card-body">
            <h6>Social Media</h6>
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Social Media</th>
                  <th>Links</th>
                  <th>Icon</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {socialData.length > 0 && socialData.map((data, index) => (
                  <tr key={index}>
                    <td scope="row">{++index}</td>
                    <td>{data.mediaName}</td>
                    <td>{data.link}</td>
                    <td><img src={data.image ? data.image : noImg} className="icon-Preview" /></td>
                    <td><Button className="banner-delete btn-outline-danger btn-sm" onClick={(e) => deleteHander(e, data._id)}><DeleteForeverIcon /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Social;