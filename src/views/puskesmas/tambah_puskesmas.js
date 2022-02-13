import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CButton,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class TambahPuskesmas extends Component {
  constructor() {
    super();
    this.state = {
      puskesmas: "",
      alamat: "",
      noHp: "",
      namaPIC: "",
      noHpPIC: "",
      error_login: false,
      error_message: "",
      is_logged_in: false,
      alert_login: false,
    };
  }
  componentDidMount() {
    this.getDetailPuskesmas();
  }
  handleInputChange(event) {
    if (event.hasOwnProperty("target")) {
      this.setState({ [event.target.name]: event.target.value });
      if (this.state.alert_register) {
        this.setState({ hasChanged: true, alert_register: false });
      }
    }
  }
  getDetailPuskesmas = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v1/puskesmas/get?id=${this.props.match.params.id}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }),
      }
    )
      .then((response) => response.json())
      .then((res) => {

        this.setState({
          puskesmas: res.data.puskesmas,
          alamat: res.data.alamat,
          noHp: res.data.noHp,
          namaPIC: res.data.namaPIC,
          noHpPIC: res.data.noHpPIC,
        });
      })
      .catch((error) => console.log(error));
  };

  addPuskesmas(event) {
    // const { history } = this.props;
    // event.preventDefault();

    let err = [];
    if (this.state.puskesmas == "") {
      err.push("Silahkan isi Nama Puskesmas!\n");
    }
    if (this.state.alamat == "") {
      err.push("Silahkan isi Alamat Puskesmas!\n");
    }
    if (this.state.noHp == "") {
      err.push("Silahkan isi No Hp!\n");
    }
    if (this.state.namaPIC == "") {
      err.push("Silahkan isi Nama PIC!\n");
    }
    if (this.state.noHpPIC == "") {
      err.push("Silahkan isi No Hp PIC!\n");
    }

    if (err.length > 0) {
      for (var z = 0; z < err.length; z++) {
        toast.error(err[z]);
      }
      return;
    }

    var body = {
      puskesmas: this.state.puskesmas,
      alamat: this.state.alamat,
      noHp: this.state.noHp,
      namaPIC: this.state.namaPIC,
      noHpPIC: this.state.noHpPIC,
    };

    fetch("https://api.aktiv.co.id/api/aktivengine/v1/puskesmas/add", {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "OK") {
          toast.success("Tambah Puskesmas Berhasil", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // this.puskesmaslist(this.state.curr_page)
          // window.location.reload(false);
          this.props.history.goBack();
        } else {
          toast.error("Tambah Puskesmas Gagal: " + data.statusmsg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => console.log(error));
  }
  updatePuskesmas() {
    var body = {
      id:this.props.match.params.id,
      puskesmas: this.state.puskesmas,
      alamat: this.state.alamat,
      noHp: this.state.noHp,
      namaPIC: this.state.namaPIC,
      noHpPIC: this.state.noHpPIC,
    };

    fetch("https://api.aktiv.co.id/api/aktivengine/v1/puskesmas/update", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "OK") {
          toast.success("Update Puskesmas Berhasil", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.props.history.goBack();
        } else {
          toast.error("Update Puskesmas Gagal: " + data.statusmsg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div className="container-fluid">
        <CCard>
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
                  <CFormGroup>
                    <CLabel htmlFor="company">Nama Puskesmas</CLabel>
                    <CInput
                      type="text"
                      id="puskesmas"
                      name="puskesmas"
                      value={this.state.puskesmas}
                      placeholder=""
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="company">Alamat Puskesmas</CLabel>
                    <CInput
                      type="text"
                      id="alamat"
                      value={this.state.alamat}
                      name="alamat"
                      placeholder=""
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="company">No Telpon Puskesmas</CLabel>
                    <CInput
                      type="text"
                      id="noHp"
                      name="noHp"
                      value={this.state.noHp}
                      placeholder=""
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="company">Nama PIC</CLabel>
                    <CInput
                      type="text"
                      id="namaPIC"
                      value={this.state.namaPIC}
                      name="namaPIC"
                      placeholder=""
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="company">No Telpon PIC</CLabel>
                    <CInput
                      type="text"
                      id="noHpPIC"
                      value={this.state.noHpPIC}
                      name="noHpPIC"
                      placeholder=""
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </CFormGroup>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol className="d-flex flex-row-reverse">
              <CButton
                className="btn-facebook btn-brand mr-3 mb-3"
                onClick={()=>{
                  if(this.props.match.params.id=="" || this.props.match.params.id==undefined){
                    this.addPuskesmas();
                  }else{
                    
                    this.updatePuskesmas();
                  }
                }}
              >
                <span>Simpan</span>
              </CButton>
            </CCol>
          </CRow>
        </CCard>
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
