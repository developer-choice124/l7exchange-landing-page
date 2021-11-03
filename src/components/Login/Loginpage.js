import React, { useState } from "react";

//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorNotis } from "components/Toast/ToastNotify";
import { Redirect } from "react-router-dom";
// api call
import { BackendApi } from "../../config/config";
import ExamplesNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/DemoFooter.js";
import logBack from '../../assets/img/login-image.jpg';
import { CLink } from "@coreui/react";
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";


const Loginpage = () => {
  document.title = "Login";
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  const [username, setuser] = useState('');
  const [password, setPassword] = useState('');
  const [pageLive, setPageLive] = useState("/betting_log");
  const [page, setPage] = useState(false);

  const EmailHandler = event => {
    setuser(event.target.value);
  }

  const passwordHandler = event => {
    setPassword(event.target.value);
  }
  const handleSubmit = async () => {
    const url = `${BackendApi}/login`;
    const requestOption = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
    await fetch(url, requestOption)
      .then(response => {
        const data = response.json();
        if(response.status === 200){
          setPageLive("/admin");
        } else {
          setPage(false);
          ErrorNotis("invalid Password (Unauthorized!)");
        }
        return data;
      }).then(data => {        
        localStorage.setItem('token', data.data.token);
        if(data.length !== 0) setPage(true);
      })
      .catch(error => {
        setPage(false);
        return error;
      });
  }
  if (page) {
    return (
      <Redirect to={pageLive} />
    )
  }
      return (
        <> 
          <ExamplesNavbar />
          <div
            className="page-header"
            style={{
              backgroundImage:
                `url(${logBack})`,
            }}
          >
            <Container>
              <Row>
                <Col className="offset-sm-8 mr-auto" lg="4">
                  <Card className="card-register ml-auto mr-auto card-back">
                    <h3 className="title mx-auto log-title">Login</h3>
                    <Form className="register-form" mathod="POST" onSubmit={handleSubmit}>
                      <label className="reg-color">Your Email&nbsp;<span className="text-danger">*</span></label>
                      <Input placeholder="Email" type="text" onChange={EmailHandler} required />
                      <label className="reg-color">Password</label>
                      <Input placeholder="Password" type="password" onChange={passwordHandler} required />
                      <Button block className="btn-reg w-100">
                        Login
                      </Button>
                    </Form>
                    <div className="forgot mt-2">
                      <CLink
                        className="btn-link text-warning"
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
          <Footer />
          <ToastContainer />
        </>
      );
    
}

export default Loginpage;