import React from "react";
import { BackendApi } from "config/config";


function AdsSection() {

  // api call for fetch the data for banner list
  const url = `${BackendApi}/adslist`;
  const [adsData, setAdsdata] = React.useState([]);
  React.useEffect(() => {
    getdata();
    async function getdata() {
      const response = await fetch(url);
      const ads = await response.json();
      setAdsdata(ads.data)
    }
  }, [])

  return (
    <>
      <div className="container">
        <div className="row align-items-start m-5">
          {adsData.length > 0 && adsData.map((data, index) => (
            <div className="col-12 col-sm-12 col-md-4 col-xl-4" key={index}>
              <div className="card card-add" >
                <img src={data.image} className="card-img-top" alt="adds" />
                <div className="card-body">
                  <h5 className="card-title">{data.ads_title}</h5>
                  <p className="card-text">{data.ads_desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
    </>
  );
}

export default AdsSection;
