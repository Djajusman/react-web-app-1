import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import jwtDecode from 'jwt-decode';
const dotenv = require('dotenv')
dotenv.config()
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// console.log = function (){};

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const TheLayoutAdmin = React.lazy(() => import('./containers/Admin/TheLayoutAdmin'));
const TheLayoutOperator = React.lazy(() => import('./containers/Operator/TheLayoutOperator'));
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Maintenance = React.lazy(() => import('./views/pages/maintenance/maintenance'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);


    this.state = {
      sidebar: {
        height: window.innerHeight
      },
      is_sidebar_mini: false,
      // usermenu: 'collapsed',
      // master: 'collapsed',
      // pasien: 'collapsed',
      // selfcheck: 'collapse',
      // report: 'collapse',
      token_expired: false,
      mobileMenu: false
    }
  }


  toggleMiniMenu = () => {
    this.setState({
      is_sidebar_mini: !this.state.is_sidebar_mini
    }, () => {
      if (this.state.is_sidebar_mini) {
        document.body.classList.add('sidebar-mini');
      } else {
        document.body.classList.remove('sidebar-mini');
      }
    });
  }

  handleLogin(data) {
    localStorage.setItem('userdata', JSON.stringify(data.data));
    sessionStorage.setItem('token', data.data.token);
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('role', data.data.role);
    localStorage.setItem('email', data.data.email);
    localStorage.setItem('username', data.data.username);
    this.setState({});
    this.props.history.push("/");
  }

  handleLogout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('role');
    this.setState({});
    this.props.history.push("/");
  }

  toggleActiveMenu = (menu) => {
    this.setState({
      activeMenu: menu
    });

    // console.log(this.state.activeMenu);
  }

  toggleMobileMenu = () => {
    this.setState(prevState => ({
      mobileMenu: !prevState.mobileMenu
    }));
  }

  componentDidMount() {
    var userData = JSON.parse(localStorage.getItem('userdata'));
    if (userData !== null) {
      var tokenData = jwtDecode(userData.token);
      var currentTime = Math.round((new Date()).getTime() / 1000);
      console.log(tokenData.exp)
      console.log(userData.token)
      if (currentTime > tokenData.exp) {
        sessionStorage.removeItem('token');
        localStorage.removeItem('userdata');
        console.log("berhasil dihapus token")
        this.setState({
          token_expired: true
        });
      }
    }
  }

  render() {
    if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === 'undefined') {
      return (
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              {/* <Route exact path="/maintenance" name="Maintenance" render={props => <Maintenance {...props} />} /> */}
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
              {/* <Redirect from="/" to="/maintenance" /> */}
            </Switch>
          </React.Suspense>
        </HashRouter>
      );
    }
    else if(localStorage.getItem('role')==='admin' ){
      return (
        <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>            
                <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />              
              </Switch>
              
            </React.Suspense>
        </HashRouter>
      );
    }
    else if(localStorage.getItem('role')==='operator'||localStorage.getItem('role')==='dinkes'){
      return (
        <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>            
                <Route path="/" name="Home" render={props => <TheLayoutAdmin {...props}/>} />              
              </Switch>
            </React.Suspense>
        </HashRouter>
      );
    }else if(localStorage.getItem('role')=='volunteer'){
      return (
        <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>            
                <Route path="/" name="Home" render={props => <TheLayoutOperator {...props}/>} />              
              </Switch>
            </React.Suspense>
        </HashRouter>
      );
    }
  }
}

export default App;
