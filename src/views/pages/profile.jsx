import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CFormGroup,
  CLabel,
  CInput,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CSelect,
  CCardHeader,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.getDetailAccount();
  }
  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  toggleModalForm = () => {
    this.setStateModal(!this.state.stateModal);
  };
  setStateModal(stateModal) {
    this.setState({
      stateModal: stateModal,
    });
  }
  getDetailAccount = () => {
    fetch(`https://auth.aktiv.co.id/api/auth/v1/user/me`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("===== Response Detail ======", data);
        this.setState({
          first_name: data.first_name,
          email: data.email,
          username: data.username,
          role: data.role,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  changePassword = () => {
    if (
      this.state.confirmpassword == undefined ||
      this.state.newpassword == undefined ||
      this.state.password == undefined
    ) {
      toast.warning("Harap Isi Semua Data Terlebih Dahulu", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (this.state.confirmpassword === this.state.newpassword) {
        let body = {
          password: this.state.password,
          newpassword: this.state.newpassword,
        };
        fetch(`https://auth.aktiv.co.id/api/auth/v1/user/password`, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Ganti Password Response");
            console.log(data);
            if (data.hasOwnProperty("status")) {
              if (data.status === "OK") {
                toast.success("Ganti Password Berhasil", {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                this.setState({
                  confirmpassword: "",
                  newpassword: "",
                  password: "",
                });
                this.toggleModalForm();
              } else {
                toast.error("Ganti Password Gagal " + data.statusmsg, {
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
      } else {
        toast.error("Password Tidak Sesuai", {
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
  };
  render() {
    return (
      <div className="container-fluid">
        <CCard>
          <CCardHeader>
            <span>
              <strong>Profile</strong>
            </span>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-2">
              <CCol sm="3">Nama Lengkap</CCol>
              <CCol>: {this.state.first_name}</CCol>
            </CRow>
            <CRow className="my-2">
              <CCol sm="3">Alamat Email</CCol>
              <CCol>: {this.state.email}</CCol>
            </CRow>
            <CRow className="my-2">
              <CCol sm="3">username</CCol>
              <CCol>: {this.state.username}</CCol>
            </CRow>
            <CRow className="my-2">
              <CCol sm="3">Role</CCol>
              <CCol>: {this.state.role}</CCol>
            </CRow>
            <CRow className="mt-2">
              <CCol>
                <CButton color="info" onClick={this.toggleModalForm}>
                  Ganti Password
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CModal
          show={this.state.stateModal}
          onClose={this.toggleModalForm}
          size="sm"
        >
          <CModalHeader closeButton>
            <CModalTitle>Ganti Password</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="password">Password Lama</CLabel>
                  <CInput
                    id="password"
                    type="password"
                    placeholder="Masukkan Password Lama"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="newpassword">Password Baru</CLabel>
                  <CInput
                    id="newpassword"
                    type="password"
                    placeholder="Masukkan Password Baru"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="confirmpassword">Konfirmasi Password</CLabel>
                  <CInput
                    id="confirmpassword"
                    type="password"
                    placeholder="Konfirmasi Password Baru"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              className="btn-facebook btn-brand mt-4 mr-2"
              onClick={() => {
                this.changePassword();
              }}
            >
              <span>Simpan</span>
            </CButton>
          </CModalFooter>
        </CModal>
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
      </div>
    );
  }
}
