import React, { Component } from "react";
import {
  CCardGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CImg,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CButton,
  CDataTable,
  CInput,
  CSelect,
} from "@coreui/react";
import { CChartPie, CChartBar } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import moment from "moment";
import Chart from "react-google-charts";
// import DatetimeRangePicker from "react-datetime-range-picker";
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      dashboardList: [],
      diagnosaDataSets: [],
      genderDataSets: [],
      usiaDataSets: [],
      statusMonitoringDataSets: [],
      jenisPenggunaDataSets: [],
      lokasiPasien: [],
      namaPuskesmas: "",
      aktivuser: "",
      totalPengguna: 0,
      pasienProkes: 0,
      pasienSelesaiDimonitor: 0,
      jumlahVolunteer: 0,
      puskesmas: [],
      startDate: "",
      endDate: "",
      //PIE CHART
      // filterDiagnosa: [],
      // filterJenisKelamin: [],
      // filterUsia: [],
      // filterStatusMonitoring: [],
      // filterJenisPengguna: [],
    };
  }
  componentDidMount() {
    this.dasboardList("");
    this.getAllUser();
    this.puskesmaslist();
  }

  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  handleDateChange = (event) => {
    this.setState({
      startDate: moment(event.start).format("YYYY-MM-DDT00:00:00.000Z"),
      endDate: moment(event.end).format("YYYY-MM-DDT23:59:59.000Z"),
    });
  };
  handlePuskesmasChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
    // if (event.target.value == "") {
    //   this.getAllPatient(event.target.value, this.state.aktivuser);
    // } else {
    //   this.getAllPatient(event.target.value, "");
    // }
    this.dasboardList(event.target.value);
  };
  handleAktivChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
    this.getAllPatient(this.state.namaPuskesmas, event.target.value);
  };
  puskesmaslist = (page) => {
    fetch(
      // "https://api.aktiv.co.id/api/aktivengine/v1/puskesmas/list?page=" + page,
      "https://api.aktiv.co.id/api/aktivengine/v1/puskesmas/list",
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
        console.log("Puskesmas Response", res);
        this.setState(
          {
            puskesmas: res.data.items,
            curr_page: page,
            total_item: res.data.total_item,
          },
          () => console.log(this.state.puskesmas)
        );
      })
      .catch((error) => console.log(error));
  };
  dasboardList = (puskesmasId) => {
    let puskesmasID = "/";
    if (puskesmasId && localStorage.getItem("role") === "admin")
      puskesmasID += puskesmasId;
    else puskesmasID += localStorage.getItem("puskesmasId");
    fetch(
      // "https://api.aktiv.co.id/api/aktivengine/v2/dashboard/get",
      "https://api.aktiv.co.id/service/api/aktivengine/v1/dashboard/get" +
        puskesmasID,
      // "http://192.168.18.8:3000/service/api/aktivengine/v1/dashboard/get" +puskesmasID,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Get Dashboard", data);
        var usiaDataSets = [
          {
            backgroundColor: ["#3699FF", "#F6BF29", "#E54F5B", "#66B983"],
            data: data.data.filterUsia,
          },
        ];
        var statusMonitoringDataSets = [
          {
            backgroundColor: [
              "#3699FF",
              "#F6BF29",
              "#E54F5B",
              "#E5E5E5",
              "#C7B9FF",
            ],
            data: data.data.filterStatusMonitoring,
          },
        ];
        var genderDataSets = [
          {
            backgroundColor: ["#3699FF", "#E46651"],
            data: data.data.filterJenisKelamin,
          },
        ];
        var diagnosaDataSets = [
          {
            backgroundColor: [
              "#3699FF",
              "#E54F5B",
              "#F6BF29",
              "#E5E5E5",
              "#025B95",
            ],
            data: data.data.filterDiagnosa,
          },
        ];
        var jenisPenggunaDataSets = [
          {
            backgroundColor: ["#3699FF", "#F6BF29"],
            data: data.data.filterJenisPengguna,
          },
        ];
        // var lokasiPasien = [];
        // const templokasiPasien = Object.entries(data.data.filterLokasiPasien);
        // templokasiPasien.forEach(([key, value]) => {
        //   if (key != "") {
        //     lokasiPasien.push({
        //       kelurahan: key,
        //       counting: value,
        //     });
        //   }
        // });
        this.setState({
          dashboardList: data.data,
          usiaDataSets: usiaDataSets,
          statusMonitoringDataSets: statusMonitoringDataSets,
          genderDataSets: genderDataSets,
          diagnosaDataSets: diagnosaDataSets,
          jenisPenggunaDataSets: jenisPenggunaDataSets,
          // lokasiPasien: lokasiPasien,
          lokasiPasien: data.data.filterLokasiPasien,
        });
      })
      .catch((error) => console.log(error));
  };
  getAllUser = () => {
    fetch("https://api.aktiv.co.id/service/api/aktivengine/v1/dashboard/user", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Get User", data);
        let userChart = [];
        userChart.push(["Tanggal", "Jumlah"]);
        var tempUserChart = Object.entries(data.data);
        tempUserChart.forEach(([key, value]) => {
          // if (key == "January 0001") userChart.push(["June 2021", value]);
          // else userChart.push([key, value]);
          userChart.push([key, value]);
        });
        console.log("User Chart", userChart);
        this.setState({
          userChart: userChart,
        });
      })
      .catch((error) => console.log(error));
  };
  download = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    // the filename you want
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  downloadExcel = () => {
    var url = `http://192.168.18.8:3000/api/report/v1/dashboard`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        responseType: "stream",
      }),
    })
      .then((response) => {
        console.log("Get Download Response =>", response);
        response.blob().then((blob) => {
          this.download(blob, `Report-Dashboard-${Date.now()}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <>
        {/* <CRow>
          <CCol sm="12">
            <CFormGroup>
              <CButton
                className="btn-outline-success float-right my-2 mr-3"
                onClick={() => {
                  this.downloadExcel();
                }}
              >
                <CIcon name="cilDataTransferDown" className="mr-2" />
                <span>Unduh Excel</span>
              </CButton>
            </CFormGroup>
          </CCol>
        </CRow> */}
        <CCardGroup className="mb-12">
          <CCard className="mr-3 py-3 d-flex align-items-center justify-content-center">
            <CRow>
              <CCol className="d-flex justify-content-center">
                <CImg src="logo/medical-mask.svg" height="45" />
              </CCol>
            </CRow>
            <CRow>
              <CCol className="d-flex justify-content-center text-center">
                <span>Total Pengguna</span>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="d-flex justify-content-center text-center">
                <span>{this.state.dashboardList.totalPengguna}</span>
              </CCol>
            </CRow>
          </CCard>
          <CCard className="mr-3 py-3 d-flex align-items-center justify-content-center">
            <CRow>
              <CCol className="d-flex justify-content-center">
                <CImg src="logo/medical-mask.svg" height="45" />
              </CCol>
            </CRow>
            <CRow>
              <CCol className="d-flex justify-content-center text-center">
                <span>Pengguna Baru Hari Ini</span>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="d-flex justify-content-center text-center">
                <span>{this.state.dashboardList.penggunaHariIni}</span>
              </CCol>
            </CRow>
          </CCard>
          <CCard className="mr-3 py-3 d-flex align-items-center justify-content-center">
            <CRow>
              <CCol className="d-flex justify-content-center">
                <CImg src="logo/heart.svg" height="45" />
              </CCol>
            </CRow>
            <CRow>
              <CCol className="d-flex justify-content-center text-center">
                <span>Pasien yang Memenuhi Prokes</span>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="d-flex justify-content-center text-center">
                <span>{this.state.dashboardList.pasienProkes}</span>
              </CCol>
            </CRow>
          </CCard>
          <CCard className="mr-3 py-3 d-flex align-items-center justify-content-center">
            <CRow>
              <CCol className="d-flex justify-content-center text-center">
                <CImg src="logo/nurse.svg" height="45" />
              </CCol>
            </CRow>
            <CRow>
              <CCol className="d-flex justify-content-center text-center">
                <span>Jumlah Volunteer</span>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="d-flex justify-content-center text-center">
                <span>{this.state.dashboardList.jumlahVolunteer}</span>
              </CCol>
            </CRow>
          </CCard>
        </CCardGroup>
        <CRow className="my-3">
          {/* <CCol md="2">
            <CLabel htmlFor="date-input">Filter Tanggal</CLabel>
            <CInput placeholder="Tanggal Awal" type="date" />
          </CCol>
          <span className="mt-4">
            <span className="mb-5">
              <strong>
                <p className="mt-3">=</p>
              </strong>
            </span>
          </span>
          <CCol md="2">
            <CLabel></CLabel>
            <CInput placeholder="Tanggal Akhir" type="date" className="mt-2" />
          </CCol>
          <CCol md="2" className="mt-1">
            <CLabel></CLabel>
            <CButton
              color="outline-info"
              className="mt-4 mr-2"
              size="m"
              onClick={() => {
                this.getAllPatient(localStorage.getItem("puskesmasId"), "");
              }}
            >
              Reset
            </CButton>
            <CButton
              color="info"
              className="mt-4"
              size="m"
              onClick={() => {
                this.filterDate();
              }}
            >
              Cari
            </CButton>
          </CCol>
          <CCol md="6"></CCol> */}
        </CRow>
        {localStorage.getItem("role") != "volunteer" &&
          localStorage.getItem("role") != "operator" && (
            <CCol sm="3">
              <CFormGroup>
                <CLabel htmlFor="search-input">Lokasi PKM</CLabel>
                <CSelect
                  id="namaPuskesmas"
                  onChange={this.handlePuskesmasChange.bind(this)}
                  value={this.state.namaPuskesmas}
                >
                  <option value="" key="">
                    -- Pilih Puskesmas --
                  </option>
                  {this.state.puskesmas.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.puskesmas}
                      </option>
                    );
                  })}
                </CSelect>
              </CFormGroup>
            </CCol>
          )}
        {/* {localStorage.getItem("role") != "volunteer" &&
            localStorage.getItem("role") != "operator" &&
            this.state.namaPuskesmas == "" && (
              <CCol sm="3">
                <CFormGroup>
                  <CLabel htmlFor="search-input">Jenis User</CLabel>
                  <CSelect
                    id="aktivuser"
                    onChange={this.handleAktivChange.bind(this)}
                    value={this.state.aktivuser}
                  >
                    <option value="" key="">
                      -- Pilih Aktiv User --
                    </option>
                    <option value="true" key="true">
                      Aktiv User
                    </option>
                    <option value="false" key="false">
                      Regular User
                    </option>
                  </CSelect>
                </CFormGroup>
              </CCol>
            )} */}

        {/* Card Pie Chart */}
        <CRow>
          <CCol md={localStorage.getItem("role") != "volunteer" ? "4" : "6"}>
            <CCard>
              <CCardHeader className="text-center">
                <strong>Usia</strong>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  datasets={this.state.usiaDataSets}
                  labels={["<18", "18-35", "35-60", ">60"]}
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                    legend: {
                      position: "bottom",
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={localStorage.getItem("role") != "volunteer" ? "4" : "6"}>
            <CCard>
              <CCardHeader className="text-center">
                <strong>Jenis Kelamin</strong>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  datasets={this.state.genderDataSets}
                  labels={["Laki Laki", "Perempuan"]}
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                    legend: {
                      position: "bottom",
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md="4">
            {localStorage.getItem("role") != "volunteer" && (
              <CCard>
                <CCardHeader className="text-center">
                  <strong>Jenis Pengguna</strong>
                </CCardHeader>
                <CCardBody>
                  <CChartPie
                    datasets={this.state.jenisPenggunaDataSets}
                    labels={["Aktiv User", "Regular User"]}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                      legend: {
                        position: "bottom",
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            )}
          </CCol>
        </CRow>
        <CRow>
          <CCol md="6">
            <CCard>
              <CCardHeader className="text-center">
                <strong>Status Monitor</strong>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  datasets={this.state.statusMonitoringDataSets}
                  labels={[
                    "Selesai dimonitor",
                    "Sedang dimonitor",
                    "Gagal dimonitor",
                    "Rujuk RS",
                    "Rujuk Shelter",
                  ]}
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                    legend: {
                      position: "bottom",
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md="6">
            <CCard>
              <CCardHeader className="text-center">
                <strong>Diagnosa Pasien</strong>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  datasets={this.state.diagnosaDataSets}
                  labels={[
                    "Suspek",
                    "Konfirmasi",
                    "Kontak Erat",
                    "Probable",
                    "Sehat",
                  ]}
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                    legend: {
                      position: "bottom",
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* Grafik Penyakit Penyerta dan Gejala */}
        <CCardGroup columns className="cols-2">
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <strong>Penyakit Penyerta</strong>
                </CCardHeader>
                <CCardBody>
                  <CChartBar
                    datasets={[
                      {
                        label: "Penyakit Penyerta",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        data: this.state.dashboardList.filterPenyakitPenyerta,
                      },
                    ]}
                    options={{
                      tooltips: {
                        enabled: false,
                      },
                    }}
                    labels={[
                      "Tidak Ada",
                      "Hamil",
                      "DM",

                      "Jantung",
                      "HT",
                      "keganasan",
                      "Autoimun",
                      "Ginjal Kronis",
                      "Hati Kronis",

                      "Asma",
                      "PPOK",
                      // "Lainnya",
                    ]}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <strong>Gejala</strong>
                </CCardHeader>
                <CCardBody>
                  <CChartBar
                    datasets={[
                      {
                        label: "Gejala",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        data: this.state.dashboardList.filterGejalaHarian,
                      },
                    ]}
                    options={{
                      tooltips: {
                        enabled: false,
                      },
                    }}
                    labels={[
                      "Demam",
                      "Demam 14 Hari Sebelumnya",
                      "Batuk",
                      "Kelelahan",
                      "Sakit Kepala",
                      "Nyeri Otot",
                      "Nyeri Tenggorokan",
                      "Pilek",
                      "Tidak Nafsu Makan",
                      "Diare",
                      "Anosmia",
                      "Ageusia",
                      "Sesak Nafas",
                      "Nyeri Dada",
                      "Wajah Membiru",
                      "Sulit Bangun",
                      // "lainnya",
                    ]}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardGroup>
        {/* Card Lokasi Kelurahan Pasien */}
        <CCardGroup>
          <CCard>
            <CRow>
              <CCol>
                <CFormGroup>
                  <CCardHeader>
                    <strong>Pertambahan Pengguna</strong>
                  </CCardHeader>
                  <CCardBody>
                    <Chart
                      width={"100%"}
                      height={"400px"}
                      chartType="Line"
                      loader={<div>Loading Chart</div>}
                      // data={[
                      //   ["Day", "Guardians of the Galaxy"],
                      //   [1, 37.8],
                      //   [2, 30.9],
                      //   [3, 25.4],
                      //   [4, 11.7],
                      //   [5, 11.9],
                      //   [6, 8.8],
                      //   [7, 7.6],
                      //   [8, 12.3],
                      //   [9, 16.9],
                      //   [10, 12.8],
                      //   [11, 5.3],
                      //   [12, 6.6],
                      //   [13, 4.8],
                      //   [14, 4.2],
                      // ]}
                      data={this.state.userChart}
                      options={{
                        legend: {
                          position: "top",
                          textStyle: { color: "blue", fontSize: 16 },
                        },
                        chart: {
                          // title:
                          //   "Box Office Earnings in First Two Weeks of Opening",
                          // subtitle: "in millions of dollars (USD)",
                        },
                      }}
                      // toolbarItems={[
                      //   {
                      //     type: "csv",
                      //     datasource:
                      //       "https://spreadsheets.google.com/tq?key=1jN0iw0usssnsG1_oi-NXtuKfsUsGme09GsFidbqxFYA",
                      //   },
                      // ]}
                      rootProps={{ "data-testid": "3" }}
                    />
                  </CCardBody>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCard>
        </CCardGroup>
        <CCardGroup>
          <CCard>
            <CRow>
              <CCol>
                <CFormGroup>
                  <CCardHeader>
                    <strong>Lokasi Kelurahan Pasien</strong>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      pagination
                      itemsPerPage={5}
                      items={this.state.lokasiPasien}
                      fields={[
                        {
                          key: "no",
                        },
                        {
                          key: "namaLokasi",
                          label: "Nama Kelurahan",
                        },
                        {
                          key: "count",
                          label: "Jumlah Pasien",
                        },
                        // {
                        //   key: "kelurahan",
                        //   label: "Nama Kelurahan",
                        // },
                        // {
                        //   key: "counting",
                        //   label: "Jumlah Pasien",
                        // },
                      ]}
                      scopedSlots={{
                        no: (item, index) => <td>{index + 1}</td>,
                      }}
                    />
                  </CCardBody>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCard>
        </CCardGroup>
      </>
    );
  }
}
