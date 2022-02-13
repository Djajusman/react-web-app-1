import React, { Component } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { FileDrop } from "react-file-drop";
import moment from "moment";
import {
  CSelect,
  CButton,
  CInput,
  CCard,
  CCardBody,
  CFormGroup,
  CCardHeader,
  CCol,
  CForm,
  CTextarea,
  CLabel,
  CRow,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInputCheckbox,
  CImg,
  CListGroupItem,
  CInputGroupAppend,
  CInputGroupText,
  CInputGroup,
  CInputFile,
  CCardFooter,
  CInputRadio,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
// import { Bar, Chart } from "react-chartjs-2";
import Chart from "react-google-charts";
import "react-toastify/dist/ReactToastify.css";
import CIcon from "@coreui/icons-react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const gejalaFields = [
  {
    key: "no",
    sorter: false,
  },
  {
    key: "createdDate",
    label: "Tanggal",
    sorter: false,
  },
  {
    key: "hariIsolasi",
    sorter: false,
  },
  {
    key: "gejala",
    label: "Gejala",
    sorter: false,
  },
  {
    key: "createBy",
    label: "Updated By",
    sorter: false,
  },
];

const prokesFields = [
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
    key: "persentase",
    label: "Rating",
    sorter: true,
  },
  {
    key: "createBy",
    label: "Updated By",
    sorter: false,
  },
];
const kepatuhanFields = [
  {
    key: "persentase",
    label: "Rating",
    sorter: true,
  },
];
const labFields = [
  {
    key: "no",
    sorter: false,
  },
  {
    key: "fileName",
    label: "Nama Berkas",
    sorter: true,
  },
  {
    key: "createdDate",
    label: "Tanggal",
    sorter: true,
  },
  {
    key: "action",
    sorter: false,
  },
];

const styles = { border: "1px solid black", color: "black", padding: 20 };
const styles1 = {
  color: "red",
};
const styles2 = {};
const idLocale = require("moment/locale/id");
var dateNow = moment(Date.now()).locale("id", idLocale).format("LLLL");

// const suhuChart = document.getElementById('suhuChart');
const suhuChart = document.getElementById("suhuChart");

