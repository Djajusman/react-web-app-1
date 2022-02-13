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
import { Link } from "react-router-dom";

export default class UserPatient extends Component {
  constructor() {
    super();
    this.state = {
      listPatient: [],
      page: 1,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.getListPatient();
  }
  deleteUser = (akunID) => {
    var deleted = window.confirm("Apakah Anda Yakin Ingin Menghapus Data Ini?");
    if (deleted) {
      var body = {
        akunID: akunID,
      };
      fetch("https://api.aktiv.co.id/api/aktivengine/v2/patient/delete", {
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
              // this.toggleStateAddVolunteer();
              this.getListPatient();
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

  getListPatient = () => {
    fetch(`https://api.aktiv.co.id/api/aktivengine/v1/patient/list`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("List Pasien =>", data.data.items);

        this.setState({
          listPatient: data.data.items,
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
                      items={this.state.listPatient}
                      fields={[
                        {
                          key: "username",
                          label: "username",
                        },
                        {
                          key: "email",
                          label: "Email",
                        },
                        {
                          key: "isAktivUser",
                          label: "Aktiv User",
                        },
                        {
                          key: "volunteer",
                          label: "Volunteer",
                        },

                        "action",
                      ]}
                      itemsPerPage={10}
                      activePage={this.state.page}
                      tableFilter
                      sorter
                      pagination
                      scopedSlots={{
                        username: (item, index) => (
                          <td>
                            <Link to={`/users/member/${item.akunID}`}>
                              {item.username}
                            </Link>
                          </td>
                        ),
                        // pasien: (item, index) => (
                        //   <td>
                        //     {item.pasien.length > 0 &&
                        //       item.pasien.map((element) => {
                        //         return <CRow>{element.name}</CRow>;
                        //       })}
                        //   </td>
                        // ),
                        action: (item, index) => (
                          <td>
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => {
                                this.deleteUser(item.akunID);
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
