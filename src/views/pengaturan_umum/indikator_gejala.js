import React, { Component } from "react";
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CCardBody,
  CButton,
  CImg,
  CInput
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class IndikatorGejala extends Component {

  constructor() {
    super()
    this.state = {
      // listindikator: [],
      // indikator:[],
      id:"",
      boolindikator: false,
      error_login: false,
      error_message: "",
      is_logged_in: false,
      alert_login: false,
    }
  }
  componentDidMount() {
    this.indikatorlist()
  }
  indikatorlist = () => {
    fetch("https://api.aktiv.co.id/api/aktivengine/v1/setting/indikator/list", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.data.items.length > 0){
          this.setState({boolindikator:true})
          data.data.items.indikator.forEach(element => {
            this.setState({
              id:element.id
            })
            if(element.judul=='Hijau'){
              this.setState({
                description_hijau:element.description
              })
            }
            if(element.judul=='Kuning'){
              this.setState({
                description_kuning:element.description
              })
            }
            if(element.judul=='Merah'){
              this.setState({
                description_merah:element.description
              })
            }
            
          });
        }
          // this.setState({listindikator: listindikator });
          // console.log(indikator)
      }).catch(error => console.log(error));
  }
  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  handleUpdateIndikator(event) {

    const { history } = this.props;
    event.preventDefault()

    var statusupdate;
    var methodUpdate;
    var tampunghijau = {
      judul: 'Hijau',
      description: this.state.description_hijau,
      logo:'',
    }
    var tampungkuning = {
      judul: 'Kuning',
      description: this.state.description_kuning,
      logo:'',
    }
    var tampungmerah = {
      judul: 'Merah',
      description: this.state.description_merah,
      logo:'',
    }
    var indikator=[]
    indikator.push(tampunghijau,tampungkuning,tampungmerah)
    
    var body;
    if(this.state.boolindikator){
      body={
        id:this.state.id,
        indikator:indikator
      }
      statusupdate='update'
      methodUpdate='PUT'
    }
    else{
      body={
        indikator:indikator
      }
      statusupdate='add'
      methodUpdate='POST'
    }

    fetch(`https://api.aktiv.co.id/api/aktivengine/v1/setting/indikator/${statusupdate}`, {
      method: methodUpdate,
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      })
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.status == "OK") {
          toast.success("Tambah Indikator Berhasil", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.indikatorlist()
        }
      }).catch(error => console.log(error))

  }
  

  render() {
    return (
      <div className="container-fluid">
        <CCard className="px-3 py-3">
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <CImg
                  src="logo/hijau.svg"
                  height={25}
                  className="mr-2"
                />
                <strong>Hijau</strong>
              </CCardHeader>
              <CCardBody>
                <CInput
                  type="text"
                  value={this.state.description_hijau}
                  id="description_hijau"
                  placeholder="Kondisi anda saat ini tidak memiliki gejala yang berbahaya atau Anda mengalami perbaikan gejala"
                  onChange={this.handleInputChange.bind(this)}
                // autoComplete="username"
                // id="username"
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <CImg
                  src="logo/kuning.svg"
                  height={25}
                  className="mr-2"
                />
                <strong>Kuning</strong>
              </CCardHeader>
              <CCardBody>
              <CInput
                  type="text"
                  value={this.state.description_kuning}
                  id="description_kuning"
                  placeholder="Kondisi anda saat ini memiliki gejala baru atau gejala yang Anda rasakan tidak membaik"
                  onChange={this.handleInputChange.bind(this)}
                // autoComplete="username"
                // id="username"
                // onChange={this.handleInputChange}
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <CImg
                  src="logo/merah.svg"
                  height={25}
                  className="mr-2"
                />
                <strong> Merah</strong>
              </CCardHeader>
              <CCardBody>
              <CInput
                  type="text"
                  value={this.state.description_merah}
                  id="description_merah"
                  placeholder="Kondisi anda saat ini harus segera mendapatkan penanganan khusus, silakan segera hubungi kami."
                  onChange={this.handleInputChange.bind(this)}
                // autoComplete="username"
                // id="username"
                // onChange={this.handleInputChange}
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
          </CCol>
        </CRow>
        <CRow>
          <CCol className="d-flex flex-row-reverse">
            <CButton className="btn-facebook btn-brand mr-3 mb-3" onClick={this.handleUpdateIndikator.bind(this)}><span className="mfs-2">Simpan</span></CButton>
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