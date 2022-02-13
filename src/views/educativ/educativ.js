import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CDataTable,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

var idLocale = require("moment/locale/id");
const educativFields = [
  { label: "Judul", key: "title", _style: { width: "20%" } },
  { label: "Sub Kategori", key: "subCategory" },
  { label: "Deskripsi", key: "header" },
  { label: "Tanggal Dibuat", key: "createdDate", _style: { width: "15%" } },
  { key: "action", _style: { width: "15%" } },
];

export default class Educativ extends Component {
  constructor() {
    super();
    this.state = {
      articleList: [],
    };
  }
  componentDidMount() {
    this.getArticleList();
  }
  getArticleList = () => {
    fetch("https://api.aktiv.co.id/api/aktivengine/v1/article/list", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState(
          {
            articleList: res.data.items.map((item) => {
              return {
                ...item,
                createdDate: moment(item.createdDate)
                  .locale("id", idLocale)
                  .format("LLLL"),
              };
            }),
          },
          () => console.log(this.state.articleList)
        );
      })
      .catch((error) => console.log(error));
  };
  deleteArtikel(item) {
    var confirmation = window.confirm(
      "Apakah anda yakin ingin menghapus data ini?"
    );
    if (confirmation) {
      let body = {
        id: item.id,
      };
      fetch(`https://api.aktiv.co.id/api/aktivengine/v1/article/delete`, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.hasOwnProperty("status")) {
            if (data.status === "OK") {
              toast.success("Hapus Berhasil", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              this.getArticleList();
            } else {
              toast.error("Hapus Gagal: " + data.statusmsg, {
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
  }

  render() {
    return (
      <div className="container-fluid">
        <CRow>
          <CCol className="d-flex flex-row-reverse">
            <CButton
              className="btn-facebook btn-brand mb-4 mr-2"
              onClick={() => {
                this.props.history.push("/edukativ/tambah_artikel");
              }}
            >
              <span>Tambah Artikel</span>
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>
                <CDataTable
                  items={this.state.articleList}
                  fields={educativFields}
                  tableFilter
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    action: (item) => (
                      <td>
                        <CButton
                          className="mx-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Hapus Data"
                          color="danger"
                          shape="rounded"
                          size="sm"
                          onClick={() => {
                            this.deleteArtikel(item);
                          }}
                        >
                          <CIcon name="cil-trash" />
                        </CButton>
                        <CButton
                          className="mx-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit Data"
                          color="info"
                          shape="rounded"
                          size="sm"
                          onClick={() => {
                            this.props.history.push(
                              `/edukativ/detail_artikel/${item.id}`
                            );
                          }}
                        >
                          <CIcon name="cil-pencil" />
                        </CButton>
                      </td>
                    ),
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </CRow>
      </div>
    );
  }
}
