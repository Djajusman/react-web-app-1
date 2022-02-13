import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'


export default class TanyaAktiv extends Component {

  constructor() {
    super()
    this.state = {
    }
  }
  componentDidMount () {
    // const { handle } = this.props.match.params

    // fetch(`https://api.twitter.com/user/`)
    //   .then((user) => {
    //     this.setState(() => ({ user }))
    //   })
  }

  render() {
    return (
      <div className="container-fluid">
        <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader>
              Card title
              <DocsLink name="CCard"/>
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
            <CCardFooter>Card footer</CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      </div>
    );
  }
}