import React from "react";
import { Button } from "reactstrap";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { BackendApi } from "config/config";
//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify, ErrorNotis} from "components/Toast/ToastNotify";
const ListAds = () => {

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
        const url = `${BackendApi}/deleteads/:${id}`;
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
    } else{
        getdata();
        ErrorNotis("Ok!");
    }
}
  
  return (
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
      <ToastContainer/>
      </>
  )
}

export default ListAds;