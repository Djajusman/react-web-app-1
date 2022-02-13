import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CInputCheckbox,
  CContainer,
  CInputRadio,
  CDataTable,
  CButton,
  CCardHeader,
  CModal,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModalFooter,
} from "@coreui/react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CIcon from "@coreui/icons-react";

const step1Content = <h1>Step 1</h1>;
const step2Content = <h1>Step 2</h1>;
const step3Content = <h1>Step 3</h1>;
const step4Content = <h1>Step 4</h1>;
const step5Content = <h1>Step 5</h1>;
const step6Content = <h1>Step 6</h1>;
function step2Validator() {
  // return a boolean
}

// function step3Validator() {
//   // return a boolean
// }

function onFormSubmit() {
  // handle the submit logic here
  // This function will be executed at the last step
  // when the submit button (next button in the previous steps) is pressed
}
export default class Epidemologi extends Component {
  constructor() {
    super();
    this.state = {
      stateModalKontakErat: false,
      stateModalKontakKonfirmasi: false,
      stateModalKontakSuspek: false,
      stateModalPemeriksaan: false,
      memberDetail: {},
      epidemiologi: {},
      daftarKontak: [],
      pemeriksaanPenunjang: [],
      hewan: [],
      paparan: [],
      kontakKasus: [],
      //Fasyankes
      namaFasyankes: "",
      tglWawancaraStr: "",
      tempatTugas: "",
      hpPewawancara: "",
      namaPewawancara: "",
      //Gejala Awal
      tglTimbulGejalaStr: "",
      demam: false,
      demamSuhu: "",
      batuk: false,
      pilek: false,
      sakitTenggorokan: false,
      sesakNapas: false,
      sakitKepala: false,
      malaise: false,
      nyeriOtot: false,
      mual: false,
      abdomen: false,
      diare: false,
      lainnyaCheck: false,
      lainnya: "",
      //Kondisi Penyerta
      noSymptomBawaan: false,
      hamil: false,
      diabetes: false,
      jantung: false,
      hipertensi: false,
      keganasan: false,
      imunologi: false,
      ginjalKronis: false,
      hatiKronis: false,
      asma: false,
      ppok: false,
      lainnyaPenyerta: "",
      lainnyaCheck: false,
      //Diagnosis
      pneumonia: false,
      ards: false,
      lainnyaDiagnosis: "",
      lainnyaDiagnosisCheck: false,
      penyakitPernapasan: "",
      penyakitPernapasanCheck: false,
      rumahSakit: "",
      rumahSakitCheck: false,
      //Status Pasien
      selesaiIsolasi: true,
      masihSakit: false,
      meninggal: false,
      //Riwayat Perjalanan
      lnCheck: false,
      negaraLN: "",
      kotaLN: "",
      tglPerjalananLNStr: "",
      tglTibaLNStr: "",
      ptlChechk: false,
      provinsiPTL: "",
      kotaPTL: "",
      tglPerjalananPTLStr: "",
      tglTibaPTLStr: "",
      ttlCheck: false,
      provinsiTTL: "",
      kotaTTL: "",
      tglPerjalananTTLStr: "",
      tglTibaTTLStr: "",
      kontakSuspekCheck: false,
      //Faktor Paparan
      kontakKonfirmasiCheck: false,
      ispa: false,
      punyaHewan: false,
      hewan1: "",
      hewan2: "",
      hewan3: "",
      hewan4: "",
      erosol: false,
      petugasKesehatan: false,
      gown: false,
      maskerFFP2: false,
      maskerFFP3: false,
      apd: false,
      maskerMedis: false,
      sarungTangan: false,
      goggle: false,
      //Pemeriksaan Penunjang
      namaPemeriksaan: "",
      tanggalPemeriksaan: "",
      tempatPemeriksaan: "",
      hasilPemeriksaan: "",
      //Kontak Suspek
      namaKontakSuspek: "",
      alamatKontakSuspek: "",
      hubunganKontakSuspek: "",
      tanggalKontakSuspek: "",
      //Kontak Konfirmasi
      namaKontakKonfirmasi: "",
      alamatKontakKonfirmasi: "",
      hubunganKontakKonfirmasi: "",
      tanggalKontakKonfirmasi: "",
      //Kontak Erat Tabel
      namaKontakErat: "",
      umur: "",
      gender: "",
      alamatKontakErat: "",
      noHp: "",
      aktifitasKontak: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      akunID: this.props.match.params.akunID,
      memberID: this.props.match.params.memberID,
    });
    this.getEpidemiologi();
  }
  toggleStateModalPemeriksaan = () => {
    this.setStateModalPemeriksaan(!this.state.stateModalPemeriksaan);
  };
  setStateModalPemeriksaan(stateModalPemeriksaan) {
    this.setState({
      stateModalPemeriksaan: stateModalPemeriksaan,
    });
  }
  toggleStateModalKontakErat = () => {
    this.setStateModalKontakErat(!this.state.stateModalKontakErat);
  };
  setStateModalKontakErat(stateModalKontakErat) {
    this.setState({
      stateModalKontakErat: stateModalKontakErat,
    });
  }
  toggleStateModalKontakKonfirmasi = () => {
    this.setStateModalKontakKonfirmasi(!this.state.stateModalKontakKonfirmasi);
  };
  setStateModalKontakKonfirmasi(stateModalKontakKonfirmasi) {
    this.setState({
      stateModalKontakKonfirmasi: stateModalKontakKonfirmasi,
    });
  }
  toggleStateModalKontakSuspek = () => {
    this.setStateModalKontakSuspek(!this.state.stateModalKontakSuspek);
  };
  setStateModalKontakSuspek(stateModalKontakSuspek) {
    this.setState({
      stateModalKontakSuspek: stateModalKontakSuspek,
    });
  }
  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  handleCheckBoxChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value == "true" ? true : false,
    });
    console.log(event.target.value);
  };
  handleStatusChange = (event) => {
    var h = event.target.id;
    var i;
    var j;
    if (h == "selesaiIsolasi") {
      i = "masihSakit";
      j = "meninggal";
    } else if (h == "masihSakit") {
      i = "selesaiIsolasi";
      j = "meninggal";
    } else if (h == "meninggal") {
      i = "selesaiIsolasi";
      j = "masihSakit";
    }
    this.setState({
      [h]: event.target.value == "true" ? true : false,
      [i]: event.target.value == "true" ? false : true,
      [j]: event.target.value == "true" ? false : true,
    });
    console.log(event.target.value);
  };
  getEpidemiologi = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/members/get?akunid=${this.props.match.params.akunID}&memberid=${this.props.match.params.memberID}`,
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
        console.log("Get Epidemiologi=>", data);
        var epidemiologi;
        epidemiologi = data.data.epidemiologi;
        this.setState({
          totalPage: data.data.total_page,
          memberDetail: data.data,
          epidemiologi: data.data.epidemiologi,
          daftarKontak: epidemiologi.daftarKontak,
          pemeriksaanPenunjang: epidemiologi.pemeriksaanPenunjang,
          hewan: epidemiologi.faktorKontak.hewan,
          paparan: epidemiologi.faktorKontak.paparan,
          kontakKasus: epidemiologi.riwayatPerjalanan.kontakKasus,
          //Fasyankes
          namaFasyankes: epidemiologi.wawancara.namaFasyankes,
          tglWawancaraStr: epidemiologi.wawancara.tglWawancaraStr,
          tempatTugas: epidemiologi.wawancara.tempatTugas,
          hpPewawancara: epidemiologi.wawancara.hpPewawancara,
          namaPewawancara: epidemiologi.wawancara.namaPewawancara,
          //Gejala Awal
          tglTimbulGejalaStr: epidemiologi.symptomAwal.tglTimbulGejalaStr,
          demam: epidemiologi.symptomAwal.demam,
          demamSuhu: epidemiologi.symptomAwal.demamSuhu,
          batuk: epidemiologi.symptomAwal.batuk,
          pilek: epidemiologi.symptomAwal.pilek,
          sakitTenggorokan: epidemiologi.symptomAwal.sakitTenggorokan,
          sesakNapas: epidemiologi.symptomAwal.sesakNapas,
          sakitKepala: epidemiologi.symptomAwal.sakitKepala,
          malaise: epidemiologi.symptomAwal.malaise,
          nyeriOtot: epidemiologi.symptomAwal.nyeriOtot,
          mual: epidemiologi.symptomAwal.mual,
          abdomen: epidemiologi.symptomAwal.abdomen,
          diare: epidemiologi.symptomAwal.diare,
          lainnya: epidemiologi.symptomAwal.lainnya,
          //Kondisi Penyerta
          noSymptomBawaan: epidemiologi.symptomBawaan.noSymptomBawaan,
          hamil: epidemiologi.symptomBawaan.hamil,
          diabetes: epidemiologi.symptomBawaan.diabetes,
          jantung: epidemiologi.symptomBawaan.jantung,
          hipertensi: epidemiologi.symptomBawaan.hipertensi,
          keganasan: epidemiologi.symptomBawaan.keganasan,
          imunologi: epidemiologi.symptomBawaan.imunologi,
          ginjalKronis: epidemiologi.symptomBawaan.ginjalKronis,
          hatiKronis: epidemiologi.symptomBawaan.hatiKronis,
          asma: epidemiologi.symptomBawaan.asma,
          ppok: epidemiologi.symptomBawaan.ppok,
          lainnyaPenyerta: epidemiologi.symptomBawaan.lainnya,
          //Diagnosis
          pneumonia: epidemiologi.diagnosis.pneumonia,
          ards: epidemiologi.diagnosis.ards,
          lainnyaDiagnosis: epidemiologi.diagnosis.lainnyaDiagnosis,
          penyakitPernapasan: epidemiologi.diagnosis.penyakitPernapasan,
          rumahSakit: epidemiologi.diagnosis.rumahSakit,
          //Status Pasien
          selesaiIsolasi: epidemiologi.statusPasien.selesaiIsolasi,
          masihSakit: epidemiologi.statusPasien.masihSakit,
          meninggal: epidemiologi.statusPasien.meninggal,
          //Riwayat Perjalanan
          negaraLN: epidemiologi.riwayatPerjalanan.negaraLN,
          kotaLN: epidemiologi.riwayatPerjalanan.kotaLN,
          tglPerjalananLNStr: epidemiologi.riwayatPerjalanan.tglPerjalananLNStr,
          tglTibaLNStr: epidemiologi.riwayatPerjalanan.tglTibaLNStr,
          provinsiPTL: epidemiologi.riwayatPerjalanan.provinsiPTL,
          kotaPTL: epidemiologi.riwayatPerjalanan.kotaPTL,
          tglPerjalananPTLStr:
            epidemiologi.riwayatPerjalanan.tglPerjalananPTLStr,
          tglTibaPTLStr: epidemiologi.riwayatPerjalanan.tglTibaPTLStr,
          provinsiTTL: epidemiologi.riwayatPerjalanan.provinsiTTL,
          kotaTTL: epidemiologi.riwayatPerjalanan.kotaTTL,
          tglPerjalananTTLStr:
            epidemiologi.riwayatPerjalanan.tglPerjalananTTLStr,
          tglTibaTTLStr: epidemiologi.riwayatPerjalanan.tglTibaTTLStr,
          //Faktor Paparan
          ispa: epidemiologi.faktorKontak.ispa,
          erosol: epidemiologi.faktorKontak.erosol,
          petugasKesehatan: epidemiologi.faktorKontak.petugasKesehatan,
          gown: epidemiologi.faktorKontak.gown,
          maskerFFP2: epidemiologi.faktorKontak.maskerFFP2,
          maskerFFP3: epidemiologi.faktorKontak.maskerFFP3,
          apd: epidemiologi.faktorKontak.apd,
          maskerMedis: epidemiologi.faktorKontak.maskerMedis,
          sarungTangan: epidemiologi.faktorKontak.sarungTangan,
          goggle: epidemiologi.faktorKontak.goggle,
        });
        for (var i = 0; i < this.state.hewan.length; i++) {
          if (i == 0) {
            this.setState({
              hewan1: this.state.hewan[0],
            });
          }
          if (i == 1) {
            this.setState({
              hewan2: this.state.hewan[1],
            });
          }
          if (i == 2) {
            this.setState({
              hewan3: this.state.hewan[2],
            });
          }
          if (i == 3) {
            this.setState({
              hewan4: this.state.hewan[3],
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  updateEpidemiologi = () => {
    var tempHewan = [];
    tempHewan.push(this.state.hewan1);
    tempHewan.push(this.state.hewan2);
    tempHewan.push(this.state.hewan3);
    tempHewan.push(this.state.hewan4);
    var memberDetail = this.state.memberDetail;
    memberDetail.epidemiologi = {
      wawancara: {
        namaFasyankes: this.state.namaFasyankes,
        tempatTugas: this.state.tempatTugas,
        namaPewawancara: this.state.namaPewawancara,
        tglWawancaraStr: `${this.state.tglWawancaraStr}`,
        // tglWawancara: `${this.state.tglWawancaraStr}T07:00:00+07:00`,
        hpPewawancara: this.state.hpPewawancara,
      },
      symptomAwal: {
        tglTimbulGejalaStr: `${this.state.tglTimbulGejalaStr}`,
        demam: this.state.demam,
        demamSuhu: this.state.demamSuhu,
        batuk: this.state.batuk,
        pilek: this.state.pilek,
        sakitTenggorokan: this.state.sakitTenggorokan,
        sesakNapas: this.state.sesakNapas,
        sakitKepala: this.state.sakitKepala,
        malaise: this.state.malaise,
        nyeriOtot: this.state.nyeriOtot,
        mual: this.state.mual,
        abdomen: this.state.abdomen,
        diare: this.state.diare,
        lainnya: this.state.lainnya,
      },
      symptomBawaan: {
        noSymptomBawaan: this.state.noSymptomBawaan,
        hamil: this.state.hamil,
        diabetes: this.state.diabetes,
        jantung: this.state.jantung,
        hipertensi: this.state.hipertensi,
        keganasan: this.state.keganasan,
        imunologi: this.state.imunologi,
        ginjalKronis: this.state.ginjalKronis,
        hatiKronis: this.state.hatiKronis,
        asma: this.state.asma,
        ppok: this.state.ppok,
        lainnya: this.state.lainnyaPenyerta,
      },
      diagnosis: {
        pneumonia: this.state.pneumonia,
        ards: this.state.ards,
        lainnya: this.state.lainnyaDiagnosis,
        penyakitPernapasan: this.state.penyakitPernapasan,
        rumahSakit: this.state.rumahSakit,
      },
      statusPasien: {
        selesaiIsolasi: this.state.selesaiIsolasi,
        masihSakit: this.state.masihSakit,
        meninggal: this.state.meninggal,
      },
      pemeriksaanPenunjang: this.state.pemeriksaanPenunjang,
      riwayatPerjalanan: {
        negaraLN: this.state.negaraLN,
        kotaLN: this.state.kotaLN,
        tglPerjalananLNStr: `${this.state.tglPerjalananLNStr}`,
        tglTibaLNStr: `${this.state.tglTibaLNStr}`,
        provinsiPTL: this.state.provinsiPTL,
        kotaPTL: this.state.kotaPTL,
        tglPerjalananPTLStr: `${this.state.tglPerjalananPTLStr}`,
        tglTibaPTLStr: `${this.state.tglTibaPTLStr}`,
        provinsiTTL: this.state.provinsiTTL,
        kotaTTL: this.state.kotaTTL,
        tglPerjalananTTLStr: `${this.state.tglPerjalananTTLStr}`,
        tglTibaTTLStr: `${this.state.tglTibaTTLStr}`,
        kontakKasus: this.state.kontakKasus,
      },
      faktorKontak: {
        paparan: this.state.paparan,
        ispa: this.state.ispa,
        hewan: tempHewan,
        gown: this.state.gown,
        maskerMedis: this.state.maskerMedis,
        sarungTangan: this.state.sarungTangan,
        maskerFFP2: this.state.maskerFFP2,
        maskerFFP3: this.state.maskerFFP3,
        goggle: this.state.goggle,
        apd: this.state.apd,
        erosol: this.state.erosol,
      },
      daftarKontak: this.state.daftarKontak,
    };
    var body = memberDetail;
    console.log("Body Update", body);
    fetch(`https://api.aktiv.co.id/api/aktivengine/v2/patient/members/update`, {
      method: "PUT",
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
            toast.success("Update Berhasil", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.getEpidemiologi();
          } else {
            toast.error("Update Gagal: " + data.statusmsg, {
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
  downloadExcel = () => {
    var url = `https://report.aktiv.co.id/api/epidemiologi/${this.state.akunID}?memberID=${this.state.memberID}`;

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

  render() {
    return (
      <div className="container-fluid">
        <CRow>
          <CCol>
            <CButton
              className="btn-outline-info float-right mb-1"
              style={{ backgroundColor: "white" }}
              onClick={() => {
                this.downloadExcel();
              }}
            >
              <CIcon name="cilDataTransferDown" />
              <span>Unduh Excel</span>
            </CButton>
          </CCol>
        </CRow>
        <CCard>
          <CRow>
            <CCol>
              <CCardBody>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="namaFasyankes">Nama Fasyankes</CLabel>
                      <CInput
                        id="namaFasyankes"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.namaFasyankes}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="tglWawancaraStr">
                        Tanggal Wawancara
                      </CLabel>
                      <CInput
                        id="tglWawancaraStr"
                        type="date"
                        onChange={this.handleInputChange}
                        value={this.state.tglWawancaraStr}
                      />
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="tempatTugas">Tempat Tugas</CLabel>
                      <CInput
                        id="tempatTugas"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.tempatTugas}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="hpPewawancara">
                        Handphone Pewawancara
                      </CLabel>
                      <CInput
                        id="hpPewawancara"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.hpPewawancara}
                      />
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="namaPewawancara">
                        Nama Pewawancara
                      </CLabel>
                      <CInput
                        id="namaPewawancara"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.namaPewawancara}
                      />
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
        {/* Biodata */}
        {/* <CCard>
          <CRow>
            <CCol>
              <CCardBody>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="fullName">Nama Pasien</CLabel>
                      <CInput id="fullName" type="text"
                        onChange={this.handleInputChange}
                        value={this.state.fullName}
                        />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="nik">NIK</CLabel>
                      <CInput id="nik" type="text"
                        onChange={this.handleInputChange}
                        value={this.state.nik}
                        />
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
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
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="birthDateStr">Tanggal Lahir</CLabel>
                      <CInput id="birthDateStr" type="date"
                        onChange={this.handleInputChange}
                        value={this.state.birthDateStr}
                        />
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="job">Pekerjaan</CLabel>
                      <CInput id="job" type="text"
                        onChange={this.handleInputChange}
                        value={this.state.job}
                        />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="leaderName">Nama Orangtua / Kepala Keluarga</CLabel>
                      <CInput id="leaderName" type="text"
                        onChange={this.handleInputChange}
                        value={this.state.leaderName}
                        />
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="city">Nama Pewawancara</CLabel>
                      <CInput id="city" />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="city">Nama Pewawancara</CLabel>
                      <CInput id="city" />
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard> */}
        <CCard>
          <CCardBody>
            <CContainer>
              <CRow className={"my-2"}>
                <CCol>
                  <h5>
                    <strong>Gejala Awal</strong>
                  </h5>
                </CCol>
              </CRow>
              <CRow className={"my-2"}>
                <CCol sm="3">
                  <CInput
                    type="date"
                    id="tglTimbulGejalaStr"
                    onChange={this.handleInputChange}
                    value={this.state.tglTimbulGejalaStr}
                  />
                </CCol>
              </CRow>
              <CRow className={"my-2"}>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="demam"
                          name="demam"
                          checked={this.state.demam}
                          value={!this.state.demam}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="demam"
                        >
                          Demam
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                    {this.state.demam && (
                      <CCol className="my-1">
                        <CInput
                          size={"sm"}
                          placeholder="Suhu"
                          type="text"
                          id="demamSuhu"
                          onChange={this.handleInputChange}
                          value={this.state.demamSuhu}
                        />
                      </CCol>
                    )}
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="sakitTenggorokan"
                          name="sakitTenggorokan"
                          checked={this.state.sakitTenggorokan}
                          value={!this.state.sakitTenggorokan}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="sakitTenggorokan"
                        >
                          Sakit Tenggorokan
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="malaise"
                          name="malaise"
                          checked={this.state.malaise}
                          value={!this.state.malaise}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="malaise"
                        >
                          Lemah / Malaise
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="abdomen"
                          name="abdomen"
                          checked={this.state.abdomen}
                          value={!this.state.abdomen}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="abdomen"
                        >
                          Nyeri Abdomen
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow className={"my-2"}>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="batuk"
                          name="batuk"
                          checked={this.state.batuk}
                          value={!this.state.batuk}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="batuk"
                        >
                          Batuk
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="sesakNapas"
                          name="sesakNapas"
                          checked={this.state.sesakNapas}
                          value={!this.state.sesakNapas}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="sesakNapas"
                        >
                          Sesak Nafas
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="nyeriOtot"
                          name="nyeriOtot"
                          checked={this.state.nyeriOtot}
                          value={!this.state.nyeriOtot}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="nyeriOtot"
                        >
                          Nyeri Otot
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="diare"
                          name="diare"
                          checked={this.state.diare}
                          value={!this.state.diare}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="diare"
                        >
                          Diare
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow className={"my-2"}>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="pilek"
                          name="pilek"
                          checked={this.state.pilek}
                          value={!this.state.pilek}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="pilek"
                        >
                          Pilek
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="sakitKepala"
                          name="sakitKepala"
                          checked={this.state.sakitKepala}
                          value={!this.state.sakitKepala}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="sakitKepala"
                        >
                          Sakit Kepala
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="mual"
                          name="mual"
                          checked={this.state.mual}
                          value={!this.state.mual}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="mual"
                        >
                          Mual / Muntah
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="lainnyaCheck"
                          name="lainnyaCheck"
                          checked={this.state.lainnyaCheck}
                          value={!this.state.lainnyaCheck}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="sakitKepala"
                        >
                          Lainnya
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                    {this.state.lainnyaCheck && (
                      <CCol className="my-1">
                        <CInput
                          size={"sm"}
                          placeholder="Lainnya"
                          type="text"
                          id="lainnya"
                          onChange={this.handleInputChange}
                          value={this.state.lainnya}
                        />
                      </CCol>
                    )}
                  </CRow>
                </CCol>
              </CRow>
              <CRow className={"mt-5"}>
                <CCol>
                  <h5>
                    <strong>Kondisi Penyerta</strong>
                  </h5>
                </CCol>
              </CRow>

              <CRow className={"my-2"}>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="hamil"
                          name="hamil"
                          checked={this.state.hamil}
                          value={!this.state.hamil}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="hamil"
                        >
                          Hamil
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="hipertensi"
                          name="hipertensi"
                          checked={this.state.hipertensi}
                          value={!this.state.hipertensi}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="hipertensi"
                        >
                          Hipertensi
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="ginjalKronis"
                          name="ginjalKronis"
                          checked={this.state.ginjalKronis}
                          value={!this.state.ginjalKronis}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="ginjalKronis"
                        >
                          Gagal Ginjal Kronis
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="lainnyaPenyertaCheck"
                          name="lainnyaPenyertaCheck"
                          checked={this.state.lainnyaPenyertaCheck}
                          value={!this.state.lainnyaPenyertaCheck}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="lainnyaPenyertaCheck"
                        >
                          Lainnya
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                    {this.state.lainnyaPenyertaCheck && (
                      <CCol className="my-1">
                        <CInput
                          size={"sm"}
                          placeholder="Lainnya"
                          type="text"
                          id="lainnyaPenyerta"
                          onChange={this.handleInputChange}
                          value={this.state.lainnyaPenyerta}
                        />
                      </CCol>
                    )}
                  </CRow>
                </CCol>
              </CRow>
              <CRow className={"my-2"}>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="diabetes"
                          name="diabetes"
                          checked={this.state.diabetes}
                          value={!this.state.diabetes}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="diabetes"
                        >
                          Diabetes
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="keganasan"
                          name="keganasan"
                          checked={this.state.keganasan}
                          value={!this.state.keganasan}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="keganasan"
                        >
                          Keganasan
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="hatiKronis"
                          name="hatiKronis"
                          checked={this.state.hatiKronis}
                          value={!this.state.hatiKronis}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="hatiKronis"
                        >
                          Gagal Hati Kronis
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="jantung"
                          name="jantung"
                          checked={this.state.jantung}
                          value={!this.state.jantung}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="jantung"
                        >
                          Penyakit Jantung
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow className={"my-2"}>
                <CCol sm="3">
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="imunologi"
                          name="imunologi"
                          checked={this.state.imunologi}
                          value={!this.state.imunologi}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="imunologi"
                        >
                          Gangguan Imunologi
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol sm="3">
                  <CRow>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="ppok"
                          name="ppok"
                          checked={this.state.ppok}
                          value={!this.state.ppok}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="ppok"
                        >
                          PPOK
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow className={"mt-5"}>
                <CCol>
                  <h5>
                    <strong>Diagnosa</strong>
                  </h5>
                </CCol>
              </CRow>

              <CRow className={"my-2"}>
                <CCol>
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="pneumonia"
                          name="pneumonia"
                          checked={this.state.pneumonia}
                          value={!this.state.pneumonia}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="pneumonia"
                        >
                          Pneumonia (Klinis atau Radiologi)
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="ards"
                          name="ards"
                          checked={this.state.ards}
                          value={!this.state.ards}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="ards"
                        >
                          ARDS ( Acute Respiratory Distress Syndrome )
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="lainnyaDiagnosisCheck"
                          name="lainnyaDiagnosisCheck"
                          checked={this.state.lainnyaDiagnosisCheck}
                          value={!this.state.lainnyaDiagnosisCheck}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="lainnyaDiagnosisCheck"
                        >
                          Lainnya, sebutkan :
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    {this.state.lainnyaDiagnosisCheck && (
                      <CCol className="my-1" sm="4">
                        <CInput
                          id="lainnyaDiagnosis"
                          placeholder="Lainnya"
                          onChange={this.handleInputChange}
                          value={this.state.lainnyaDiagnosis}
                        />
                      </CCol>
                    )}
                  </CRow>
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="penyakitPernapasanCheck"
                          name="penyakitPernapasanCheck"
                          checked={this.state.penyakitPernapasanCheck}
                          value={!this.state.penyakitPernapasanCheck}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="penyakitPernapasanCheck"
                        >
                          Pasien mempunya diagnosis atau etiologi lain untuk
                          penyakit pernapasan ? jika ya, sebutkan !
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    {this.state.penyakitPernapasanCheck && (
                      <CCol className="my-1" sm="4">
                        <CInput
                          id="penyakitPernapasan"
                          placeholder="Penyakit Pernapasan"
                          onChange={this.handleInputChange}
                          value={this.state.penyakitPernapasan}
                        />
                      </CCol>
                    )}
                  </CRow>
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="rumahSakitCheck"
                          name="rumahSakitCheck"
                          checked={this.state.rumahSakitCheck}
                          value={!this.state.rumahSakitCheck}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="rumahSakitCheck"
                        >
                          Pasien dirawat di Rumah Sakit ? sebutkan nama Rumah
                          Sakit terakhir
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    {this.state.rumahSakitCheck && (
                      <CCol className="my-1" sm="4">
                        <CInput
                          id="rumahSakit"
                          placeholder="Rumah Sakit"
                          onChange={this.handleInputChange}
                          value={this.state.rumahSakit}
                        />
                      </CCol>
                    )}
                  </CRow>
                  <CRow className={"mt-5"}>
                    <CCol>
                      <h5>
                        <strong>Status Pasien</strong>
                      </h5>
                    </CCol>
                  </CRow>

                  <CRow className={"my-2"}>
                    <CCol>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputRadio
                              id="selesaiIsolasi"
                              name="selesaiIsolasi"
                              checked={this.state.selesaiIsolasi}
                              value={!this.state.selesaiIsolasi}
                              onChange={this.handleStatusChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="selesaiIsolasi"
                            >
                              Selesai Isolasi / Sembuh
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputRadio
                              id="masihSakit"
                              name="masihSakit"
                              checked={this.state.masihSakit}
                              value={!this.state.masihSakit}
                              onChange={this.handleStatusChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="masihSakit"
                            >
                              Masih Sakit
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputRadio
                              id="meninggal"
                              name="meninggal"
                              checked={this.state.meninggal}
                              value={!this.state.meninggal}
                              onChange={this.handleStatusChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="meninggal"
                            >
                              Meninggal
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CContainer>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            <CContainer className="d-flex align-items-center justify-content-between">
              <h5>
                <strong>Pemeriksaan Penunjang</strong>
              </h5>
              <CButton
                className={"float-right btn-facebook btn-brand"}
                color="primary"
                onClick={this.toggleStateModalPemeriksaan}
              >
                Tambah Pemeriksaan
              </CButton>
            </CContainer>
          </CCardHeader>
          <CCardBody>
            <CModal
              show={this.state.stateModalPemeriksaan}
              onClose={this.toggleStateModalPemeriksaan}
              size="sm"
            >
              <CModalHeader closeButton>
                <CModalTitle>Tambah Pemeriksaan</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CContainer>
                  <CRow>
                    <CCol>
                      <CLabel>Nama Pemeriksaan</CLabel>
                      <CInput
                        id="namaPemeriksaan"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.namaPemeriksaan}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="my-3">
                    <CCol>
                      <CLabel>Tanggal Pemeriksaan</CLabel>
                      <CInput
                        id="tanggalPemeriksaan"
                        type="date"
                        onChange={this.handleInputChange}
                        value={this.state.tanggalPemeriksaan}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="my-3">
                    <CCol>
                      <CLabel>Tempat Pemeriksaan</CLabel>
                      <CInput
                        id="tempatPemeriksaan"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.tempatPemeriksaan}
                      />
                    </CCol>
                  </CRow>

                  <CRow className="my-3">
                    <CCol>
                      <CLabel>Hasil Pemeriksaan</CLabel>
                      <CInput
                        id="hasilPemeriksaan"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.hasilPemeriksaan}
                      />
                    </CCol>
                  </CRow>
                </CContainer>
              </CModalBody>
              <CModalFooter>
                <CButton
                  className={"float-right btn-facebook btn-brand"}
                  color="primary"
                  onClick={() => {
                    this.state.pemeriksaanPenunjang.push({
                      nama: this.state.namaPemeriksaan,
                      tglPengambilanStr: `${this.state.tanggalPemeriksaan}`,
                      tempatPemeriksaan: this.state.tempatPemeriksaan,
                      hasil: this.state.hasilPemeriksaan,
                    });
                    this.toggleStateModalPemeriksaan();
                  }}
                >
                  Simpan
                </CButton>
              </CModalFooter>
            </CModal>
            <CDataTable
              items={this.state.pemeriksaanPenunjang}
              fields={[
                {
                  key: "nama",
                  label: "Nama Pemeriksaan",
                },
                {
                  key: "tglPengambilanStr",
                  label: "Tanggal Pengambilan",
                },
                {
                  key: "tempatPemeriksaan",
                  label: "Tempat Pemeriksaan",
                },
                {
                  key: "hasil",
                  label: "Hasil",
                },
              ]}
            />
          </CCardBody>
        </CCard>
        <CCard>
          <CContainer>
            <CRow>
              <CCol>
                <CCardBody>
                  <CRow className={"mb-3"}>
                    <CCol>
                      <h5>
                        <strong>Faktor Riwayat Perjalanan</strong>
                      </h5>
                    </CCol>
                  </CRow>
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="lnCheck"
                          name="lnCheck"
                          checked={this.state.lnCheck}
                          value={!this.state.lnCheck}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="lnCheck"
                        >
                          Dalam 14 hari sebelum sakit, apakah memiliki riwayat
                          perjalanan dari luar negeri ? jika ya, jelaskan!
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  {this.state.lnCheck && (
                    <CFormGroup row className="my-0">
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="negaraLN">Negara</CLabel>
                          <CInput
                            id="negaraLN"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.negaraLN}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="kotaLN">Kota</CLabel>
                          <CInput
                            id="kotaLN"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.kotaLN}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="tglPerjalananLNStr">
                            Tanggal Perjalanan
                          </CLabel>
                          <CInput
                            id="tglPerjalananLNStr"
                            type="date"
                            onChange={this.handleInputChange}
                            value={this.state.tglPerjalananLNStr}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="tglTibaLNStr">
                            Tanggal Tiba di Indonesia
                          </CLabel>
                          <CInput
                            id="tglTibaLNStr"
                            type="date"
                            onChange={this.handleInputChange}
                            value={this.state.tglTibaLNStr}
                          />
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>
                  )}
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="ptlChechk"
                          name="ptlChechk"
                          checked={this.state.ptlChechk}
                          value={!this.state.ptlChechk}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="ptlChechk"
                        >
                          Dalam 14 hari sebelum sakit, apakah memiliki riwayat
                          perjalanan dari area transmisi lokal ? jika ya,
                          jelaskan!
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  {this.state.ptlChechk && (
                    <CFormGroup row className="my-0">
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="provinsiPTL">Provinsi</CLabel>
                          <CInput
                            id="provinsiPTL"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.provinsiPTL}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="kotaPTL">Kota</CLabel>
                          <CInput
                            id="kotaPTL"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.kotaPTL}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="tglPerjalananPTLStr">
                            Tanggal Perjalanan
                          </CLabel>
                          <CInput
                            id="tglPerjalananPTLStr"
                            type="date"
                            onChange={this.handleInputChange}
                            value={this.state.tglPerjalananPTLStr}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="tglTibaLNStr">
                            Tanggal Tiba di tempat
                          </CLabel>
                          <CInput
                            id="tglTibaPTLStr"
                            type="date"
                            onChange={this.handleInputChange}
                            value={this.state.tglTibaPTLStr}
                          />
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>
                  )}
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="ttlCheck"
                          name="ttlCheck"
                          checked={this.state.ttlCheck}
                          value={!this.state.ttlCheck}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="ttlCheck"
                        >
                          Dalam 14 hari sebelum sakit, apakah memiliki riwayat
                          tinggal ke area transmisi lokal ? jika ya, jelaskan!
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  {this.state.ttlCheck && (
                    <CFormGroup row className="my-0">
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="provinsiTTL">Provinsi</CLabel>
                          <CInput
                            id="provinsiTTL"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.provinsiTTL}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="kotaTTL">Kota</CLabel>
                          <CInput
                            id="kotaTTL"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.kotaTTL}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="tglPerjalananTTLStr">
                            Tanggal Perjalanan
                          </CLabel>
                          <CInput
                            id="tglPerjalananTTLStr"
                            type="date"
                            onChange={this.handleInputChange}
                            value={this.state.tglPerjalananTTLStr}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="tglTibaTTLStr">
                            Tanggal Tiba di tempat
                          </CLabel>
                          <CInput
                            id="tglTibaTTLStr"
                            type="date"
                            onChange={this.handleInputChange}
                            value={this.state.tglTibaTTLStr}
                          />
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>
                  )}
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="kontakSuspekCheck"
                          name="kontakSuspekCheck"
                          checked={this.state.kontakSuspekCheck}
                          value={!this.state.kontakSuspekCheck}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="kontakSuspekCheck"
                        >
                          Dalam 14 hari sebelum sakit, apakah memiliki kontak
                          dengan kasus suspek / probable COVID-19 ? jika ya,
                          sebutkan!
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  {this.state.kontakSuspekCheck && (
                    <div>
                      <CButton
                        className={"float-right my-3 btn-facebook btn-brand"}
                        color="primary"
                        onClick={this.toggleStateModalKontakSuspek}
                      >
                        Tambah Pemeriksaan
                      </CButton>
                      <CModal
                        show={this.state.stateModalKontakSuspek}
                        onClose={this.toggleStateModalKontakSuspek}
                        size="sm"
                      >
                        <CModalHeader closeButton>
                          <CModalTitle>Tambah Daftar Kontak</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <CContainer>
                            <CRow>
                              <CCol>
                                <CLabel>Nama Kontak Suspek</CLabel>
                                <CInput
                                  id="namaKontakSuspek"
                                  type="text"
                                  onChange={this.handleInputChange}
                                  value={this.state.namaKontakSuspek}
                                />
                              </CCol>
                            </CRow>
                            <CRow className="my-3">
                              <CCol>
                                <CLabel>Alamat</CLabel>
                                <CInput
                                  id="alamatKontakSuspek"
                                  type="text"
                                  onChange={this.handleInputChange}
                                  value={this.state.alamatKontakSuspek}
                                />
                              </CCol>
                            </CRow>

                            <CRow className="my-3">
                              <CCol>
                                <CLabel>Hubungan</CLabel>
                                <CInput
                                  id="hubunganKontakSuspek"
                                  type="text"
                                  onChange={this.handleInputChange}
                                  value={this.state.hubunganKontakSuspek}
                                />
                              </CCol>
                            </CRow>
                            <CRow className="my-3">
                              <CCol>
                                <CLabel>Tanggal Kontak</CLabel>
                                <CInput
                                  id="tanggalKontakSuspek"
                                  type="date"
                                  onChange={this.handleInputChange}
                                  value={this.state.tanggalKontakSuspek}
                                />
                              </CCol>
                            </CRow>
                          </CContainer>
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            className={"float-right btn-facebook btn-brand"}
                            color="primary"
                            onClick={() => {
                              this.state.paparan.push({
                                nama: this.state.namaKontakSuspek,
                                alamat: this.state.alamatKontakSuspek,
                                hubungan: this.state.hubunganKontakSuspek,
                                tglKontakStr: `${this.state.tanggalKontakSuspek}`,
                              });
                              this.toggleStateModalKontakSuspek();
                            }}
                          >
                            Simpan
                          </CButton>
                        </CModalFooter>
                      </CModal>
                      <CDataTable
                        items={this.state.paparan}
                        fields={[
                          {
                            key: "nama",
                            label: "Nama Suspek",
                          },
                          {
                            key: "alamat",
                            label: "Alamat",
                          },
                          {
                            key: "hubungan",
                            label: "Hubungan",
                          },
                          {
                            key: "tglKontakStr",
                            label: "Tanggal Kontak",
                          },
                        ]}
                      />
                    </div>
                  )}
                </CCardBody>
              </CCol>
            </CRow>
          </CContainer>
        </CCard>
        <CCard>
          <CContainer>
            <CRow>
              <CCol>
                <CCardBody>
                  <CRow className={"mb-3"}>
                    <CCol>
                      <h5>
                        <strong>Faktor Kontak Paparan</strong>
                      </h5>
                    </CCol>
                  </CRow>
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="kontakKonfirmasiCheck"
                          name="kontakKonfirmasiCheck"
                          checked={this.state.kontakKonfirmasiCheck}
                          value={!this.state.kontakKonfirmasiCheck}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="kontakKonfirmasiCheck"
                        >
                          Dalam 14 hari sebelum sakit, apakah memiliki kontak
                          dengan kasus konfirmasi dan probable COVID-19 ? jika
                          ya, sebutkan!
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  {this.state.kontakKonfirmasiCheck && (
                    <div>
                      <CButton
                        className={"float-right my-3 btn-facebook btn-brand"}
                        color="primary"
                        onClick={this.toggleStateModalKontakKonfirmasi}
                      >
                        Tambah Kontak
                      </CButton>
                      <CModal
                        show={this.state.stateModalKontakKonfirmasi}
                        onClose={this.toggleStateModalKontakKonfirmasi}
                        size="sm"
                      >
                        <CModalHeader closeButton>
                          <CModalTitle>Tambah Daftar Kontak</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <CContainer>
                            <CRow>
                              <CCol>
                                <CLabel>Nama Kontak Konfirmasi</CLabel>
                                <CInput
                                  id="namaKontakKonfirmasi"
                                  type="text"
                                  onChange={this.handleInputChange}
                                  value={this.state.namaKontakKonfirmasi}
                                />
                              </CCol>
                            </CRow>
                            <CRow className="my-3">
                              <CCol>
                                <CLabel>Alamat</CLabel>
                                <CInput
                                  id="alamatKontakKonfirmasi"
                                  type="text"
                                  onChange={this.handleInputChange}
                                  value={this.state.alamatKontakKonfirmasi}
                                />
                              </CCol>
                            </CRow>

                            <CRow className="my-3">
                              <CCol>
                                <CLabel>Hubungan</CLabel>
                                <CInput
                                  id="hubunganKontakKonfirmasi"
                                  type="text"
                                  onChange={this.handleInputChange}
                                  value={this.state.hubunganKontakKonfirmasi}
                                />
                              </CCol>
                            </CRow>
                            <CRow className="my-3">
                              <CCol>
                                <CLabel>Tanggal Kontak</CLabel>
                                <CInput
                                  id="tanggalKontakKonfirmasi"
                                  type="date"
                                  onChange={this.handleInputChange}
                                  value={this.state.tanggalKontakKonfirmasi}
                                />
                              </CCol>
                            </CRow>
                          </CContainer>
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            className={"float-right btn-facebook btn-brand"}
                            color="primary"
                            onClick={() => {
                              this.state.kontakKasus.push({
                                nama: this.state.namaKontakKonfirmasi,
                                alamat: this.state.alamatKontakKonfirmasi,
                                hubungan: this.state.hubunganKontakKonfirmasi,
                                tglKontakStr: `${this.state.tanggalKontakKonfirmasi}`,
                              });
                              this.toggleStateModalKontakKonfirmasi();
                            }}
                          >
                            Simpan
                          </CButton>
                        </CModalFooter>
                      </CModal>
                      <CDataTable
                        size="sm"
                        items={this.state.kontakKasus}
                        fields={[
                          {
                            key: "nama",
                            label: "Nama Konfirmasi",
                          },
                          {
                            key: "alamat",
                            label: "Alamat",
                          },
                          {
                            key: "hubungan",
                            label: "Hubungan",
                          },
                          {
                            key: "tglKontakStr",
                            label: "Tanggal Kontak",
                          },
                        ]}
                      />
                    </div>
                  )}
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="ispa"
                          name="ispa"
                          checked={this.state.ispa}
                          value={!this.state.ispa}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="ispa"
                        >
                          Pasien termasuk cluster ISPA berat ( demam dan
                          pneumonia membutuhkan perawatan Rumah Sakit ) yang
                          tidak diketahui penyebabnya
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>

                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="punyaHewan"
                          name="punyaHewan"
                          checked={this.state.punyaHewan}
                          value={!this.state.punyaHewan}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="punyaHewan"
                        >
                          Pasien memiliki hewan peliharaan, sebutkan!
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  {this.state.punyaHewan && (
                    <CFormGroup row className="my-0">
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="hewan1">hewan1</CLabel>
                          <CInput
                            id="hewan1"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.hewan1}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="hewan2">Hewan 2</CLabel>
                          <CInput
                            id="hewan2"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.hewan2}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="hewan3">Hewan 3</CLabel>
                          <CInput
                            id="hewan3"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.hewan3}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="3">
                        <CFormGroup>
                          <CLabel htmlFor="hewan4">Hewan4</CLabel>
                          <CInput
                            id="hewan4"
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.hewan4}
                          />
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>
                  )}
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="petugasKesehatan"
                          name="petugasKesehatan"
                          checked={this.state.petugasKesehatan}
                          value={!this.state.petugasKesehatan}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="petugasKesehatan"
                        >
                          Pasien seorang petugas kesehatan, jika ya apa saja
                          alat pelindung diri (APD) yang digunakan!
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  {this.state.petugasKesehatan && (
                    <CContainer>
                      <CRow className={"my-2"}>
                        <CCol className="my-1" sm={3}>
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputCheckbox
                              id="gown"
                              name="gown"
                              checked={this.state.gown}
                              value={!this.state.gown}
                              onChange={this.handleCheckBoxChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="gown"
                            >
                              Gown
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                        <CCol className="my-1" sm={3}>
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputCheckbox
                              id="maskerFFP2"
                              name="maskerFFP2"
                              checked={this.state.maskerFFP2}
                              value={!this.state.maskerFFP2}
                              onChange={this.handleCheckBoxChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="maskerFFP2"
                            >
                              Masker NIOSH - N95, AN EU Standard FFP2
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                        <CCol className="my-1" sm={3}>
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputCheckbox
                              id="apd"
                              name="apd"
                              checked={this.state.apd}
                              value={!this.state.apd}
                              onChange={this.handleCheckBoxChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="apd"
                            >
                              Tidak Memakai APD
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow className={"my-2"}>
                        <CCol className="my-1" sm={3}>
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputCheckbox
                              id="maskerMedis"
                              name="maskerMedis"
                              checked={this.state.maskerMedis}
                              value={!this.state.maskerMedis}
                              onChange={this.handleCheckBoxChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="maskerMedis"
                            >
                              Masker Medis
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                        <CCol className="my-1" sm={3}>
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputCheckbox
                              id="maskerFFP3"
                              name="maskerFFP3"
                              checked={this.state.maskerFFP3}
                              value={!this.state.maskerFFP3}
                              onChange={this.handleCheckBoxChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="maskerFFP3"
                            >
                              FFP3
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow className={"my-2"}>
                        <CCol className="my-1" sm={3}>
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputCheckbox
                              id="sarungTangan"
                              name="sarungTangan"
                              checked={this.state.sarungTangan}
                              value={!this.state.sarungTangan}
                              onChange={this.handleCheckBoxChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="sarungTangan"
                            >
                              Sarung Tangan
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                        <CCol className="my-1" sm={3}>
                          <CFormGroup variant="checkbox" className="checkbox">
                            <CInputCheckbox
                              id="goggle"
                              name="goggle"
                              checked={this.state.goggle}
                              value={!this.state.goggle}
                              onChange={this.handleCheckBoxChange}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="goggle"
                            >
                              Kacamata Pelindung / Goggle
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CContainer>
                  )}
                  <CRow className={"my-2"}>
                    <CCol className="my-1">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id="erosol"
                          name="erosol"
                          checked={this.state.erosol}
                          value={!this.state.erosol}
                          onChange={this.handleCheckBoxChange}
                        />
                        <CLabel
                          variant="checkbox"
                          className="form-check-label"
                          htmlFor="erosol"
                        >
                          Melakukan prosedur yang menimbulkan erosol
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCol>
            </CRow>
          </CContainer>
        </CCard>
        <CCard>
          <CCardHeader>
            <CContainer className="d-flex align-items-center justify-content-between">
              <h5>
                <strong>Daftar Kontak Erat</strong>
              </h5>
              <CButton
                className={"float-right btn-facebook btn-brand"}
                color="primary"
                onClick={this.toggleStateModalKontakErat}
              >
                Tambah Kontak
              </CButton>
            </CContainer>
          </CCardHeader>
          <CModal
            show={this.state.stateModalKontakErat}
            onClose={this.toggleStateModalKontakErat}
            size="sm"
          >
            <CModalHeader closeButton>
              <CModalTitle>Tambah Daftar Kontak</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CContainer>
                <CRow>
                  <CCol>
                    <CLabel>Nama Kontak Erat</CLabel>
                    <CInput
                      id="namaKontakErat"
                      type="text"
                      onChange={this.handleInputChange}
                      value={this.state.namaKontakErat}
                    />
                  </CCol>
                </CRow>
                <CRow className="my-3">
                  <CCol>
                    <CLabel>Umur</CLabel>
                    <CInput
                      id="umur"
                      type="text"
                      onChange={this.handleInputChange}
                      value={this.state.umur}
                    />
                  </CCol>
                </CRow>
                <CRow className="my-3">
                  <CCol>
                    <CLabel>Jenis Kelamin</CLabel>
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
                  </CCol>
                </CRow>
                <CRow className="my-3">
                  <CCol>
                    <CLabel>Hubungan</CLabel>
                    <CInput
                      id="hubungan"
                      type="text"
                      onChange={this.handleInputChange}
                      value={this.state.hubungan}
                    />
                  </CCol>
                </CRow>
                <CRow className="my-3">
                  <CCol>
                    <CLabel>Alamat</CLabel>
                    <CInput
                      id="alamatKontakErat"
                      type="text"
                      onChange={this.handleInputChange}
                      value={this.state.alamatKontakErat}
                    />
                  </CCol>
                </CRow>
                <CRow className="my-3">
                  <CCol>
                    <CLabel>No Hp</CLabel>
                    <CInput
                      id="noHp"
                      type="text"
                      onChange={this.handleInputChange}
                      value={this.state.noHp}
                    />
                  </CCol>
                </CRow>
                <CRow className="my-3">
                  <CCol>
                    <CLabel>Aktifitas Kontak</CLabel>
                    <CInput
                      id="aktifitasKontak"
                      type="text"
                      onChange={this.handleInputChange}
                      value={this.state.aktifitasKontak}
                    />
                  </CCol>
                </CRow>
              </CContainer>
            </CModalBody>
            <CModalFooter>
              <CButton
                className={"float-right btn-facebook btn-brand"}
                color="primary"
                onClick={() => {
                  this.state.daftarKontak.push({
                    nama: this.state.namaKontakErat,
                    umur: this.state.umur,
                    gender: this.state.gender,
                    hubungan: this.state.hubungan,
                    alamat: this.state.alamatKontakErat,
                    noHp: this.state.noHp,
                    aktifitasKontak: this.state.aktifitasKontak,
                  });
                  this.toggleStateModalKontakErat();
                }}
              >
                Simpan
              </CButton>
            </CModalFooter>
          </CModal>
          <CCardBody>
            <CDataTable
              items={this.state.daftarKontak}
              fields={[
                {
                  key: "nama",
                  label: "Nama Kontak Erat",
                },
                {
                  key: "umur",
                  label: "Umur",
                },
                {
                  key: "gender",
                  label: "Jenis Kelamin",
                },
                {
                  key: "hubungan",
                  label: "Hubungan",
                },
                "alamat",
                "noHp",
                {
                  key: "aktifitasKontak",
                  label: "Aktifitas Kontak",
                },
              ]}
            />
          </CCardBody>
        </CCard>
        <CButton
          className={"float-right mb-3 btn-facebook btn-brand"}
          color="primary"
          onClick={this.updateEpidemiologi}
        >
          Simpan
        </CButton>
        {/* <CCard>
          <StepProgressBar
            startingStep={0}
            onSubmit={onFormSubmit}
            nextBtnName='Lanjut'
            previousBtnName='Kembali'
            progressClass='asds'
            contentClass='jskdjaasdad'
            steps={[
              {
                label: 'Identitas Pasien',
                subtitle: '',
                // name: 'step 1',
                content: step1Content
              },
              {
                label: 'Informasi Klinis',
                subtitle: '',
                name: 'step 2',
                content: step2Content
              },
              {
                label: 'Pemeriksaan Penunjang',
                subtitle: '',
                name: 'step 3',
                content: step3Content
              },
              {
                label: 'Riwayat Perjalanan',
                subtitle: '',
                name: 'step 4',
                content: step4Content
              },
              {
                label: 'Faktor Kontak',
                subtitle: '',
                name: 'step 5',
                content: step5Content
              },
              {
                label: 'Daftar Kontak Erat',
                subtitle: '',
                name: 'step 6',
                content: step6Content,
                validator: step2Validator
              }
            ]}
          />;
      </CCard> */}
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
