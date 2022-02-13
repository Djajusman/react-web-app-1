import React, { Component } from "react";
import {
  CButton,
  CFormGroup,
  CLabel,
  CCol,
  CForm,
  CInput,
  CRow,
  CImg,
  CContainer,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

export default class ComponentLogin extends Component {
  constructor(props) {
    super(props);
    this.onDismiss = this.onDismiss.bind(this);
    this.state = {
      error_login: false,
      error_message: "",
      is_logged_in: false,
      alert_login: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  getDetailUser = (token, userData) => {
    fetch("https://auth.aktiv.co.id/api/auth/v1/user/me", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Detail User=>", data);
        localStorage.setItem("puskesmasId", data.profile.puskesmasID);
        localStorage.setItem("fullName", data.first_name);
        localStorage.setItem("userid", userData.data.id);
        localStorage.setItem("volunteerLink", data.profile.volunteerLink);
        localStorage.setItem("volunteerNoHp", data.profile.noHp);
        if (userData.data.role !== "patient") {
          window.location.reload(false);
          this.props.successCallback(userData);
        } else {
          localStorage.clear();
          sessionStorage.clear();
          toast.error("Pasien Tidak Bisa Login " + data.statusmsg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  login = (e) => {
    let body = {
      username: this.state.username,
      password: this.state.password,
    };
    fetch("https://auth.aktiv.co.id/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "uWOZxPN6io8G4uoK6ZFsPzfJoOlgLpmI",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login Response", data);

        if (data.hasOwnProperty("status")) {
          if (data.status === "OK") {
            toast.success("Login Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.getDetailUser(data.data.token, data);
          } else {
            toast.error("Login Gagal " + data.statusmsg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      })
      .catch((error) => console.error(error));

    e.preventDefault();
  };

  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };

  onDismiss() {
    this.setState({
      alert: false,
    });
  }

  toggle(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    const alert_login = this.state.alert_login;
    return (
      <CContainer
        style={{
          minHeight: "100%",
          minWidth: "100%",
          position: "fixed",
          backgroundImage: "url(img/background_login.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <CRow>
          <CCol sm="5"></CCol>
          <CCol>
            <CForm>
              <div className="login-input mt-1">
                <h1>Sign In</h1>
                <CImg src="logo/line_sign.svg" className="mb-3" height={4} />
                <p className="text-muted">
                  To get in touch, please sign in with your email
                </p>
              </div>
              <CRow className="login-input-2 mt-2">
                <CCol xs="8">
                  <CFormGroup>
                    <CLabel htmlFor="company">Username</CLabel>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      id="username"
                      onChange={this.handleInputChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="login-input-2">
                <CCol xs="8">
                  <CFormGroup>
                    <CLabel htmlFor="company">Password</CLabel>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      id="password"
                      onChange={this.handleInputChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="login-input-2">
                <CCol xs="8">
                  <CButton
                    color="info"
                    className="mt-3"
                    block
                    onClick={this.login.bind(this)}
                  >
                    Masuk
                  </CButton>
                </CCol>
              </CRow>
              <CRow className="login-input-3 mt-4">
                <CCol sm="1" xs="1">
                  <CImg src="img/logo_login.svg" height={100} />
                </CCol>
                <CCol sm="1" xs="1" className="ml-5">
                  <CImg src="logo/line_logo.svg" height={120} />
                </CCol>
                <CCol sm="5" xs="5">
                  <p>
                    Isolasi tetap terpantau dengan aman meskipun di rumah saja.
                    Unduh aplikasi AKTIV di Play Store dan nikmati layanan kami
                    dari pemantauan gejala harian, konsultasi gratis dengan
                    tenaga kesehatan, Serta panduan dan informasi lengkap
                    mengenai berbagai informasi kesehatan, terutama seputar
                    COVID-19, isolasi mandiri dan vaksinasi.
                  </p>
                </CCol>
              </CRow>
              <div className="container">
                <CRow className="login-input-4">
                  <CCol sm="2" xs="2">
                    <CImg
                      src="logo/google_play.svg"
                      height={50}
                      style={{ cursor: "pointer" }}
                    />
                  </CCol>
                  <CCol sm="2" xs="2" className="mt-3">
                    <p>Join with us</p>
                  </CCol>
                  <CCol sm="2" xs="1" className="mt-3">
                    <CImg
                      style={{ cursor: "pointer" }}
                      src="logo/youtube.svg"
                      height={20}
                      onClick={() => {
                        window.location.assign(
                          " https://www.youtube.com/watch?v=6dA4RwHjmmE"
                        );
                      }}
                    />
                  </CCol>
                  <CCol sm="2" xs="1" className="mt-3 mr-2">
                    <CImg
                      style={{ cursor: "pointer" }}
                      src="logo/instagram.svg"
                      height={20}
                      onClick={() => {
                        window.location.assign(
                          "https://www.instagram.com/aktiv_id/"
                        );
                      }}
                    />
                  </CCol>
                  <CCol sm="2" xs="1" className="mt-3 mr-2">
                    <CImg
                      style={{ cursor: "pointer" }}
                      src="logo/linkedin.png"
                      height={20}
                      onClick={() => {
                        window.location.assign(
                          "https://www.linkedin.com/company/aktiv-apps/"
                        );
                      }}
                    />
                  </CCol>
                </CRow>
              </div>
            </CForm>
          </CCol>
        </CRow>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CContainer>
      // <div
      //   style={{
      //     backgroundImage: "url(img/background_login.svg)",
      //     backgroundRepeat: "no-repeat",
      //     backgroundSize: "cover",
      //   }}
      // >
      //   <div className="row">
      //     <div className="col"></div>
      //     <div className="col">
      //       <div>
      //         <CCardBody>
      //           <CForm>
      //             <div className="login-input mt-1">
      //               <h1>Sign In</h1>
      //               <CImg
      //                 src="logo/line_sign.svg"
      //                 className="mb-3"
      //                 height={4}
      //               />
      //               <p className="text-muted">
      //                 To get in touch, please sign in with your email
      //               </p>
      //             </div>
      //             <CRow className="login-input-2 mt-2">
      //               <CCol xs="8">
      //                 <CFormGroup>
      //                   <CLabel htmlFor="company">Email</CLabel>
      //                   {/* <CInput id="company" placeholder="" /> */}
      //                   <CInput
      //                     type="text"
      //                     placeholder="Username"
      //                     autoComplete="username"
      //                     id="username"
      //                     onChange={this.handleInputChange}
      //                   />
      //                 </CFormGroup>
      //               </CCol>
      //             </CRow>
      //             <CRow className="login-input-2">
      //               <CCol xs="8">
      //                 <CFormGroup>
      //                   <CLabel htmlFor="company">Password</CLabel>
      //                   <CInput
      //                     type="password"
      //                     placeholder="Password"
      //                     autoComplete="current-password"
      //                     id="password"
      //                     onChange={this.handleInputChange}
      //                   />
      //                 </CFormGroup>
      //               </CCol>
      //             </CRow>
      //             <CRow className="login-input-2">
      //               <CCol xs="8">
      //                 <CButton
      //                   color="info"
      //                   className="mt-3"
      //                   block
      //                   onClick={this.login.bind(this)}
      //                 >
      //                   Masuk
      //                 </CButton>
      //               </CCol>
      //             </CRow>
      //             <CRow className="login-input-3 mt-4">
      //               <CCol xs="1">
      //                 <CImg src="img/logo_login.svg" height={100} />
      //               </CCol>
      //               <CCol xs="1" className="ml-5">
      //                 <CImg src="logo/line_logo.svg" height={120} />
      //               </CCol>
      //               <CCol xs="5">
      //                 <p>
      //                   Isolasi tetap terpantau dengan aman meskipun di rumah
      //                   saja. Unduh aplikasi AKTIV di Play Store dan nikmati
      //                   layanan kami dari pemantauan gejala harian, konsultasi
      //                   gratis dengan tenaga kesehatan, Serta panduan dan
      //                   informasi lengkap mengenai berbagai informasi kesehatan,
      //                   terutama seputar COVID-19, isolasi mandiri dan
      //                   vaksinasi.
      //                 </p>
      //               </CCol>
      //             </CRow>
      //             <div className="container">
      //               <CRow className="login-input-4">
      //                 <CCol xs="2">
      //                   <CImg src="logo/google_play.svg" height={50} />
      //                 </CCol>
      //                 <CCol xs="2" className="mt-3">
      //                   <p>Join with us</p>
      //                 </CCol>
      //                 <CCol xs="1" className="mt-3">
      //                   <CImg src="logo/youtube.svg" height={20} />
      //                 </CCol>
      //                 <CCol xs="1" className="mt-3 mr-2">
      //                   <CImg src="logo/instagram.svg" height={20} />
      //                 </CCol>
      //               </CRow>
      //             </div>
      //           </CForm>
      //         </CCardBody>
      //       </div>
      //     </div>
      //   </div>
      //   <ToastContainer
      //     position="top-right"
      //     autoClose={5000}
      //     hideProgressBar={false}
      //     newestOnTop={false}
      //     closeOnClick
      //     rtl={false}
      //     pauseOnFocusLoss
      //     draggable
      //     pauseOnHover
      //   />
      // </div>
    );
  }
}
