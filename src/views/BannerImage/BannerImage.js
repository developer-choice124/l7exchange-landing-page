import React from "react";
import { Button } from "reactstrap";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify, warning, ErrorNotis } from "components/Toast/ToastNotify";
// api call
import { BackendApi } from "config/config";

export default function BannerImage() {
  document.title = "Banner";

  const [fileImg, setFileImg] = React.useState();
  const [preview, setPreview] = React.useState();
  const toggleClass = () => {
    document.getElementById("pre-imaage").classList.toggle("d-none");
  }
  const fileOnChange = (event) => {
    if (event.target.files[0].size < 1000000) {
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      setPreview(objectUrl);
      toggleClass();
      if (event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/jpeg") {
        setFileImg(event.target.files[0]);
      } else {
        warning("It's only allow image type is jpg/jpeg!");
      }
    } else {
      warning("It's only allow maximum size 1mb image!");
    }
  }

  // api call for send banner image title links
  const formHandler = (event) => {
    if (bannerData.length === 3 || bannerData.length < 4) {
      warning("Only 3 midea link is allow!");
    } else {
      event.preventDefault();
      const url = `${BackendApi}/uploadbanner`;
      const type = "banner";
      const formData = new FormData();
      formData.append('banner', fileImg);
      formData.append('type', type);
      fetch(url, {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      }).then(response => {
        notify("successfully uploaded");
        clearField();
        getdata();
        return response
      }).catch(err => {
        ErrorNotis("Somthing Wrong!");
        return err;
      })
    }
  }

  const clearField = () => {
    document.getElementById('file').value = "";
  }


  // api call for fetch the data for banner list
  const url = `${BackendApi}/banner`;
  const [bannerData, setBannerdata] = React.useState([]);
  const getdata = async () => {
    const response = await fetch(url);
    const banner = await response.json();
    console.log(banner);
    setBannerdata(banner.data)
    return true;
  }

  React.useEffect(() => {
    getdata()
  }, [url])

  // const UpdateHandler = (event, id) => {
  //   event.preventDefault();
  //   document.getElementById("file").value = "";
  //   const formData = new FormData();
  //   formData.append('banner', fileImg);
  //   formData.append('id', id);
  //   const url = `${BackendApi}/bannerupdate`;
  //   fetch(url, {
  //     method: "post",
  //   headers: {
  //     authorization: `Bearer ${localStorage.getItem('token')}`
  // },
  //     body: formData
  //   }).then((result) => {
  //     notify("Update Successfully!");
  //     getdata();
  //     clearField();
  //     toggleClass();
  //     return result;
  //   }).catch((error) => {
  //     ErrorNotis("Somthing Wrong!");
  //     return error;
  //   })
  // }

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    console.log(id)
    const r = confirm("you want delete this record?");
    if (r == true) {
      const url = `${BackendApi}/bannerdelete/${id}`;
      await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        // body: JSON.stringify({ id })
      }).then(result => {
        getdata();
        notify("Delete Successfully!");
        return result;
      }).catch(error => {
        return error;
      })
    } else {
      getdata();
      ErrorNotis("Somthing Wrong!");
    }
  }
  return (
    <>
      <div className="col-sm-12 mx-1 card-dash banner-card m-1">
        <h2 className="banner-title">Add Banner Image</h2>
        {/* <form className="m-3" onSubmit={e => UpdateHandler(e, bannerData._id)}> */}
        <form className="m-3" onSubmit={formHandler}>
          <div className="my-2">
            <label className="text-dark">Choose File<span className="text-danger">*</span></label>
            <input type="file" className="form-control" id="file" name="banner" accept=".jpg,.jpeg,.png" onChange={fileOnChange} required />
          </div>
          <button className="btn btn-outline-info mx-1">Save</button>
          <img id="pre-imaage" className="d-none preiview-banner" src={preview} />
        </form>
      </div>
      <div className="col-sm-12 mx-1 card-dash banner-card m-1" >
        <h2 className="banner-title">Banner Image</h2>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bannerData.length > 0 && bannerData.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><img className="tb-banner" src={data.image} /></td>
                <td><Button className="banner-delete btn-outline-danger btn-sm" onClick={(e) => deleteHandler(e, data._id)}><DeleteForeverIcon /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
}
