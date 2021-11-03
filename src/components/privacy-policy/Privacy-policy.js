import React from "react";
import IndexNavbar from "../Navbars/IndexNavbar";
import DemoFooter from "../Footers/DemoFooter";
import { BackendApi } from "config/config";


const Privacy = () => {

    const url = `${BackendApi}/policydata`;
    const [ppData, setPpData] = React.useState([]);
    const getdata = async () => {
        const response = await fetch(url);
        const Pp = await response.json();
        setPpData(Pp.data)
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
    return (
        <>
            <IndexNavbar />
            <div className="container">                
                
                <h1 className="privacy-heading">Privacy Policy</h1>
                <div id="privacy-policy"></div>
            </div>
                <DemoFooter />
        </>
    )
}

export default Privacy;