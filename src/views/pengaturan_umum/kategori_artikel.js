import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CDataTable,
  CImg,
  // CButton,
  // CFormGroup,
  // CLabel,
  // CInput
} from "@coreui/react";
// import CIcon from '@coreui/icons-react'

const kategoriartikelFields = [
  { label: "Kategori", key: "category" },
  { label: "Image", key: "image" },
  { label: "Sub Kategori", key: "subCategory" },
];

export default class KategoriArtikel extends Component {
  constructor() {
    super();
    this.state = {
      listkategori: [],
      category: "",

      total_item: 0,
      curr_page: 1,
      total_page: 0,
    };
  }
  componentDidMount() {
    this.kategoriartikellist(1);
  }
  kategoriartikellist = (page) => {
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
        var listkategori = data.data.items.map((item) => {
          return {
            ...item,
            category: item.category ? item.category : "",
            image: item.image ? item.image : "",
          };
        });
        console.log(listkategori);
        this.setState({ listkategori: listkategori });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="container-fluid">
        <CCard>
          <CRow>
            <CCol className="d-flex flex-row-reverse">
              <Link
                to="/pengaturan_umum/kategori_artikel/tambah_kategori_artikel"
                className="btn btn-info mr-2 my-2"
              >
                <span className="mfs-2">Tambah Kategori</span>
              </Link>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
                  <CDataTable
                    items={this.state.listkategori}
                    fields={kategoriartikelFields}
                    itemsPerPage={5}
                    tableFilter
                    pagination
                    scopedSlots={{
                      image: (item) => (
                        <td>
                          <CImg src={item.image} width="20%" />
                        </td>
                      ),
                      action: (item) => (
                        <td>
                          {/* <CBadge color={getBadge(item.status)}>
                              {item.status}
                              </CBadge> */}
                        </td>
                      ),
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCard>
      </div>
    );
  }
}
