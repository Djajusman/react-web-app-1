import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CCardHeader,
  CInput,
  CForm,
  CFormGroup,
  CLabel,
  CTextarea,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CInputCheckbox,
  CSwitch,
  CSelect,
} from "@coreui/react";
import moment from "moment";
import "react-step-progress/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";

const idLocale = require("moment/locale/id");
var dateNow = moment(Date.now()).locale("id", idLocale).format("LLLL");

export default class CpptData extends Component {
  constructor() {
    super();
    this.state = {
      isNew: true,
      dataPasienGet: {
        noRM: "",
        fullName: "",
        nik: "",
        birthDate: "",
        mobilePhone: "",
        gender: "L",
        tglIsolasi: "",
        hariIsolasi: 0,
        statusMonitoring: "",
        diagnosa: "",
        tinggiBadan: 0,
        beratBadan: 0,
        bmi: 0,
        alergi: "",
        komorbid: "",
        alamatDomisili: "",
        alamatIsolasiMandiri: "",
        symptomsSwitch: false,
        pemeriksaanSwitch: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      this.setState({
        isNew: false,
      });
      this.cpptGet();
    }
    this.dataPasienGet();
    this.clearAssesmentAndPlan();
    this.clearPemeriksaan();
    this.clearSymptoms();
  }
  handleCheckBoxChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value == "true" ? true : false,
    });
  };
  clearSymptoms = () => {
    this.setState({
      isExist: false,
      demam: false,
      suhuDemam: "",
      demam14HariSebelumnya: false,
      batuk: false,
      kelelahan: false,
      sakitKepala: false,
      nyeriOtot: false,
      nyeriTenggorokan: false,
      pilek: false,
      tidakNafsuMakan: false,
      diare: false,
      anosmia: false,
      ageusia: false,
      sesakNafas: false,
      nyeriDada: false,
      kulitKebiruan: false,
      sulitBangun: false,
      isExist: false,
      lainnyaSubjective: "",
    });
  };
  clearPemeriksaan = () => {
    this.setState({
      spo2: "",
      suhu: "",
      tekananDarah: "",
      nadi: "",
      lajuNafas: "",
      tinggiBadan: "",
      beratBadan: "",
      statusNyeri: "",
      bmi: "",
      lainnyaObjective: "",
      kesanUmum: "",
    });
  };
  clearAssesmentAndPlan = () => {
    this.setState({
      diagnosaUtama: "",
      diagnosaTambahan: "",
      plan: "",
    });
  };
  cpptGet = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/cppt/get?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}&id=${this.props.match.params.id}`,
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
        console.log("Detail CPPT =>", data);
        this.setState({
          createdDate: data.data.createdDate,
          createBy: data.data.createBy,
          // Subjective
          idsubjektif: data.data.subjective.id,
          isExist: data.data.subjective.isExist,
          demam: data.data.subjective.demam,
          suhuDemam: data.data.subjective.suhuDemam,
          demam14HariSebelumnya: data.data.subjective.demam14HariSebelumnya,
          batuk: data.data.subjective.batuk,
          kelelahan: data.data.subjective.kelelahan,
          sakitKepala: data.data.subjective.sakitKepala,
          nyeriOtot: data.data.subjective.nyeriOtot,
          nyeriTenggorokan: data.data.subjective.nyeriTenggorokan,
          pilek: data.data.subjective.pilek,
          tidakNafsuMakan: data.data.subjective.tidakNafsuMakan,
          diare: data.data.subjective.diare,
          anosmia: data.data.subjective.anosmia,
          ageusia: data.data.subjective.ageusia,
          sesakNafas: data.data.subjective.sesakNafas,
          nyeriDada: data.data.subjective.nyeriDada,
          kulitKebiruan: data.data.subjective.kulitKebiruan,
          sulitBangun: data.data.subjective.sulitBangun,
          lainnyaSubjective: data.data.subjective.lainnya,
          //Objective
          idobjektif: data.data.objective.id,
          spo2: data.data.objective.spo2,
          suhu: data.data.objective.suhu,
          tekananDarah: data.data.objective.tekananDarah,
          nadi: data.data.objective.nadi,
          lajuNafas: data.data.objective.lajuNafas,
          tinggiBadan: data.data.objective.tinggiBadan,
          beratBadan: data.data.objective.beratBadan,
          statusNyeri: data.data.objective.statusNyeri,
          bmi: data.data.objective.bmi,
          lainnyaObjective: data.data.objective.lainnya,
          //Assessment
          idasssesment: data.data.assessment.id,
          diagnosaUtama: data.data.assessment.diagnosaUtama,
          diagnosaTambahan: data.data.assessment.diagnosaUtama,

          plan: data.data.plan,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  dataPasienGet = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/detail/get?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        console.log("DetailPasien =>", data);
        this.setState({
          dataPasienGet: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  gejalaGet = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/symptoms/get?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        console.log("symptom", data);
        this.setState({
          isExist: data.data.isExist,
          demam: data.data.demam,
          suhuDemam: data.data.suhuDemam,
          demam14HariSebelumnya: data.data.demam14HariSebelumnya,
          batuk: data.data.batuk,
          kelelahan: data.data.kelelahan,
          sakitKepala: data.data.sakitKepala,
          nyeriOtot: data.data.nyeriOtot,
          nyeriTenggorokan: data.data.nyeriTenggorokan,
          pilek: data.data.pilek,
          tidakNafsuMakan: data.data.tidakNafsuMakan,
          diare: data.data.diare,
          anosmia: data.data.anosmia,
          ageusia: data.data.ageusia,
          sesakNafas: data.data.sesakNafas,
          nyeriDada: data.data.nyeriDada,
          kulitKebiruan: data.data.kulitKebiruan,
          sulitBangun: data.data.sulitBangun,
          lainnyaSubjective: data.data.lainnya,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  pemeriksaanGet = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/pemeriksaan/get?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        console.log("Pemeriksaan", data);
        this.setState({
          spo2: data.data.spo2,
          suhu: data.data.suhu,
          tekananDarah: data.data.tekananDarah,
          nadi: data.data.nadi,
          lajuNafas: data.data.lajuNafas,
          tinggiBadan: data.data.tinggiBadan,
          beratBadan: data.data.beratBadan,
          statusNyeri: data.data.statusNyeri,
          bmi: data.data.bmi,
          lainnyaObjective: data.data.lainnya,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  cpptDataAdd = () => {
    var body = {
      akunID: this.props.match.params.akunID,
      memberID: this.props.match.params.memberID,
      subjective: {
        isExist: this.state.isExist,
        demam: this.state.demam,
        suhuDemam: this.state.suhuDemam,
        demam14HariSebelumnya: this.state.demam14HariSebelumnya,
        batuk: this.state.batuk,
        kelelahan: this.state.kelelahan,
        sakitKepala: this.state.sakitKepala,
        nyeriOtot: this.state.nyeriOtot,
        nyeriTenggorokan: this.state.nyeriTenggorokan,
        pilek: this.state.pilek,
        tidakNafsuMakan: this.state.tidakNafsuMakan,
        diare: this.state.diare,
        anosmia: this.state.anosmia,
        ageusia: this.state.ageusia,
        sesakNafas: this.state.sesakNafas,
        nyeriDada: this.state.nyeriDada,
        kulitKebiruan: this.state.kulitKebiruan,
        sulitBangun: this.state.sulitBangun,
        lainnya: this.state.lainnyaSubjective,
      },
      objective: {
        spo2: parseFloat(this.state.spo2),
        suhu: parseFloat(this.state.suhu),
        tekananDarah: this.state.tekananDarah,
        nadi: parseFloat(this.state.nadi),
        lajuNafas: parseFloat(this.state.lajuNafas),
        tinggiBadan: parseFloat(this.state.tinggiBadan),
        beratBadan: parseFloat(this.state.beratBadan),
        statusNyeri: parseInt(this.state.statusNyeri),
        lainnya: this.state.lainnyaObjective,
        kesanUmum: this.state.kesanUmum,
      },
      assessment: {
        diagnosaUtama: this.state.diagnosaUtama,
        diagnosaTambahan: this.state.diagnosaTambahan,
      },
      plan: this.state.plan,
    };
    console.log("Body Add CPPT", body);

    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/cppt/add?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("status")) {
          if (data.status === "OK") {
            toast.success("Tambah Data Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.props.history.goBack();
          } else {
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
      .catch((error) => console.error(error));
  };
  cpptDataUpdate = () => {
    var body = {
      id: this.props.match.params.id,
      akunID: this.props.match.params.akunID,
      memberID: this.props.match.params.memberID,
      createBy: this.state.createBy,
      createdDate: this.state.createdDate,
      subjective: {
        id: this.state.idsubjektif,
        isExist: this.state.isExist,
        demam: this.state.demam,
        suhuDemam: this.state.suhuDemam,
        demam14HariSebelumnya: this.state.demam14HariSebelumnya,
        batuk: this.state.batuk,
        kelelahan: this.state.kelelahan,
        sakitKepala: this.state.sakitKepala,
        nyeriOtot: this.state.nyeriOtot,
        nyeriTenggorokan: this.state.nyeriTenggorokan,
        pilek: this.state.pilek,
        tidakNafsuMakan: this.state.tidakNafsuMakan,
        diare: this.state.diare,
        anosmia: this.state.anosmia,
        ageusia: this.state.ageusia,
        sesakNafas: this.state.sesakNafas,
        nyeriDada: this.state.nyeriDada,
        kulitKebiruan: this.state.kulitKebiruan,
        sulitBangun: this.state.sulitBangun,
        lainnya: this.state.lainnyaSubjective,
      },
      objective: {
        id: this.state.idobjektif,
        spo2: parseFloat(this.state.spo2),
        suhu: parseFloat(this.state.suhu),
        tekananDarah: this.state.tekananDarah,
        nadi: parseFloat(this.state.nadi),
        lajuNafas: parseFloat(this.state.lajuNafas),
        tinggiBadan: parseFloat(this.state.tinggiBadan),
        beratBadan: parseFloat(this.state.beratBadan),
        statusNyeri: parseInt(this.state.statusNyeri),
        lainnya: this.state.lainnyaObjective,
        kesanUmum: this.state.kesanUmum,
      },
      assessment: {
        id: this.state.assessment,
        diagnosaUtama: this.state.diagnosaUtama,
        diagnosaTambahan: this.state.diagnosaTambahan,
      },
      plan: this.state.plan,
    };
    console.log("Body Update CPPT", body);

    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/cppt/update?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("status")) {
          if (data.status === "OK") {
            toast.success("Update Data Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.props.history.goBack();
          } else {
            toast.error("Update Data Gagal " + data.statusmsg, {
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

  render() {
    return (
      <div className="container-fluid">
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Data Pasien</strong>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md="4">
                    <CRow>
                      <CCol sm="3" md="5">
                        <CLabel>No. RM</CLabel>
                      </CCol>
                      <CCol sm="3" md="7">
                        <strong>: {this.state.dataPasienGet.noRM}</strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Nama</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>: {this.state.dataPasienGet.fullName}</strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>NIK</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>: {this.state.dataPasienGet.nik}</strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Tanggal Lahir</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          :{" "}
                          {moment(this.state.dataPasienGet.birthDate).format(
                            "dddd, DD MMMM yyyy"
                          )}
                        </strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>No. Hp</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          : {this.state.dataPasienGet.mobilePhone}
                        </strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Jenis Kelamin</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          :{" "}
                          {this.state.dataPasienGet.gender === "L"
                            ? "Laki-Laki"
                            : "Perempuan"}
                        </strong>
                      </CCol>
                    </CRow>
                  </CCol>

                  <CCol md="4">
                    <CRow>
                      <CCol md="5">
                        <CLabel>Tanggal Isolasi</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          :{" "}
                          {this.state.dataPasienGet.tglIsolasi !==
                          "0001-01-01T00:00:00Z"
                            ? moment(
                                this.state.dataPasienGet.tglIsolasi
                              ).format("dddd, DD MMMM yyyy")
                            : ""}
                        </strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Hari Isolasi</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          : Ke-{this.state.dataPasienGet.hariIsolasi}
                        </strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Status</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>: {this.state.dataPasienGet.status}</strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Diagnosis</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>: {this.state.dataPasienGet.diagnosa}</strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>TB/BB/ (BMI)</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          :{" "}
                          {`${this.state.dataPasienGet.tinggiBadan} cm / ${
                            this.state.dataPasienGet.beratBadan
                          } kg (${
                            this.state.dataPasienGet.beratBadan /
                            ((this.state.dataPasienGet.tinggiBadan / 100) ^ 2)
                          })`}
                        </strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Alergi</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>: {this.state.dataPasienGet.alergi}</strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Komorbid</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>: {this.state.dataPasienGet.komorbid}</strong>
                      </CCol>
                    </CRow>
                  </CCol>

                  <CCol md="4">
                    <CRow>
                      <CCol md="5">
                        <CLabel>Alamat Domisili</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          : {this.state.dataPasienGet.alamatDomisili}
                        </strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Alamat Isolasi</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          : {this.state.dataPasienGet.alamatIsolasiMandiri}
                        </strong>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Subjektif (Gejala dan Keluhan)</strong>
                <CSwitch
                  className="float-right"
                  color="info"
                  checked={this.state.symptomsSwitch}
                  shape="pill"
                  onChange={() => {
                    if (this.state.symptomsSwitch) {
                      this.clearSymptoms();
                      this.setState({
                        symptomsSwitch: false,
                      });
                    } else {
                      this.gejalaGet();
                      this.setState({
                        symptomsSwitch: true,
                      });
                    }
                  }}
                />
                <CLabel className="float-right mr-2 my-1">
                  Gunakan data Perjalanan Gejala terakhir
                </CLabel>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CFormGroup row className="ml-2 my-2">
                    <CCol md="4">
                      <CInputCheckbox
                        id="demam"
                        name="demam"
                        className="my-1"
                        checked={this.state.demam}
                        value={!this.state.demam}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="demam"
                      >
                        Demam
                      </CLabel>
                    </CCol>

                    <CCol md="6">
                      <CInputCheckbox
                        id="anosmia"
                        name="anosmia"
                        className="my-1"
                        checked={this.state.anosmia}
                        value={!this.state.anosmia}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="anosmia"
                      >
                        Kehilangan kemampuan indera penciuman / kesulitan membau
                        (anosmia)
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="ml-2 my-2">
                    <CCol md="4">
                      <CInputCheckbox
                        id="batuk"
                        name="batuk"
                        className="my-1"
                        checked={this.state.batuk}
                        value={!this.state.batuk}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="batuk"
                      >
                        Batuk
                      </CLabel>
                    </CCol>
                    <CCol md="8">
                      <CInputCheckbox
                        id="ageusia"
                        name="ageusia"
                        className="my-1"
                        checked={this.state.ageusia}
                        value={!this.state.ageusia}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="ageusia"
                      >
                        Kehilangan kemampuan indera perasa / kesulitan merasakan
                        rasa makanan / minuman yang masuk ke mulut (ageusia)
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="ml-2 my-2">
                    <CCol md="4">
                      <CInputCheckbox
                        id="kelelahan"
                        name="kelelahan"
                        className="my-1"
                        checked={this.state.kelelahan}
                        value={!this.state.kelelahan}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="kelelahan"
                      >
                        Kelelahan
                      </CLabel>
                    </CCol>
                    <CCol md="6">
                      <CInputCheckbox
                        id="sesakNafas"
                        name="sesakNafas"
                        className="my-1"
                        checked={this.state.sesakNafas}
                        value={!this.state.sesakNafas}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="sesakNafas"
                      >
                        Sesak Nafas
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="ml-2 my-2">
                    <CCol md="4">
                      <CInputCheckbox
                        id="sakitKepala"
                        name="sakitKepala"
                        className="my-1"
                        checked={this.state.sakitKepala}
                        value={!this.state.sakitKepala}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="sakitKepala"
                      >
                        Sakit Kepala
                      </CLabel>
                    </CCol>
                    <CCol md="6">
                      <CInputCheckbox
                        id="nyeriDada"
                        name="nyeriDada"
                        className="my-1"
                        checked={this.state.nyeriDada}
                        value={!this.state.nyeriDada}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="nyeriDada"
                      >
                        Nyeri pada dada terus menerus atau merasa seperti
                        tertekan pada area dada
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="ml-2 my-2">
                    <CCol md="4">
                      <CInputCheckbox
                        id="nyeriOtot"
                        name="nyeriOtot"
                        className="my-1"
                        checked={this.state.nyeriOtot}
                        value={!this.state.nyeriOtot}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="nyeriOtot"
                      >
                        Nyeri Otot
                      </CLabel>
                    </CCol>
                    <CCol md="6">
                      <CInputCheckbox
                        id="kulitKebiruan"
                        name="kulitKebiruan"
                        className="my-1"
                        checked={this.state.kulitKebiruan}
                        value={!this.state.kulitKebiruan}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="kulitKebiruan"
                      >
                        Bibir atau wajah tampak kebiruan
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="ml-2 my-2">
                    <CCol md="4">
                      <CInputCheckbox
                        id="nyeriTenggorokan"
                        name="nyeriTenggorokan"
                        className="my-1"
                        checked={this.state.nyeriTenggorokan}
                        value={!this.state.nyeriTenggorokan}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="nyeriTenggorokan"
                      >
                        Nyeri Tenggorokan
                      </CLabel>
                    </CCol>
                    <CCol md="6">
                      <CInputCheckbox
                        id="sulitBangun"
                        name="sulitBangun"
                        className="my-1"
                        checked={this.state.sulitBangun}
                        value={!this.state.sulitBangun}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="sulitBangun"
                      >
                        Sulit untuk dibangunkan ATAU perlu dirangsang nyeri
                        untuk dapat sadar ATAU hilang kesadaran
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="ml-2 my-2">
                    <CCol md="4">
                      <CInputCheckbox
                        id="pilek"
                        name="pilek"
                        className="my-1"
                        checked={this.state.pilek}
                        value={!this.state.pilek}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="pilek"
                      >
                        Pilek (hidung meler) / Hidung tersumbat
                      </CLabel>
                    </CCol>
                    <CCol md="6">
                      <CInputCheckbox
                        id="lainnyaSubjectiveCheckBox"
                        name="lainnyaSubjectiveCheckBox"
                        className="my-1"
                        checked={this.state.lainnyaSubjectiveCheckBox}
                        value={!this.state.lainnyaSubjectiveCheckBox}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="lainnyaSubjectiveCheckBox"
                      >
                        Lainnya
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="ml-2 my-2">
                    <CCol md="4">
                      <CInputCheckbox
                        id="tidakNafsuMakan"
                        name="tidakNafsuMakan"
                        className="my-1"
                        checked={this.state.tidakNafsuMakan}
                        value={!this.state.tidakNafsuMakan}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="tidakNafsuMakan"
                      >
                        Tidak mau makan/mual/muntah
                      </CLabel>
                    </CCol>
                    <CCol md="8">
                      <CInput
                        onChange={this.handleInputChange}
                        id="lainnyaSubjective"
                        type="text"
                        placeholder="Lainnya..."
                        value={this.state.lainnyaSubjective}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row className="ml-2 my-2">
                    <CCol md="4">
                      <CInputCheckbox
                        id="diare"
                        name="diare"
                        className="my-1"
                        checked={this.state.diare}
                        value={!this.state.diare}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="diare"
                      >
                        Diare
                      </CLabel>
                    </CCol>

                    <CCol md="6">
                      <CInputCheckbox
                        id="demam14HariSebelumnya"
                        name="demam14HariSebelumnya"
                        className="my-1"
                        checked={this.state.demam14HariSebelumnya}
                        value={!this.state.demam14HariSebelumnya}
                        onChange={this.handleCheckBoxChange.bind(this)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="form-check-label"
                        htmlFor="demam14HariSebelumnya"
                      >
                        Demam 14 hari sebelumnya
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* Card Objektif */}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Objektif</strong>
                <CSwitch
                  className="float-right"
                  color="info"
                  checked={this.state.pemeriksaanSwitch}
                  shape="pill"
                  onChange={() => {
                    if (this.state.pemeriksaanSwitch) {
                      this.clearPemeriksaan();
                      this.setState({
                        pemeriksaanSwitch: false,
                      });
                    } else {
                      this.pemeriksaanGet();
                      this.setState({
                        pemeriksaanSwitch: true,
                      });
                    }
                  }}
                />
                <CLabel className="float-right mr-2 my-1">
                  Gunakan data Pemeriksaan terakhir
                </CLabel>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CFormGroup row>
                    <CCol>
                      <CLabel className="my-2">SpO2</CLabel>
                      <CInputGroup>
                        <CInput
                          onChange={this.handleInputChange}
                          id="spo2"
                          type="text"
                          value={this.state.spo2}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>%</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Suhu</CLabel>
                      <CInputGroup>
                        <CInput
                          onChange={this.handleInputChange}
                          id="suhu"
                          type="text"
                          value={this.state.suhu}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>°</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Tekanan Darah</CLabel>
                      <CInputGroup>
                        <CInput
                          onChange={this.handleInputChange}
                          id="tekananDarah"
                          type="text"
                          value={this.state.tekananDarah}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>mmHg</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Nadi</CLabel>
                      <CInputGroup>
                        <CInput
                          onChange={this.handleInputChange}
                          id="nadi"
                          type="text"
                          value={this.state.nadi}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>x</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Laju Nafas</CLabel>
                      <CInputGroup>
                        <CInput
                          onChange={this.handleInputChange}
                          id="lajuNafas"
                          type="text"
                          value={this.state.lajuNafas}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>x</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CLabel className="my-2">Berat Badan</CLabel>
                      <CInputGroup>
                        <CInput
                          onChange={this.handleInputChange}
                          id="beratBadan"
                          type="text"
                          value={this.state.beratBadan}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>kg</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Tinggi Badan</CLabel>
                      <CInputGroup>
                        <CInput
                          onChange={this.handleInputChange}
                          id="tinggiBadan"
                          type="text"
                          value={this.state.tinggiBadan}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>cm</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Body Max Index (BMI)</CLabel>
                      <CInput
                        disabled
                        onChange={this.handleInputChange}
                        id="bmi"
                        type="text"
                        value={parseFloat(
                          this.state.beratBadan /
                            ((this.state.tinggiBadan / 100) ^ 2)
                        )}
                      />
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Status Nyeri</CLabel>
                      <CInput
                        onChange={this.handleInputChange}
                        id="statusNyeri"
                        type="text"
                        value={this.state.statusNyeri}
                      />
                    </CCol>
                    {/* <CCol>
                      <CLabel className="my-2">Lainnya</CLabel>
                      <CInput
                        onChange={this.handleInputChange}
                        id="lainnyaObjective"
                        type="text"
                        value={this.state.lainnyaObjective}
                      />
                    </CCol> */}
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CLabel>Kesan Umum</CLabel>
                      <CTextarea
                        name="textarea-input"
                        id="kesanUmum"
                        className="form-control"
                        rows="3"
                        value={this.state.kesanUmum}
                        onChange={this.handleInputChange}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CLabel>Pemeriksaan Fisik</CLabel>
                      <CTextarea
                        className="form-control"
                        rows="3"
                        name="textarea-input"
                        onChange={this.handleInputChange}
                        id="lainnyaObjective"
                        type="text"
                        value={this.state.lainnyaObjective}
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* Card Assesment */}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Assesment</strong>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CFormGroup row>
                    <CCol>
                      <CLabel>Pilih Diagnosa Utama</CLabel>
                      <CSelect
                        id="diagnosaUtama"
                        onChange={this.handleInputChange.bind(this)}
                        value={this.state.diagnosaUtama}
                      >
                        <option value="" key="">
                          -- Pilih Diagnosa --
                        </option>
                        <option value="Konfirmasi" key="Konfirmasi">
                          Konfirmasi
                        </option>
                        <option value="Kontak Erat" key="Kontak Erat">
                          Kontak Erat
                        </option>
                        <option value="Probable" key="Probable">
                          Probable
                        </option>
                        <option value="Sehat" key="Sehat">
                          Sehat
                        </option>
                        <option value="Suspek" key="Suspek">
                          Suspek
                        </option>
                      </CSelect>
                    </CCol>
                    <CCol></CCol>
                    <CCol></CCol>
                    <CCol></CCol>
                    <CCol></CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CLabel>Diagnosa Tambahan</CLabel>
                      <CInput
                        onChange={this.handleInputChange}
                        id="diagnosaTambahan"
                        type="text"
                        placeholder="Masukkan diagnosa tambahan (jika ada)"
                        value={this.state.diagnosaTambahan}
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* Card Plan */}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Plan</strong>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CFormGroup row>
                    <CCol>
                      <CLabel>Detail Plan</CLabel>
                      <CTextarea
                        onChange={this.handleInputChange}
                        name="textarea-input"
                        id="plan"
                        className="form-control"
                        placeholder="Jelaskan plan..."
                        rows="3"
                        value={this.state.plan}
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol className="float-right my-3">
            <CButton
              className="btn-facebook btn-brand float-right"
              onClick={() => {
                if (this.state.isNew) this.cpptDataAdd();
                else this.cpptDataUpdate();
              }}
            >
              <span>Simpan</span>
            </CButton>
            <CButton
              className="btn-light mr-2 float-right"
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              <span>Kembali</span>
            </CButton>
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
      </div>
    );
  }
}
