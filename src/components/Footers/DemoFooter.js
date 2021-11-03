
/*eslint-disable*/
import React from "react";

// reactstrap components
// import { Row, Container } from "reactstrap";
import { CLink } from "@coreui/react";
function DemoFooter() {
  return (
    <>
      <div className="m-0 p-0 bg-dark">
        <footer className="">
          <ul className="nav justify-content-center pb-3 mb-3">
          <li className="nav-item"><a href="#" className="nav-link px-4 text-muted">blogs</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-4 text-muted">LICENCES</a></li>
          <li className="nav-item"><CLink className="nav-link px-4 text-muted"
                    to="/privacy"
                  >
                    Privacy Policy
                  </CLink></li>
      </ul>
      <p className="text-center text-muted"><span className="copyright">
                © {new Date().getFullYear()}, made
                by L7 Exchange
              </span></p>
      </footer> 
    </div>       
    </>
  );
}

export default DemoFooter;
