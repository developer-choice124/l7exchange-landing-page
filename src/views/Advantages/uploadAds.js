import React from "react";
//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify, warning, ErrorNotis } from '../../components/Toast/ToastNotify';
import { Button } from "reactstrap";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { BackendApi } from "config/config";

const AdsUpload = () => {

  document.title = "Banner";

  const [preview, setPreview] = React.useState();
  const toggleClass = () => {
    document.getElementById("pre-imaage").classList.toggle("d-none")
  }

  const [ads_title, setTitle] = React.useState();
  const [ads_desc, setDesc] = React.useState();
  const [ads_banner, setBanner] = React.useState();

  const NameOnChange = (event) => {
    setTitle(event.target.value);
  }

  const LinkOnChange = (event) => {
    setDesc(event.target.value);
  }

  const fileOnChange = (event) => {
    if (event.target.files[0].size < 500000) {
      setBanner(event.target.files[0]);
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      setPreview(objectUrl);
      toggleClass();
    } else {
      warning('Ads Iamge is too big only 1mb allow!');
    }
  }

  // api call for send banner image title links
  const formHandler = (event) => {
    event.preventDefault();
    if (adsData.length === 3) {
      warning('It is Only allow 3 ads!');
    } else {
      const url = `${BackendApi}/ads`;
      const type = "ads";
      const formData = new FormData();
      formData.append('ads_title', ads_title);
      formData.append('ads_desc', ads_desc);
      formData.append('ads_banner', ads_banner);
      formData.append('type', type);
      fetch(url, {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      }).then(response => {
        notify('Banner is Successfully  Upload');
        clearField();
        return response
      }).catch(err => {
        ErrorNotis('Somthing Wrong!')
        return err;
      })
    }
  }

  const clearField = () => {
    document.getElementById('file').value = "";
    document.getElementById('text-link').value = "";
    document.getElementById('text-title').value = "";
  }

  // api call for fetch the data for banner list
  const url = `${BackendApi}/adslist`;
  const [adsData, setAdsdata] = React.useState([]);
  const getdata = async () => {
    const response = await fetch(url);
    const ads = await response.json();
    setAdsdata(ads.data)
  }
  React.useEffect(() => {
    getdata();
  }, [url]);

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    const r = confirm("Are you sure to delete the adds?");
    if (r == true) {
      const url = `${BackendApi}/deleteads/${id}`;
      await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        // //body: JSON.stringify({ id })
      }).then(result => {
        getdata();
        notify("Delete Successfully!");
        return result;
      }).catch(error => {
        return error;
      })
    } else {
      getdata();
      ErrorNotis("Ok!");
    }
  }
  return (
    <>
      <div className="container">
        <div className="container card-dash banner-card m-1" id="banner-add">
          <h2 className="banner-title">Advantages</h2>
          <form className="m-3" onSubmit={formHandler}>
            <div className="my-2">
              <label className="text-dark">Ads Title<span className="text-danger">*</span></label>
              <input type="text" className="form-control" id="text-title" onChange={NameOnChange} required />
            </div>
            <div className="my-2">
              <label className="text-dark">Ads Description</label>
              <input type="text" className="form-control" placeholder="Optional" id="text-link" onChange={LinkOnChange} />
            </div>
            <div className="my-2">
              <label className="text-dark">Image<span className="text-danger">*</span></label>
              <input type="file" className="form-control" id="file" name="ads_banner" accept=".jpg,.jpeg,.png" onChange={fileOnChange} required />
            </div>
            <button className="btn btn-outline-info mx-1">Save</button>
            <img id="pre-imaage" className="d-none preiview-banner" src={preview} />
          </form>
        </div>
      </div>
      <>
        <div className="container">
          <div className="container card-dash banner-card m-1" id="banner-add">
            <h2 className="banner-title">Advantages List</h2>
            <table className="table table-striped table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ads Title</th>
                  <th>Description</th>
                  <th>Ads Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {adsData.length > 0 && adsData.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{++index}</th>
                    <td>{data.ads_title}</td>
                    <td>{data.ads_desc}</td>
                    <td><img className="tb-banner" src={data.image} /></td>
                    <td><Button className="banner-delete btn-outline-danger btn-sm" onClick={(e) => deleteHandler(e, data._id)}><DeleteForeverIcon /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </>
    </>
  )
}

export default AdsUpload;