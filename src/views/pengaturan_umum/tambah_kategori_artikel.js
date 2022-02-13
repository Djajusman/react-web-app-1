import React, { Component } from "react";
import {
  CCard,
  CCol,
  CCardBody,
  CFormGroup,
  CInput,
  CRow,
  CButton,
  CLabel,
  CImg,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
// import CIcon from '@coreui/icons-react'
import { FileDrop } from "react-file-drop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const styles1 = {
  border: "1px solid black",
  color: "black",
};

export default class TambahKategoriArtikel extends Component {
  constructor() {
    super();
    this.state = {
      listSubCategories: [],
      category: "",
      imagekategori: "",
      subCategory: "",
    };
  }
  convertToBase64(data) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        imagekategori: e.target.result,
      });
    };
    reader.readAsDataURL(data);
  }

  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  toggleStateTambahSubKategori = () => {
    this.setStateTambahSubKategori(!this.state.stateTambahSubKategori);
  };
  setStateTambahSubKategori(stateTambahSubKategori) {
    this.setState({
      subCategory: "",
      stateTambahSubKategori: stateTambahSubKategori,
    });
  }

  addArtikel = () => {
    var body = {
      category: this.state.category,
      subCategory: this.state.listSubCategories,
      image: this.state.imagekategori,
    };
    console.log(body);
    fetch("https://api.aktiv.co.id/api/aktivengine/v1/article/category/add", {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status == "OK") {
          toast.success("Tambah Kategori Berhasil", {
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
          toast.error("Tambah Kategori Gagal " + data.statusmsg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        toast.error("Tambah Kategori Gagal: " + error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container-fluid">
        <CCard>
          <CCardBody>
            <CFormGroup row className="my-0">
              <CCol>
                <CLabel>Kategori</CLabel>
                <CFormGroup>
                  <CInput
                    id="category"
                    placeholder="Kategori"
                    onChange={this.handleInputChange.bind(this)}
                  />
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CRow>
              <CCol>
                <CButton
                  className="btn-outline-info mb-3"
                  onClick={() => {
                    this.toggleStateTambahSubKategori();
                  }}
                >
                  <span>Tambah Sub Kategori</span>
                </CButton>
              </CCol>
            </CRow>
            <CRow>
              {this.state.listSubCategories.map((element) => {
                return (
                  <CCol sm="2">
                    <CCard className="py-2 px-2">{element}</CCard>
                  </CCol>
                );
              })}
            </CRow>
          </CCardBody>

          <CModal
            show={this.state.stateTambahSubKategori}
            onClose={this.toggleStateTambahSubKategori}
            size="sm"
          >
            <CModalHeader closeButton>
              <CModalTitle>Tambah Sub Kategori</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow>
                <CCol className="my-1">
                  <CFormGroup>
                    <CLabel htmlFor="subCategory">Sub Kategori</CLabel>
                    <CInput
                      id="subCategory"
                      value={this.state.subCategory}
                      placeholder="Masukkan Sub kategori"
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton
                className="btn-facebook btn-brand mt-4 mr-2"
                onClick={() => {
                  var listSubKategori = this.state.listSubCategories;
                  listSubKategori.push(this.state.subCategory);
                  this.setState({
                    listSubCategories: listSubKategori,
                  });
                  this.toggleStateTambahSubKategori();
                }}
              >
                <span>Tambah</span>
              </CButton>
            </CModalFooter>
          </CModal>
          <CCardBody>
            <CFormGroup>
              <CCol>
                <CLabel>
                  <strong>Image</strong>
                </CLabel>
                <CRow>
                  <CCol>
                    {this.state.imagekategori == "" && (
                      <div style={styles1}>
                        <FileDrop
                          onFrameDragEnter={(event) =>
                            console.log("onFrameDragEnter", event)
                          }
                          onFrameDragLeave={(event) =>
                            console.log("onFrameDragLeave", event)
                          }
                          onFrameDrop={(event) =>
                            console.log("onFrameDrop", event)
                          }
                          onDragOver={(event) =>
                            console.log("onDragOver", event)
                          }
                          onDragLeave={(event) =>
                            console.log("onDragLeave", event)
                          }
                          onDrop={(files, event) => {
                            console.log("onDrop!", files, event);
                            let data = files[0];
                            console.log(data);
                            this.convertToBase64(data);
                          }}
                          onChange={this.handleInputChange.bind(this)}
                        >
                          {" "}
                          <CImg src="logo/image.svg" />
                        </FileDrop>
                      </div>
                    )}
                    {this.state.imagekategori != "" && (
                      <FileDrop
                        onFrameDragEnter={(event) =>
                          console.log("onFrameDragEnter", event)
                        }
                        onFrameDragLeave={(event) =>
                          console.log("onFrameDragLeave", event)
                        }
                        onFrameDrop={(event) =>
                          console.log("onFrameDrop", event)
                        }
                        onDragOver={(event) => console.log("onDragOver", event)}
                        onDragLeave={(event) =>
                          console.log("onDragLeave", event)
                        }
                        onDrop={(files, event) => {
                          console.log("onDrop!", files, event);
                          let data = files[0];
                          console.log(data);
                          this.convertToBase64(data);
                        }}
                        onChange={this.handleInputChange.bind(this)}
                      >
                        <CImg width="25%" src={this.state.imagekategori} />
                      </FileDrop>
                    )}
                  </CCol>
                </CRow>
              </CCol>
            </CFormGroup>
          </CCardBody>
          <CRow>
            <CCol className="d-flex flex-row-reverse">
              <CButton
                className="btn-secondary mr-3 mb-3"
                onClick={() => {
                  this.addArtikel();
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
