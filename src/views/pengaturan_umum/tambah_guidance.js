import React, { Component } from "react";
// import { FileDrop } from "react-file-drop";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CButton,
 
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertToHTML, convertFromHTML } from "draft-convert";
// import { Multiselect } from "multiselect-react-dropdown";

const styles = {
  border: "1px solid black",
  height: "100%",
  color: "black",
  padding: 20,
};
const styles1 = { border: "1px solid black", color: "black", padding: 20 };
export default class TambahGuidance extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),  
      header: "",   
      error_login: false,
      error_message: "",
      is_logged_in: false,
      alert_login: false,
      title: "",
    };
  }
  componentDidMount() {
    this.kategorilist();
  }

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
        imageartikel: e.target.result,
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
  handleAddartikel = () => {
    var tampungHeader = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    var header = "";
    tampungHeader.blocks.forEach((element) => {
      header += `${element.text} `;
    });

    var body = {
      judul: this.state.title,      
      description: convertToHTML(this.state.editorState.getCurrentContent()),          
    };
    console.log(body);
    fetch("https://api.aktiv.co.id/api/aktivengine/v1/setting/guidance/add", {
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
        console.log(error)
      });
  };
  kategorilist = (page) => {
    fetch(
      "https://api.aktiv.co.id/api/aktivengine/v1/article/category/list",
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
        var listkategori = [];
        var tambahId = 1;
        data.data.items.forEach((i) => {
          i.subCategory.forEach((j) => {
            listkategori.push({
              name: j,
              id: i.id,
            });
          });
          tambahId++;
        });
        this.setState({ listkategori: listkategori });
        console.log(listkategori);
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
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </CFormGroup>
                 
                  <CFormGroup>
                    <CLabel htmlFor="street">Text Editor</CLabel>
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
                            // id="header"
                            // onChange={this.handleInputChange.bind(this)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CFormGroup>
                  
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol className="d-flex flex-row-reverse">
              <CButton
                className="btn-facebook btn-brand mr-3 mb-3"
                // onClick={this.handleAddartikel.bind(this)}
                onClick={() => {
                  this.handleAddartikel();
                }}
              >
                <span className="mfs-2">Tayang</span>
              </CButton>
              {/* <CButton className="btn-light mr-2 mb-3">
                <span className="mfs-2">Preview</span>
              </CButton> */}
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
