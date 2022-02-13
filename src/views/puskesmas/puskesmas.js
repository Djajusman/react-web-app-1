import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CDataTable,
  CFormGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getBadge = (status) => {
  switch (status) {
    case "Berhasil Dimonitor":
      return "success";
    case "Sedang Dimonitor":
      return "warning";
    case "Gagal Dimonitor":
      return "danger";
    default:
      return "primary";
  }
};
const puskesmasFields = [
  { label: "Nama Puskesmas", key: "puskesmas" },
  { key: "alamat", _style: { width: "25%" } },
  "noHp",
  "namaPIC",
  "noHpPIC",
  { key: "action", _style: { width: "15%" } },
];
// const puskesmasData = [
//   { id: 0, name: 'Puskesmas A', alamat: '1901 Thornridge Cir. Shiloh, Hawaii 81063', telpon: '0812391839219',pic: 'Dr. Jacob Muhammad'},

// ]

export default class Puskesmas extends Component {
  constructor() {
    super();
    this.state = {
      puskesmas: [],

      total_item: 0,
      curr_page: 1,
      total_page: 0,
    };
  }
  componentDidMount() {
    this.puskesmaslist(1);
  }
  deletePuskesmas = (id) => {
    var deleted = window.confirm("Apakah Anda Yakin Ingin Menghapus Data Ini?");
    if (deleted) {
      var body = {
        id: id,
      };
      fetch("https://api.aktiv.co.id/api/aktivengine/v1/puskesmas/delete", {
        method: "DELETE",
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
              toast.success("Hapus Berhasil", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              this.puskesmaslist(1);
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
        .catch((error) => console.error(error));
    }
  };
  downloadExcel = () => {
    var url = `https://report.aktiv.co.id/api/report-puskesmas`;
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
  puskesmaslist = (page) => {
    fetch(
      "https://api.aktiv.co.id/api/aktivengine/v1/puskesmas/list?page=" + page,
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
            puskesmas: res.data.items,
            curr_page: page,
            total_item: res.data.total_item,
          },
          () => console.log(this.state.puskesmas)
        );
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="container-fluid">
        <CRow>
          <CCol sm="3">
            {/* <CFormGroup>
            <CLabel className="mt-1" htmlFor="date-input">Tanggal</CLabel>
            <CInput type="date" id="date-input" name="date-input" placeholder="date" />
          </CFormGroup> */}
          </CCol>
          <CCol className="d-flex flex-row-reverse">
            <CFormGroup>
              <CButton
                className="btn-outline-info mt-4  mr-2"
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  this.downloadExcel();
                }}
              >
                <CIcon name="cilDataTransferDown" />
                <span className="mfs-2">Unduh Excel</span>
              </CButton>
              <Link
                to="/puskesmas/tambah_puskesmas"
                className="btn btn-info btn-facebook btn-brand mt-4 mr-2"
              >
                <span>Tambah Puskesmas</span>
              </Link>
            </CFormGroup>
          </CCol>
        </CRow>
        <CCard>
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
                  <CDataTable
                    items={this.state.puskesmas}
                    fields={puskesmasFields}
                    itemsPerPage={5}
                    tableFilter
                    sorter
                    pagination
                    scopedSlots={{
                      status: (item) => (
                        <td>
                          <CBadge color={getBadge(item.status)}>
                            {item.status}
                          </CBadge>
                        </td>
                      ),
                      action: (item, index) => (
                        <td>
                          <CButton
                            className="mx-1 my-1"
                            color="danger"
                            size="sm"
                            onClick={() => {
                              this.deletePuskesmas(item.id);
                            }}
                          >
                            <CIcon name={"cilTrash"} />
                          </CButton>
                          <CButton
                            className="mx-1 my-1"
                            color="info"
                            size="sm"
                            onClick={() => {
                              this.props.history.push(
                                `/puskesmas/update_puskesmas/${item.id}`
                              );
                            }}
                          >
                            <CIcon name={"cilPencil"} />
                          </CButton>
                        </td>
                      ),
                    }}
                  />
                </CCardBody>
              </CCard>
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
