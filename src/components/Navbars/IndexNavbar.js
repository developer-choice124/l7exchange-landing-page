
import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// api call
import { BackendApi } from "config/config";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import { CLink } from "@coreui/react";
import logo from "../../assets/img/main/l7exchange.png";
import noImg from "../../assets/img/images-min.png";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  // const [isimage, setImage] = React.useState(false);
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  // api call of social links
  const urlSocial = `${BackendApi}/media`;
  const [socialData, setSocialdata] = React.useState([]);
  const getdata = async () => {
    const response = await fetch(urlSocial);
    const social = await response.json();
    setSocialdata(social.data)
  }
  React.useEffect(() => {
    getdata();
  }, [urlSocial]);
 
  // api call for fetch the data for logo
  const urlLogo = `${BackendApi}/setting/logo`;
  const [logoData, setlogodata] = React.useState([]);
  React.useEffect(() => {
    getdata();
    async function getdata() {
      const response = await fetch(urlLogo);
      const logo = await response.json();
      if (response.status === 201 || response.status === 200) {
        // setImage(true);
        setlogodata(logo.data[0])
      }
    }
  }, [])
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 9 ||
        document.body.scrollTop > 9
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 10 ||
        document.body.scrollTop < 10
      ) {
        setNavbarColor("");
      }
    };
    // setNavbarColor("navbar-transparent");

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top pt-0", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate w-20">
          <NavbarBrand className="p-0 m-0 pb-2"
            data-placement="bottom"
            href="/"
            title="L7 Exchange"
          >

            
            <img src={logoData ? logoData.image : logo} className="logo-size" alt="l7 Exchange" />
          </NavbarBrand>
          
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end  w-50"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            {socialData.length > 0 && socialData.map((data, index) => (
              <NavItem key={index}>
                <NavLink
                  data-placement="bottom"
                  href={data.linkWeb}
                  target="_blank"
                  title={`Follow us on ${data.mediaName}`}
                >
                
                  <img className="nav-social-link" src={data ? data.image : noImg} alt={data.mediaName} />
                  <p className="d-lg-none">&nbsp;{data.mediaName}</p>
                </NavLink>
              </NavItem>
            ))}
            <NavItem>
              <CLink className="nav-link text-dark"
                  id="join-link"
                to="/betting_id"
              >
                Join Us
              </CLink>
            </NavItem>
            <NavItem>
              <CLink
                className="nav-link  text-dark"
                to="/betting_log"
              >
                <i className="fa fa-sign-in"></i>
                <p className="d-lg-none">Login</p>
              </CLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
