import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
  CFormGroup,
  CForm,
  CLabel,
  CDataTable,
  CButton,
  CInput,
  CSelect,
  CContainer,
  CImg,
  // CCard,
  // CTextarea,
  // CCardBody,
  // CCardHeader,
  // CCol,
  // CRow,
  // CDataTable,
  //   CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const getBadge = (status) => {
  switch (status) {
    case "Berhasil Dimonitor":
      return "success";
    case "Sedang Dimonitor":
      return "warning";
    case "Gagal Dimonitor":
      return "danger";
    default:
      return "primary";
  }
};

const recordFields = [
  "name",
  "username",
  "usia",
  "kategori",
  // "pemantau",
  "gejala",
  "status",
];
export default class DetailVolunteer extends Component {
  constructor() {
    super();
    this.state = {
      listPuskesmas: [],
      page: 1,
    };
  }
  componentDidMount() {
    this.getDetailVolunteer();
    this.getPuskesmasList();
    this.getDataPatients();
  }

  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  downloadExcel = () => {
    var url = `https://report.aktiv.co.id/api/report-tenaga-kesehatan/${this.props.match.params.id}`;

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
  getDataPatients() {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v1/patient/list?id=${this.props.match.params.id}`,
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
        var patientList = [];
        data.data.items.map((item) => {
          item.members.map((item2) => {
            patientList.push({
              ...item2,
              akunID: item.akunID,
              name: item2.fullName ? item2.fullName : "",
              username: item.username ? item.username : "",
              usia: item2.age ? item2.age : 0,
              status: item2.statusMonitoring ? item2.statusMonitoring : "",
              kategori: item2.diagnosa ? item2.diagnosa : "",
              // pemantau: item.pemantau ? item.pemantau : "",
              diagnosa: item2.diagnosa ? item2.diagnosa : "",
              gejala: item2.symptomsHarian,
            });
          });
        });

        this.setState({
          patientList: patientList,
          totalPage: data.data.total_page,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // "1999-05-26T07:00:00+07:00"
  updateDataVolunteer = () => {
    var volunteerDetail = this.state.volunteerDetail;
    volunteerDetail.profile.id = this.props.match.params.id;
    volunteerDetail.profile.first_name = this.state.first_name;
    volunteerDetail.profile.email = this.state.email;
    volunteerDetail.profile.birthDate = this.state.birthDate;
    volunteerDetail.profile.noHp = this.state.noHp;
    volunteerDetail.profile.alamatDom = this.state.alamatDom;
    volunteerDetail.profile.puskesmasID = this.state.puskesmasID;
    let body = volunteerDetail.profile;

    // let body = {
    //   id: this.props.match.params.id,
    //   username: this.state.username,
    //   role: this.state.role,
    //   first_name: this.state.first_name,
    //   email: this.state.email,
    //   birthDate: this.state.birthDate,
    //   noHp: this.state.noHp,
    //   alamatDom: this.state.alamatDom,
    //   puskesmasID: this.state.puskesmasID,
    // };
    console.log("Body =>", body);
    fetch(`https://auth.aktiv.co.id/api/auth/v1/profile/update`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Volunteer Response", data);
        if (data.hasOwnProperty("status")) {
          if (data.status === "OK") {
            toast.success("Update Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.getDetailVolunteer();
          } else {
            toast.error("Update Gagal " + data.statusmsg, {
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
      .catch((error) => {
        console.log(error);
      });
  };
  getDetailVolunteer = () => {
    fetch(
      `https://auth.aktiv.co.id/api/auth/v1/user/get?id=${this.props.match.params.id}`,
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
        console.log("Detail Volunteer =>", data);
        this.setState({
          volunteerDetail: data.data,
          first_name: data.data.profile.first_name,
          email: data.data.email,
          birthDate: data.data.profile.birthDate,
          noHp: data.data.profile.noHp,
          alamatDom: data.data.profile.alamatDom,
          puskesmasID: data.data.profile.puskesmasID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  symptomsHarian = (data) => {
    var tampungSementara = [];
    if (data[0] !== undefined) {
      if (data[0].hasOwnProperty) {
        if (data[0].ageusia == true) {
          tampungSementara.push("Kehilangan kemampuan indera perasa");
        }
        if (data[0].anosmia == true) {
          tampungSementara.push("Kehilangan kemampuan indera penciuman");
        }
        if (data[0].batuk == true) {
          tampungSementara.push("Batuk");
        }
        if (data[0].demam == true) {
          tampungSementara.push(
            `Demam${
              data[0].suhuDemam != undefined && data[0].suhuDemam != ""
                ? ` ${data[0].suhuDemam} C`
                : ""
            }`
          );
        }
        if (data[0].demam14HariSebelumnya == true) {
          tampungSementara.push("Demam 14 Hari Sebelumnya");
        }
        if (data[0].diare == true) {
          tampungSementara.push("Diare");
        }
        if (data[0].kelelahan == true) {
          tampungSementara.push("Kelelahan");
        }
        if (data[0].kulitKebiruan == true) {
          tampungSementara.push("Wajah Membiru");
        }
        if (data[0].lainnya != "" && data[0].lainnya != undefined) {
          tampungSementara.push(data[0].lainnya);
        }
        if (data[0].nyeriDada == true) {
          tampungSementara.push("Nyeri di Dada");
        }
        if (data[0].nyeriOtot == true) {
          tampungSementara.push("Nyeri Otot");
        }
        if (data[0].nyeriTenggorokan == true) {
          tampungSementara.push("Nyeri Tenggorokan");
        }
        if (data[0].pilek == true) {
          tampungSementara.push("Pilek");
        }
        if (data[0].sakitKepala == true) {
          tampungSementara.push("Sakit Kepala");
        }
        if (data[0].sesakNafas == true) {
          tampungSementara.push("Sesak Nafas");
        }
        if (data[0].sulitBangun == true) {
          tampungSementara.push("Sulit Bangun");
        }
        if (data[0].tidakNafsuMakan == true) {
          tampungSementara.push("Tidak Nafsu Makan");
        }
      } else {
        tampungSementara.push("Tidak Ada Gejala");
      }
    } else {
      tampungSementara.push("Tidak Ada Gejala");
    }
    return tampungSementara;
  };
  render() {
    return (
      <>
        <CRow>
          <CCol className="d-flex flex-row-reverse">
            <CButton
              className="btn-outline-info mr-2 my-2"
              onClick={() => {
                this.downloadExcel();
              }}
            >
              <CIcon name="cilDataTransferDown" />
              <span className="mfs-2">Unduh Excel</span>
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Biodata</strong>
                <CButton
                  className="float-right btn-facebook btn-brand"
                  onClick={() => {
                    this.updateDataVolunteer();
                  }}
                >
                  Simpan
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CForm
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Nama</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="first_name"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.first_name}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="email"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Tanggal Lahir</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="birthDate"
                        type="date"
                        onChange={this.handleInputChange}
                        value={moment(this.state.birthDate).format(
                          "yyyy-MM-DD"
                        )}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Handphone</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="noHp"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.noHp}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Alamat Domisili</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="alamatDom"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.alamatDom}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Puskesmas</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="puskesmasID"
                        onChange={this.handleInputChange}
                        value={this.state.puskesmasID}
                      >
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
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Pasien</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.patientList}
                  fields={recordFields}
                  itemsPerPage={50}
                  activePage={this.state.page}
                  tableFilter
                  sorter
                  pagination
                  scopedSlots={{
                    name: (item) => (
                      <td>
                        <Link
                          to={`/medical_record/detail_pasien/${item.akunID}/${item.memberID}`}
                        >
                          {item.name}
                        </Link>
                        {/* {item.name} */}
                      </td>
                    ),
                    status: (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                    gejala: (item) => (
                      <td>
                        {this.symptomsHarian(item.symptomsHarian).map(
                          (element) => {
                            return (
                              <CContainer>
                                <CRow className="align-items-center">
                                  {element != "Tidak Ada Gejala" && (
                                    <CImg
                                      src="logo/Tick_Square.svg"
                                      height="15"
                                    />
                                  )}
                                  {`${
                                    element == "Tidak Ada Gejala"
                                      ? ` ${element}`
                                      : ` ${element}`
                                  }`}
                                </CRow>
                              </CContainer>
                            );
                          }
                        )}
                      </td>
                    ),
                  }}
                />
              </CCardBody>
            </CCard>
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
      </>
    );
  }
}
