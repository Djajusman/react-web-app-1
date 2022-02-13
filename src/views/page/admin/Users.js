import React, { useState, useEffect, Component } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPagination,
  CButton,
  CContainer,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CSelect,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usersData from "../admin/UsersData";

const getBadge = (status) => {
  switch (status) {
    case "Aktif":
      return "info";
    case "Non Aktif":
      return "secondary";
    default:
      return "secondary";
  }
};

class Users extends Component {
  constructor() {
    super();
    this.state = {
      usersData: [],
      totalPage: 1,
      usersDetail: null,
      page: 1,
      editId: 0,
      editActive: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getUsersData();
  }

  getUsersData() {
    fetch(
      `https://auth.aktiv.co.id/api/auth/v1/user/me?page=${this.state.page}`,
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
        var userdata = [];
        userdata = data.data.map((item) => {
          // return {
          //   ...item,
          //   name: item.profile.first_name ? item.profile.first_name : "",
          //   status: item.is_active ? "Aktif" : "Non Aktif",
          // };
        });
        this.setState({
          usersData: userdata,
          totalPage: data.data.total_page,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleRolesChange = (event) => {
    var k = event.target.id;

    this.setState({
      [k]: event.target.value,
    });
  };
  handleInputChange = (event) => {
    var k = event.target.id;
    this.setState({
      [k]: event.target.value,
    });
  };
  updateUserData = () => {
    let body = {
      id: this.state.editId,
      email: this.state.editEmail,
      first_name: this.state.editName,
      role: this.state.editRoles,
      is_active: this.state.editActive,
    };
    console.log("Update Body");
    console.log(body);
    fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/v1/user/update`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update User Response");
        console.log(data);

        toast.success("Update Berhasil", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({
          modal: false,
        });
        this.getUsersData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  pageChange = (newPage) => {
    this.setState({ page: newPage });
    this.getUsersData();
  };
  toggleModal = (index) => {
    this.setModal(!this.state.modal);
  };
  setModal(modal) {
    this.setState({
      modal: modal,
    });
  }
  deleteUser(item) {
    var confirmation = window.confirm(
      "Apakah anda yakin ingin menghapus data ini?"
    );
    if (confirmation) {
      let body = {
        id: item.id,
      };
      fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/v1/user/delete`, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.getUsersData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  activateUser(item) {
    var confirmation = window.confirm(
      "Apakah anda yakin ingin mengaktifkan akun ini?"
    );
    if (confirmation) {
      let body = {
        id: item.id,
        email: item.email,
        role: item.role,
        is_active: true,
      };
      fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/v1/user/update`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.getUsersData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  render() {
    return (
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              Users
              {/* <small className="text-muted"> example</small> */}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={this.state.usersData}
                fields={[
                  {
                    key: "name",
                    label: "Nama",
                    _classes: "font-weight-bold",
                  },
                  "username",
                  "role",
                  "status",
                  {
                    key: "action",
                    sorter: false,
                  },
                ]}
                hover
                sorter={true}
                striped
                itemsPerPage={50}
                activePage={this.state.page}
                // clickableRows
                // onRowClick={(item) => history.push(`/admin/users/${item.id}`)}
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                      {/* <CBadge>{item.status}</CBadge> */}
                    </td>
                  ),
                  action: (item, index) => {
                    return (
                      <td className="py-2">
                        {item.status === "Non Aktif" && (
                          <CButton
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Izinkan"
                            className="mr-1"
                            color="info"
                            shape="pill"
                            size="sm"
                            onClick={() => {
                              this.activateUser(item);
                            }}
                          >
                            <CIcon name="cil-check" /> Aktivasi
                          </CButton>
                        )}

                        <CButton
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit Data"
                          className="mr-1"
                          color="info"
                          //   variant="outline"
                          shape="pill"
                          size="sm"
                          onClick={() => {
                            this.toggleModal(index);
                            console.log(item);
                            this.setState({
                              editId: item.id,
                              editEmail: item.email,
                              editName: item.name,
                              editRoles: item.role,
                              editActive: item.is_active,
                            });
                          }}
                        >
                          <CIcon name="cil-pencil" /> Edit
                        </CButton>
                        <CButton
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Hapus Data"
                          color="danger"
                          shape="pill"
                          size="sm"
                          onClick={() => {
                            this.deleteUser(item);
                          }}
                        >
                          <CIcon name="cil-trash" /> Hapus
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
              <CPagination
                activePage={this.state.page}
                onActivePageChange={this.pageChange}
                pages={this.state.totalPage}
                doubleArrows={true}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CModal show={this.state.modal} onClose={this.toggleModal}>
          <CModalHeader closeButton>Edit Data</CModalHeader>
          <CModalBody>
            <CContainer>
              <CRow>
                <CCol>
                  <h3>Email</h3>
                  <CInput
                    id="editEmail"
                    value={this.state.editEmail}
                    label="Email"
                    onChange={this.handleInputChange}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <h3>Nama</h3>
                  <CInput
                    id="editName"
                    value={this.state.editName}
                    label="Name"
                    onChange={this.handleInputChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol>
                  <h3>Pilih Roles</h3>
                  <CSelect
                    id="editRoles"
                    value={this.state.editRoles}
                    onChange={this.handleRolesChange.bind(this)}
                  >
                    <option value="" key="">
                      -- Pilih Layanan --
                    </option>
                    <option value="admin" key="admin">
                      Admin
                    </option>
                    <option value="operator" key="operator">
                      Operator
                    </option>
                    <option value="cs" key="cs">
                      Customer Service
                    </option>
                    <option value="user" key="user">
                      User
                    </option>
                  </CSelect>
                </CCol>
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={this.toggleModal}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={this.updateUserData}>
              Simpan
            </CButton>
          </CModalFooter>
        </CModal>
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
    );
  }
}

export default Users;
