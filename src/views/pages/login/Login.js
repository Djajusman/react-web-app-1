import React, { Component } from "react";
import ComponentLogin from "./ComponentLogin";
import PropTypes from "prop-types";
import { withRouter } from "react-router";


class Login extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogin(data) {
    localStorage.setItem("token", data.data.token);
    sessionStorage.setItem("token", data.data.token);
    localStorage.setItem("role", data.data.role);
    localStorage.setItem("username", data.data.username);
    localStorage.setItem("email", data.data.email);
    this.props.history.push("/");
    
  }

  handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("userdata");
    localStorage.removeItem("role");

    this.setState({});
  }

  toggleActiveMenu = (menu) => {
    this.setState({
      activeMenu: menu,
    });

  };

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      mobileMenu: !prevState.mobileMenu,
    }));
  };

  componentDidMount() {
    // console.log(process.env.config.publicPath);
    var userData = JSON.parse(localStorage.getItem("userdata"));
    if (userData !== null) {
      // var tokenData = jwtDecode(userData.token);
      // var currentTime = Math.round((new Date()).getTime() / 1000);
      // if(currentTime > tokenData.exp){
      //     localStorage.removeItem('token');
      //     localStorage.removeItem('userdata');
      //     this.setState({
      //         token_expired: true
      //     });
      // }
    }
  }

  render() {
    return (
      <div >
        <ComponentLogin successCallback={this.handleLogin} />
      </div>
    );
  }
}
export default withRouter(Login);
