import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CDataTable,
  CButton,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CIcon from "@coreui/icons-react";
const guidanceFields = [
  { label: "Judul", key: "judul" },
  { label: "Deskripsi", key: "description" },
  // { label: "Tanggal Dibuat", key: 'createdDate' }
  "action",
];

export default class Guidance extends Component {
  constructor() {
    super();
    this.state = {
      guidance: [],

      total_item: 0,
      curr_page: 1,
      total_page: 0,
    };
  }
  componentDidMount() {
    this.guidancelist(1);
  }
  guidancelist = (page) => {
    fetch(
      "https://api.aktiv.co.id/api/aktivengine/v1/setting/guidance/list?page=" +
        page,
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
        this.setState(
          {
            guidance: res.data.items,
            curr_page: page,
            total_item: res.data.total_item,
          },
          () => console.log(this.state.guidance)
        );
      })
      .catch((error) => console.log(error));
  };
  deleteGuidance(item) {
    var confirmation = window.confirm(
      "Apakah anda yakin ingin menghapus data ini?"
    );
    if (confirmation) {
      let body = {
        id: item.id,
      };
      fetch(
        `https://api.aktiv.co.id/api/aktivengine/v1/setting/guidance/delete`,
        {
          method: "DELETE",
          body: JSON.stringify(body),
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          }),
        }
      )
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
                this.props.history.push(
                  "/pengaturan_umum/guidance/tambah_guidance"
                );
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
                  items={this.state.guidance}
                  fields={guidanceFields}
                  tableFilter
                  itemsPerPage={5}
                  pagination
                  scopedSlots={{
                    action: (item) => (
                      <td>
                        <CButton
                          className="mx-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete Data"
                          color="danger"
                          shape="rounded"
                          size="sm"
                          onClick={() => {
                            this.deleteGuidance(item);
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
          </CCol>
        </CRow>
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
      </div>
    );
  }
}
