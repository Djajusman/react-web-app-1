import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CDataTable,
  CFormGroup,
  CLabel,
  CInput,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CSelect,
  CCardHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export default class UserMember extends Component {
  constructor() {
    super();
    this.state = {
      listMember: [],
      page: 1,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.getListMember();
  }
  deleteUser = (memberID, akunID) => {
    var deleted = window.confirm("Apakah Anda Yakin Ingin Menghapus Data Ini?");
    if (deleted) {
      var body = {
        memberID: memberID,
        akunID: akunID,
      };
      fetch(
        `https://api.aktiv.co.id/api/aktivengine/v2/patient/members/delete?akunid=${akunID}&memberid=${memberID}`,
        {
          method: "DELETE",
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
              toast.success("Hapus Berhasil", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              // this.toggleStateAddVolunteer();
              this.getListMember();
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

  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };

  getListMember = () => {
    let akunID = "";
    if (this.props.match.params.akunID) {
      akunID = this.props.match.params.akunID;
    }
    fetch(
      `https://api.aktiv.co.id/api/aktivengine/v2/patient/members/list?akunid=${akunID}`,
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
        console.log("List Pasien =>", data.data.items);

        this.setState({
          listMember: data.data.items,
        });
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
            <CCard>
              <CCardHeader>
                <strong>List Pasien</strong>
              </CCardHeader>

              <CRow>
                <CCol>
                  <CCardBody>
                    <CDataTable
                      items={this.state.listMember}
                      fields={[
                        {
                          key: "fullName",
                          label: "Nama Lengkap",
                        },
                        {
                          key: "nik",
                          label: "NIK",
                        },
                        {
                          key: "birthDate",
                          label: "Tanggal Lahir",
                        },
                        {
                          key: "age",
                          label: "Usia",
                        },
                        {
                          key: "mobilePhone",
                          label: "No HP",
                        },
                        {
                          key: "gender",
                          label: "Jenis Kelamin",
                        },

                        "action",
                      ]}
                      itemsPerPage={10}
                      activePage={this.state.page}
                      tableFilter
                      sorter
                      pagination
                      scopedSlots={{
                        birthDate: (item, index) => (
                          <td>
                            {moment(item.birthDateStr).format("DD MMMM yyyy")}
                          </td>
                        ),
                        action: (item, index) => (
                          <td>
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => {
                                this.deleteUser(item.id, item.akunID);
                              }}
                            >
                              <CIcon name={"cilTrash"} />
                            </CButton>
                          </td>
                        ),
                      }}
                    />
                  </CCardBody>
                </CCol>
              </CRow>
            </CCard>
          </CCol>
        </CRow>
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
