
import React, { useState } from "react";
//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify, ErrorNotis} from "components/Toast/ToastNotify";
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
// import { Redirect } from "react-router-dom";
// core components
import ExamplesNavbar from "components/Navbars/IndexNavbar.js";
import DemoFooter from "components/Footers/DemoFooter";
// api call
import { BackendApi } from "../../config/config.js";
import { CLink } from "@coreui/react";
import regBack from '../../assets/img/login-image.jpg';

function RegisterPage() {
  document.title = "Join Us";

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const [username, setUserName] = useState();
  const [mobileno, setMobileno] = useState();
  const [message, setMessage] = useState();

  const handleName = (event) => {
    setUserName(event.target.value);
  }
  const handleNum = (event) => {
    setMobileno(event.target.value);
  }
  const handleMsg = (event) => {
    setMessage(event.target.value);
  }

  const formHandler = (event) => {
    event.preventDefault();
    document.getElementById("join-name").value = "";
    document.getElementById("join-num").value = "";
    document.getElementById("join-msg").value = "";
    const role = "user";
    const url = `${BackendApi}/registerUser`;
    const requestOption = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, mobileno, message, role })
    };
    fetch(url, requestOption)
      .then(response => {
        const data = response.json();
        notify("Registration is successful!");
        return data;
      }).catch(error => {
        ErrorNotis("Field all the inputs!");
        return error;
      });
  }

  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage:
            `url(${regBack})`,
        }}
      >
        <div className="filter" />
        <Container>
          <Row classNmae="d-flex">

            <Col className="offset-sm-8 mr-auto " lg="5">
              <Card className="card-register ml-auto mr-auto card-back">
                <h3 className="title mx-auto log-title">CONTACT US FOR NEW ID</h3>
                {/* <p className="mx-auto">We are available 24/7 for your assistance.If you want a new Betting ID, Just mention your basic details asked bellow. In order to proceed this form,You just have to scroll “SELECT AN EXCHANGE”to select the suitable exchange in which you want a new ID.</p> */}
                <Form className="register-form" onSubmit={formHandler}>
                  <label className="reg-color">Your Name (required)</label>
                  <Input placeholder="Your Name" onChange={handleName} type="text" id="join-name" required />
                  <label className="reg-color">Your Number (required)</label>
                  <Input placeholder="Your Number" onChange={handleNum} type="tel" id="join-num" required />
                  <label className="reg-color">Your Message</label>
                  <Input placeholder="Your Message" onChange={handleMsg} type="textarea" id="join-msg" />
                  <Button block className="btn-reg w-100">
                    Join Us
                  </Button>
                </Form>
                <div className="forgot mt-2">
                  <CLink
                    className="btn-link text-warning m-2"
                    to="/"
                  >
                    Go Back
                  </CLink>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
      <ToastContainer />
    </>
  );
}

export default RegisterPage;
