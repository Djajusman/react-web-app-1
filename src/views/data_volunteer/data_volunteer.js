import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CDataTable,
  CFormGroup,
  CLabel,
  CInput,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const getBadge = (status) => {
  // switch (status) {
  //   case 'Berhasil Dimonitor': return 'success'
  //   case 'Sedang Dimonitor': return 'warning'
  //   case 'Gagal Dimonitor': return 'danger'
  //   default: return 'primary'
  // }
  if (status.includes("Dimonitor")) {
    return "warning";
  } else if (status.includes("Selesai")) {
    return "success";
  } else if (status.includes("Gagal")) {
    return "danger";
  } else {
    return "secondary";
  }
};
const volunteerFields = ["nama", "puskesmasMitra", "action"];

export default class Volunteer extends Component {
  constructor() {
    super();
    this.state = {
      listVolunteer: [],
      listPuskesmas: [],
      page: 1,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.getListVolunteer();
    this.getPuskesmasList();
  }
  downloadExcel = () => {
    var url = `https://report.aktiv.co.id/api/report-tenaga-kesehatan`;

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/vnd.ms-excel;charset=UTF-8",
        responseType: "blob",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("====== Get Download Response =======");
        console.log(data);
        var link = document.createElement("a");
        link.download = "Reportnya";
        link.href = data.fileUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  deleteUser = (akunID) => {
    var deleted = window.confirm("Apakah Anda Yakin Ingin Menghapus Data Ini?");
    if (deleted) {
      var body = {
        id: akunID,
      };
      fetch("https://auth.aktiv.co.id/api/auth/v1/user/delete", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.hasOwnProperty("status")) {
            if (data.status === "OK") {
              toast.success("Hapus Berhasil", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              // this.toggleStateAddVolunteer();
              this.getListVolunteer();
            } else {
              toast.error("Hapus Gagal: " + data.statusmsg, {
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
    }
  };
  getPuskesmasList = () => {
    fetch(`https://api.aktiv.co.id/api/aktivengine/v1/puskesmas/list`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        var listPuskesmas = data.data.items.map((item) => {
          return {
            ...item,
            key: item.id,
            label: item.puskesmas,
          };
        });
        this.setState({
          listPuskesmas: listPuskesmas,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  addUser = () => {
    let body = {
      username: this.state.username,
      password: this.state.password,
      role: "volunteer",
      email: this.state.email,
      first_name: this.state.first_name,
      puskesmasID: this.state.puskesmasID,
      birth_date: `${this.state.birth_date} 00:00:00`,
      noHp: this.state.noHp,
      alamatDom: this.state.alamatDom,
      profesi: this.state.profesi,
      institusi: this.state.institusi,
      gender: this.state.gender,
      volunteerLink: this.state.volunteerLink,
      org_token: "uWOZxPN6io8G4uoK6ZFsPzfJoOlgLpmI",
    };
    console.log(body);
    fetch("https://auth.aktiv.co.id/api/auth/v1/user/add", {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("status")) {
          if (data.status === "OK") {
            toast.success("Tambah Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.toggleStateAddVolunteer();
            this.getListVolunteer();
          } else {
            toast.error("Tambah Gagal: " + data.statusmsg, {
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
  };
  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  toggleStateAddVolunteer = () => {
    this.setStateAddVolunteer(!this.state.stateAddVolunteer);
  };
  setStateAddVolunteer(stateAddVolunteer) {
    this.setState({
      stateAddVolunteer: stateAddVolunteer,
    });
  }
  getListVolunteer = () => {
    fetch(
      `https://auth.aktiv.co.id/api/auth/v1/user/list?role=volunteer&role=volunteer&puskesmas=${localStorage.getItem(
        "puskesmasId"
      )}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("List Volunteer =>", data.data.items);
        var listVolunteer = [];
        data.data.items.forEach((element) => {
          listVolunteer.push({
            id: element.id,
            nama: element.profile.first_name,
            puskesmasMitra: element.profile.puskesmas,
          });
        });

        this.setState({
          listVolunteer: listVolunteer,
        });

        // data.data.items.forEach((element) => {
        //   fetch(
        //     `https://api.aktiv.co.id/api/aktivengine/v1/patient/list?id=${element.id}`,
        //     {
        //       method: "GET",
        //       headers: new Headers({
        //         "Content-Type": "application/json",
        //         Authorization: `${localStorage.getItem("token")}`,
        //       }),
        //     }
        //   )
        //     .then((response2) => response2.json())
        //     .then((data2) => {
        //       var patientList = [];
        //       data2.data.items.map((itemPasien) => {
        //         itemPasien.members.map((item2) => {
        //           patientList.push({
        //             name: item2.fullName ? item2.fullName : "",
        //           });
        //         });
        //       });
        //       if (localStorage.getItem("role") === "admin") {
        //         listVolunteer.push({
        //           ...element,
        //           name: element.profile.first_name,
        //           puskesmasMitra: element.profile.puskesmas,
        //           pasien: patientList,
        //         });
        //       } else {
        //         if (
        //           element.profile.puskesmasID ===
        //           localStorage.getItem("puskesmasId")
        //         ) {
        //           listVolunteer.push({
        //             ...element,
        //             name: element.profile.first_name,
        //             puskesmasMitra: element.profile.puskesmas,
        //             pasien: patientList,
        //           });
        //         }
        //       }
        //       this.setState({
        //         listVolunteer: listVolunteer,
        //       });
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <CRow>
          <CCol sm="3">
            {/* <CFormGroup>
            <CLabel className="mt-1" htmlFor="date-input">Tanggal</CLabel>
            <CInput type="date" id="date-input" name="date-input" placeholder="date" />
          </CFormGroup> */}
          </CCol>
          <CCol className="d-flex flex-row-reverse">
            <CFormGroup>
              <CButton
                className="btn-outline-info mt-4  mr-2"
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  this.downloadExcel();
                }}
              >
                <CIcon name="cilDataTransferDown" />
                <span className="mfs-2">Unduh Excel</span>
              </CButton>
              <CButton
                className="btn-facebook btn-brand mt-4 mr-2"
                onClick={() => {
                  this.toggleStateAddVolunteer();
                }}
              >
                <span>Tambah Tenaga Kesehatan</span>
              </CButton>
            </CFormGroup>
          </CCol>
        </CRow>
        <CCard>
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
                  <CDataTable
                    items={this.state.listVolunteer}
                    fields={volunteerFields}
                    itemsPerPage={10}
                    activePage={this.state.page}
                    tableFilter
                    sorter
                    pagination
                    scopedSlots={{
                      nama: (item, index) => (
                        <td>
                          <Link
                            to={`/data_volunteer/detail_volunteer/${item.id}`}
                          >
                            {item.nama}
                          </Link>
                        </td>
                      ),
                      // pasien: (item, index) => (
                      //   <td>
                      //     {item.pasien.length > 0 &&
                      //       item.pasien.map((element) => {
                      //         return <CRow>{element.name}</CRow>;
                      //       })}
                      //   </td>
                      // ),
                      action: (item, index) =>
                        localStorage.getItem("role") === "admin" ||
                        localStorage.getItem("role") === "operator" ? (
                          <td>
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => {
                                this.deleteUser(item.id);
                              }}
                            >
                              <CIcon name={"cilTrash"} />
                            </CButton>
                          </td>
                        ) : (
                          <td></td>
                        ),
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCard>
        <CModal
          show={this.state.stateAddVolunteer}
          onClose={this.toggleStateAddVolunteer}
          size="sm"
        >
          <CModalHeader closeButton>
            <CModalTitle>Tambah Tenaga Kesehatan</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="username">Username</CLabel>
                  <CInput
                    id="username"
                    type="text"
                    placeholder="Masukkan Username"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="email">Email</CLabel>
                  <CInput
                    type="email"
                    id="email"
                    placeholder="Masukkan Email"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="password">Password</CLabel>
                  <input
                    type="text"
                    autoComplete="username"
                    style={{ display: "none" }}
                  />
                  <input type="password" style={{ display: "none" }} />
                  <CInput
                    type="password"
                    id="password"
                    placeholder="Masukkan password"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="first_name">Nama</CLabel>
                  <CInput
                    type="text"
                    id="first_name"
                    placeholder="Masukkan Nama"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="birth_date">Tanggal Lahir</CLabel>
                  <CInput
                    type="date"
                    id="birth_date"
                    placeholder="Masukkan Tanggal Lahir"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="noHp">No Hp</CLabel>
                  <CInput
                    type="text"
                    id="noHp"
                    placeholder="Masukkan No Hp"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="alamatDom">Alamat Domisili</CLabel>
                  <CInput
                    type="text"
                    id="alamatDom"
                    placeholder="Masukkan Alamat Domisili"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="profesi">Profesi</CLabel>
                  <CInput
                    type="text"
                    id="profesi"
                    placeholder="Masukkan Profesi"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="puskesmasID">Puskesmas</CLabel>
                  <CSelect id="puskesmasID" onChange={this.handleInputChange}>
                    <option value="" key="">
                      -- Pilih Puskesmas --
                    </option>
                    {this.state.listPuskesmas.map((item) => {
                      return (
                        <option value={item.key} key={item.key}>
                          {item.label}
                        </option>
                      );
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="volunteerLink">
                    Direct Chat Link Tawkto
                  </CLabel>
                  <CInput
                    type="text"
                    id="volunteerLink"
                    placeholder="Masukkan Direct Chat Link Tawkto"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="institusi">Institusi</CLabel>
                  <CInput
                    type="text"
                    id="institusi"
                    placeholder="Masukkan Institusi"
                    onChange={this.handleInputChange}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CFormGroup>
                  <CLabel htmlFor="gender">Jenis Kelamin</CLabel>
                  <CSelect
                    id="gender"
                    onChange={this.handleInputChange}
                    value={this.state.gender}
                  >
                    <option value="" key="">
                      -- Pilih Jenis Kelamin --
                    </option>
                    <option value="L" key="L">
                      Laki-Laki
                    </option>
                    <option value="P" key="P">
                      Perempuan
                    </option>
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              className="btn-facebook btn-brand mt-4 mr-2"
              onClick={() => {
                this.addUser();
              }}
            >
              <span className="mfs-2">Tambah</span>
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
