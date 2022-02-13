import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDataTable,
  CButton,
  CCardHeader,
  CForm,
  CFormGroup,
  CLabel,
  CInputGroup,
  CInputGroupPrepend,
  CInput,
  CInputGroupText,
} from "@coreui/react";
import moment from "moment";
import "react-step-progress/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";

const cpptFields = [
  {
    key: "no",
    sorter: false,
  },
  {
    key: "createdDate",
    label: "Tanggal",
    sorter: true,
  },
  {
    key: "subjektif",
    sorter: false,
  },
  {
    key: "objektif",
    sorter: false,
  },
  {
    key: "assessment",
    sorter: false,
  },
  {
    key: "plan",
    sorter: false,
  },
  {
    key: "createBy",
    label: "Updated By",
    sorter: false,
  },
  {
    key: "action",
    sorter: false,
  },
  // "updateBy",
];

const idLocale = require("moment/locale/id");
var dateNow = moment(Date.now()).locale("id", idLocale).format("LLLL");

export default class Cppt extends Component {
  constructor() {
    super();
    this.state = {
      akunID: "",
      memberID: "",
      cpptList: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      akunID: this.props.match.params.akunID,
      memberID: this.props.match.params.memberID,
    });
    this.cpptList();
  }
  cpptList = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/cppt/list?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        console.log("CPPT List", data);
        var gejalaList = [];
        data.data.items.forEach((element) => {
          var tempListGejala = [];
          var tempGejala = Object.entries(element.subjective);
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
                if (value === true) tempListGejala.push("Ageusia");
              }
              if (key === "anosmia") {
                if (value === true) tempListGejala.push("Anosmia");
              }
              if (key === "batuk") {
                if (value === true) tempListGejala.push("Batuk");
              }
              if (key === "demam") {
                if (value === true) tempListGejala.push("Demam");
              }
              if (key === "demam14HariSebelumnya") {
                if (value === true)
                  tempListGejala.push("Demam 14 Hari Sebelumnya");
              }
              if (key === "diare") {
                if (value === true) tempListGejala.push("Diare");
              }
              if (key === "kelelahan") {
                if (value === true) tempListGejala.push("Kelelahan");
              }
              if (key === "kulitKebiruan") {
                if (value === true) tempListGejala.push("Kulit Kebiruan");
              }
              if (key === "lainnya") {
                if (value !== "") tempListGejala.push(value);
              }
              if (key === "nyeriDada") {
                if (value === true) tempListGejala.push("Nyeri Dada");
              }
              if (key === "nyeriOtot") {
                if (value === true) tempListGejala.push("Nyeri Otot");
              }
              if (key === "nyeriTenggorokan") {
                if (value === true) tempListGejala.push("Nyeri Tenggorokan");
              }
              if (key === "pilek") {
                if (value === true) tempListGejala.push("Pilek");
              }
              if (key === "sakitKepala") {
                if (value === true) tempListGejala.push("Sakit Kepala");
              }
              if (key === "sesakNafas") {
                if (value === true) tempListGejala.push("Sesak Nafas");
              }
              if (key === "suhuDemam") {
                if (value !== "") tempListGejala.push(value);
              }
              if (key === "sulitBangun") {
                if (value === true) tempListGejala.push("Sulit Bangun");
              }
              if (key === "tidakNafsuMakan") {
                if (value === true) tempListGejala.push("Tidak Nafsu Makan");
              }
            }
          });
          gejalaList.push({
            ...element,
            subjective: tempListGejala,
          });
        });
        console.log("Gejala Olah", gejalaList);
        this.setState({
          cpptList: gejalaList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        <CRow className="my-3">
          <CCol>
            <Link
              to={`/medical_record/detail_pasien/${this.state.akunID}/${this.state.memberID}`}
              className="btn btn-outline-info btn-lg mr-2"
            >
              Data Umum
            </Link>
            <CButton
              className="btn-outline-info mr-2"
              size="lg"
              active
              color="info"
            >
              <span>CPPT</span>
            </CButton>
            {/* <CButton className="btn-outline-info mr-2" size="lg">
              <span>Terapi</span>
            </CButton>
            <CButton className="btn-outline-info mr-2" size="lg">
              <span>Resume Pasien</span>
            </CButton> */}
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Catatan Perkembangan Pasien Terintegrasi</strong>
                {/* <CButton
                  className="btn-facebook mr-1 float-right"
                >
                  <CIcon name="cil-pencil" className="mr-2" />
                  <span>Isi Data</span>
                </CButton> */}
                <Link
                  to={`/medical_record/detail_pasien/cppt/cppt_data/${this.state.akunID}/${this.state.memberID}`}
                  className="btn btn-facebook float-right"
                >
                  <CIcon name="cil-pencil" className="mr-2" />
                  Isi Data
                </Link>
              </CCardHeader>
              {/* <CRow>
                <CCol>
                  
                    <CRow className="mr-4">
                      <CCol md="3" className="ml-3">
                        <CLabel className="mt-4 ml-3"></CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-magnifying-glass" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            id="input1-group2"
                            name="input1-group2"
                            placeholder="Search"
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>

                </CCol>
              </CRow> */}
              <CCardBody>
                <CDataTable
                  tableFilter
                  items={this.state.cpptList}
                  fields={cpptFields}
                  itemsPerPage={5}
                  sorter
                  pagination
                  scopedSlots={{
                    no: (item, index) => <td>{index + 1}</td>,
                    createdDate: (item) => (
                      <td>
                        {moment(item.createdDate).format("dddd, DD MMMM yyyy")}
                      </td>
                    ),
                    subjektif: (item) => (
                      <td>
                        {item.subjective.map((element) => {
                          return `${element}, `;
                        })}
                      </td>
                    ),
                    assessment: (item) => (
                      <td>
                        <CRow>
                          Diagnosa Utama:{" "}
                          {item.assessment.diagnosaUtama ?? "Tidak ada"}
                        </CRow>
                        <CRow>
                          Diagnosa Tambahan:{" "}
                          {item.assessment.diagnosaTambahan ?? "Tidak ada"}
                        </CRow>
                      </td>
                    ),
                    objektif: (item) =>
                      item.objective ? (
                        <td>
                          <CRow>Kesan Umum : {item.objective.kesanUmum}</CRow>
                          <CRow>SpO2 : {item.objective.spo2}</CRow>
                          <CRow>Suhu : {item.objective.suhu}</CRow>
                          <CRow>TD : {item.objective.tekananDarah}</CRow>
                          <CRow>HR : {item.objective.nadi}</CRow>
                          <CRow>RR : {item.objective.lajuNafas}</CRow>
                          <CRow>Lainnya : {item.objective.lainnya}</CRow>
                        </td>
                      ) : (
                        <td>Belum ada data</td>
                      ),
                    action: (item) => (
                      <td>
                        <Link
                          to={`/medical_record/detail_pasien/cppt/cppt_data/${item.akunID}/${item.memberID}/${item.id}`}
                        >
                          <CButton color="info" size="sm">
                            Edit Data
                          </CButton>
                        </Link>
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
      </div>
    );
  }
}