export default class DetailPasien extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      totalPage: 1,
      stateModalSwab: false,
      cumanLihatProkes: false,
      clickedDateProkes: "",
      akunID: "",
      memberID: "",
      swabImage: "",

      dataPasienGet: [],
      gejalaList: [],
      pemeriksaanGet: [],
      kepatuhanGet: {},
      kepatuhanList: [],
      description: "",
      checkBoxAlamat: false,
      // hasilBmi: 0,

      statusList: [],
      diagnosaList: [],
      memberDetail: {},
      // listHasilLab: {},
      tampungGejala: [],
      listSwab: [],
      fullName: "",
      diagnosa: "",
      nik: "",
      gender: "",
      alamatDomisili: "",
      alamatIsolasiMandiri: "",
      mobilePhone: "",
      statusMonitoring: "",
      anamnesis: [],
      anamnesisSatuan: "",
      tglIsolasiStr: "",
      //Gejala
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
      lainnyaGejala: "",
      //Prokes
      isoman: false,
      masker: false,
      berkumpul: false,
      cuciTangan: false,
      makan: false,
      kamar: false,
      pakaian: false,
      gejala: false,
      berjemur: false,
      mandi: false,
      // tambahan
      activeTab: "1",
      catatanListData: [],

      pemeriksaanFilter: {
        key: "spo2",
        label: "SP02",
        datefilter: "week",
        dateLabel: "Hari",
      },

      statusNyeri: 1,
      validate: {
        tekananDarah: true,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      akunID: this.props.match.params.akunID,
      memberID: this.props.match.params.memberID,
    });
    this.dataPasienGet();
    this.gejalaList();
    this.pemeriksaanGet();
    this.pemeriksaanList();
    this.kepatuhanGet();
    this.kepatuhanList();
  }
  handleCheckBoxChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value == "true" ? true : false,
    });
  };
  handleCheckBoxSetAlamat = (event) => {
    console.log(event.target.value);
    if (event.target.value == "true") {
      var tampungDataPasienGet = this.state.dataPasienGet;
      tampungDataPasienGet.alamatIsolasiMandiri = "";
      this.setState({
        checkBoxAlamat: false,
        dataPasienGet: tampungDataPasienGet,
      });
    } else {
      var tampungDataPasienGet = this.state.dataPasienGet;
      tampungDataPasienGet.alamatIsolasiMandiri =
        tampungDataPasienGet.alamatDomisili;
      this.setState({
        checkBoxAlamat: true,
        dataPasienGet: tampungDataPasienGet,
      });
    }
  };
  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  handleInputChangeDataPasien = (event) => {
    var k = event.target.id;
    this.setState({
      dataPasienGet: {
        ...this.state.dataPasienGet,
        [k]: event.target.value,
      },
    });
  };
  handlePemeriksaanFilter(filter) {
    let pemeriksaanList = this.state.pemeriksaanList;
    let pemeriksaanChart = [];
    let forAdding = 0;
    let start;
    let end;
    let tekananDarah = [];
    if (filter.key == "tekananDarah")
      pemeriksaanChart.push([filter.dateLabel, "Sistol", "Diastol"]);
    else pemeriksaanChart.push([filter.dateLabel, filter.label]);
    start = moment().startOf(filter.datefilter).toDate();
    end = moment().endOf(filter.datefilter).toDate();
    let pemeriksaanTerakhir = 0;

    for (
      var i = parseInt(moment(start).format("DD"));
      i <= parseInt(moment(end).format("DD"));
      i++
    ) {
      pemeriksaanList.some((pemeriksaan) => {
        if (parseInt(moment(pemeriksaan.createdDate).format("DD")) == i) {
          if (filter.key == "tekananDarah") {
            tekananDarah = pemeriksaan.tekananDarah.split("/");
          } else pemeriksaanTerakhir = pemeriksaan[`${filter.key}`];
          return pemeriksaan[`${filter.key}`];
        }
      });
      let dateFormat = filter.datefilter == "week" ? "dddd" : "DD";

      if (filter.key == "tekananDarah")
        pemeriksaanChart.push([
          moment(`${moment(start).add(forAdding, "days")}`).format(dateFormat),
          parseInt(tekananDarah[0]),
          parseInt(tekananDarah[1]),
        ]);
      else
        pemeriksaanChart.push([
          moment(`${moment(start).add(forAdding, "days")}`).format(dateFormat),
          pemeriksaanTerakhir,
        ]);
      forAdding++;
    }
    this.setState({
      pemeriksaanChart: pemeriksaanChart,
      pemeriksaanFilter: filter,
    });
  }

  convertToBase64(data) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        swabImage: e.target.result,
      });
    };
    reader.readAsDataURL(data);
  }
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
        console.log("patient detail=>", data);
        let dataPasienGet = data.data;
        let tglIsolasiReal =
          dataPasienGet.tglIsolasiStr != ""
            ? dataPasienGet.tglIsolasiStr
            : dataPasienGet.tglIsolasi;
        let birthdateReal =
          dataPasienGet.birthDateStr != ""
            ? dataPasienGet.birthDateStr
            : dataPasienGet.birthDate;
        dataPasienGet.tglIsolasiStr = tglIsolasiReal;
        dataPasienGet.birthDateStr = birthdateReal;
        console.log("patient detail=>", dataPasienGet);
        this.setState({
          dataPasienGet: dataPasienGet,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  dataPasienUpdate = () => {
    var body = {
      id: this.state.memberID,
      akunID: this.state.akunID,
      noRM: this.state.dataPasienGet.noRM,
      fullName: this.state.dataPasienGet.fullName,
      nik: this.state.dataPasienGet.nik,
      birthDateStr: moment(
        this.state.dataPasienGet.birthDateStr
          ? this.state.dataPasienGet.birthDateStr
          : this.state.dataPasienGet.birthDate
      ).format("YYYY-MM-DD HH:mm:ss"),
      mobilePhone: this.state.dataPasienGet.mobilePhone,
      gender: this.state.dataPasienGet.gender,
      tglIsolasiStr:
        this.state.dataPasienGet.statusMonitoring == "Selesai isolasi"
          ? "Selesai isolasi"
          : moment(this.state.dataPasienGet.tglIsolasiStr).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
      statusMonitoring: this.state.dataPasienGet.statusMonitoring,
      diagnosa: this.state.dataPasienGet.diagnosa,
      tinggiBadan: parseFloat(this.state.dataPasienGet.tinggiBadan),
      beratBadan: parseFloat(this.state.dataPasienGet.beratBadan),
      alergi: this.state.dataPasienGet.alergi,
      komorbid: this.state.dataPasienGet.komorbid,
      alamatDomisili: this.state.dataPasienGet.alamatDomisili,
      alamatIsolasiMandiri: this.state.dataPasienGet.alamatIsolasiMandiri,
    };
    console.log("Body Update Patient", body);
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/detail/update?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
            toast.success("Update Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.toggleStateEditData();
            this.dataPasienGet();
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
      .catch((error) => console.error(error));
  };
  gejalaList = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/symptoms/list?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        var gejalaList = [];
        data.data.items.forEach((element) => {
          var tempListGejala = [];
          var tempGejala = Object.entries(element);
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
                if (value === true) tempListGejala.push("ageusia");
              }
              if (key === "anosmia") {
                if (value === true) tempListGejala.push("Anosmia");
              }
              if (key === "batuk") {
                if (value === true) tempListGejala.push("Batuk");
              }
              // if (key === "demam") {
              //   if (value === true) tempListGejala.push("Demam");
              // }
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
                if (value !== "") tempListGejala.push(`Demam ${value} °C`);
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
            data: element,
            olah: tempListGejala,
          });
        });
        this.setState({
          gejalaList: gejalaList,
        });
        console.log("Gejala Olah", this.state.gejalaList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  clearGejalaInput = () => {
    this.setState({
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
      lainnya: "",
    });
  };
  gejalaAdd = () => {
    var body = {
      id: this.state.id,
      akunID: this.state.akunID,
      memberID: this.state.memberID,
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
      lainnya: this.state.lainnya,
    };
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/symptoms/add?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
            toast.success("Tambah Gejala Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.toggleStateModalGejala();
            this.gejalaList();
            this.clearGejalaInput();
          } else {
            toast.error("Tambah Gejala Gagal " + data.statusmsg, {
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
  clearPemeriksaan = () => {
    this.setState({
      spo2: "",
      suhu: "",
      tekananDarah: "",
      nadi: "",
      lajuNafas: "",
      tinggiBadan: "",
      beratBadan: "",
      statusNyeri: 1,
      lainnya: "",
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
        this.setState({
          pemeriksaanGet: data.data,
          beratBadan: data.data.beratBadan,
          tinggiBadan: data.data.tinggiBadan,
          bmi: data.data.bmi,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  pemeriksaanList = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/pemeriksaan/list?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        console.log("Pemeriksaan List", data.data.items);
        this.setState({
          pemeriksaanList: data.data.items,
        });
        this.handlePemeriksaanFilter({
          ...this.state.pemeriksaanFilter,
          key: "spo2",
          label: "SPO2",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  pemeriksaanAdd = () => {
    if (this.validatePemeriksaan()) {
      var body = {
        akunID: this.state.akunID,
        memberID: this.state.memberID,
        spo2: parseFloat(
          this.state.spo2 != "" &&
            this.state.spo2 != undefined &&
            this.state.spo2 != null
            ? this.state.spo2
            : 0
        ),
        suhu: parseFloat(
          this.state.suhu != "" &&
            this.state.suhu != undefined &&
            this.state.suhu != null
            ? this.state.suhu
            : 0
        ),
        tekananDarah:
          this.state.tekananDarah != "" &&
          this.state.tekananDarah != undefined &&
          this.state.tekananDarah != null
            ? this.state.tekananDarah
            : "120/80",
        nadi: parseFloat(
          this.state.nadi != "" &&
            this.state.nadi != undefined &&
            this.state.nadi != null
            ? this.state.nadi
            : 0
        ),
        lajuNafas: parseFloat(
          this.state.lajuNafas != "" &&
            this.state.lajuNafas != undefined &&
            this.state.lajuNafas != null
            ? this.state.lajuNafas
            : 0
        ),
        tinggiBadan: parseFloat(
          this.state.tinggiBadan != "" &&
            this.state.tinggiBadan != undefined &&
            this.state.tinggiBadan != null
            ? this.state.tinggiBadan
            : this.state.pemeriksaanGet.tinggiBadan
        ),
        beratBadan: parseFloat(
          this.state.beratBadan != "" &&
            this.state.beratBadan != undefined &&
            this.state.beratBadan != null
            ? this.state.beratBadan
            : this.state.pemeriksaanGet.beratBadan
        ),
        statusNyeri: this.state.statusNyeri,
        lainnya: this.state.lainnya,
      };
      console.log("Pemeriksaan Add Body", body);
      fetch(
        `https://api.aktiv.co.id/api/aktivengine/v2/patient/pemeriksaan/add?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            pemeriksaanAdd: data.data,
          });
          if (data.hasOwnProperty("status")) {
            if (data.status === "OK") {
              toast.success("Tambah Pemeriksaan Berhasil", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              this.toggleStateModalPemeriksaan();
              this.pemeriksaanGet();
              this.pemeriksaanList();
            } else {
              toast.error("Tambah Pemeriksaan Gagal " + data.statusmsg, {
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
  kepatuhanGet = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/prokes/get?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        console.log("Prokes", data);
        this.setState({
          kepatuhanGet: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  kepatuhanList = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/prokes/list?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        console.log("Prokes List", data);
        this.setState({
          kepatuhanList: data.data.items,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  catatanList = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/addinformation/list?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        console.log("Catatan List", data);
        this.setState({
          catatanListData: data.data.items,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  catatanAdd = () => {
    var body = {
      akunID: this.state.akunID,
      memberID: this.state.memberID,
      description: this.state.description,
    };
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/addinformation/add?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Prokes", data);
        this.setState({
          catatanAdd: data.data,
        });
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
            this.toggleStateCatatan();
            this.dataPasienGet();
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
      .catch((error) => {
        console.log(error);
      });
  };

  downloadExcel = () => {
    var url = `https://report.aktiv.co.id/api/report-medical-record-patient/${this.state.akunID}?memberID=${this.state.memberID}`;

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
  validatePemeriksaan = () => {
    let tekananDarah = this.state.tekananDarah;
    let suhu = this.state.suhu;
    let olahSuhu = suhu.replace(",", ".");
    let regex = /\d\/\d/;
    if (regex.test(tekananDarah)) {
      this.setState({
        validate: {
          ...this.state.validate,
          tekananDarah: true,
        },
        suhu: olahSuhu,
      });
      return true;
    } else {
      this.setState({
        validate: {
          ...this.state.validate,
          tekananDarah: false,
        },
        suhu: olahSuhu,
      });
      return false;
    }
  };
  toggleStateModalGejala = () => {
    this.setStateModalGejala(!this.state.stateModalGejala);
  };
  setStateModalGejala(stateModalGejala) {
    this.setState({
      stateModalGejala: stateModalGejala,
    });
  }
  toggleStateEditData = () => {
    this.setStateEditData(!this.state.stateEditData);
  };
  setStateEditData(stateEditData) {
    this.setState({
      stateEditData: stateEditData,
    });
  }
  toggleStateCatatan = () => {
    this.setStateCatatan(!this.state.stateCatatan);
  };
  setStateCatatan(stateCatatan) {
    this.setState({
      stateCatatan: stateCatatan,
    });
  }
  toggleStateModalPemeriksaan = () => {
    this.setStateModalPemeriksaan(!this.state.stateModalPemeriksaan);
  };
  setStateModalPemeriksaan(stateModalPemeriksaan) {
    this.setState({
      stateModalPemeriksaan: stateModalPemeriksaan,
    });
  }
  toggleStateModalRiwayat = () => {
    this.setStateModalRiwayat(!this.state.stateModalRiwayat);
  };
  setStateModalRiwayat(stateModalRiwayat) {
    this.setState({
      stateModalRiwayat: stateModalRiwayat,
    });
  }
  toggleStateModalUpload = () => {
    this.setStateModalUpload(!this.state.stateModalUpload);
  };
  setStateModalUpload(stateModalUpload) {
    this.setState({
      stateModalUpload: stateModalUpload,
    });
  }
  toggleStateModalListGejala = () => {
    this.setStateModalListGejala(!this.state.stateModalListGejala);
  };
  setStateModalListGejala(stateModalListGejala) {
    this.setState({
      stateModalListGejala: stateModalListGejala,
    });
  }
  toggleStateModalProkes = () => {
    this.setStateModalProkes(!this.state.stateModalProkes);
  };
  setStateModalProkes(stateModalProkes) {
    this.setState({
      stateModalProkes: stateModalProkes,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <CRow className="my-3">
          <CCol>
            <CButton
              className="btn-outline-info mr-2"
              size="lg"
              active
              color="info"
            >
              <span>Data Umum</span>
            </CButton>
            <Link
              to={`/medical_record/detail_pasien/cppt/${this.state.akunID}/${this.state.memberID}`}
              className="btn btn-outline-info btn-lg mr-2"
            >
              CPPT
            </Link>

            {/* <CButton className="btn-outline-info mr-2" size="lg">
              <span>Terapi</span>
            </CButton>
            <CButton className="btn-outline-info mr-2" size="lg">
              <span>Resume Pasien</span>
            </CButton> */}
          </CCol>
          <CCol>
            {/* <CButton
              className="btn-outline-danger mr-2 float-right"
              size="lg"
              // style={{ backgroundColor: "white" }}
              onClick={() => {
                this.downloadExcel();
              }}
            >
              <CIcon name="cilDataTransferDown" className="mr-2" />
              <span>Unduh PDF</span>
            </CButton> */}
          </CCol>
        </CRow>

        {/* Card Detail Pasien */}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Data Pasien</strong>
                <CButton
                  className="btn-outline-info mr-1 float-right"
                  onClick={() => {
                    this.toggleStateEditData();
                  }}
                >
                  <CIcon name="cil-pencil" className="mr-2" />
                  <span>Edit Data</span>
                </CButton>
                <CButton
                  className="btn-light mr-1 float-right"
                  onClick={() => {
                    this.catatanList();
                    this.toggleStateCatatan();
                  }}
                >
                  <span>Catatan Pasien</span>
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md="4">
                    <CRow>
                      <CCol md="5">
                        <CLabel>No. RM</CLabel>
                      </CCol>
                      <CCol md="7">
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
                          {moment(this.state.dataPasienGet.birthDateStr).format(
                            "dddd, DD MMMM YYYY"
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
                          {this.state.dataPasienGet.tglIsolasiStr !=
                            "0001-01-01T00:00:00Z" &&
                          this.state.dataPasienGet.tglIsolasiStr !=
                            "Selesai isolasi"
                            ? moment(
                                this.state.dataPasienGet.tglIsolasiStr
                              ).format("dddd, DD MMMM yyyy")
                            : "Sedang tidak melakukan isolasi"}
                        </strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Hari Isolasi</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          : Ke-
                          {Math.round(this.state.dataPasienGet.hariIsolasi)}
                        </strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md="5">
                        <CLabel>Status</CLabel>
                      </CCol>
                      <CCol md="7">
                        <strong>
                          : {this.state.dataPasienGet.statusMonitoring}
                        </strong>
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

        {/* Card Perjalanan Gejala */}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Perjalanan Gejala</strong>
                <CButton
                  className="btn-facebook mr-1 float-right"
                  onClick={() => {
                    this.clearGejalaInput();
                    this.toggleStateModalGejala();
                  }}
                >
                  {/* <CIcon name="cil-plus" color="white" /> */}
                  <span>+ Tambah Gejala</span>
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.gejalaList}
                  fields={gejalaFields}
                  itemsPerPage={5}
                  sorter
                  pagination
                  scopedSlots={{
                    no: (item, index) => <td>{index + 1}</td>,
                    createdDate: (item) => (
                      <td>{moment(item.data.createdDate).format("LLLL")}</td>
                    ),
                    hariIsolasi: (item) => (
                      <td>Hari {Math.round(item.data.hariIsolasi)}</td>
                    ),
                    gejala: (item, index) => (
                      <td>
                        {item.olah.map((element) => {
                          return <CRow>• {element}</CRow>;
                        })}
                      </td>
                    ),
                    createBy: (item) => <td>{item.data.createBy}</td>,
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {/* Card Pemeriksaan */}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Pemeriksaan</strong>
                <CButton
                  className="btn-facebook mr-1 float-right"
                  onClick={() => {
                    this.clearPemeriksaan();
                    this.toggleStateModalPemeriksaan();
                  }}
                >
                  <span>+ Tambah Pemeriksaan</span>
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CFormGroup row>
                    <CCol>
                      <CLabel className="my-2">SpO2</CLabel>
                      <CInputGroup>
                        <CInput
                          id="spo2"
                          type="text"
                          defaultValue={this.state.pemeriksaanGet.spo2}
                          disabled
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
                          id="suhu"
                          type="text"
                          defaultValue={this.state.pemeriksaanGet.suhu}
                          disabled
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
                          id="tekananDarah"
                          type="text"
                          defaultValue={this.state.pemeriksaanGet.tekananDarah}
                          disabled
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
                          id="nadi"
                          type="text"
                          defaultValue={this.state.pemeriksaanGet.nadi}
                          disabled
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
                          id="lajuNafas"
                          type="text"
                          defaultValue={this.state.pemeriksaanGet.lajuNafas}
                          disabled
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
                          id="beratBadan"
                          type="text"
                          defaultValue={this.state.pemeriksaanGet.beratBadan}
                          disabled
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
                          id="tinggiBadan"
                          type="text"
                          defaultValue={this.state.pemeriksaanGet.tinggiBadan}
                          disabled
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>cm</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Body Max Index (BMI)</CLabel>
                      <CInput
                        id="bmi"
                        type="text"
                        defaultValue={this.state.pemeriksaanGet.bmi}
                        disabled
                      />
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Status Nyeri</CLabel>
                      <CInput
                        id="statusNyeri"
                        type="text"
                        defaultValue={this.state.pemeriksaanGet.statusNyeri}
                        disabled
                      />
                    </CCol>
                    <CCol>
                      <CLabel className="my-2">Lainnya</CLabel>
                      <CInput
                        id="lainnya"
                        type="text"
                        defaultValue={this.state.pemeriksaanGet.lainnya}
                        disabled
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter style={styles1}>
                Update Terakhir :{" "}
                <span>{this.state.pemeriksaanGet.createBy}</span> -{" "}
                <span>
                  {moment(this.state.pemeriksaanGet.createdDate).format("LLLL")}
                </span>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
        {/* Card Grafik Pemeriksaan */}
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Grafik Pemeriksaan</strong>

                {/* <CButton
                  className="btn-outline-info mr-3 float-right"
                  onClick={() => {
                    this.handlePemeriksaanFilter({
                      ...this.state.pemeriksaanFilter,
                      datefilter: "day",
                      dateLabel: "Jam",
                    });
                  }}
                >
                  <span>Hari Ini</span>
                </CButton> */}
                <CButton
                  color={
                    this.state.pemeriksaanFilter.datefilter == "week"
                      ? "info"
                      : ""
                  }
                  className={
                    this.state.pemeriksaanFilter.datefilter == "week"
                      ? "mr-1 float-right"
                      : "btn-outline-info mr-1 float-right"
                  }
                  onClick={() => {
                    this.handlePemeriksaanFilter({
                      ...this.state.pemeriksaanFilter,
                      datefilter: "week",
                      dateLabel: "Hari",
                    });
                  }}
                >
                  <span>Minggu Ini</span>
                </CButton>
                <CButton
                  color={
                    this.state.pemeriksaanFilter.datefilter == "month"
                      ? "info"
                      : ""
                  }
                  className={
                    this.state.pemeriksaanFilter.datefilter == "month"
                      ? "mr-1 float-right"
                      : "btn-outline-info mr-1 float-right"
                  }
                  onClick={() => {
                    this.handlePemeriksaanFilter({
                      ...this.state.pemeriksaanFilter,
                      datefilter: "month",
                      dateLabel: "Tanggal",
                    });
                  }}
                >
                  <span>Bulan Ini</span>
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CLabel>Tanda Hasil Vital :</CLabel>
                    <CButton
                      color={
                        this.state.pemeriksaanFilter.key == "spo2" ? "info" : ""
                      }
                      className={
                        this.state.pemeriksaanFilter.key != "spo2"
                          ? "btn-outline-info ml-2 mr-1"
                          : " ml-2 mr-1"
                      }
                      id="kadarSpo2Chart"
                      size="sm"
                      onClick={() => {
                        this.handlePemeriksaanFilter({
                          ...this.state.pemeriksaanFilter,
                          key: "spo2",
                          label: "SPO2",
                        });
                      }}
                    >
                      Kadar Spo2
                    </CButton>
                    <CButton
                      color={
                        this.state.pemeriksaanFilter.key == "suhu" ? "info" : ""
                      }
                      className={
                        this.state.pemeriksaanFilter.key != "suhu"
                          ? "btn-outline-info ml-2 mr-1"
                          : " ml-2 mr-1"
                      }
                      size="sm"
                      onClick={() => {
                        this.handlePemeriksaanFilter({
                          ...this.state.pemeriksaanFilter,
                          key: "suhu",
                          label: "Suhu",
                        });
                      }}
                    >
                      Suhu
                    </CButton>
                    <CButton
                      color={
                        this.state.pemeriksaanFilter.key == "tekananDarah"
                          ? "info"
                          : ""
                      }
                      className={
                        this.state.pemeriksaanFilter.key != "tekananDarah"
                          ? "btn-outline-info ml-2 mr-1"
                          : " ml-2 mr-1"
                      }
                      size="sm"
                      onClick={() => {
                        this.handlePemeriksaanFilter({
                          ...this.state.pemeriksaanFilter,
                          key: "tekananDarah",
                          label: "Tekanan Darah",
                        });
                      }}
                    >
                      Tekanan Darah
                    </CButton>
                    <CButton
                      color={
                        this.state.pemeriksaanFilter.key == "nadi" ? "info" : ""
                      }
                      className={
                        this.state.pemeriksaanFilter.key != "nadi"
                          ? "btn-outline-info ml-2 mr-1"
                          : " ml-2 mr-1"
                      }
                      size="sm"
                      onClick={() => {
                        this.handlePemeriksaanFilter({
                          ...this.state.pemeriksaanFilter,
                          key: "nadi",
                          label: "Nadi",
                        });
                      }}
                    >
                      Nadi
                    </CButton>
                    <CButton
                      color={
                        this.state.pemeriksaanFilter.key == "lajuNafas"
                          ? "info"
                          : ""
                      }
                      className={
                        this.state.pemeriksaanFilter.key != "lajuNafas"
                          ? "btn-outline-info ml-2 mr-1"
                          : " ml-2 mr-1"
                      }
                      size="sm"
                      onClick={() => {
                        this.handlePemeriksaanFilter({
                          ...this.state.pemeriksaanFilter,
                          key: "lajuNafas",
                          label: "Laju Nafas",
                        });
                      }}
                    >
                      Laju Nafas
                    </CButton>
                    <CButton
                      color={
                        this.state.pemeriksaanFilter.key == "statusNyeri"
                          ? "info"
                          : ""
                      }
                      className={
                        this.state.pemeriksaanFilter.key != "statusNyeri"
                          ? "btn-outline-info ml-2 mr-1"
                          : " ml-2 mr-1"
                      }
                      size="sm"
                      onClick={() => {
                        this.handlePemeriksaanFilter({
                          ...this.state.pemeriksaanFilter,
                          key: "statusNyeri",
                          label: "Status Nyeri",
                        });
                      }}
                    >
                      Status Nyeri
                    </CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <Chart
                      width={"100%"}
                      height={"400px"}
                      chartType="Line"
                      loader={<div>Loading Chart</div>}
                      // data={[
                      //   [
                      //     "Day",
                      //     "Guardians of the Galaxy",
                      //     "The Avengers",
                      //     "Transformers: Age of Extinction",
                      //   ],
                      //   [1, 37.8, 80.8, 41.8],
                      //   [2, 30.9, 69.5, 32.4],
                      //   [3, 25.4, 57, 25.7],
                      //   [4, 11.7, 18.8, 10.5],
                      //   [5, 11.9, 17.6, 10.4],
                      //   [6, 8.8, 13.6, 7.7],
                      //   [7, 7.6, 12.3, 9.6],
                      //   [8, 12.3, 29.2, 10.6],
                      //   [9, 16.9, 42.9, 14.8],
                      //   [10, 12.8, 30.9, 11.6],
                      //   [11, 5.3, 7.9, 4.7],
                      //   [12, 6.6, 8.4, 5.2],
                      //   [13, 4.8, 6.3, 3.6],
                      //   [14, 4.2, 6.2, 3.4],
                      // ]}
                      data={this.state.pemeriksaanChart}
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
                      toolbarItems={[
                        {
                          type: "csv",
                          datasource:
                            "https://spreadsheets.google.com/tq?key=1jN0iw0usssnsG1_oi-NXtuKfsUsGme09GsFidbqxFYA",
                        },
                      ]}
                      rootProps={{ "data-testid": "3" }}
                    />
                    {/* <Bar
                    id="SuhuChart"
                    data={{
                      labels: [
                        "Senin",
                        "Selasa",
                        "Rabu",
                        "Kamis",
                        "Jumat",
                        "Sabtu",
                        "Minggu",
                      ],
                      datasets: [
                        {
                          label: "Normal",
                          data: [12, 50, 3, 5, 2, 3, 10],
                          backgroundColor: "Green",
                        },
                        {
                          label: "Warning",
                          data: [37, 38, 39, 40, 39, 36, 37],
                          backgroundColor: "Yellow",
                        },
                        {
                          label: "Abnormal",
                          data: [34, 50, 39, 30, 39, 35, 39],
                          backgroundColor: "Red",
                        },
                      ],
                    }}
                    height={400}
                    width={600}
                    options={{
                      maintainAspectRatio: false,
                      tooltips: {
                        enabled: true,
                      },
                      legend: {
                        position: "bottom",
                      },
                    }}
                  /> */}
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter></CCardFooter>
            </CCard>
          </CCol>
        </CRow>
        {/* Card Hasil Lab, Epidemologi, Kepatuhan Isolasi */}
        <CRow>
          {/* <CCol>
            <CCard style={{ height: "95%" }}>
              <CCardHeader>
                <strong>Dokumen Hasil Lab</strong>
                <CButton
                  className="float-right btn-facebook btn-brand mr-2"
                  onClick={() => {
                    this.toggleStateModalUpload();
                  }}
                >          
                  Upload
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  // items={this.state.listHasilLab}
                  fields={labFields}
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
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol> */}
          <CCol>
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <strong>Form Epidemiologi (Form F6)</strong>
                  </CCardHeader>
                  <CCardBody>
                    <Link
                      to={`/medical_record/detail_pasien/epidemologi/${this.state.akunID}/${this.state.memberID}`}
                      className="btn btn-facebook btn-lg btn-block"
                    >
                      <CIcon name="cil-pencil" className="mr-2" />
                      Isi Form
                    </Link>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <strong>Kepatuhan Isolasi Mandiri</strong>
                    <CButton
                      className={"btn-outline-info float-right"}
                      onClick={() => {
                        this.toggleStateModalRiwayat();
                      }}
                    >
                      <CIcon name={"cilHistory"} className="mr-2" />
                      Riwayat
                    </CButton>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol className="d-flex justify-content-center" md="12">
                        <CLabel>
                          <h5>
                            <strong className="text-center">
                              {(this.state.kepatuhanGet.persentase ?? 0) * 5}
                            </strong>
                          </h5>
                        </CLabel>
                      </CCol>
                      <CCol className="d-flex justify-content-center">
                        <StarRatings
                          rating={(this.state.kepatuhanGet.persentase ?? 0) * 5}
                          starRatedColor="yellow"
                          starDimension="30px"
                          numberOfStars={5}
                          name="rating"
                        />
                      </CCol>
                    </CRow>
                  </CCardBody>
                  <CCardFooter style={styles1}>
                    Update Terakhir :{" "}
                    <span>{this.state.kepatuhanGet.createBy}</span> -{" "}
                    <span>
                      {moment(this.state.kepatuhanGet.createdDate).format(
                        "LLLL"
                      )}
                    </span>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        {/* Modal Pemeriksaan */}
        <CModal
          show={this.state.stateModalPemeriksaan}
          onClose={this.toggleStateModalPemeriksaan}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>
              <strong>Tambah Pemeriksaan</strong>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol className="my-1">
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel className="my-2">SpO2</CLabel>
                      <CInputGroup>
                        <CInput
                          id="spo2"
                          type="number"
                          placeholder="Kadar saturasi oksigen"
                          onChange={this.handleInputChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>%</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol md="4">
                      <CLabel className="my-2">Suhu</CLabel>
                      <CInputGroup>
                        <CInput
                          id="suhu"
                          type="number"
                          placeholder="Suhu"
                          onChange={this.handleInputChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>°</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol md="4">
                      <CLabel className="my-2">
                        Tekanan Darah{" "}
                        {!this.state.validate.tekananDarah && (
                          <span
                            style={{
                              color: "red",
                              fontSize: 10,
                            }}
                          >
                            <strong>*</strong> Format Salah
                          </span>
                        )}
                      </CLabel>
                      <CInputGroup>
                        <CInput
                          id="tekananDarah"
                          type="text"
                          placeholder="Tekanan darah"
                          onChange={this.handleInputChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>mmHg</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel className="my-2">Nadi</CLabel>
                      <CInputGroup>
                        <CInput
                          id="nadi"
                          type="number"
                          placeholder="Denyut Nadi"
                          onChange={this.handleInputChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>x</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol md="4">
                      <CLabel className="my-2">Laju Nafas</CLabel>
                      <CInputGroup>
                        <CInput
                          id="lajuNafas"
                          type="number"
                          placeholder="Laju Nafas"
                          onChange={this.handleInputChange}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>x</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol md="4">
                      <CLabel className="my-2">Lainnya</CLabel>
                      <CInput
                        id="lainnya"
                        type="text"
                        onChange={this.handleInputChange}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel className="my-2">Berat Badan</CLabel>
                      <CInputGroup>
                        <CInput
                          id="beratBadan"
                          type="number"
                          placeholder="Berat badan"
                          onChange={this.handleInputChange}
                          value={this.state.beratBadan}
                          defaultValue={this.state.pemeriksaanGet.beratBadan}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>kg</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol md="4">
                      <CLabel className="my-2">Tinggi Badan</CLabel>
                      <CInputGroup>
                        <CInput
                          id="tinggiBadan"
                          type="number"
                          placeholder="Tinggi badan"
                          onChange={this.handleInputChange}
                          value={this.state.tinggiBadan}
                          defaultValue={this.state.pemeriksaanGet.tinggiBadan}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>cm</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol md="4">
                      <CLabel className="my-2">BMI</CLabel>
                      <CInput
                        id="hasilBmi"
                        type="number"
                        placeholder="Hasil"
                        value={
                          parseFloat(this.state.beratBadan) /
                          ((parseFloat(this.state.tinggiBadan) / 100) *
                            (parseFloat(this.state.tinggiBadan) / 100))
                        }
                        disabled
                        defaultValue={this.state.pemeriksaanGet.bmi}
                      />
                    </CCol>
                  </CFormGroup>

                  <CRow className="my-1">
                    <CCol>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Status Nyeri</FormLabel>
                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          defaultValue="1"
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio color="primary" size="small" />}
                            label="1"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio color="primary" />}
                            label="2"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio color="primary" />}
                            label="3"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                          <FormControlLabel
                            value="4"
                            control={<Radio color="primary" />}
                            label="4"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                          <FormControlLabel
                            value="5"
                            control={<Radio color="primary" />}
                            label="5"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                          <FormControlLabel
                            value="6"
                            control={<Radio color="primary" />}
                            label="6"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                          <FormControlLabel
                            value="7"
                            control={<Radio color="primary" />}
                            label="7"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                          <FormControlLabel
                            value="8"
                            control={<Radio color="primary" />}
                            label="8"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                          <FormControlLabel
                            value="9"
                            control={<Radio color="primary" />}
                            label="9"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                          <FormControlLabel
                            value="10"
                            control={<Radio color="primary" />}
                            label="10"
                            labelPlacement="bottom"
                            onChange={(event) => {
                              this.setState({
                                statusNyeri: parseInt(event.target.value),
                              });
                            }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </CCol>
                    <CCol
                      md={5}
                      className="align-self-center d-flex justify-content-center text-center"
                    >
                      <CImg
                        src={
                          this.state.statusNyeri > 0 &&
                          this.state.statusNyeri <= 2
                            ? "avatars/no-pain.png"
                            : this.state.statusNyeri > 2 &&
                              this.state.statusNyeri <= 4
                            ? "avatars/mild-pain.png"
                            : this.state.statusNyeri > 4 &&
                              this.state.statusNyeri <= 6
                            ? "avatars/moderate-pain.png"
                            : this.state.statusNyeri > 6 &&
                              this.state.statusNyeri <= 8
                            ? "avatars/severe-pain.png"
                            : this.state.statusNyeri > 8 &&
                              this.state.statusNyeri <= 10
                            ? "avatars/worst-pain.png"
                            : "avatars/no-pain.png"
                        }
                        width="75px"
                        height="75px"
                      />
                    </CCol>
                  </CRow>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              className="btn-light mr-1 float-right"
              onClick={() => {
                this.toggleStateModalPemeriksaan();
              }}
            >
              <span>Batal</span>
            </CButton>
            <CButton
              className="btn-facebook btn-brand mr-1 float-right"
              onClick={() => {
                this.pemeriksaanAdd();
              }}
            >
              <span>Simpan</span>
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal Catatan Pasien */}
        <CModal
          show={this.state.stateCatatan}
          onClose={this.toggleStateCatatan}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>
              <strong>Catatan Pasien</strong>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol className="my-1">
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel className="my-2">Catatan Mengenai Pasien</CLabel>
                      <CTextarea
                        name="textarea-input"
                        id="description"
                        rows="4"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                      />
                    </CCol>
                  </CFormGroup>
                  <div>
                    {this.state.catatanListData.map((catatan) => {
                      return (
                        <CRow>
                          <CCol>
                            •{" "}
                            {moment(catatan.createdDate).format(
                              "dddd, DD MMMM yyyy HH:mm:ss"
                            )}{" "}
                            {"=>"} {catatan.description}
                          </CCol>
                        </CRow>
                      );
                    })}
                  </div>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              className="btn-light mr-1 float-right"
              onClick={() => {
                this.toggleStateCatatan();
              }}
            >
              <span>Batal</span>
            </CButton>
            <CButton
              className="btn-facebook btn-brand mr-1 float-right"
              onClick={() => {
                this.catatanAdd();
              }}
            >
              <span>Simpan</span>
            </CButton>
          </CModalFooter>
        </CModal>
        {/* Modal Edit Data */}
        <CModal
          show={this.state.stateEditData}
          onClose={this.toggleStateEditData}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>
              <strong>Edit Data Pasien</strong>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol className="my-1">
                <CForm action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="6">
                      <CLabel className="my-2">No. RM</CLabel>
                      <CInput
                        id="noRM"
                        type="text"
                        defaultValue={this.state.dataPasienGet.noRM}
                        disabled
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="6">
                      <CLabel className="my-2">Nama</CLabel>
                      <CInput
                        id="fullName"
                        type="text"
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                        value={this.state.dataPasienGet.fullName}
                      />
                    </CCol>
                    <CCol md="6">
                      <CLabel className="my-2">NIK</CLabel>
                      <CInput
                        id="nik"
                        type="number"
                        value={this.state.dataPasienGet.nik}
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="6">
                      <CLabel className="my-2">Tanggal Lahir</CLabel>
                      <CInput
                        id="birthDateStr"
                        type="date"
                        value={moment(
                          this.state.dataPasienGet.birthDateStr
                        ).format("YYYY-MM-DD")}
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                      />
                    </CCol>
                    <CCol md="6">
                      <CLabel className="my-2">Jenis Kelamin</CLabel>
                      <CSelect
                        id="gender"
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                        value={this.state.dataPasienGet.gender}
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
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="6">
                      <CLabel className="my-2">No. HP</CLabel>
                      <CInput
                        id="mobilePhone"
                        type="text"
                        value={this.state.dataPasienGet.mobilePhone}
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel className="my-2">Alamat Domisili</CLabel>
                      <CInput
                        id="alamatDomisili"
                        type="text"
                        value={this.state.dataPasienGet.alamatDomisili}
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="6">
                      <CLabel className="my-2">Tanggal Isolasi</CLabel>
                      <CInput
                        id="tglIsolasiStr"
                        type="date"
                        value={
                          this.state.dataPasienGet.tglIsolasiStr !=
                          "0001-01-01T00:00:00Z"
                            ? moment(
                                this.state.dataPasienGet.tglIsolasiStr
                              ).format("YYYY-MM-DD")
                            : ""
                        }
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                      />
                    </CCol>
                    <CCol md="6">
                      <CLabel className="my-2">Status</CLabel>
                      <CSelect
                        id="statusMonitoring"
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                        value={this.state.dataPasienGet.statusMonitoring}
                      >
                        <option value="" key="">
                          -- Pilih Tahapan --
                        </option>
                        <option value="Gagal dimonitor" key="Gagal dimonitor">
                          Gagal dimonitor
                        </option>
                        <option value="Rujuk RS" key="Rujuk RS">
                          Rujuk RS
                        </option>
                        <option value="Meninggal" key="Meninggal">
                          Meninggal
                        </option>
                        <option value="Isolasi mandiri" key="Isolasi mandiri">
                          Isolasi mandiri
                        </option>
                        <option
                          value="Isolasi di shelter"
                          key="Isolasi di shelter"
                        >
                          Isolasi di shelter
                        </option>
                        <option value="Selesai isolasi" key="Selesai isolasi">
                          Selesai isolasi
                        </option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="6">
                      <CLabel className="my-2">Diagnosa</CLabel>
                      <CSelect
                        id="diagnosa"
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                        value={this.state.dataPasienGet.diagnosa}
                      >
                        <option value="" key="">
                          -- Pilih Diagnosa --
                        </option>
                        <option
                          value="Covid 19 terkonfirmasi ringan"
                          key="Covid 19 terkonfirmasi ringan"
                        >
                          Covid 19 terkonfirmasi ringan
                        </option>
                        <option
                          value="Covid 19 terkonfirmasi sedang"
                          key="Covid 19 terkonfirmasi sedang"
                        >
                          Covid 19 terkonfirmasi sedang
                        </option>
                        <option
                          value="Covid 19 terkonfirmasi berat"
                          key="Covid 19 terkonfirmasi berat"
                        >
                          Covid 19 terkonfirmasi berat
                        </option>
                        <option value="Suspek" key="Suspek">
                          Suspek
                        </option>
                        <option value="Kontak erat" key="Kontak erat">
                          Kontak erat
                        </option>
                        <option value="Sehat" key="Sehat">
                          Sehat
                        </option>
                      </CSelect>
                    </CCol>
                    <CCol md="3">
                      <CLabel className="my-2">Tinggi Badan</CLabel>
                      <CInputGroup>
                        <CInput
                          id="tinggiBadan"
                          type="number"
                          defaultValue={this.state.dataPasienGet.tinggiBadan}
                          onChange={this.handleInputChangeDataPasien.bind(this)}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>cm</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                    <CCol md="3">
                      <CLabel className="my-2">Berat Badan</CLabel>
                      <CInputGroup>
                        <CInput
                          id="beratBadan"
                          type="number"
                          defaultValue={this.state.dataPasienGet.beratBadan}
                          onChange={this.handleInputChangeDataPasien.bind(this)}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText>kg</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="6">
                      <CLabel className="my-2">Alergi</CLabel>
                      <CInput
                        id="alergi"
                        type="text"
                        value={this.state.dataPasienGet.alergi}
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                      />
                    </CCol>
                    <CCol md="6">
                      <CLabel className="my-2">Komorbid</CLabel>
                      <CInput
                        id="komorbid"
                        type="text"
                        value={this.state.dataPasienGet.komorbid}
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="12">
                      <CLabel className="my-2">Alamat Isolasi</CLabel>
                      <CInput
                        id="alamatIsolasiMandiri"
                        type="text"
                        value={this.state.dataPasienGet.alamatIsolasiMandiri}
                        onChange={this.handleInputChangeDataPasien.bind(this)}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row variant="checkbox" className="ml-2 checkbox">
                    <CInputCheckbox
                      id="isiAlamat"
                      name="isiAlamat"
                      checked={this.state.checkBoxAlamat}
                      value={this.state.checkBoxAlamat}
                      onChange={this.handleCheckBoxSetAlamat.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="isiAlamat"
                    >
                      Sama dengan Alamat Domisili
                    </CLabel>
                  </CFormGroup>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              className="btn-light mr-1 float-right"
              onClick={() => {
                this.dataPasienGet();
                this.toggleStateEditData();
              }}
            >
              <span>Batal</span>
            </CButton>
            <CButton
              className="btn-facebook btn-brand mr-1 float-right"
              onClick={() => {
                this.dataPasienUpdate();
              }}
            >
              <span>Simpan</span>
            </CButton>
          </CModalFooter>
        </CModal>
        {/* Modal Tambah Gejala */}
        <CModal
          show={this.state.stateModalGejala}
          onClose={this.toggleStateModalGejala}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>{dateNow}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="demam"
                      name="demam"
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
                  </CFormGroup>
                  {this.state.demam && (
                    <CCol sm="3">
                      <CInput
                        placeholder="Suhu Demam C"
                        id="suhuDemam"
                        value={this.state.suhuDemam}
                        onChange={this.handleInputChange.bind(this)}
                      />
                    </CCol>
                  )}
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="demam14HariSebelumnya"
                      name="demam14HariSebelumnya"
                      checked={this.state.demam14HariSebelumnya}
                      value={!this.state.demam14HariSebelumnya}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="demam14HariSebelumnya"
                    >
                      Pernah Mengalami Demam 14 Hari Sebelumnya
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="batuk"
                      name="batuk"
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
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="kelelahan"
                      name="kelelahan"
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
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="sakitKepala"
                      name="sakitKepala"
                      checked={this.state.sakitKepala}
                      value={!this.state.sakitKepala}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="sakitKepala"
                    >
                      Sakit kepala
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="nyeriOtot"
                      name="nyeriOtot"
                      checked={this.state.nyeriOtot}
                      value={!this.state.nyeriOtot}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="nyeriOtot"
                    >
                      Nyeri otot
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="nyeriTenggorokan"
                      name="nyeriTenggorokan"
                      checked={this.state.nyeriTenggorokan}
                      value={!this.state.nyeriTenggorokan}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="nyeriTenggorokan"
                    >
                      Nyeri tenggorokan
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="pilek"
                      name="pilek"
                      checked={this.state.pilek}
                      value={!this.state.pilek}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="pilek"
                    >
                      Pilek(Hidung meler)/Hidung tersumbat
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="tidakNafsuMakan"
                      name="tidakNafsuMakan"
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
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="diare"
                      name="diare"
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
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="anosmia"
                      name="anosmia"
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
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="ageusia"
                      name="ageusia"
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
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="sesakNafas"
                      name="sesakNafas"
                      checked={this.state.sesakNafas}
                      value={!this.state.sesakNafas}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="sesakNafas"
                    >
                      Sesak nafas
                      <CImg src="logo/danger.svg" className="ml-1" />
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="nyeriDada"
                      name="nyeriDada"
                      checked={this.state.nyeriDada}
                      value={!this.state.nyeriDada}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="nyeriDada"
                    >
                      Nyeri pada dada terus menerus atau merasa seperti tertekan
                      pada area dada
                      <CImg src="logo/danger.svg" className="ml-1" />
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="kulitKebiruan"
                      name="kulitKebiruan"
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
                      <CImg src="logo/danger.svg" className="ml-1" />
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="sulitBangun"
                      name="sulitBangun"
                      checked={this.state.sulitBangun}
                      value={!this.state.sulitBangun}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="sulitBangun"
                    >
                      Sulit untuk dibangunkan ATAU perlu dirangsang nyeri untuk
                      dapat sadar ATAU hilang kesadaran
                      <CImg src="logo/danger.svg" className="ml-1" />
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="lainnyaGejalaCheck"
                      name="lainnyaGejalaCheck"
                      checked={this.state.lainnyaGejalaCheck}
                      value={!this.state.lainnyaGejalaCheck}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="lainnyaGejalaCheck"
                    >
                      Lainnya
                    </CLabel>
                    {this.state.lainnyaGejalaCheck && (
                      <CCol sm="3">
                        <CInput
                          placeholder="Gejala Lainnya"
                          id="lainnya"
                          value={this.state.lainnya}
                          onChange={this.handleInputChange.bind(this)}
                        />
                      </CCol>
                    )}
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-2">
                <CButton color="info" onClick={this.gejalaAdd} size="lg" block>
                  Simpan
                </CButton>{" "}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter></CModalFooter>
        </CModal>
        {/* Modal Riwayat Kepatuhan */}
        <CModal
          show={this.state.stateModalRiwayat}
          onClose={this.toggleStateModalRiwayat}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>
              <strong>Riwayat Kepatuhan Isolasi Mandiri</strong>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CDataTable
              items={this.state.kepatuhanList}
              fields={prokesFields}
              itemsPerPage={5}
              pagination
              scopedSlots={{
                no: (item, index) => <td>{index + 1}</td>,
                createdDate: (item) => (
                  <td>
                    {moment(item.createdDate).format("dddd, DD MMMM yyyy")}
                  </td>
                ),
                persentase: (item, index) => (
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({
                        isoman: item.isoman,
                        masker: item.masker,
                        berkumpul: item.berkumpul,
                        cuciTangan: item.cuciTangan,
                        makan: item.makan,
                        kamar: item.kamar,
                        pakaian: item.pakaian,
                        gejala: item.gejala,
                        berjemur: item.berjemur,
                        mandi: item.mandi,
                        cumanLihatProkes: true,
                        clickedDateProkes: moment(item.createdDate).format(
                          "dddd, DD MMMM yyyy"
                        ),
                      });
                      // this.toggleStateModalProkes();
                    }}
                  >
                    <StarRatings
                      rating={item.persentase * 5}
                      starRatedColor="yellow"
                      starDimension="30px"
                      numberOfStars={5}
                      name="rating"
                    />
                  </td>
                ),
              }}
            />
          </CModalBody>
        </CModal>
        {/* Modal Upload */}
        <CModal
          show={this.state.stateModalUpload}
          onClose={this.toggleStateModalUpload}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>
              <strong>Upload Dokumen</strong>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <CLabel>Drag file here</CLabel>

                {this.state.swabImage == "" && (
                  <div style={styles}>
                    <FileDrop
                      onDrop={(files, event) => {
                        console.log("onDrop!", files, event);
                        let data = files[0];
                        if (data.size <= 500000) {
                          this.convertToBase64(data);
                        } else {
                          toast.error("Ukuran File Maks 500 Kb!!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }
                      }}
                    >
                      <CImg src="logo/image.svg" />
                      Upload image: png, jpg max 500 Kb
                    </FileDrop>
                  </div>
                )}
                {this.state.swabImage != "" && (
                  <FileDrop
                    onDrop={(files, event) => {
                      console.log("onDrop!", files, event);
                      let data = files[0];
                      if (data.size <= 500000) {
                        this.convertToBase64(data);
                      } else {
                        toast.error("Ukuran File Maks 500 Kb!!", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }
                    }}
                    onChange={this.handleInputChange.bind(this)}
                  >
                    <CImg
                      width="100%"
                      height="100%"
                      src={this.state.swabImage}
                    ></CImg>
                  </FileDrop>
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormGroup row className="mt-3">
                  <CLabel col md={3}>
                    Choose File Here
                  </CLabel>
                  <CCol xs="10" md="8">
                    <CInputFile custom id="custom-file-input" />
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      Choose file...
                    </CLabel>
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              className="float-right btn-light mr-2"
              // onClick={() => {
              //   this.toggleStateModalUpload();
              // }}
            >
              Batal
            </CButton>
            <CButton
              className="float-right btn-facebook btn-brand mr-2"
              // onClick={() => {
              //   this.toggleStateModalUpload();
              // }}
            >
              {/* <CIcon name="" /> */}
              Upload
            </CButton>
          </CModalFooter>
        </CModal>
        {/* Modal Ketaatan Prokes */}
        <CModal
          show={this.state.stateModalProkes}
          onClose={this.toggleStateModalProkes}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>
              {this.state.clickedDateProkes == ""
                ? dateNow
                : this.state.clickedDateProkes}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="isoman"
                      name="isoman"
                      checked={this.state.isoman}
                      value={!this.state.isoman}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="isoman"
                    >
                      Melakukan isolasi mandiri di ruangan / kamar terpisah
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="masker"
                      name="masker"
                      checked={this.state.masker}
                      value={!this.state.masker}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="masker"
                    >
                      Memakai dan TIDAK melepas masker saat keluar kamar /
                      ruangan
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="berkumpul"
                      name="berkumpul"
                      checked={this.state.berkumpul}
                      value={!this.state.berkumpul}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="berkumpul"
                    >
                      Menghindari kumpul dengan orang rumah dan menjaga jarak
                      minimal 1,5 meter
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="cuciTangan"
                      name="cuciTangan"
                      checked={this.state.cuciTangan}
                      value={!this.state.cuciTangan}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="cuciTangan"
                    >
                      Cuci tangan memakai sabun dan air mengalir, seperti
                      sebelum makan, sebelum menyentuh peralatan rumah tangga di
                      luar kamar isolasi, setelah keluar dari kamar mandi, dll
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="makan"
                      name="makan"
                      checked={this.state.makan}
                      value={!this.state.makan}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="makan"
                    >
                      Menggunakan peralatan makan yang terpisah dari anggota
                      keluarga lain
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="kamar"
                      name="kamar"
                      checked={this.state.kamar}
                      value={!this.state.kamar}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="kamar"
                    >
                      Menjaga kebersihan kamar dan area yang sering disentuh
                      dengan cairan disinfektan
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="pakaian"
                      name="pakaian"
                      checked={this.state.pakaian}
                      value={!this.state.pakaian}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="pakaian"
                    >
                      Pakaian yang digunakan dicuci terpisah dari pakaian
                      anggota keluarga lain
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="gejala"
                      name="gejala"
                      checked={this.state.gejala}
                      value={!this.state.gejala}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="gejala"
                    >
                      Melakukan pemantauan gejala rutin harian (dengan fitur
                      KondisiKu)
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="berjemur"
                      name="berjemur"
                      checked={this.state.berjemur}
                      value={!this.state.berjemur}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="berjemur"
                    >
                      Berada di ruang terbuka dan berjemur di bawah sinar
                      matahari setiap pagi (durasi 10-15 menit)
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="my-1">
                <CListGroupItem>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id="mandi"
                      name="mandi"
                      checked={this.state.mandi}
                      value={!this.state.mandi}
                      onChange={this.handleCheckBoxChange.bind(this)}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="mandi"
                    >
                      Menggunakan perlengkapan mandi yang terpisah dari anggota
                      keluarga lain
                    </CLabel>
                  </CFormGroup>
                </CListGroupItem>
              </CCol>
            </CRow>
            {!this.state.cumanLihatProkes && (
              <CRow>
                <CCol className="my-2">
                  <CButton
                    color="info"
                    onClick={this.updateProkes}
                    size="lg"
                    block
                  >
                    Simpan
                  </CButton>
                </CCol>
              </CRow>
            )}
          </CModalBody>
          <CModalFooter></CModalFooter>
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
