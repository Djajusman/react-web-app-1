import React, { Component } from "react";
import { FileDrop } from "react-file-drop";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  CCard,
  CCardBody,
  CImg,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CButton,
  CInputCheckbox,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { Multiselect } from "multiselect-react-dropdown";

const styles = {
  border: "1px solid black",
  height: "100%",
  color: "black",
  padding: 20,
};
const imageStyle = {
  border: "1px solid black",
  color: "black",
  padding: 20,
  height: "100%",
};
export default class TambahArtikel extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      getCategoryList: [],
      subCategory: [],
      enableVideo: false,
      articleImage: "",
      category: "",
      header: "",
      title: "",
      video: "",
    };
  }
  componentDidMount() {
    this.getCategoryList();
    if (this.props.match.params.id != "") {
      this.getArticleDetail();
    }
  }
  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(editorState);
  };

  convertToBase64(data) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        articleImage: e.target.result,
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

  handleStatusChange = (event) => {
    var h = event.target.id;
    this.setState({
      [h]: event.target.value == "true" ? true : false,
    });
  };
  getArticleDetail = () => {
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v1/article/get?id=${this.props.match.params.id}`,
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
        console.log(data);
        const { editorState } = this.state;
        this.onChange(
          EditorState.push(editorState, convertFromHTML(data.data.content))
        );
        var incrementId1 = 0;
        var incrementId2 = 0;
        console.log("subcategory");
        console.log(data.data.subCategory);
        this.setState({
          title: data.data.title,
          articleImage: data.data.image,
          enableVideo: data.data.video == "" ? false : true,
          video: data.data.video,
          subCategory: data.data.subCategory.map((element) => {
            incrementId1++;
            return {
              id: incrementId1,
              name: element,
            };
          }),
          selectedValue: data.data.subCategory.map((element) => {
            incrementId2++;
            return {
              id: incrementId2,
              name: element,
            };
          }),
        });
      })
      .catch((error) => console.log(error));
  };
  updateArticle = () => {
    var tampungHeader = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    var header = "";
    tampungHeader.blocks.forEach((element) => {
      header += `${element.text} `;
    });

    var body = {
      id: this.props.match.params.id,
      title: this.state.title,
      header: `${header.substring(0, 200)}.....`,
      content: convertToHTML(this.state.editorState.getCurrentContent()),
      subCategory: this.state.subCategory.map((item) => {
        return item.name;
      }),
      image: this.state.articleImage,
      video: this.state.video,
    };
    console.log(body);
    fetch("https://api.aktiv.co.id/api/aktivengine/v1/article/update", {
      method: "PUT",
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
          toast.success("Update Artikel Berhasil", {
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
          toast.error("Update Artikel Gagal " + data.statusmsg, {
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
        toast.error("Tambah Artikel Gagal: " + error, {
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
  addArticle = () => {
    var tampungHeader = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    var header = "";
    tampungHeader.blocks.forEach((element) => {
      header += `${element.text} `;
    });

    var body = {
      title: this.state.title,
      header: `${header.substring(0, 200)}.....`,
      content: convertToHTML(this.state.editorState.getCurrentContent()),
      subCategory: this.state.subCategory.map((item) => {
        return item.name;
      }),
      image: this.state.articleImage,
      video: this.state.video,
    };
    console.log(body);
    fetch("https://api.aktiv.co.id/api/aktivengine/v1/article/add", {
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
          toast.success("Tambah Artikel Berhasil", {
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
          toast.error("Tambah Artikel Gagal " + data.statusmsg, {
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
        toast.error("Tambah Artikel Gagal: " + error, {
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
  getCategoryList = () => {
    fetch("https://api.aktiv.co.id/api/aktivengine/v1/article/category/list", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        var getCategoryList = [];
        data.data.items.forEach((i) => {
          i.subCategory.forEach((j) => {
            getCategoryList.push({
              name: j,
              id: i.id,
            });
          });
        });
        this.setState({ getCategoryList: getCategoryList });
      })
      .catch((error) => console.log(error));
  };
  onSelect = (selectedList, selectedItem) => {
    this.setState({
      subCategory: selectedList,
    });
  };
  onRemove = (selectedList, removedItem) => {
    this.setState({
      subCategory: selectedList,
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <CCard>
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
                  <CFormGroup>
                    <CLabel htmlFor="company">Judul</CLabel>
                    <CInput
                      id="title"
                      placeholder=""
                      value={this.state.title}
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Kategori</CLabel>
                    <Multiselect
                      options={this.state.getCategoryList} // Options to display in the dropdown
                      selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                      onSelect={this.onSelect} // Function will trigger on select event
                      onRemove={this.onRemove} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="textEditor">Text Editor</CLabel>
                    <div style={styles}>
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <Editor
                              editorState={this.state.editorState}
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              onEditorStateChange={this.onEditorStateChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CFormGroup>
                  <CFormGroup>
                    <CCol>
                      <CLabel htmlFor="header">Header</CLabel>
                    </CCol>
                    <CCol>
                      <CRow>
                        <CCol className="my-1">
                          <CFormGroup
                            variant="checkbox"
                            className="checkbox mb-3"
                          >
                            <CInputCheckbox
                              id="enableVideo"
                              name="enableVideo"
                              checked={this.state.enableVideo}
                              value={!this.state.enableVideo}
                              onChange={this.handleStatusChange.bind(this)}
                            />
                            <CLabel
                              variant="checkbox"
                              className="form-check-label"
                              htmlFor="enableVideo"
                            >
                              Video
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCol>
                    {this.state.enableVideo && (
                      <CCol sm={6} className="mb-4">
                        <CInput
                          placeholder="Masukkan URL / Link Video Anda Disini"
                          type="text"
                          id="video"
                          value={this.state.video}
                          onChange={this.handleInputChange.bind(this)}
                        />
                      </CCol>
                    )}
                    <CRow>
                      <CCol>
                        {this.state.articleImage == "" && (
                          <div style={imageStyle}>
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
                              <CImg src="logo/image.svg" />
                              Upload image: png, jpg max 500 Kb
                            </FileDrop>
                          </div>
                        )}
                        {this.state.articleImage != "" && (
                          <div style={imageStyle}>
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
                              <CImg width="50%" src={this.state.articleImage} />
                            </FileDrop>
                          </div>
                        )}
                      </CCol>
                    </CRow>
                  </CFormGroup>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol className="d-flex flex-row-reverse">
              <CButton
                className="btn-facebook btn-brand mr-3 mb-3"
                onClick={() => {
                  if (this.state.articleImage == "" || this.state.title == "") {
                    toast.error("Harap isi semua data!!!", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    console.log(this.props.match.params.id);
                    if (
                      this.props.match.params.id == "" ||
                      this.props.match.params.id == undefined
                    ) {
                      this.addArticle();
                    } else {
                      this.updateArticle();
                    }
                  }
                }}
              >
                <span>Tayang</span>
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
