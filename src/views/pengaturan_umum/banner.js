import React, { Component } from "react";
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CCardBody,
  CButton,
  CImg,
  CDataTable,
  CContainer,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { FileDrop } from "react-file-drop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
const styles1 = { border: "1px solid black", color: "black", padding: 20 };

export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
      bannerList: [],
      error_login: false,
      error_message: "",
      is_logged_in: false,
      alert_login: false,
      imageBanner: "",
      noImageAvailable:
        "data:image/jpeg;base64,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SSSSSSSSSAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAASQAAAAAAAAAAAAAACQAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAASQAAAAAAAAAAAAAACSAAAAAAAAAAAAAAAAAAACSAAAAAAAAAAAAAAASAAAAACCQAAAAAAAAAAAASQAAAAAAAAAAAAAACSAAAACSSQAAAAAAAAAAAASAAAAAAAAAAAAAAASAAAAACSQAAAAAAAAAAAACQAAAAAAAAAAAAAACQAAAASSSQAAAAAAAAAAAASAAAAAAAAAAAAAAASAAAACCSQAAAAAAAAAAAACQAAAAAAAAAAAAAACQAAAASSSAAAAASSAAAAACSAAAAAAAAAAAAAAASAAAAACAAAAAACCQAAAAASQAAAAAAAAAAAAAACQAAAAAAAAAAAACSCAAAACSAAAAAAAAAAAAAAASAAAAAAAAAAACCCQQAAAASQAAAAAAAAAAAAAACSAAACAAAAAAAASSSQAAACSAAAAAACAAAAAAAASQACASAAAAAASSSQQQAAASQAAAAAAAAAAAAAACSAASSQAAAACCSSSSQAAAASAQAQACAAAAAAAAASQASSQAAAAACCSSSSSAAACQAAAAAAAAAAAAAACQAQSSQAAAACSSSSSSQAAASAAAAAAAAAAAAAAASQASSSQAAACCSSSSSSCAASQAAAAAAAAAAAAAACQASSSSAQAAQSQSQSSCQACSAAAAAAAAAAAAAAAQSQSCCSQAACCAQCCQAAQAQQAAAAAAAAAAAAAACSCCSSSSSAQSSSQSSSSQACSAAAAAAAAAAAAAAASQSSSSSSSASSSSSSSSSSASQAAAAAAAAAAAAAACSCSSSSSSASSSSSSSSSSCASAAAAAAAAAAAAAAASQSSSSSSSCSSSSSSSSSSCCQAAAAAAAAAAAAAACSCSSSSSSSSSSSSSSSSSSCSAAAAAAAAAAAAAAASASSSSSSSSSSSSSSSSSSQCQAAAAAAAAAAAAAACQCSSSSSSSSSSSSSSSSSSCSAAAAAAAAAAAAAAASSSSSSSSSSSSSSSQSSSSSSQAAAAAAAAAAAAQACAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAACSSSSSSSSSSSSSSSSSSSSSAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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",
    };
  }

  componentDidMount() {
    this.bannerlist();
  }
  toggleStateModal = () => {
    this.setStateModal(!this.state.stateModal);
  };
  setStateModal(stateModal) {
    this.setState({
      stateModal: stateModal,
    });
  }
  bannerlist = () => {
    fetch(
      "https://api.aktiv.co.id/api/aktivengine/v1/setting/banner/list",
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
        var bannerList = data.data.items;
        this.setState({
          bannerList: bannerList,
        });
      })
      .catch((error) => console.log(error));
  };
  convertToBase64(data) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        imageBanner: e.target.result,
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
  addBanner=() =>{
    var body = { banner: this.state.imageBanner };
    fetch(`https://api.aktiv.co.id/api/aktivengine/v1/setting/banner/add`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "OK") {
          toast.success("Tambah banner Berhasil", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.bannerlist();
          this.toggleStateModal();
        }
      })
      .catch((error) => console.log(error));
  }
  deleteBanner=(id) =>{
    var body = { id:id };
    fetch(`https://api.aktiv.co.id/api/aktivengine/v1/setting/banner/delete`, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "OK") {
          toast.success("Delete banner Berhasil", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.bannerlist();
        
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <CCol
                  className={
                    "d-flex justify-content-between align-items-center"
                  }
                >
                  <strong>List Banner</strong>
                  <CButton
                    className="btn-facebook btn-bran"
                    onClick={() => {
                      this.toggleStateModal();
                    }}
                  >
                    <span>Tambah</span>
                  </CButton>
                </CCol>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.bannerList}
                  fields={[{key:"BannerKe",width:"50%"}, "banner","action"]}
                  itemsPerPage={5}
                  tableFilter
                  sorter
                  pagination
                  scopedSlots={{
                    BannerKe: (item, index) =>(
          
                        <td>{index + 1}</td>
                     
                      ),
                      banner: (item) => (
                      <td>
                        <CImg src={item.banner} width="50%"/>
                      </td>
                    ),
                    action: (item) => (
                      <td>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => {
                            // console.log(item);
                            this.deleteBanner(item.id);
                          }}
                        >
                          <CIcon name="cil-trash" />
                        </CButton>
                      </td>
                    ),
                  }}
                />
              </CCardBody>
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
          </CCol>
        </CRow>
        <CModal
          show={this.state.stateModal}
          onClose={this.toggleStateModal}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>Tambah Banner</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CContainer>
              <CCard>
                <CCardHeader>
                  <strong>Banner</strong>
                </CCardHeader>
                <CCardBody>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                        {this.state.imageBanner == "" && (
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
                              <CImg src="logo/image.svg" />
                              Upload image: png, jpg max 500 Kb
                            </FileDrop>
                          </div>
                        )}
                        {this.state.imageBanner != "" && (
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
                            <CImg width="50%" src={this.state.imageBanner} />
                          </FileDrop>
                        )}
                      </div>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton
              className="btn-facebook btn-brand mt-4 mr-2"
              onClick={() => {
                this.addBanner();
              }}
            >
              <span className="mfs-2">Tambah</span>
            </CButton>
          </CModalFooter>
        </CModal>
      </CContainer>
    );
  }
}
