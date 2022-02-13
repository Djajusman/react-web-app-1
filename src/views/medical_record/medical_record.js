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
  CImg,
  CSelect,
  CCardHeader,
  CInputCheckbox,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CForm,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const styles = { color: "green" };
const asteriskSymbol = <span style={{ color: "red" }}>*</span>;
export default class MedicalRecord extends Component {
  constructor() {
    super();
    this.state = {
      medicalRecordList: [],
      page: 1,
      totalPage: 1,
      pageLoading: true,
      completeRegister: "dataLengkap",
      disabledButton: false,
      search: "",
      kode: {
        hijau: false,
        kuning: false,
        merah: false,
      },
      diagnosa: {
        sehat: false,
        kontakErat: false,
        suspek: false,
        covidRingan: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeSort = this.handleInputChangeSort.bind(this);
    this.handleInputChangeWithValidation =
      this.handleInputChangeWithValidation.bind(this);
  }
  componentDidMount() {
    this.medicalRecord();
  }

  medicalRecord = (sortBy) => {
    this.setState({
      pageLoading: true,
    });
    let findById = "";
    if (localStorage.getItem("role") === "volunteer")
      findById = `&puskesmasid=${localStorage.getItem("puskesmasId")}`;
    // let url = `http://192.168.18.8:3000/service/api/aktivengine/v1/medicalrecord/list?search=${
    //   this.state.search
    // }&sortBy=${sortBy ?? ""}${findById}`;
    let url = `https://api.aktiv.co.id/service/api/aktivengine/v1/medicalrecord/list?search=${
      this.state.search
    }&sortBy=${sortBy ?? ""}${findById}`;
    // console.log(url);
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("List Medical Record", data);
        let downloadData = [];
        let index = 1;
        data.data.items.forEach((item) => {
          var tempListGejala = "Belum ada data gejala";
          var tempListPemeriksaan = "Belum ada data pemeriksaan";
          if (item.symptomLastUpdate) {
            tempListGejala = `Update Terakhir: ${
              item.symptomLastUpdate.createdDate != "0001-01-01T00:00:00Z"
                ? moment(item.symptomLastUpdate.createdDate).format(
                    "dddd, DD MMMM yyyy"
                  )
                : "Belum ada update"
            }; Gejala: `;
            var tempGejala = Object.entries(item.symptomLastUpdate);
            tempGejala.forEach(([key, value]) => {
              if (
                key != "createBy" &&
                key != "akunID" &&
                key != "category" &&
                key != "createdDate" &&
                key != "hariIsolasi" &&
                key != "id" &&
                key != "memberID" &&
                key != "perkembanganGejala" &&
                key != "symptomDate" &&
                key != "symptomDateStr" &&
                key != "updateBy" &&
                key != "updatedDate"
              ) {
                if (key === "ageusia") {
                  if (value === true) tempListGejala += "Ageusia, ";
                }
                if (key === "anosmia") {
                  if (value === true) tempListGejala += "Anosmia, ";
                }
                if (key === "batuk") {
                  if (value === true) tempListGejala += "Batuk, ";
                }
                // if (key === "demam") {
                //   if (value === true) tempListGejala.push("Demam");
                // }
                if (key === "demam14HariSebelumnya") {
                  if (value === true)
                    tempListGejala += "Demam 14 Hari Sebelumnya, ";
                }
                if (key === "diare") {
                  if (value === true) tempListGejala += "Diare, ";
                }
                if (key === "kelelahan") {
                  if (value === true) tempListGejala += "Kelelahan, ";
                }
                if (key === "kulitKebiruan") {
                  if (value === true) tempListGejala += "Kulit Kebiruan, ";
                }
                if (key === "lainnya") {
                  if (value !== "") tempListGejala += `${value}, `;
                }
                if (key === "nyeriDada") {
                  if (value === true) tempListGejala += "Nyeri Dada, ";
                }
                if (key === "nyeriOtot") {
                  if (value === true) tempListGejala += "Nyeri Otot, ";
                }
                if (key === "nyeriTenggorokan") {
                  if (value === true) tempListGejala += "Nyeri Tenggorokan, ";
                }
                if (key === "pilek") {
                  if (value === true) tempListGejala += "Pilek, ";
                }
                if (key === "sakitKepala") {
                  if (value === true) tempListGejala += "Sakit Kepala, ";
                }
                if (key === "sesakNafas") {
                  if (value === true) tempListGejala += "Sesak Nafas, ";
                }
                if (key === "suhuDemam") {
                  if (value !== "") tempListGejala += `Demam ${value} °C, `;
                }
                if (key === "sulitBangun") {
                  if (value === true) tempListGejala += "Sulit Bangun, ";
                }
                if (key === "tidakNafsuMakan") {
                  if (value === true) tempListGejala += "Tidak Nafsu Makan, ";
                }
              }
            });
          }
          if (item.pemeriksaanLastUpdate) {
            tempListPemeriksaan = `Update Terakhir: ${
              item.pemeriksaanLastUpdate.createdDate != "0001-01-01T00:00:00Z"
                ? moment(item.pemeriksaanLastUpdate.createdDate).format(
                    "dddd, DD MMMM yyyy"
                  )
                : "Belum ada update"
            }; SPO2: ${item.pemeriksaanLastUpdate.spo2}; Suhu: ${
              item.pemeriksaanLastUpdate.suhu
            }; TD: ${item.pemeriksaanLastUpdate.tekananDarah}; Nadi: ${
              item.pemeriksaanLastUpdate.nadi
            }; RR: ${item.pemeriksaanLastUpdate.lajuNafas};`;
          }
          downloadData.push({
            ...item,
            index: index,
            category:
              item.symptomLastUpdate != null ||
              item.symptomLastUpdate != undefined
                ? item.symptomLastUpdate.category
                : 1,

            gejala: tempListGejala,
            pemeriksaan: tempListPemeriksaan,
          });
          index++;
        });
        this.setState({
          medicalRecordList: data.data.items,
          pageLoading: false,
          downloadData: downloadData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  verifiedPatient = (akunID) => {
    var body = { akunID: akunID, isAktivUser: true };
    let iya = window.confirm("Apakah Anda yakin ini pasien Anda?");

    if (iya) {
      fetch(
        `https://api.aktiv.co.id/api/aktivengine/v1/patient/aktivuser/update`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          }),
          body: JSON.stringify(body),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Verified Patient Response =>", data);
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
              this.medicalRecord();
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
    }
  };
  clearField = () => {
    this.setState({
      leaderName: "",
      first_name: "",
      email: "",
      username: "",
      password: "",
      mobilePhone: "",
      first_name: "",
      nik: "",
      birthDateStr: "",
      gender: "",
      job: "",
      mobilePhone: "",
      relationship: "",
    });
  };

  registerPatient = () => {
    this.setState({
      disabledButton: true,
    });
    var body = {
      role: "patient",
      leaderName: this.state.leaderName ?? "",
      first_name: this.state.first_name,
      email: this.state.email ?? "",
      username: this.state.username,
      password: this.state.password,
      akunNoHp: this.state.mobilePhone ?? "",
      isAktivUsers: true,
      address: {
        provinsiID: this.state.provinsiID ?? "",
        provinsi: this.state.provinsi ?? "",
        kotakabID: this.state.kotakabID ?? "",
        kotaKab: this.state.kotaKab ?? "",
        kecamatanID: this.state.kecamatanID ?? "",
        kecamatan: this.state.kecamatan ?? "",
        kelurahanID: this.state.kelurahanID ?? "",
        kelurahan: this.state.kelurahan ?? "",
        kodePos: this.state.kodePos ?? "",
        alamatDomisili: this.state.alamatDomisili ?? "",
        alamatIsolasiMandiri: this.state.alamatIsolasiMandiri ?? "",
      },
      members: [
        {
          fullName: this.state.first_name ?? "",
          nik: this.state.nik ?? "",
          birthDateStr: moment(this.state.birthDateStr).format(
            "yyyy-MM-DD HH:mm:ss"
          ),
          gender: this.state.gender ?? "L",
          job: this.state.job ?? "",
          mobilePhone: this.state.mobilePhone ?? "",
          relationship: this.state.relationship ?? "Member Utama",
        },
      ],
      volunteerID: `${localStorage.getItem("userid")}`,
      volunteer: `${localStorage.getItem("fullName")}`,
      volunteerLink: `${localStorage.getItem("volunteerLink")}`,
      volunteerNoHp: `${localStorage.getItem("volunteerNoHp")}`,
      puskesmasID: `${localStorage.getItem("puskesmasId")}`,
      org_token: "uWOZxPN6io8G4uoK6ZFsPzfJoOlgLpmI",
    };
    console.log("Register Body =>", body);
    fetch(`https://auth.aktiv.co.id/api/auth/registernew`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `uWOZxPN6io8G4uoK6ZFsPzfJoOlgLpmI`,
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Register Patient Response =>", data);
        if (data.hasOwnProperty("status")) {
          if (data.status === "OK") {
            this.setState({
              disabledButton: false,
            });
            toast.success("Register Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.toggleStateTambahPasien();
            this.medicalRecord();
            this.clearField();
          } else {
            this.setState({
              disabledButton: false,
            });
            toast.error("Register Gagal " + data.statusmsg, {
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
  addMember = () => {
    this.setState({
      disabledButton: true,
    });
    var body = {
      akunID: this.state.selectedAkunId,
      noRM: "",
      fullName: this.state.first_name ?? "",
      nik: this.state.nik ?? "",
      birthDateStr: moment(this.state.birthDateStr).format(
        "yyyy-MM-DD HH:mm:ss"
      ),
      age: 0,
      gender: this.state.gender ?? "L",
      job: this.state.job ?? "",
      mobilePhone: this.state.mobilePhone ?? "",
      relationship: this.state.relationship ?? "",
      isIsolated: false,
      tglIsolasiStr: "",
      statusMonitoring: "",
      diagnosa: "",
      tinggiBadan: 0,
      beratBadan: 0,
      bmi: 0,
      alergi: "",
      komorbid: "",
      ratingProkes: 0.0,
    };
    console.log("Add Member Body =>", body);
    fetch(`https://api.aktiv.co.id/api/aktivengine/v2/patient/members/add`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add Member Response =>", data);
        if (data.hasOwnProperty("status")) {
          if (data.status === "OK") {
            this.setState({
              disabledButton: false,
            });
            toast.success("Tambah Data Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.toggleStateTambahMember();
            this.medicalRecord();
            this.clearField();
          } else {
            this.setState({
              disabledButton: false,
            });
            toast.error("Tambah Data Gagal " + data.statusmsg, {
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

  addPatient = () => {
    this.setState({
      disabledButton: true,
    });
    var body = { username: this.state.username };
    fetch(`https://api.aktiv.co.id/api/aktivengine/v1/patient/add`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add Patient Response =>", data);
        if (data.hasOwnProperty("status")) {
          if (data.status === "OK") {
            this.setState({
              disabledButton: false,
            });
            toast.success("Update Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.toggleStateTambahPasien();
            this.medicalRecord();
            this.setState({
              usernameAdd: "",
            });
          } else {
            this.setState({
              disabledButton: false,
            });
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
  toggleStateTambahPasien = () => {
    this.setStateTambahPasien(!this.state.stateTambahPasien);
  };
  setStateTambahPasien(stateTambahPasien) {
    this.setState({
      stateTambahPasien: stateTambahPasien,
    });
  }
  toggleStateTambahMember = () => {
    this.setStateTambahMember(!this.state.stateTambahMember);
  };
  setStateTambahMember(stateTambahMember) {
    this.setState({
      stateTambahMember: stateTambahMember,
    });
  }
  toggleStateFilter = () => {
    this.setStateFilter(!this.state.stateFilter);
  };
  setStateFilter(stateFilter) {
    this.setState({
      stateFilter: stateFilter,
    });
  }
  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  handleInputChangeSort = (event) => {
    this.medicalRecord(event.target.value);
  };
  handleInputChangeWithValidation = (event) => {
    this.formValidation();
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  handleCheckBoxFilterChange = (event) => {
    let k = event.target.id;
    let l = event.target.name;
    this.setState({
      [k]: {
        ...this.state[k],
        [l]: !this.state[k][l],
      },
    });
  };
  handleDateChange = (event) => {
    this.setState({
      startDate: moment(event.start).format("YYYY-MM-DDT00:00:00.000Z"),
      endDate: moment(event.end).format("YYYY-MM-DDT23:59:59.000Z"),
    });
  };

  formValidation = () => {
    if (
      this.state.first_name == "" ||
      this.state.first_name == undefined ||
      this.state.password == "" ||
      this.state.password == undefined ||
      this.state.gender == "" ||
      this.state.gender == undefined ||
      this.state.birthDateStr == "" ||
      this.state.birthDateStr == undefined ||
      this.state.username == "" ||
      this.state.username == undefined
    )
      return false;
    else return true;
  };
  formValidationMember = () => {
    if (
      this.state.first_name == "" ||
      this.state.first_name == undefined ||
      this.state.gender == "" ||
      this.state.gender == undefined ||
      this.state.birthDateStr == "" ||
      this.state.birthDateStr == undefined
    )
      return false;
    else return true;
  };
  render() {
    return (
      <div className="container-fluid">
        <CCard>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <strong>Medical Record</strong>
                    </CCol>
                    <CCol>
                      {localStorage.getItem("role") !== "admin" && (
                        <CButton
                          className="btn-facebook btn-brand mr-2 float-right"
                          onClick={() => {
                            this.setState({
                              completeRegister: "dataLengkap",
                            });
                            this.toggleStateTambahPasien();
                          }}
                        >
                          <span>Tambah Pasien</span>
                        </CButton>
                      )}

                      <ExcelFile
                        element={
                          <CButton
                            className="btn-outline-info mr-2 float-right"
                            style={{ backgroundColor: "white" }}
                            // onClick={() => {
                            //   this.downloadExcel();
                            // }}
                          >
                            <CIcon name="cilDataTransferDown" />
                            <span>Unduh Excel</span>
                          </CButton>
                        }
                      >
                        <ExcelSheet
                          data={this.state.downloadData}
                          name="Medical Record"
                        >
                          <ExcelColumn label="No" value="index" />
                          <ExcelColumn label="Tanda Bahaya" value="category" />
                          <ExcelColumn label="Nama" value="fullName" />
                          <ExcelColumn label="Username" value="username" />
                          <ExcelColumn label="Usia" value="age" />
                          <ExcelColumn label="Gejala" value="gejala" />
                          <ExcelColumn
                            label="Pemeriksaan"
                            value="pemeriksaan"
                          />
                          <ExcelColumn label="Diagnosa" value="diagnosa" />
                          <ExcelColumn label="Status" value="status" />
                          <ExcelColumn
                            label="Hari Isolasi"
                            value="hariIsolasi"
                          />
                          <ExcelColumn
                            label="Tenaga Kesehatan(Volunteer / PKM)"
                            value="volunteer"
                          />
                        </ExcelSheet>
                      </ExcelFile>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CRow className="align-items-end mb-3">
                    <CCol md="7">
                      <CRow>
                        <CCol md="6">
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-magnifying-glass" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              id="search"
                              name="search"
                              placeholder="Search ( Tekan enter untuk mencari )"
                              onChange={this.handleInputChange}
                              onKeyDown={(event) => {
                                if (event.keyCode === 13) {
                                  this.medicalRecord();
                                }
                              }}
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol md="5">
                      <CRow>
                        <CCol>
                          {/* <CLabel>Filter</CLabel>
                          <CButton
                            style={{ border: "1px solid grey", color: "grey" }}
                            className="text-left"
                            block
                            onClick={() => {
                              this.toggleStateFilter();
                            }}
                          >
                            Filter
                          </CButton> */}
                        </CCol>
                        <CCol>
                          <CLabel>Urutkan</CLabel>
                          <CSelect
                            id="sortBy"
                            onChange={this.handleInputChangeSort}
                          >
                            <option value="">---- Pilih Sort ----</option>
                            <option value="newestaccount">Akun Terbaru</option>
                            <option value="oldestaccount">Akun Terlama</option>
                            {/* <option value="newestsymptom">
                              Update Gejala Terbaru
                            </option>
                            <option value="oldestymptom">
                              Update Gejala Terlama
                            </option>
                            <option value="newestpemeriksaan">
                              Update Pemeriksaan Terbaru
                            </option>
                            <option value="oldestpemeriksaan">
                              Update Pemeriksaan Terlama
                            </option> */}
                          </CSelect>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                  <CDataTable
                    sorter
                    responsive
                    loading={this.state.pageLoading}
                    items={this.state.medicalRecordList}
                    fields={[
                      "no",
                      "kode",
                      { key: "name", label: "Nama", _style: { width: "15%" } },
                      { key: "age", label: "Usia", _style: { width: "5%" } },
                      {
                        key: "gejala",
                        label: "Gejala",
                        _style: { width: "20%" },
                      },
                      {
                        key: "pemeriksaan",
                        label: "Pemeriksaan",
                        _style: { width: "20%" },
                      },
                      "diagnosa",
                      "status",
                      "hariIsolasi",
                      {
                        key: "action",
                        label: "Aksi/Volunteer",
                        _style: { width: "5%" },
                      },
                      ,
                    ]}
                    itemsPerPage={100}
                    activePage={this.state.page}
                    pagination
                    scopedSlots={{
                      no: (item, index) => <td>{index + 1}</td>,
                      kode: (item) => (
                        <td>
                          {item.symptomLastUpdate && (
                            <CImg
                              src={
                                item.symptomLastUpdate.category != 0
                                  ? `${
                                      item.symptomLastUpdate.category == 3
                                        ? "logo/merah.svg"
                                        : item.symptomLastUpdate.category == 2
                                        ? "logo/kuning.svg"
                                        : "logo/hijau.svg"
                                    }`
                                  : "logo/hijau.svg"
                              }
                              height={25}
                              className="mr-2"
                            />
                          )}
                        </td>
                      ),
                      name: (item) => (
                        <td>
                          <CRow>
                            <Link
                              to={`/medical_record/detail_pasien/${item.akunID}/${item.memberID}`}
                            >
                              {item.fullName}
                            </Link>
                          </CRow>

                          <CRow>{item.username}</CRow>
                        </td>
                      ),

                      gejala: (item, index) => {
                        var tempListGejala = [];
                        if (item.symptomLastUpdate) {
                          var tempGejala = Object.entries(
                            item.symptomLastUpdate
                          );
                          tempGejala.forEach(([key, value]) => {
                            if (
                              key != "createBy" &&
                              key != "akunID" &&
                              key != "category" &&
                              key != "createdDate" &&
                              key != "hariIsolasi" &&
                              key != "id" &&
                              key != "memberID" &&
                              key != "perkembanganGejala" &&
                              key != "symptomDate" &&
                              key != "symptomDateStr" &&
                              key != "updateBy" &&
                              key != "updatedDate"
                            ) {
                              if (key === "ageusia") {
                                if (value === true)
                                  tempListGejala.push("ageusia");
                              }
                              if (key === "anosmia") {
                                if (value === true)
                                  tempListGejala.push("Anosmia");
                              }
                              if (key === "batuk") {
                                if (value === true)
                                  tempListGejala.push("Batuk");
                              }
                              // if (key === "demam") {
                              //   if (value === true) tempListGejala.push("Demam");
                              // }
                              if (key === "demam14HariSebelumnya") {
                                if (value === true)
                                  tempListGejala.push(
                                    "Demam 14 Hari Sebelumnya"
                                  );
                              }
                              if (key === "diare") {
                                if (value === true)
                                  tempListGejala.push("Diare");
                              }
                              if (key === "kelelahan") {
                                if (value === true)
                                  tempListGejala.push("Kelelahan");
                              }
                              if (key === "kulitKebiruan") {
                                if (value === true)
                                  tempListGejala.push("Kulit Kebiruan");
                              }
                              if (key === "lainnya") {
                                if (value !== "") tempListGejala.push(value);
                              }
                              if (key === "nyeriDada") {
                                if (value === true)
                                  tempListGejala.push("Nyeri Dada");
                              }
                              if (key === "nyeriOtot") {
                                if (value === true)
                                  tempListGejala.push("Nyeri Otot");
                              }
                              if (key === "nyeriTenggorokan") {
                                if (value === true)
                                  tempListGejala.push("Nyeri Tenggorokan");
                              }
                              if (key === "pilek") {
                                if (value === true)
                                  tempListGejala.push("Pilek");
                              }
                              if (key === "sakitKepala") {
                                if (value === true)
                                  tempListGejala.push("Sakit Kepala");
                              }
                              if (key === "sesakNafas") {
                                if (value === true)
                                  tempListGejala.push("Sesak Nafas");
                              }
                              if (key === "suhuDemam") {
                                if (value !== "")
                                  tempListGejala.push(`Demam ${value} °C`);
                              }
                              if (key === "sulitBangun") {
                                if (value === true)
                                  tempListGejala.push("Sulit Bangun");
                              }
                              if (key === "tidakNafsuMakan") {
                                if (value === true)
                                  tempListGejala.push("Tidak Nafsu Makan");
                              }
                            }
                          });
                        }

                        return item.symptomLastUpdate ? (
                          <td>
                            {tempListGejala.map((element) => {
                              return <CRow>• {element}</CRow>;
                            })}

                            <CRow style={styles}>Update Terakhir:</CRow>
                            <CRow style={styles}>
                              {item.symptomLastUpdate.createdDate !=
                              "0001-01-01T00:00:00Z"
                                ? moment(
                                    item.symptomLastUpdate.createdDate
                                  ).format("dddd, DD MMMM yyyy")
                                : "Belum ada update"}
                            </CRow>
                          </td>
                        ) : (
                          <td>
                            <CRow>Belum ada data gejala</CRow>
                          </td>
                        );
                      },

                      pemeriksaan: (item) =>
                        item.pemeriksaanLastUpdate ? (
                          <td>
                            <CRow>
                              SpO2 : {item.pemeriksaanLastUpdate.spo2}
                            </CRow>
                            <CRow>
                              Suhu : {item.pemeriksaanLastUpdate.suhu}
                            </CRow>
                            <CRow>
                              TD : {item.pemeriksaanLastUpdate.tekananDarah}
                            </CRow>
                            <CRow>HR : {item.pemeriksaanLastUpdate.nadi}</CRow>
                            <CRow>
                              RR : {item.pemeriksaanLastUpdate.lajuNafas}
                            </CRow>
                            <CRow style={styles}>Update Terakhir:</CRow>
                            <CRow style={styles}>
                              {item.pemeriksaanLastUpdate.createdDate !=
                              "0001-01-01T00:00:00Z"
                                ? moment(
                                    item.pemeriksaanLastUpdate.createdDate
                                  ).format("dddd, DD MMMM yyyy")
                                : "Belum ada update"}
                            </CRow>
                          </td>
                        ) : (
                          <td>Belum ada data Pemeriksaan</td>
                        ),
                      hariIsolasi: (item) => (
                        <td>
                          {" "}
                          {item.hariIsolasi
                            ? `Hari ${Math.round(item.hariIsolasi)}`
                            : "Sedang tidak melakukan isolasi"}
                        </td>
                      ),
                      status: (item) => <td>{item.status}</td>,
                      action: (item) =>
                        localStorage.getItem("role") === "volunteer" ? (
                          <td>
                            {item.volunteer === "" ? (
                              <CButton
                                color="success"
                                size="sm"
                                onClick={() => {
                                  this.verifiedPatient(item.akunID);
                                }}
                              >
                                Verifikasi
                              </CButton>
                            ) : (
                              <>
                                <CButton
                                  color="info"
                                  size="sm"
                                  onClick={() => {
                                    this.setState({
                                      selectedAkunId: item.akunID,
                                    });
                                    this.toggleStateTambahMember();
                                  }}
                                >
                                  Tambah Member
                                </CButton>
                                <CRow>{item.volunteer}</CRow>
                              </>
                            )}
                          </td>
                        ) : (
                          <td>
                            <CRow>{item.volunteer}</CRow>
                          </td>
                        ),
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCard>
        {/* Modal Tambah Pasien */}
        <CModal
          show={this.state.stateTambahPasien}
          onClose={this.toggleStateTambahPasien}
          size="lg"
        >
          <CForm>
            <CModalHeader closeButton>
              <CModalTitle>Tambah Pasien</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <>
                <CTabs activeTab="dataLengkap">
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        data-tab="usernameAdd"
                        onClick={() => {
                          this.setState({
                            completeRegister: "username",
                          });
                        }}
                      >
                        Username
                      </CNavLink>
                    </CNavItem>

                    <CNavItem>
                      <CNavLink
                        data-tab="dataLengkap"
                        onClick={() => {
                          this.setState({
                            completeRegister: "dataLengkap",
                          });
                        }}
                      >
                        Data Lengkap
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane data-tab="usernameAdd">
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="usernameAdd">
                              Username {asteriskSymbol}
                            </CLabel>
                            <CInput
                              id="usernameAdd"
                              type="text"
                              placeholder="Masukkan Username"
                              onChange={this.handleInputChange}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane data-tab="dataLengkap">
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="leaderName">
                              Nama Kepala Keluarga
                            </CLabel>
                            <CInput
                              id="leaderName"
                              placeholder="Masukkan Nama Kepala Keluarga"
                              onChange={this.handleInputChangeWithValidation}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="first_name">
                              Nama Lengkap {asteriskSymbol}
                            </CLabel>
                            <CInput
                              required
                              id="first_name"
                              placeholder="Masukkan Nama Lengkap"
                              onChange={this.handleInputChangeWithValidation}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="email">Email</CLabel>
                            <CInput
                              id="email"
                              type="email"
                              placeholder="Masukkan Email"
                              onChange={this.handleInputChangeWithValidation}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="username">
                              Username {asteriskSymbol}
                            </CLabel>
                            <CInput
                              required
                              id="username"
                              type="text"
                              placeholder="Masukkan Username"
                              onChange={this.handleInputChangeWithValidation}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="password">
                              Password {asteriskSymbol}
                            </CLabel>
                            <input
                              type="text"
                              autoComplete="username"
                              style={{ display: "none" }}
                            />
                            <input
                              type="password"
                              style={{ display: "none" }}
                            />
                            <CInput
                              autoComplete="off"
                              required
                              type="password"
                              id="password"
                              placeholder="Masukkan password"
                              onChange={this.handleInputChangeWithValidation}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="nik">NIK</CLabel>
                            <CInput
                              id="nik"
                              type="number"
                              placeholder="Masukkan NIK"
                              onChange={this.handleInputChangeWithValidation}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="mobilePhone">No Hp</CLabel>
                            <CInput
                              id="mobilePhone"
                              placeholder="Masukkan No. Hp Pasien"
                              onChange={this.handleInputChangeWithValidation}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="birthDateStr">
                              Tanggal Lahir {asteriskSymbol}
                            </CLabel>
                            <CInput
                              required
                              id="birthDateStr"
                              type="date"
                              placeholder="Masukkan Tanggal Lahir"
                              onChange={this.handleInputChangeWithValidation}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup>
                            <CLabel htmlFor="gender">
                              Jenis Kelamin {asteriskSymbol}
                            </CLabel>
                            <CSelect
                              required
                              id="gender"
                              onChange={this.handleInputChangeWithValidation}
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
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </>
            </CModalBody>
            <CModalFooter>
              <CButton
                disabled={this.state.disabledButton}
                type="submit"
                className="btn-facebook btn-brand mt-4 mr-2"
                onClick={() => {
                  if (this.formValidation()) {
                    if (this.state.completeRegister === "usernameAdd") {
                      this.addPatient();
                    } else {
                      this.registerPatient();
                    }
                  }
                }}
              >
                <span>+ Tambah Pasien</span>
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
        {/* Modal Tambah Member */}
        <CModal
          show={this.state.stateTambahMember}
          onClose={this.toggleStateTambahMember}
          size="lg"
        >
          <CForm>
            <CModalHeader closeButton>
              <CModalTitle>Tambah Member</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow>
                <CCol className="my-1">
                  <CFormGroup>
                    <CLabel htmlFor="first_name">
                      Nama Lengkap {asteriskSymbol}
                    </CLabel>
                    <CInput
                      required
                      id="first_name"
                      placeholder="Masukkan Nama Lengkap"
                      onChange={this.handleInputChangeWithValidation}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol className="my-1">
                  <CFormGroup>
                    <CLabel htmlFor="mobilePhone">No Hp</CLabel>
                    <CInput
                      id="mobilePhone"
                      placeholder="Masukkan No. Hp Pasien"
                      onChange={this.handleInputChangeWithValidation}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol className="my-1">
                  <CFormGroup>
                    <CLabel htmlFor="nik">NIK</CLabel>
                    <CInput
                      id="nik"
                      type="number"
                      placeholder="Masukkan NIK"
                      onChange={this.handleInputChangeWithValidation}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol className="my-1">
                  <CFormGroup>
                    <CLabel htmlFor="job">Pekerjaan</CLabel>
                    <CInput
                      id="job"
                      type="text"
                      placeholder="Masukkan Pekerjaan"
                      onChange={this.handleInputChangeWithValidation}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol className="my-1">
                  <CFormGroup>
                    <CLabel htmlFor="birthDateStr">
                      Tanggal Lahir {asteriskSymbol}
                    </CLabel>
                    <CInput
                      required
                      id="birthDateStr"
                      type="date"
                      placeholder="Masukkan Tanggal Lahir"
                      onChange={this.handleInputChangeWithValidation}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol className="my-1">
                  <CFormGroup>
                    <CLabel htmlFor="relationship">Hubungan Keluarga</CLabel>
                    <CSelect
                      id="relationship"
                      onChange={this.handleInputChangeWithValidation}
                      value={this.state.relationship}
                    >
                      <option value="">-- Pilih Hubungan Keluarga --</option>
                      <option value="Istri">Istri</option>
                      <option value="Suami">Suami</option>
                      <option value="Ayah">Ayah</option>
                      <option value="Ibu">Ibu</option>
                      <option value="Saudara">Saudara</option>
                      <option value="Anak">Anak</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol className="my-1">
                  <CFormGroup>
                    <CLabel htmlFor="gender">
                      Jenis Kelamin {asteriskSymbol}
                    </CLabel>
                    <CSelect
                      required
                      id="gender"
                      onChange={this.handleInputChangeWithValidation}
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
                disabled={this.state.disabledButton}
                type="submit"
                className="btn-facebook btn-brand mt-4 mr-2"
                onClick={(event) => {
                  if (this.formValidationMember()) {
                    this.addMember();
                  }
                }}
              >
                <span>+ Tambah Pasien</span>
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
        {/* Modal Filter */}
        <CModal
          show={this.state.stateFilter}
          onClose={this.toggleStateFilter}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>
              <strong>Filter</strong>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md="5">
                <CLabel htmlFor="date-input">
                  <strong>Tanggal</strong>
                </CLabel>
                <CInput placeholder="Tanggal Awal" type="date" />
              </CCol>
              <CCol>
                <CLabel></CLabel>
                <span className="mt-4">
                  <span className="mb-1">
                    <strong>
                      <p className="mt-3 text-xl-center">-</p>
                    </strong>
                  </span>
                </span>
              </CCol>
              <CCol md="5">
                <CLabel></CLabel>
                <CInput
                  placeholder="Tanggal Akhir"
                  type="date"
                  className="mt-2"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CLabel className="mt-2">
                  <strong>Kode</strong>
                </CLabel>
              </CCol>
            </CRow>
            <CRow>
              <CFormGroup variant="checkbox" className="ml-3 mt-1 checkbox">
                <CInputCheckbox
                  id="kode"
                  name="hijau"
                  value={this.state.kode.hijau}
                  checked={this.state.kode.hijau}
                  className="my-2"
                  onChange={this.handleCheckBoxFilterChange.bind(this)}
                />
                <CButton
                  shape="pill"
                  color="success"
                  size="m"
                  className="mx-3 mb-2"
                  active
                >
                  Normal
                </CButton>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="ml-4 mt-1 checkbox">
                <CInputCheckbox
                  id="kode"
                  name="kuning"
                  className="my-2"
                  value={this.state.kode.kuning}
                  checked={this.state.kode.kuning}
                  className="my-2"
                  onChange={this.handleCheckBoxFilterChange.bind(this)}
                />
                <CButton
                  shape="pill"
                  color="warning"
                  size="m"
                  className="mx-3 mb-2"
                  active
                >
                  Warning
                </CButton>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="ml-4 mt-1 checkbox">
                <CInputCheckbox
                  id="kode"
                  name="merah"
                  value={this.state.kode.merah}
                  checked={this.state.kode.merah}
                  className="my-2"
                  onChange={this.handleCheckBoxFilterChange.bind(this)}
                />
                <CButton
                  shape="pill"
                  color="danger"
                  size="m"
                  className="mx-3 mb-2"
                  active
                >
                  Abnormal
                </CButton>
              </CFormGroup>
            </CRow>
            <CRow>
              <CCol>
                <CLabel className="mt-2">
                  <strong>Diagnosa</strong>
                </CLabel>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="diagnosa"
                    name="sehat"
                    value={this.state.diagnosa.sehat}
                    checked={this.state.diagnosa.sehat}
                    className="my-2"
                    onChange={this.handleCheckBoxFilterChange.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Sehat
                  </CLabel>
                </CFormGroup>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="diagnosa"
                    name="suspek"
                    value={this.state.diagnosa.suspek}
                    checked={this.state.diagnosa.suspek}
                    className="my-2"
                    onChange={this.handleCheckBoxFilterChange.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Suspek
                  </CLabel>
                </CFormGroup>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="diagnosa"
                    name="sehat"
                    value={this.state.diagnosa.kontakErat}
                    checked={this.state.diagnosa.kontakErat}
                    className="my-2"
                    onChange={this.handleCheckBoxFilterChange.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Kontak erat
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="diagnosa"
                    name="covidRingan"
                    value={this.state.diagnosa.covidRingan}
                    checked={this.state.diagnosa.covidRingan}
                    className="my-2"
                    onChange={this.handleCheckBoxFilterChange.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Covid-19 terkonfirmasi ringan
                  </CLabel>
                </CFormGroup>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="isiAlamat"
                    name="isiAlamat"
                    // onChange={this.handleAlamat.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Covid-19 terkonfirmasi sedang
                  </CLabel>
                </CFormGroup>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="isiAlamat"
                    name="isiAlamat"
                    // onChange={this.handleAlamat.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Covid-19 terkonfirmasi berat
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CLabel className="mt-2">
                  <strong>Status</strong>
                </CLabel>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="isiAlamat"
                    name="isiAlamat"
                    // onChange={this.handleAlamat.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Isolasi Mandiri
                  </CLabel>
                </CFormGroup>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="isiAlamat"
                    name="isiAlamat"
                    // onChange={this.handleAlamat.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Isolasi Shelter
                  </CLabel>
                </CFormGroup>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="isiAlamat"
                    name="isiAlamat"
                    // onChange={this.handleAlamat.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Rujuk RS
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="isiAlamat"
                    name="isiAlamat"
                    // onChange={this.handleAlamat.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Selesai Isolasi
                  </CLabel>
                </CFormGroup>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                >
                  <CInputCheckbox
                    id="isiAlamat"
                    name="isiAlamat"
                    // onChange={this.handleAlamat.bind(this)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="demam"
                  >
                    Gagal Monitoring
                  </CLabel>
                </CFormGroup>
                <CFormGroup
                  row
                  variant="checkbox"
                  className="my-3 ml-1 checkbox"
                ></CFormGroup>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              className="btn-light mr-1 float-right"

              // onClick={() => {
              //   this.toggleStateEditData();
              // }}
            >
              <span>Hapus Filter</span>
            </CButton>
            <CButton
              className="btn-facebook btn-brand mr-1 float-right"
              onClick={() => {
                console.log(this.state.kode);
                console.log(this.state.diagnosa);
              }}
            >
              <span>Terapkan</span>
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
